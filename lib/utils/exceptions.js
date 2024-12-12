var PlivoRestError = require('./restException');
export class ResourceNotFoundError extends PlivoRestError { }
export class ServerError extends PlivoRestError { }
export class InvalidRequestError extends PlivoRestError { }
export class PlivoXMLError extends PlivoRestError { }
export class PlivoXMLValidationError extends PlivoRestError { }
export class AuthenticationError extends PlivoRestError { }
export class NotAcceptableError extends PlivoRestError { }
export class TooManyRequestsError extends PlivoRestError { }