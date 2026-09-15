# Guia e Pacote de Submissão para Google Play Store
**Aplicativo:** Lecionário (Narniano)  
**Package ID:** `com.narniano.lecionario` (ou configurado no `app.json`)  
**Data da última revisão:** Setembro / 2026

---

## 1. Metadados Principais (Google Play Console)

### 1.1 Nome do Aplicativo (Título)
> Limite: 30 caracteres
```text
Lecionário: Oração e Bíblia
```
*(Alternativa: `Lecionário Litúrgico`)*

### 1.2 Descrição Curta (Short Description)
> Limite: 80 caracteres
```text
Leituras bíblicas diárias, orações e reflexões no ritmo do ano litúrgico cristão.
```

### 1.3 Descrição Completa (Full Description)
> Limite: 4.000 caracteres

```text
O Lecionário é um guia devocional diário que conecta sua espiritualidade pessoal ao ritmo milenar da Igreja histórica e do Ano Cristão.

Completamente offline, livre de distrações e desenhado com cuidado tipográfico, o Lecionário oferece uma experiência de oração e leitura bíblica sem ruídos: sem anúncios, sem rastreamento e sem necessidade de conexão constante com a internet.

PRINCIPAIS RECURSOS:

• ANO LITÚRGICO COMPLETO
Acompanhe os tempos litúrgicos históricos: Advento, Natal, Epifania, Quaresma, Páscoa, Pentecostes e Tempo Comum. As cores, saudações, coletas e salmos adaptam-se diariamente à estação da igreja.

• DEVOCIONAL DIÁRIO ESTRUTURADO
Cada dia traz uma ordem litúrgica completa para seu momento com Deus:
- Invocações e Saudações Iniciais;
- Leituras Bíblicas completas (Antigo Testamento, Salmo, Epístola e Evangelho);
- Citações dos Pais da Igreja, reformadores e teólogos clássicos (Agostinho, Calvino, Lutero, Spurgeon, C.S. Lewis, Henri Nouwen e outros);
- Meditação e Reflexão bíblica;
- Oração Diária e Coleta do Dia;
- Bênção Litúrgica de Encerramento.

• OFFLINE-FIRST REAL
Todo o conteúdo devocional, textos litúrgicos e calendário já vêm integrados ao aplicativo. Funciona em modo avião, em retiros ou sem sinal de operadora.

• MODO ESCURO E CORES LITÚRGICAS
Design sóbrio que respeita o ambiente de oração, com suporte a tema escuro profundo e adaptação suave às paletas litúrgicas (Roxo, Branco, Verde, Vermelho).

• FAVORITOS E HISTÓRICO
Guarde as coletas, orações ou reflexões que mais tocaram seu coração para reler sempre que desejar.

• ACESSIBILIDADE E GESTOS
Navegue entre os dias com gestos fluidos de deslizar, navegação por calendário com visualização de cores litúrgicas e controle de tamanho de fontes.

• PRIVACIDADE ABSOLUTA
O Lecionário respeita seu momento de oração. Não coletamos dados pessoais, não exibimos anúncios e não vendemos informações de navegação.

Cultive uma vida de oração constante e enraizada nas Escrituras. Experimente o Lecionário hoje mesmo.
```

### 1.4 Categoria do Aplicativo
- **Categoria Principal:** Livros e referências (ou *Estilo de vida*)
- **Tags recomendadas:** Bíblia, Oração, Religião, Devocional, Cristianismo, Espiritualidade.

---

## 2. Formulário de Segurança dos Dados (Data Safety)

O Google Play exige a declaração de quais dados são coletados e compartilhados. Como o Lecionário é **offline-first e anônimo**, a declaração é mínima:

