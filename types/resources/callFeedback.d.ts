export class CallFeedbackResponse {
    constructor(params: object);
    apiId: string;
    message: string;
    status: string;
}
export class CallFeedback extends PlivoResource {
    constructor(client: Function, data?: {});
    id: string;
    [clientKey]: symbol;
}
/**
 * Represents a CallFeedback Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class CallFeedbackInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});
    create(callUUID: string, rating: string, issues?: never[], notes?: string): Promise<CallFeedbackResponse>;
    [clientKey]: symbol;
}
import { PlivoResource } from "../base";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base";
export {};
