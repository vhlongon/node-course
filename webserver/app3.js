const http = require('http');
const fs = require('fs');

// create a server, send a response with 200 ok code, MIME type of text/html 
// but now we use fs to require the index.html file and send it as the response instead of a string
http.createServer((req, res) => {

    // res is also a stream
    res.writeHead(200, {'Content-Type': 'text/html'});
    // lets make it better using stream instead of readFileSync
    // and since we use a stream we can pipe and send the content of it straitgh to the response
    // and since we use streams we receive one chunk at a time
    fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);
    
// listen accept to parameters, the port and the address
}).listen(5000, '127.0.0.1');