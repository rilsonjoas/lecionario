/**
 * Busca textos bíblicos da tradução Almeida (domínio público)
 * e popula as leituras nos JSONs RCL.
 *
 * Uso: npx tsx scripts/lookup-bible-text.ts
 *
 * Fonte: https://github.com/seven1m/open-bibles (por-almeida.usfx.xml)
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Book name mapping: Português → OSIS ────────────────────────────

const bookMap: Record<string, string> = {
  gênesis: 'GEN',
  genesis: 'GEN',
  êxodo: 'EXO',
  exodo: 'EXO',
  levítico: 'LEV',
  levitico: 'LEV',
  números: 'NUM',
  numeros: 'NUM',
  deuteronômio: 'DEU',
  deuteronomio: 'DEU',
  josué: 'JOS',
  josue: 'JOS',
  juízes: 'JDG',
  juizes: 'JDG',
  rute: 'RUT',
  '1 samuel': '1SA',
  '2 samuel': '2SA',
  '1 reis': '1KI',
  '2 reis': '2KI',
  '1 crônicas': '1CH',
  '1 cronicas': '1CH',
  '2 crônicas': '2CH',
  '2 cronicas': '2CH',
  esdras: 'EZR',
  neemias: 'NEH',
  ester: 'EST',
  jó: 'JOB',
  jo: 'JOB',
  salmos: 'PSA',
  salmo: 'PSA',
  provérbios: 'PRO',
  proverbios: 'PRO',
  eclesiastes: 'ECC',
  cânticos: 'SNG',
  canticos: 'SNG',
  cântico: 'SNG',
  cantico: 'SNG',
  isaías: 'ISA',
  isaias: 'ISA',
  jeremias: 'JER',
  lamentações: 'LAM',
  lamentacoes: 'LAM',
  ezequiel: 'EZK',
  daniel: 'DAN',
  oséias: 'HOS',
  oseias: 'HOS',
  joel: 'JOL',
  amós: 'AMO',
  amos: 'AMO',
  obadias: 'OBA',
  jonas: 'JON',
  miquéias: 'MIC',
  miqueias: 'MIC',
  naum: 'NAM',
  habacuque: 'HAB',
  sofonias: 'ZEP',
  ageu: 'HAG',
  zacarias: 'ZEC',
  malaquias: 'MAL',
  mateus: 'MAT',
  marcos: 'MRK',
  lucas: 'LUK',
  joão: 'JHN',
  joao: 'JHN',
  atos: 'ACT',
  romanos: 'ROM',
  '1 coríntios': '1CO',
  '1 corintios': '1CO',
  '2 coríntios': '2CO',
  '2 corintios': '2CO',
  gálatas: 'GAL',
  galatas: 'GAL',
  efésios: 'EPH',
  efesios: 'EPH',
  filipenses: 'PHP',
  colossenses: 'COL',
  '1 tessalonicenses': '1TH',
  '2 tessalonicenses': '2TH',
  '1 timóteo': '1TI',
  '1 timoteo': '1TI',
  '2 timóteo': '2TI',
  '2 timoteo': '2TI',
  tito: 'TIT',
  filemom: 'PHM',
  hebreus: 'HEB',
  tiago: 'JAS',
  '1 pedro': '1PE',
  '2 pedro': '2PE',
  '1 joão': '1JN',
  '1 joao': '1JN',
  '2 joão': '2JN',
  '2 joao': '2JN',
  '3 joão': '3JN',
  '3 joao': '3JN',
  judas: 'JUD',
  apocalipse: 'REV',
};

// Book names not in Almeida (deuterocanonical/apocryphal)
// Normalized (NFD stripped): compare against lowercase, no accents
const deuterocanonical = new Set([
  'sabedoria',
  'eclesiastico',
  'macabeus',
  'tobias',
  'judite',
  'baruque',
]);

// ─── Bible XML Parser ────────────────────────────────────────────────

interface BibleData {
  [bookId: string]: {
    name: string;
    chapters: {
      [chapter: number]: {
        [verse: number]: string;
      };
    };
  };
}

function parseBibleXML(xmlPath: string): BibleData {
  const xml = readFileSync(xmlPath, 'utf-8');
  const bible: BibleData = {};

  // Extract book elements
  const bookRegex = /<book\s+id="([^"]+)"[^>]*>(.*?)<\/book>/gs;
  let bookMatch: RegExpExecArray | null;

  while ((bookMatch = bookRegex.exec(xml)) !== null) {
    const bookId = bookMatch[1];
    const bookContent = bookMatch[2];

    // Get book name
    const nameMatch = /<h>([^<]+)<\/h>/.exec(bookContent);
    const name = nameMatch ? nameMatch[1] : bookId;

    bible[bookId] = { name, chapters: {} };

    // Extract chapter elements
    const chapterRegex = /<c\s+id="(\d+)"\s*\/>(.*?)(?=<c\s+id="|\s*$)/gs;
    let chapterMatch: RegExpExecArray | null;

    // We need a different approach - let's extract verses within each chapter
    // The structure is: <c id="1"/><v id="1"/>text<ve/><v id="2"/>text<ve/>...

    // Split by chapter markers
    const chapterSplits = bookContent.split(/<c\s+id="(\d+)"\s*\/>/);

    // chapterSplits[0] = everything before first chapter (book name, etc.)
    // chapterSplits[1] = chapter number
    // chapterSplits[2] = content of that chapter (verses)
    // chapterSplits[3] = next chapter number
    // chapterSplits[4] = content of that chapter
    // etc.

    for (let i = 1; i < chapterSplits.length; i += 2) {
      const chapterNum = parseInt(chapterSplits[i], 10);
      const chapterContent = chapterSplits[i + 1] || '';

      bible[bookId].chapters[chapterNum] = {};

      // Extract verses from this chapter
      const verseRegex = /<v\s+id="(\d+)"\s*\/>(.*?)(?=<v\s+id="|<c\s+id=|$)/gs;
      let verseMatch: RegExpExecArray | null;

      while ((verseMatch = verseRegex.exec(chapterContent)) !== null) {
        const verseNum = parseInt(verseMatch[1], 10);
        let verseText = verseMatch[2] || '';

        // Remove <ve/> tags and clean up
        verseText = verseText.replace(/<ve\/>/g, '');
        verseText = verseText.replace(/\s+/g, ' ').trim();

        if (verseText) {
          bible[bookId].chapters[chapterNum][verseNum] = verseText;
        }
      }
    }
  }

  return bible;
}

// ─── Reference Parser ────────────────────────────────────────────────

interface ParsedRef {
  bookId: string;
  chapter: number;
  verses: number[];
}

function normalizeBookName(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function parseReference(ref: string): ParsedRef[] {
  const results: ParsedRef[] = [];

  // Handle multiple references separated by semicolon
  const parts = ref.split(';');
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // Try to match the pattern: "Book Chapter:Verse-Verse" or "Book Chapter:Verse, Verse-Verse"
    // Also handle "Salmo 122" (whole chapter)
    // Also handle "Lucas 1:68-79" (single book)
    // Also handle "1 Coríntios 12:3b-13" (verse suffix)
    // Also handle "Isaías 12:2-6" (psalm ref)

    // Extract the book name, chapter, and verse parts
    // Try "Book Chapter:Verse" format first
    let match = trimmed.match(/^(.+?)\s+(\d+):(.+)$/);
    if (!match) {
      // Try "Book Chapter-Verse" or "Book Chapter-Verse, Verse" (single-chapter books like Filemom)
      match = trimmed.match(/^(.+?)\s+(\d+)(?:[-–](.+))?$/);
      if (match) {
        const rawBook = match[1].trim();
        const chapter = parseInt(match[2], 10);
        const versesPart = match[3]; // could be undefined for whole chapter
        const normalized = normalizeBookName(rawBook);
        const bookId = bookMap[normalized];
        if (bookId) {
          if (!versesPart) {
            // Whole chapter: "Salmo 122"
            results.push({ bookId, chapter, verses: [] });
          } else {
            // Single chapter verse range: "Filemom 1-21"
            const verses: number[] = [];
            const vp = versesPart.trim();
            const cleanRange = vp.replace(/(\d+)[a-zA-Z]/g, '$1');
            if (cleanRange.includes('-')) {
              const rangeParts = cleanRange.split('-');
              const start = parseInt(rangeParts[0], 10);
              const end = parseInt(rangeParts[1], 10);
              for (let v = start; v <= end; v++) {
                if (!verses.includes(v)) verses.push(v);
              }
            } else {
              const v = parseInt(cleanRange, 10);
              if (!isNaN(v) && !verses.includes(v)) verses.push(v);
            }
            results.push({ bookId, chapter, verses });
          }
        }
      }
      continue;
    }

    const rawBook = match[1].trim();
    const chapter = parseInt(match[2], 10);
    const verseSpec = match[3].trim();

    const normalized = normalizeBookName(rawBook);
    const bookId = bookMap[normalized];
    if (!bookId) continue;

    // Parse verse specifications: "1-5, 18-19" or "3b-13" or "1-11, 45b"
    const verses: number[] = [];
    const verseParts = verseSpec.split(',');

    for (const vp of verseParts) {
      const vpTrimmed = vp.trim();
      // Remove verse suffixes like "45b", "3b"
      const cleanRange = vpTrimmed.replace(/(\d+)[a-zA-Z]/g, '$1');

      if (cleanRange.includes('-')) {
        const rangeParts = cleanRange.split('-');
        const start = parseInt(rangeParts[0], 10);
        const end = parseInt(rangeParts[1], 10);
        for (let v = start; v <= end; v++) {
          if (!verses.includes(v)) verses.push(v);
        }
      } else {
        const v = parseInt(cleanRange, 10);
        if (!isNaN(v) && !verses.includes(v)) verses.push(v);
      }
    }

    results.push({ bookId, chapter, verses });
  }

  return results;
}

// ─── Text Extraction ────────────────────────────────────────────────

function getVerseText(
  bible: BibleData,
  bookId: string,
  chapter: number,
  verse: number,
): string | null {
  const book = bible[bookId];
  if (!book) return null;
  const ch = book.chapters[chapter];
  if (!ch) return null;
  return ch[verse] || null;
}

function getReferenceText(bible: BibleData, ref: string): string | null {
  const parsed = parseReference(ref);
  if (parsed.length === 0) return null;

  const texts: string[] = [];
  for (const p of parsed) {
    const book = bible[p.bookId];
    if (!book) return null;

    if (p.verses.length === 0) {
      // Whole chapter
      const ch = book.chapters[p.chapter];
      if (!ch) return null;
      const allVerses = Object.keys(ch)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map((v) => ch[parseInt(v)]);
      texts.push(allVerses.join(' '));
    } else {
      const verseTexts = p.verses
        .sort((a, b) => a - b)
        .map((v) => getVerseText(bible, p.bookId, p.chapter, v))
        .filter((t) => t !== null);
      if (verseTexts.length > 0) {
        texts.push(verseTexts.join(' '));
      }
    }
  }

  return texts.length > 0 ? texts.join(' ') : null;
}

// ─── RCL Update ─────────────────────────────────────────────────────

interface RCLReading {
  type: 'first_reading' | 'psalm' | 'second_reading' | 'gospel';
  ref: string;
  text?: string;
}

interface RCLDayEntry {
  date: string;
  season: string;
  weekOfSeason: number;
  dayName: string;
  readings: RCLReading[];
  collect?: string;
  holyDay?: boolean;
}

interface RCLYearData {
  cycle: string;
  year: number;
  liturgicalYear: number;
  entries: RCLDayEntry[];
}

function updateRCLWithTexts(bible: BibleData, filePath: string) {
  const data = JSON.parse(readFileSync(filePath, 'utf-8')) as RCLYearData;
  let foundCount = 0;
  let missingCount = 0;
  let deuterocanonicalCount = 0;

  for (const entry of data.entries) {
    for (const reading of entry.readings) {
      if (reading.text) continue; // Already has text

      const ref = reading.ref;
      // Check if it's deuterocanonical
      const bookName = ref.split(/\s+/)[0]?.toLowerCase() || '';
      if (deuterocanonical.has(bookName) || deuterocanonical.has(normalizeBookName(bookName))) {
        deuterocanonicalCount++;
        continue;
      }

      const text = getReferenceText(bible, ref);
      if (text) {
        reading.text = text;
        foundCount++;
      } else {
        // Try without verse mapping - maybe we need to handle "Isaías 12:2-6" differently
        missingCount++;
      }
    }
  }

  writeFileSync(filePath, JSON.stringify(data, null, 2));
  return { foundCount, missingCount, deuterocanonicalCount };
}

// ─── Main ───────────────────────────────────────────────────────────

function main() {
  // Antes vivia em /tmp/por-almeida.xml — um diretório efêmero. Isso foi a
  // causa raiz de perder os textos ARC silenciosamente: quando o arquivo
  // sumia (reboot, sessão nova), regenerar os JSONs não tinha como
  // repopular o texto, e ninguém percebia (ver ROADMAP > Débito técnico).
  // Agora vive dentro do repo, então sempre vai estar disponível.
  const bibleXmlPath = resolve(__dirname, 'data/por-almeida.usfx.xml');
  const rclDir = resolve(__dirname, '../src/data/rcl');

  if (!existsSync(bibleXmlPath)) {
    console.error(`❌ Arquivo não encontrado: ${bibleXmlPath}`);
    console.error(
      '   Baixe com: curl -o ' +
        bibleXmlPath +
        ' https://raw.githubusercontent.com/seven1m/open-bibles/master/por-almeida.usfx.xml',
    );
    process.exit(1);
  }

  console.log('📖 Parseando Bíblia Almeida...');
  const bible = parseBibleXML(bibleXmlPath);
  console.log(`   ${Object.keys(bible).length} livros carregados`);

  const cycles = ['A', 'B', 'C'];
  let totalFound = 0;
  let totalMissing = 0;
  let totalDeut = 0;

  for (const cycle of cycles) {
    const filePath = resolve(rclDir, `cycle-${cycle}.json`);

    // Read the RCL data (the file format from generate-rcl-data.ts is a different
    // structure with cycle/seasons, not the RCLYearData format)
    const raw = JSON.parse(readFileSync(filePath, 'utf-8'));

    // The generated files have format: { cycle, seasons: { advent: [...], ... } }
    const seasons = raw.seasons as Record<string, RCLDayEntry[]>;
    let found = 0;
    let missing = 0;
    let deut = 0;

    for (const season of Object.keys(seasons)) {
      const entries = seasons[season];
      for (const entry of entries) {
        for (const reading of entry.readings) {
          if (reading.text) continue;

          const ref = reading.ref;
          const firstWord = normalizeBookName(ref.split(/\s+/)[0] || '');
          if (deuterocanonical.has(firstWord)) {
            deut++;
            reading.text = ''; // Mark as empty but not missing
            continue;
          }

          const text = getReferenceText(bible, ref);
          if (text) {
            reading.text = text;
            found++;
          } else {
            missing++;
          }
        }
      }
    }

    writeFileSync(filePath, JSON.stringify(raw, null, 2));
    console.log(
      `   Ano ${cycle}: ${found} encontrados, ${missing} não encontrados, ${deut} deuterocanônicos`,
    );
    totalFound += found;
    totalMissing += missing;
    totalDeut += deut;
  }

  console.log(`\n📊 Resumo:`);
  console.log(`   ${totalFound} textos bíblicos inseridos`);
  console.log(`   ${totalMissing} referências não encontradas`);
  console.log(`   ${totalDeut} deuterocanônicas (ignoradas)`);
}

main();
