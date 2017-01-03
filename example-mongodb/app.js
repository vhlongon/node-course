const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// create Content-type parser when posting data from a form in html
const urlencodedParser = bodyParser.urlencoded({extended: false});
//body-parser  built-in function to parse JSON data
const jsonParser = bodyParser.json();

// set public path
app.use('/assets', express.static(__dirname + '/public'));

// set the template engine
app.set('view engine', 'ejs');

// set routes
app.get('/form', (req, res) => res.render('form') );
app.get('/', (req, res) => res.render('index') );
// populate template with query string on url, like 'localhost:5000?id=Victor'
app.get('/person/', (req, res) => res.render('person', {ID: req.query.id || 'no person'}) );
// populate template with routing, i.e. like `localhost:5000/person/Victor
app.get('/person/:id', (req, res) =>   res.render('person', {ID: req.params.id}) );

// normal form post request (encode the body with bodyParser)
app.post('/person', urlencodedParser, (req, res) => {
    res.send('Thank you for the data!');
    console.log(req.body);
});
// ajax form post request, parse data to json
app.post('/personjson', jsonParser, (req, res) => console.log(req.body) );


// MONGO DB STUFF

// Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library
// Either connect a promise library, like bluebird:
mongoose.Promise = require('bluebird');

//or use native promise
//mongoose.Promise = global.Promise;
    

// //connect to our test mongo db on the cloud (using mongodb lab)
mongoose.connect('mongodb://test:test@ds151008.mlab.com:51008/nodecoursemongotest');

// // extract this constructor so we can define the structure of our data
const Schema = mongoose.Schema;

// // Schema is how the objects in the db will look like
const personSchema = new Schema({
    firstname: String,
    Lastname: String,
    address: String
    
});

//  we generate a constructor to generate objects using  a schema
const Person = mongoose.model('Person', personSchema);

//  create a Person object
const victor = Person({
    firstname: 'Victor',
    Lastname: 'Longon',
    address: 'Trekungagatan 16'
});

//  create a Person object
const elise = Person({
    firstname: 'Elise',
    Lastname: 'Longon-Jonson',
    address: 'Trekungagatan 16'
});

[elise, victor].forEach((person, i) => person.save(err => err ? () => { throw err } : console.log('person saved')) );

Person.find({}, (err, people) => err ?  () => { throw err } : console.log(people) );

app.listen(port);

