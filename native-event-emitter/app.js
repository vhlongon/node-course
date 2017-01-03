const EventEmitter = require('events');
const util = require('util');

console.log(EventEmitter);

// this is the ES5 version
function Greetr1() {
    // this line makes sure we get not only the methods attached to the prototype,
    // but also all the properties attached to 'this'
    // this is the same as what E6 does inside the constructor with super();
    EventEmitter.call(this);
    this.greeting = 'Hello there';
}

// the utils library makes this 'inherits' method available which makes easier to link 2 different objects prototypes
// Here we make our constructor Greetr inheris from node native event emitter object
util.inherits(Greetr1, EventEmitter);

Greetr1.prototype.greet = function(data) {
    console.log(this.greeting + ', ' + data + '!');
    // passing data to the event object
    this.emit('greet', data);
}

const greeter1 = new Greetr1();

greeter1.on('greet', (data) => console.log('someone greeted!: ', data));

// get the number of listeners on a event object
console.log(greeter1.listenerCount('greet'));

greeter1.greet('nice lady');

greeter1.greet('nice guy');


'use strict';

// this is the ES6 class version
class Greetr2 extends EventEmitter {
    constructor(){
        // get all properties set to this to the newly created object, 
        // even those comming from EventEmitter
        super();
        this.greeting = 'Hello there';
    }

    greet(data) {
        console.log(`${this.greeting}, ${data} !`);
        // passing data to the event object
        this.emit('greet', data);
    }
}

const greeter2 = new Greetr2();
console.log(`\n`);

greeter2.on('greet', (data) => console.log('someone greeted!: ', data));

// get the number of listeners on a event object
console.log(greeter2.listenerCount('greet'));

greeter2.greet('Mr. Lova Lova');