const fs = require('fs');
// this is a native lib in node to handle .gzip files
const zlib = require('zlib');

const readable = fs.createReadStream(__dirname + '/bacon.txt');

const writable = fs.createWriteStream(__dirname + '/bacon-copy.txt');

// this is used to create a compress file, but is also a readable/writable stream
let gzip = zlib.createGzip();

const compressed = fs.createWriteStream(__dirname + '/bacon.txt.gz');

// instead of listening on('data') and explicitly run writable.write(chunk)
// we do that with pipe, which is faster and easier to write
readable.pipe(writable);

// here we chain pipes, because we first write to gzip than read from it to output a compressed file
readable.pipe(gzip).pipe(compressed);
