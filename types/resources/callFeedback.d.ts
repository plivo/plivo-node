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
    [clientKey]: any;
}
import { PlivoResource } from "../base.js";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base.js";
export {};
