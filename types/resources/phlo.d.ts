export class RunPHLOResponse {
	constructor(params: object);
	apiid: string;
	phloid: string;
	message: any;
}
export class RetrievePHLOResponse {
	constructor(params: object);
	apiid: string;
	phloid: string;
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
	constructor(client: function, data ? : {});
	client: function;
	multiPartyCall: (nodeid: string) => PhloMultiPartyCall;
	/**
	 * run phlo
	 * @method
	 * @promise {Boolean} return true if phlo is complete
	 * @fail {Error} return Error
	 */
	run(params: object): Promise < RunPHLOResponse > ;
	[clientKey]: symbol;
}
/**
 * Represents a Phlo Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhloInterface extends PlivoResourceInterface {
    constructor(client: function, data?: {});
    get(id: string): Promise<RetrievePHLOResponse>;
	[clientKey]: symbol;
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