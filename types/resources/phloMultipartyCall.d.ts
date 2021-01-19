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
	constructor(client: Function, data ? : {});
	action: string;
	client: Function;
	member: (memberAddress: string) => PhloMultiPartyCallMember;
	call(triggerSource: string, to: string, role: string): Promise < any > ;
	warmTransfer(triggerSource: string, to: string, role: string): Promise < UpdateMultipartyCallResponse > ;
	coldTransfer(triggerSource: string, to: string, role: string): Promise < UpdateMultipartyCallResponse > ;
    abortTransfer(memberAddress: string): Promise<any>;
    update(action: string, triggerSource: string, to: string, role: string): Promise<UpdateMultipartyCallResponse>;
	[clientKey]: symbol;
}
export class PhloMultiPartyCallInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});
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