| Pergunta no Console | Resposta | Justificativa / Detalhe |
|---|---|---|
| **O app coleta ou compartilha dados do usuário?** | **Sim** (Apenas se o Sentry estiver ativo para relatórios de erro anônimos) | Diagnóstico e logs de travamento anônimos. |
| **Todos os dados coletados são criptografados em trânsito?** | **Sim** | Todo envio de telemetria de erro usa HTTPS/TLS. |
| **Os usuários podem solicitar a exclusão dos seus dados?** | **Sim / Não aplicável** | Nenhuma conta ou dado pessoal identificável é armazenado em servidor próprio. |
| **Categorias de Dados Coletados:** | | |
| *Dados Pessoais (Nome, Email, etc.)* | **Não** | O app não requer conta nem login. |
| *Localização* | **Não** | Nenhuma permissão de GPS/rede é solicitada. |
| *Informações Financeiras* | **Não** | Sem compras in-app nem pagamentos integrados. |
| *Saúde e Atividades* | **Não** | Não se aplica. |
| *Mensagens e Fotos* | **Não** | Sem acesso a arquivos/galeria do usuário. |
| *Diagnóstico (Crash logs / Desempenho)* | **Sim (Opcional se Sentry configurado)** | **Finalidade:** Análise e correção de falhas do app.<br>**Coletado efemeramente:** Sim.<br>**Vinculado ao usuário:** Não (Anônimo). |

> **Nota:** Se a versão de lançamento estiver com Sentry desabilitado ou mockado, a resposta pode ser **"Não, o app não coleta dados de usuários"**.

---

## 3. Questionário IARC (Classificação Indicativa)

Preenchimento do questionário de classificação indicativa global:

- **Endereço de e-mail:** contato do mantenedor / Narniano.
- **Categoria:** Referência, Notícias ou Educacional (ou *Utilidades*).
- **Perguntas de Conteúdo:**
  - *O app contém material violento?* **Não**
  - *O app contém sexualidade ou nudez?* **Não**
  - *Linguagem ofensiva?* **Não**
  - *Substâncias controladas (drogas/álcool)?* **Não**
  - *Permite comunicação entre usuários (chat/fóruns)?* **Não**
  - *Compartilha localização física com outros usuários?* **Não**
  - *Permite compras de bens digitais?* **Não**
- **Resultado Esperado:** Classificação **Livre** (Brasil) / **PEGI 3** (Europa) / **Everyone** (ESRB).

---

## 4. Checklist de Recursos Gráficos e Imagens

Prepare estes arquivos para upload no Google Play Console:

| Ativo | Dimensões | Formato | Observações |
|---|---|---|---|
| **Ícone do App** | 512 x 512 px | PNG (32 bits com canal alfa) | Máx. 1 MB. Sem cantos arredondados (o Google aplica a máscara). |
| **Imagem de Destaque (Feature Graphic)** | 1024 x 500 px | JPG ou PNG (24 bits sem transparência) | Exibida no topo da página do app na Play Store. |
| **Capturas de Tela (Telefone)** | Mín. 2 capturas (recomendado 4 a 6) | Mín. 1080x1920 (ou proporção 9:16 / 16:9) | Mostrar: Tela Inicial (Devocional), Calendário Litúrgico, Leitura Bíblica, Favoritos e Modo Escuro. |
| **Capturas de Tela (Tablet 7" e 10")** | Opcional / Recomendado | Mín. 1080p | Layout adaptável em telas maiores. |

---

## 5. URL da Política de Privacidade e Suporte

- **URL da Política de Privacidade:** `https://lecionario.vercel.app/privacidade` (ou domínio oficial de produção).
- **URL dos Termos de Uso:** `https://lecionario.vercel.app/termos`
- **E-mail de Suporte:** email de suporte para os usuários na Play Store.
- **Site institucional:** `https://lecionario.vercel.app`

---

## 6. Template de Notas de Lançamento (Release Notes)

Ao enviar o AAB (`app-release.aab`) para a faixa de Produção ou Teste Fechado:

```text
pt-BR
Versão Inicial 1.0.0 do Lecionário:
• Ano Litúrgico completo com cores e estações integradas.
• Devocionais diários com leituras bíblicas, orações, salmos e coletas.
• Citações dos Pais da Igreja e teólogos clássicos.
• Funcionamento 100% offline, sem anúncios e sem rastreamento.
• Tema escuro e suporte a gestos para navegação diária.
```
