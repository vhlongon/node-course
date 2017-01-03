const fs = require('fs');
const http = require('http');
const stream = require('stream');

class MyTransform extends stream.Transform {
  _transform(chunk, enc, cb) {
    this.push(chunk.toString().replace('{Message}', 'Hello World'))
    cb();
  }
};

http.createServer((req, res) => {

    if (req.url === '/') {
        fs.createReadStream(__dirname + '/index.html').pipe(new MyTransform()).pipe(res);
    } else if (req.url === '/api') {
        res.writeHead(200, {'Content-Type': 'application/JSON'});
                     const data = {
            firstName: 'Hello',
            lastName: 'World'
        };
        res.end(JSON.stringify(data));
    } else  {
        res.writeHead(404);
        res.end();
    }
    
}).listen(5000, '127.0.0.1');