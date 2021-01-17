export class RunPHLOResponse {
	constructor(params: object);
	apiid: string;
	phloid: string;
	message: string;
}
export class RetrievePHLOResponse {
	constructor(params: object);
	apiid: string;
	phloid: string;
	name: string;
	createdOn: string;
}
/**
 * Represents a Phlo
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of phlo
 */
export class Phlo extends PlivoResource {
	constructor(client: Function, data ? : {});
	client: Function;
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
    constructor(client: Function, data?: {});
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