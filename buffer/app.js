// you dont even need to require it, since it is available eerywhere on the global scope in Node
const buf = new Buffer('Hello', 'utf8');

// the raw  buff in hexidecimal notations
console.log(buf);
// convert it back to string
console.log(buf.toString());

// or convert it to a JSON object
console.log(buf.toJSON());

// a buffer is like an array so we can access a specific index value (raw binary data)
console.log(buf[2]);

// overwrite the first 2 characters
buf.write('wo');
console.log(buf.toString());


//////////////////////////////////////////

// ES6 typed arrays

// byte is 8 bits - this represents byte data - 8 times 8 bits = 64 bits 
const byte = new ArrayBuffer(8);
// this array deals with the binary data on the buffer above - this changes the structure of the buffer
// since this 32bits bases array we can store 2 numbers in this array
const view = new Int32Array(byte);

view[0] = 5;
view[1] = 15;

console.log(view);