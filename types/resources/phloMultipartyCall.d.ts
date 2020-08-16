export class PhloMultiPartyCall extends PlivoResource {
    constructor(client: any, data?: {});
    action: string;
    client: any;
    member: (memberAddress: any) => PhloMultiPartyCallMember;
    call(triggerSource: any, to: any, role: any): Promise<any>;
    warmTransfer(triggerSource: any, to: any, role: any): Promise<any>;
    coldTransfer(triggerSource: any, to: any, role: any): Promise<any>;
    abortTransfer(memberAddress: any): Promise<any>;
}
export class PhloMultiPartyCallInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
}
import { PlivoResource } from "../base.js";
import { PhloMultiPartyCallMember } from "./phloMultiPartyCallMember.js";
import { PlivoResourceInterface } from "../base.js";
