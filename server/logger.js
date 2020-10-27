const EventEmitter = require('events');

var url = 'http://mylogger.io.log';

class Logger extends EventEmitter {
  log(message) {

    // Send and HTTP request
    console.log(message);

    // Raise an event
    this.emit('messageLogged', {
      id: 1,
      url: 'http://'
    });
  }
}

module.exports = Logger;
