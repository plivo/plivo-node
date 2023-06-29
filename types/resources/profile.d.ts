/**
 * Represents a Profile
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Profile extends PlivoResource {
    constructor(client: any, data?: {});
    id: unknown;
}
export class ProfileResponse {
    constructor(params: any);
    apiId: any;
    profileUuid: any;
    message: any;
}
/**
 * Represents a Profile Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class ProfileInterface extends PlivoResource {
    constructor(client: any, data?: {});
    /**
     * get Profile by given profileuuid
     * @method
     * @param {string} profileUUID - id of profileUUID
     * @promise {object} return {@link profile} object
     * @fail {Error} return Error
     */
    get(profileUUID: string): Promise<any>;
    /**
     * Get All Profile Detail
     * @method
     * @param {object} params - params limit and offset
     * @promise {object[]} returns list of profile Object
     * @fail {Error} returns Error
     */
    list(params: object): Promise<any>;
    /**
     * delete Profile by given profileuuid
     * @method
     * @param {string} profileUUID - id of profileUUID
     * @fail {Error} return Error
     */
    delete(profileUUID: string): Promise<any>;
    /**
     * Create a new Profile
     *
     * @param {string} profile_alias
     * @param {string} plivo_subaccount
     * @param {string} customer_type
     * @param {string} entity_type
     * @param {string} company_name
     * @param {string} ein
     * @param {string} vertical
     * @param {string} ein_issuing_country
     * @param {string} stock_symbol
     * @param {string} stock_exchange
     * @param {string} alt_business_id_type
     * @param {string} website
     * @param {object} address
     * @param {object} authorized_contact
     * @return profileResponse response output
     */
    create(profile_alias: string, plivo_subaccount: string, customer_type: string, entity_type: string, company_name: string, ein: string, vertical: string, ein_issuing_country: string, stock_symbol: string, stock_exchange: string, alt_business_id_type: string, website: string, address: object, authorized_contact: object): Promise<any>;
    /**
     * update a new Profile
     *
     * @param {string} profile_uuid
     * @param {object } address
     * @param {object } authorized_contact
     * @param {string} entity_type
     * @param {string} vertical
     * @param {string} company_name
     * @param {string} website
     * @return profileResponse response output
     */
    update(profile_uuid: string, params: any): Promise<any>;
}
import { PlivoResource } from '../base';
