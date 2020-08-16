/**
 * Represents a Multiparty Call Member
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of phlo
 */
export class PhloMultiPartyCallMember extends PlivoResource {
    constructor(client: any, data?: {});
    action: string;
    client: any;
    resumeCall(): Promise<any>;
    voicemailDrop(): Promise<any>;
    hangup(): Promise<any>;
    hold(): Promise<any>;
    unhold(): Promise<any>;
}
export class PhloMultiPartyCallMemberInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
    action: string;
    client: any;
}
import { PlivoResource } from "../base.js";
import { PlivoResourceInterface } from "../base.js";
