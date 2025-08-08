const express = require('express');
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'backend/uploads/' });
const { processApolice } = require('../services/openaiService');
const { fillDocxFromTemplate } = require('../services/docxService');
const router = express.Router();

router.post('/', upload.single('apolice'), async (req,res)=>{
  try {
    const filePath = req.file.path;
    const extracted = await processApolice(filePath);
    const generatedPath = await fillDocxFromTemplate(extracted, path.join(__dirname, '..', 'templates', 'Novo Modelo - Akad.docx'));
    res.json({ success:true, fields: extracted, docx: generatedPath });
  } catch(err){
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
