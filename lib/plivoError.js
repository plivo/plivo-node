// Generic Plivo Error
function PlivoError(msg) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.message = (msg || '') + '\n';
  this.name = 'PlivoError';
}
PlivoError.prototype = Error.prototype;

module.exports = PlivoError;