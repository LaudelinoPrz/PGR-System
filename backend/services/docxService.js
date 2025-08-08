const fs = require('fs');
const path = require('path');
// This implementation writes a simple docx-like text file placeholder.
// Replace with docx-templates usage to preserve full formatting.

async function fillDocxFromTemplate(fields, templatePath){
  const outDir = path.join(__dirname, '..', 'storage');
  if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive:true });
  const outPath = path.join(outDir, `PGR_${fields.cnpj || 'noCNPJ'}_${Date.now()}.docx`);
  const contents = [
    'PGR Gerado - Versão de Teste',
    `Nome: ${fields.nome_cliente || ''}`,
    `CNPJ: ${fields.cnpj || ''}`,
    `Apólice: ${fields.numero_apolice || ''}`,
    `Vigência: ${fields.vigencia_inicio || ''} a ${fields.vigencia_fim || ''}`,
    '',
    'OBS: Substitua docxService com geração real de .docx usando docx-templates.'
  ].join('\n');
  fs.writeFileSync(outPath, contents);
  return outPath;
}

module.exports = { fillDocxFromTemplate };
