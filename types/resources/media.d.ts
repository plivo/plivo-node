/**
 * Represents a Message
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Media extends PlivoResource {
    constructor(client: any, data?: {});
    id: any;
}
/**
 * Represents a Media Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class MediaInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
    /**
     * Upload Media
     * @method
     * @fail {Error} return Error
     */
    upload(files: any): Promise<any>;
    [clientKey]: any;
}
import { PlivoResource } from "../base.js";
import { PlivoResourceInterface } from "../base.js";
declare const clientKey: unique symbol;
export {};
