// this a simple model to show how node event emitter works
// what it basically is, is a object where you push properties into and those contain
// an array of function, which then we listen to when that property is used.
class Emitter {
    constructor() {
        this.events = {};
    }

    on(type, listener) {
        // check if already have the proporty on the emmiter object, if not we create one and give it an empty array as value
        // otherwise we just push the callback function on.on() to it
        this.events[type] = this.events[type] || [];
        this.events[type].push(listener);
    }

    emit(type) {
        // here we check if the propety sent existsa and if it does we loop over it and execute all functions stored in it 
        if(this.events[type]) {
            this.events[type].forEach(listener => listener())
        }
    }
}

module.exports = Emitter;