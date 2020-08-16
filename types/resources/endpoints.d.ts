/**
 * Represents a Endpoint
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Endpoint extends PlivoResource {
    constructor(client: any, data?: {});
    id: any;
    [clientKey]: any;
}
/**
 * Represents a Endpoint Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class EndpointInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
    /**
     * update Endpoint
     * @method
     * @param {string} id - id to update
     * @param {object} params
     * @param {string} [params.username] - username to update
     * @param {string} [params.password] - password to update
     * @param {string} [params.alias] - alias to update
     * @param {string} [params.appId] - app id to update
     * @promise {object} return {@link Endpoint} object if success
     * @fail {Error} return Error
     */
    update(id: string, params: {
        username: string;
        password: string;
        alias: string;
        appId: string;
    }): Promise<any>;
    /**
     * delete Endpoint
     * @method
     * @param {string} id - id to delete
     * @promise {boolean} return true if success
     * @fail {Error} return Error
     */
    delete(id: string): Promise<any>;
    [clientKey]: any;
}
import { PlivoResource } from "../base.js";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base.js";
export {};
