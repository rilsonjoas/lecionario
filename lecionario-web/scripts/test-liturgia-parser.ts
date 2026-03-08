
import * as cheerio from 'cheerio';
import * as fs from 'fs';

async function testParser() {
  const html = fs.readFileSync('liturgia_day.html', 'utf-8');
  const $ = cheerio.load(html);

  const readings: any[] = [];
  
  // The content is in div#content -> article -> p / h3 structure
  // But looking at the file, the text is often just inside <p> tags or text nodes after headers.
  // The structure observed:
  // <h3>Missa</h3> where readings start.
  // Then "LEITURA I ..."
  
  // Let's try to get all text from the "Missa" section
  // Find the 'Missa' header
  const missaHeader = $('h3:contains("Missa")');
  console.log('Missa Header found:', missaHeader.length > 0);
  
  if (missaHeader.length === 0) return;

  // Function to clean text
  const clean = (text: string) => text.replace(/\s+/g, ' ').trim();

  // Strategy: Iterate over siblings after Missa header
  let currentType = '';
  let currentRef = '';
  let currentText = '';
  
  // In the file, the readings seems to be inside a <p> tag?
  // Line 160: ... LEITURA I ... <br> ... <br> ...
  
  // It seems mostly in one big container or spread across.
  // The file view showed:
  // <h3>Missa</h3> <p> ... Antífona ... <br><br> LEITURA I ... </p>
  
  const contentContainer = missaHeader.nextAll();
  let fullText = '';
  
  contentContainer.each((i, el) => {
    fullText += $(el).text() + '\n';
  });
  
  // Actually, let's look at the parent. 
  // It might be better to just grab the whole text of the article and regex it,
  // since the HTML structure is very loose (<br> based).
  
  const articleText = $('article').text();
  // Find where "Missa" starts
  const missaIndex = articleText.indexOf('Missa');
  if (missaIndex === -1) {
    console.log('Cannot find "Missa" in text');
    return;
  }
  
  const missaText = articleText.substring(missaIndex);
  
  console.log('--- EXTRACTED TEXT PREVIEW ---');
  console.log(missaText.substring(0, 500));
  console.log('------------------------------');

  // Regex patterns
  // LEITURA I (anos pares)  2 Sam 5, 1-7.10
  // LEITURA I (anos ímpares) ...
  // LEITURA ...
  
  // We need to split by "LEITURA", "SALMO", "EVANGELHO", "ALELUIA"
  
  const keywords = [
    { key: 'first_reading', pattern: /LEITURA\s+I\b/i },
    { key: 'second_reading', pattern: /LEITURA\s+II\b/i },
    { key: 'reading', pattern: /LEITURA\b/i }, // Generic
    { key: 'psalm', pattern: /SALMO\s+RESPONSORIAL/i },
    { key: 'gospel', pattern: /EVANGELHO/i },
    { key: 'alleluia', pattern: /ALELUIA/i }
  ];

  // This is tricky because "LEITURA I" matches "LEITURA".
  // And the content is unstructured.
  
  // Improved approach: 
  // Get the HTML of the section and split by <br> might be safer to preserve structure?
  // But cheerio `text()` joins with empty string usually.
  
  // Let's try parsing the `html()` of the container after Missa.
  // But wait, in the file view, line 160 is ONE HUGE LINE with <br>s?
  // "Antífona de entrada ... <br> ... LEITURA I ... <br>"
  
  // If it's one p tag, accessing proper text is hard.
  
  // Let's look at how cheerio parses line 160.
  // It seems line 160 starts after <h3>Missa</h3><p>&nbsp;</p> text nodes...
  
  // Let's try to find the node containing "LEITURA I"
  const leituraNode = $('*:contains("LEITURA I")').last();
  console.log('Node with "LEITURA I":', leituraNode.prop('tagName'));
  
  // If it's a div or p, getting its html and splitting by <br> is best.
  if (leituraNode.length > 0) {
    const htmlContent = leituraNode.html() || '';
    const lines = htmlContent.split(/<br\s*\/?>/i).map(l => $(`<div>${l}</div>`).text().trim()).filter(l => l.length > 0);
    
    console.log(`Found ${lines.length} lines.`);
    
    // State machine
    let state = 'IDLE';
    let buffer = '';
    let currentReading: any = {};
    
    const saveReading = () => {
      if (currentReading.type && currentReading.text) {
        readings.push({...currentReading});
      }
      currentReading = {};
    };

    for (const line of lines) {
      // Check for headers
      if (line.match(/^LEITURA I/i)) {
        saveReading();
        state = 'READING_1';
        currentReading.type = 'first_reading';
        currentReading.reference = line.replace(/^LEITURA.*?\)\s*/i, '').trim(); // Remove "LEITURA I (anos pares)"
        currentReading.text = '';
      } else if (line.match(/^LEITURA II/i)) {
         saveReading();
        state = 'READING_2';
        currentReading.type = 'second_reading';
        currentReading.reference = line.replace(/^LEITURA.*?\)\s*/i, '').trim();
        currentReading.text = '';
      } else if (line.match(/^SALMO RESPONSORIAL/i)) {
        saveReading();
        state = 'PSALM';
        currentReading.type = 'psalm';
        currentReading.reference = line.replace(/^SALMO RESPONSORIAL\s*/i, '').trim();
        currentReading.text = '';
      } else if (line.match(/^EVANGELHO/i)) {
        saveReading();
        state = 'GOSPEL';
        currentReading.type = 'gospel';
        currentReading.reference = line.replace(/^EVANGELHO\s*/i, '').trim();
        currentReading.text = '';
      } else if (line.match(/^ALELUIA/i)) {
         // Aleluia is usually short, maybe we skip it or store as separate?
         // For now, let's skip/reset as it's not a reading per se, but an acclamation.
         saveReading();
         state = 'ALLELUIA';
      } else if (line.match(/^Oração/i) || line.match(/^Antífona/i)) {
        saveReading();
        state = 'IDLE';
      } else {
        // Content
        if (state !== 'IDLE' && state !== 'ALLELUIA') {
          if (currentReading.text) currentReading.text += '\n' + line;
          else currentReading.text = line;
        }
      }
    }
    saveReading(); // Last one
  }

  console.log('Parsed Readings:', JSON.stringify(readings, null, 2));
}

testParser();
