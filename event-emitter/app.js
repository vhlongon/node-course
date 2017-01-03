const Emitter = require('./emitter');
const {events} = require('./config');

const emtr = new Emitter();

emtr.on(events.GREET, () => console.log('Somewhere, someone said hello.'));

emtr.on(events.GREET, () => console.log('A greeting ocurred.'));

console.log('Hello!'),

emtr.emit(events.GREET);