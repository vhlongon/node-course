// this is the core V8 module to access files on the OS
const fs = require('fs');

//__dirname is always available in any node modules
// readFileSync makes sure to wait until the buffer is filled before the V8 hits the next line of code
// use this if you want the program to until when the file is finished reading
const greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8');

// this on the other hand will run the callback (async) once the file has finished reading - non-blocking

// error-first callback:  callbacks take an error object as their first parameter
// null if no error, otherwise will contain an object defining the error.
// This is a standard so we know in what order to place our parameters for our callbacks
const greet2 = fs.readFile(__dirname + '/greet.txt', 'utf8', (err, data) => console.log(`Data comming for the async callback: ${data}`));

console.log(greet);