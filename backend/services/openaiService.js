const fs = require('fs');
const pdfParse = require('pdf-parse');
// In production replace this with OpenAI / OCR integration. This stub performs basic extraction heuristics.

async function extractTextFromPdf(path){
  const data = fs.readFileSync(path);
  try {
    const parsed = await pdfParse(data);
    if(parsed.text && parsed.text.trim().length>20) return parsed.text;
  } catch(e){}
  return '';
}

async function processApolice(filepath){
  const text = await extractTextFromPdf(filepath);
  const result = {
    nome_cliente: '',
    cnpj: '',
    numero_apolice: '',
    seguradora: '',
    vigencia_inicio: '',
    vigencia_fim: '',
    limite_maximo_garantia: '',
    email: ''
  };
  const cnpjMatch = text.match(/(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})/);
  if(cnpjMatch) result.cnpj = cnpjMatch[1];
  const numMatch = text.match(/Número da Apólice\s*[:\-\s]*([A-Za-z0-9\-\/_]+)/i) || text.match(/Número da Apólice[:\s]*([0-9\-]+)/i);
  if(numMatch) result.numero_apolice = numMatch[1];
  const nomeMatch = text.match(/SEGURADO\s*:?.*\n\s*(.+)/i);
  if(nomeMatch) result.nome_cliente = nomeMatch[1].trim();
  if(!result.nome_cliente) result.nome_cliente = 'Cliente Sem Nome';
  return result;
}

module.exports = { processApolice };
