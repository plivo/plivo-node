/**
 * Represents a Phlo
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of phlo
 */
export class Phlo extends PlivoResource {
    constructor(client: any, data?: {});
    client: any;
    multiPartyCall: (nodeId: any) => PhloMultiPartyCall;
    /**
     * run phlo
     * @method
     * @promise {Boolean} return true if phlo is complete
     * @fail {Error} return Error
     */
    run(params: any): Promise<any>;
}
/**
 * Represents a Phlo Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhloInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
}
import { PlivoResource } from "../base.js";
import { PhloMultiPartyCall } from "./phloMultipartyCall.js";
import { PlivoResourceInterface } from "../base.js";
