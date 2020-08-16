/**
 * Represents a SubAccount
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Subaccount extends PlivoResource {
    constructor(client: any, data?: {});
    id: any;
}
/**
 * Represents a Subaccount Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class SubaccountInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
    /**
     * update subaccount
     * @method
     * @param {id} id - id of subaccount
     * @param {string} name - name of subaccount
     * @param {boolean} enabled - make account enable or disable
     * @promise {Subaccount} return object of subaccount
     * @fail {Error} return Error
     */
    update(id: any, name: string, enabled: boolean): Promise<any>;
    /**
     * delete subaccount
     * @method
     * @param {id} id - id of subaccount
     * @param {boolean} cascade - delete associated applications, phonenumbers & endpoints
     * @promise {boolean} return true if subaccount deleted
     * @fail {Error} return Error
     */
    delete(id: any, cascade: boolean): Promise<any>;
    [clientKey]: any;
}
/**
 * Represents a Account
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Account extends PlivoResource {
    constructor(client: any, data?: {});
    id: any;
    /**
     * get account detail
     * @method
     * @promise {PlivoGenericResponse} return PlivoGenericResponse object
     * @fail {Error} return Error
     */
    get(): Promise<any>;
    [clientKey]: any;
}
/**
 * Represents a Account Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class AccountInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
    /**
     * update account detail
     * @method
     * @param {object} params - parameters
     * @param {string} [params.name] - name of account
     * @param {string} [params.city] - city of account
     * @param {string} [params.address] - address of account
     * @promise {Account} return Account object
     * @fail {Error} return Error
     */
    update(params: {
        name: string;
        city: string;
        address: string;
    }): Promise<any>;
    [clientKey]: any;
}
import { PlivoResource } from "../base.js";
import { PlivoResourceInterface } from "../base.js";
declare const clientKey: unique symbol;
export {};
