/**
 * Represents a Pricing
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Pricing extends PlivoResource {
    constructor(client: any, data?: {});
    /**
     * Get pricings by country
     * @method
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    get(): Promise<any>;
}
/**
 * Represents a Pricing Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PricingInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
    [clientKey]: any;
}
import { PlivoResource } from "../base.js";
import { PlivoResourceInterface } from "../base.js";
declare const clientKey: unique symbol;
export {};
