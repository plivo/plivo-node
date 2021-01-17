/**
* Represents a Pricing
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class PricingResponse {
    constructor(params: object);
    apiId: string;
    country: string;
    countryCode: string;
    countryIso: string;
    message: object;
    mms: object;
    phoneNumbers: object;
    voice: object;
}
export class Pricing extends PlivoResource {
    constructor(client: Function, data?: {});
    /**
     * Get pricings by country
     * @method
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    get(): Promise<PricingResponse>;
    [clientKey]: symbol;
}
/**
* Represents a Pricing Interface
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class PricingInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});
    [clientKey]: symbol;
}
import { PlivoResource } from "../base";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base";
export {};
