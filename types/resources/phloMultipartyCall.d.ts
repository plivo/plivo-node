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
	constructor(client: any, data ? : {});
	action: string;
	client: any;
	member: (memberAddress: any) => PhloMultiPartyCallMember;
	call(triggerSource: any, to: any, role: any): Promise < any > ;
	warmTransfer(triggerSource: any, to: any, role: any): Promise < UpdateMultipartyCallResponse > ;
	coldTransfer(triggerSource: any, to: any, role: any): Promise < UpdateMultipartyCallResponse > ;
    abortTransfer(memberAddress: any): Promise<any>;
    update(action: any, triggerSource: any, to: any, role: any): Promise<UpdateMultipartyCallResponse>;
	[clientKey]: any;
}
export class PhloMultiPartyCallInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
    get(phloId: string, id: string): Promise<RetrieveMultipartyCallResponse>;
	[clientKey]: any;
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