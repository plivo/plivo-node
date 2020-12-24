export class CallFeedbackResponse {
    constructor(params: object);
    apiId: string;
    message: string;
    status: string;
}
export class CallFeedback extends PlivoResource {
    constructor(client: any, data?: {});
    id: any;
    [clientKey]: any;
}
/**
 * Represents a CallFeedback Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class CallFeedbackInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
    create(callUUID: string, rating: string, issues?: never[], notes?: string): Promise<CallFeedbackResponse>;
    [clientKey]: any;
}
import { PlivoResource } from "../base";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base";
export {};
