export class PlivoRestError extends Error {
    constructor(message?: string);
}
export class ResourceNotFoundError extends PlivoRestError {
    constructor(message?: string);
}
export class ServerError extends PlivoRestError {
    constructor(message?: string);
}
export class InvalidRequestError extends PlivoRestError {
    constructor(message?: string);
}
export class PlivoXMLError extends PlivoRestError {
    constructor(message?: string);
}
export class PlivoXMLValidationError extends PlivoRestError {
    constructor(message?: string);
}
export class AuthenticationError extends PlivoRestError {
    constructor(message?: string);
}
