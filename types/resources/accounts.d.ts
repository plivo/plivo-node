/**
 * Represents a SubAccount
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class GetAccountDetails {
    constructor(params: object);
    accountType: string;
    address: string;
    apiId: string;
    autoRecharge: string;
    billingMode: string;
    cashCredits: string;
    city: string;
    name: string;
    resourceUri: string;
    state: string;
    timezone: string;
}
export class CreateSubAccountResponse {
    constructor(params: object);
    apiId: string;
    authId: string;
    authToken: string;
    message: string;
}
export class UpdateSubAccountDetails {
    constructor(params: object);
    apiId: string;
    message: string;
}
export class UpdateAccountDetailsResponse {
    constructor(params: object);
    apiId: string;
    message: string;
}
export class GetSubAccountDetails {
    constructor(params: object);
    account: string;
    apiId: string;
    authId: string;
    authToken: string;
    created: string;
    enabled: string;
    modified: string;
    name: string;
    resourceUri: string;
}
export class Subaccount extends PlivoResource {
    constructor(client: Function, data?: {});
    id: string;
    /**
     * update subaccount
     * @method
     * @param {string} name - name of subaccount
     * @param {boolean} enabled - make account enable or disable
     * @promise {Subaccount} return object of subaccount
     * @fail {Error} return Error
     */
    update(name: string, enabled: boolean): Promise<UpdateSubAccountDetails>;
    /**
     * delete subaccount
     * @method
     * @param {boolean} cascade - delete associated applications, phonenumbers & endpoints
     * @promise {boolean} return true if subaccount deleted
     * @fail {Error} return Error
     */
    delete(cascade: boolean): Promise<unknown>;
    [clientKey]: symbol;
}
/**
 * Represents a Subaccount Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class SubaccountInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});
    /**
     * get subaccount by id
     * @method
     * @param {string} id - id of subaccount
     * @promise {Subaccount} return object of subaccount
     * @fail {Error} return Error
     */
    get(id: string): Promise<GetSubAccountDetails>;
    /**
     * create subaccount
     * @method
     * @param {string} name - name of subaccount
     * @param {boolean} enabled - enable or disable subaccount
     * @promise {PlivoGenericResponse} return object of PlivoGenericObject
     * @fail {Error} return Error
     */
    create(name: string, enabled: boolean): Promise<CreateSubAccountResponse>;
    /**
     * update subaccount
     * @method
     * @param {id} id - id of subaccount
     * @param {string} name - name of subaccount
     * @param {boolean} enabled - make account enable or disable
     * @promise {Subaccount} return object of subaccount
     * @fail {Error} return Error
     */
    update(id: string, name: string, enabled: boolean): Promise<UpdateSubAccountDetails>;
    /**
     * delete subaccount
     * @method
     * @param {id} id - id of subaccount
     * @param {boolean} cascade - delete associated applications, phonenumbers & endpoints
     * @promise {boolean} return true if subaccount deleted
     * @fail {Error} return Error
     */
    delete(id: string, cascade: boolean): Promise<any>;
    [clientKey]: symbol;
}
/**
 * Represents a Account
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Account extends PlivoResource {
    constructor(client: Function, data?: {});
    id: string;
    /**
     * get account detail
     * @method
     * @promise {PlivoGenericResponse} return PlivoGenericResponse object
     * @fail {Error} return Error
     */
    get(): Promise<any>;
    update(params: object): Promise<UpdateAccountDetailsResponse>;
    [clientKey]: symbol;
}
/**
 * Represents a Account Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class AccountInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});
    /**
     * get account detail
     * @method
     * @promise {PlivoGenericResponse} return PlivoGenericResponse object
     * @fail {Error} return Error
     */
    get(): Promise<GetAccountDetails>;
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
    }): Promise<UpdateAccountDetailsResponse>;
    [clientKey]: symbol;
}
import { PlivoResource } from "../base";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base";
export {};
