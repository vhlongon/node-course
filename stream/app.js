const fs = require('fs');

// highWaterMark is an option that sets the size of the stream chunk, 
// in this case 1024 (1024 bits in one kilobite) is for a KB times 16, we say we want 16 KB large chunks
const readable = fs.createReadStream(__dirname + '/samuel.txt', {encoding: 'utf8', highWaterMark: 16 * 1024});

// create a writable stream
const writable = fs.createWriteStream(__dirname + '/samuel-copy.txt');

readable.on('data', chunk => {
    console.log(chunk.length);
    // we write each buffer chunk to the file given to the writable stream
    writable.write(chunk);
});
