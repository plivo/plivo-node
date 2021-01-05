export class LookupResponse {
    constructor(params: object);
    apiId: string;
    phoneNumber: string;
    country: object;
    format: object;
    carrier: object;
    resourceUri: string;
}
export class Number extends PlivoResource {
    constructor(client: function, data?: {});
    [clientKey]: any;
}
export class LookupInterface extends PlivoResourceInterface {
    constructor(client: function, data?: {});
    get(number: string, type?: string): Promise<LookupResponse>;
    [clientKey]: any;
}
import { PlivoResource } from "../base";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base";
export {};
