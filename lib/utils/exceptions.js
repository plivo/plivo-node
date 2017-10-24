export class PlivoRestError extends Error {}
export class ResourceNotFoundError extends PlivoRestError {}
export class ServerError extends PlivoRestError {}
export class InvalidRequestError extends PlivoRestError {}
export class PlivoXMLError extends PlivoRestError {}
export class AuthenticationError extends PlivoRestError {}
