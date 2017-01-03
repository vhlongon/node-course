const http = require('http');
const fs = require('fs');

// create a server, send a response with 200 ok code, MIME type of text/html 
// but now we use fs to require the index.html file and send it as the response instead of a string
http.createServer((req, res) => {

    res.writeHead(200, {'Content-Type': 'text/html'});
    let html = fs.readFileSync(__dirname + '/index.html', 'utf8');
    const message = 'Hello World...';
    // using a very simple template like homebrew 
    html = html.replace('{Message}', message);
    res.end(html);
    
// listen accept to parameters, the port and the address
}).listen(5000, '127.0.0.1');