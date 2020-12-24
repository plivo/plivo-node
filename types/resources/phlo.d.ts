export class RunPHLOResponse {
	constructor(params: any);
	apiId: any;
	phloId: any;
	message: any;
}
export class RetrievePHLOResponse {
	constructor(params: any);
	apiId: any;
	phloId: any;
	name: any;
	createdOn: any;
}
/**
 * Represents a Phlo
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of phlo
 */
export class Phlo extends PlivoResource {
	constructor(client: any, data ? : {});
	client: any;
	multiPartyCall: (nodeId: any) => PhloMultiPartyCall;
	/**
	 * run phlo
	 * @method
	 * @promise {Boolean} return true if phlo is complete
	 * @fail {Error} return Error
	 */
	run(params: object): Promise < RunPHLOResponse > ;
	[clientKey]: any;
}
/**
 * Represents a Phlo Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhloInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
    get(id: string): Promise<RetrievePHLOResponse>;
	[clientKey]: any;
}
import {
	PlivoResource
} from "../base";
import {
	PhloMultiPartyCall
} from "./phloMultipartyCall";
declare const clientKey: unique symbol;
import {
	PlivoResourceInterface
} from "../base";
export {};