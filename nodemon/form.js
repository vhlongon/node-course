const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 5000;

// create application/x-www-form-urlencoded parser,
// which is the default Content-type when posting data from a form in html
const urlencodedParser = bodyParser.urlencoded({extended: false});

//body-parser also has a built-in function to parse JSON data
// comming from the post request
const jsonParser = bodyParser.json();


app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

// fires and a post request is issed from '/person';
// by using post with the extra parameter (instead of .use), 
// we make sure that the request in properly formated  
app.post('/person', urlencodedParser, (req, res) => {
    res.send('thank you!');
    // the body-parser middleware create a 'body' object on the request 
    // that containing the data sent from the form
    console.log(req.body.firstname);
    console.log(req.body.lastname);
});

// here we test parsing the data sent from the form to json
app.post('/personjson', jsonParser, (req, res) => {
    res.send('Thank you for the JSON data!');
    console.log(req.body);
});

app.get('/form', (req, res) => {
    res.render('form');
});

app.listen(port);

