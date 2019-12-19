const EventEmitter = require('events');

class ProgressEmitter extends EventEmitter {}
const prog = new ProgressEmitter();

export default prog;
