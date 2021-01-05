export class UpdateMultipartyCallResponse {
	constructor(params: object);
	apiId: string;
	error: string;
}
export class RetrieveMultipartyCallResponse {
	constructor(params: object);
	apiId: string;
	nodeId: string;
	phloId: string;
	name: string;
	nodeType: string;
	createdOn: string;
}
export class PhloMultiPartyCall extends PlivoResource {
	constructor(client: function, data ? : {});
	action: string;
	client: function;
	member: (memberAddress: any) => PhloMultiPartyCallMember;
	call(triggerSource: any, to: any, role: any): Promise < any > ;
	warmTransfer(triggerSource: any, to: any, role: any): Promise < UpdateMultipartyCallResponse > ;
	coldTransfer(triggerSource: any, to: any, role: any): Promise < UpdateMultipartyCallResponse > ;
    abortTransfer(memberAddress: any): Promise<any>;
    update(action: any, triggerSource: any, to: any, role: any): Promise<UpdateMultipartyCallResponse>;
	[clientKey]: symbol;
}
export class PhloMultiPartyCallInterface extends PlivoResourceInterface {
    constructor(client: function, data?: {});
    get(phloId: string, id: string): Promise<RetrieveMultipartyCallResponse>;
	[clientKey]: symbol;
}
import {
	PlivoResource
} from "../base";
import {
	PhloMultiPartyCallMember
} from "./phloMultiPartyCallMember";
declare const clientKey: unique symbol;
import {
	PlivoResourceInterface
} from "../base";
export {};