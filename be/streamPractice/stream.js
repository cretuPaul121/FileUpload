const fs = require('fs');
const path = require('path');

const fullPath = path.join(__dirname, 'Wladston Ferreira Filho - Computer Science Distilled_ Learn the Art of Solving Computational Problems-Code Energy LLC (2017).pdf');


const dataStream = fs.createReadStream(fullPath);
console.log(dataStream);

// dataStream.on('data', (chunk) => {
//     console.log('receivedChunk ' + chunk + ' of size ' + chunk.length);
// })

// dataStream.on('end', () => {
//     console.log('finished reading');
// })