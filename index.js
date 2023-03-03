const express = require('express')
const app = express()
const port = 3000
var PDFDocument = require('pdfkit');
const { jsPDF } = require('jspdf');
var fs = require('fs');
const { exit } = require('process');
// const fontPath = require('./fonts/Amiko-Bold.afm');
// console.log(fontPath);
// process.exit()

function barcodeToPDF(adress,{info}){
    // create a document and pipe to a blob
    var doc = new PDFDocument({
        autoFirstPage:false,
        size: [302, 75]
    });
    doc.addPage({
        margin:2,
        //layout : 'landscape',
            size: [302, 75] });
    try {
    
    let adress ='ĞMerkez efendi mh. 3819 sk. No:45/7 Oyit Apartman Yunusemre/Manisassdgfjs Apartman Apartmaasdn sdasghfdw';
    let info = 'Alıcı : Mirza KARAHAN\n Telefon : 0534 780 9050';
    if(adress.length < 104){
      adress = adress.padEnd(104," ")
    }
    if(info.length < 104) {
      info = info.padEnd(104," ")
    }
    // console.log(adress.length);
    // console.log(info.length);
    // process.exit();
    const lorem = adress+info;//sınır 104
    
      if(lorem.length < 209) {
        doc.fontSize(11.7);
        doc.font('Times-Bold')
        doc.text(lorem, {
        width: 300,
        margin:0,
        columns: 2, 
        columnGap: 15,
        height: 75
      })
      
      
        doc.pipe(fs.createWriteStream('output.pdf'));
        //codebar
        doc.end();
        console.log('Başarılı')
      } else{
        throw new Error('Girilen text 209 karakterden küçük olmalı')
      }
    } catch (error) {
      console.log(error)
    }
    
}

barcodeToPDF("asd",{"name":"Ahmet","surname":"Birsen","phone":"05369562352"})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})