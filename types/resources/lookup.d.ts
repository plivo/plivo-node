export class LookupResponse {
    constructor(params: object);
    apiId: string;
    phoneNumber: string;
    country: {
      name: string;
      iso2: string;
      iso3: string;
    };
    format: {
      e164: string;
      national: string;
      international: string;
      rfc3966: string;
    };
    carrier: {
      mobileCountryCode: string;
      mobileNetworkCode: string;
      name: string;
      type: string;
      ported: string;
    };
    resourceUri: string;
}
export class Number extends PlivoResource {
    constructor(client: Function, data?: {});
    [clientKey]: symbol;
}
export class LookupInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});
    get(number: string, type?: string): Promise<LookupResponse>;
    [clientKey]: symbol;
}
import { PlivoResource } from "../base";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base";
export {};
