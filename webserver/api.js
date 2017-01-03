const fs = require('fs');
const http = require('http');



http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/JSON'});

    const data = {
        firstName: 'Victor',
        lastName: 'Longon'
    };

    res.end(JSON.stringify(data));
    
}).listen(5000, '127.0.0.1');