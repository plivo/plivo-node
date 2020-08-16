/**
 * Represents a Recording
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Recording extends PlivoResource {
    constructor(client: any, data?: {});
    id: any;
}
/**
 * Represents a Recording Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class RecordingInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
    /**
     * Delete recording by id
     * @method
     * @param {string} id - id to delete recording
     * @promise {boolean} return true if success
     * @fail {Error} return Error
     */
    delete(id: string): Promise<any>;
    [clientKey]: any;
}
import { PlivoResource } from "../base.js";
import { PlivoResourceInterface } from "../base.js";
declare const clientKey: unique symbol;
export {};
