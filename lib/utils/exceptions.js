var PlivoRestError = require('./restException');
var NotAcceptableException =  require('./notAcceptableException')
export class ResourceNotFoundError extends PlivoRestError { }
export class ServerError extends PlivoRestError { }
export class InvalidRequestError extends PlivoRestError { }
export class PlivoXMLError extends PlivoRestError { }
export class PlivoXMLValidationError extends PlivoRestError { }
export class AuthenticationError extends PlivoRestError { }
export class NotAcceptableError extends NotAcceptableException { }
