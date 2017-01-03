const http = require('http');

// create a server, send a response with 200 ok code, MIME type of text/plain and the content of 'Hello world'
http.createServer((req, res) => {

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello world\n');
    
// listen accept to parameters, the port and the address
}).listen(5000, '127.0.0.1');