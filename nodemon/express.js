const express = require('express');

// this call the exported createApplication function exported from express
// express takes care of the boilerplate code  for creating a webserver:
//  http.createServer((req, res) => { ... });
const app = express();

// with we pass a PORT environment variable we use it to listen to our express app server
// otherwise it defaults to 5000;
const port = process.env.PORT || 5000;

// we use express use to connect the built-in middleware for serving static files
// in this case every time there is a request to '/assets' for any static files
// the server will look in the local 'public folder
app.use('/assets', express.static(__dirname + '/public'));

// we can also apply a middleware to match a url parameter
app.use('/', (req, res, next) => {
    console.log(`Request Url: ${req.url}`);
    // this is the callback provided by express, which means:
    // run the next middleware
    next();
});

// express can use a installed template engine, in this case we use ejs
// but we could also use handlebars, pug, jade, etc
// when set a template engine express will look for the template files inside a /views folder on the root of the project
app.set('view engine', 'ejs');

// going to /ejx we render the views/index.ejs and send it as response
app.get('/ejs', (req, res) => {
    // the default folder is views/ and since we specify above that we use ejs,
    // we don't need also to write the extension here
    res.render('index');
});

// we test passing some data to ejs template, but by getting the url parameter instead
// we should get the data but hitting http://localhost:5000/personejs?id=victor for this example
// if no query is passed we default it to 'no person'
app.get('/personejs/', (req, res) => {
    console.log(req.params)
    res.render('person', {ID: req.query.id || 'no person'});
});

// express respond to a get request, instead of handling with:
// req.url === '/', etc
app.get('/', (req, res) => {
        //  express trues to guess which Content-type to set based on the response content
    res.send(`
        <html>
            <head>
                <link href=assets/styles.css type=text/css rel=stylesheet />
            </head>
            <body>
                <h1>Hello World</h1>
            </body>
        </html>`
    );
});

app.get('/api', (req, res) => {
    // express takes care of stringifying the JSON
    res.json({firstName: 'Hello', lastName: 'World'});
});

// basic routing, interpolate the value of localhost/person/XXX on the response
app.get('/person/:id', (req, res) => {
    // any parameters written on the url are available on express on req.params object
    res.send(`
                <html>
                    <head></head>
                    <body>
                        <h1>Hello ${req.params.id}</h1>
                    </body>
                </html>
            `.trim());
});

app.get('/person', (req, res) => {
        // any parameters written on the url are available on express on req.params object
    res.send(`
                <html>
                    <head></head>
                    <body>
                        <h1>Hello no person :)</h1>
                    </body>
                </html>
            `.trim());
});

app.listen(port);

