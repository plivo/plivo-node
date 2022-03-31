import * as _ from "lodash";

import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const action = 'Profile/';
const idField = 'profileUUID';
let actionKey = Symbol('api action');
let klassKey = Symbol('constructor');
let idKey = Symbol('id filed');
let clientKey = Symbol('make api call');



/**
 * Represents a Profile
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
 export class Profile extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Profile, idField, client);
        this[actionKey] = action;
        this[clientKey] = client;
        if (idField in data) {
            this.id = data[idField];
        };

        extend(this, data);
    }
}

export class ProfileResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.profileUuid = params.profileUuid;
    }
}

/**
 * Represents a Profile Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
 export class ProfileInterface extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Profile, idField, client);
        extend(this, data);
        this[clientKey] = client;
        this[actionKey] = action;
        this[klassKey] = Profile;
        this[idKey] = idField;
    }

    /**
     * get Profile by given profileuuid
     * @method
     * @param {string} profileUUID - id of profileUUID
     * @promise {object} return {@link profile} object
     * @fail {Error} return Error
     */
     get(profileUUID) {
        let params = {};
        return super.customexecuteAction(action+profileUUID+'/', 'GET', params);
    }

    /**
     * Get All Profile Detail
     * @method
     * @param {object} params - params limit and offset
     * @promise {object[]} returns list of profile Object
     * @fail {Error} returns Error
     */
    list(params) {
        return super.customexecuteAction(action,'GET', params);
    }

    /**
     * delete Profile by given profileuuid
     * @method
     * @param {string} profileUUID - id of profileUUID
     * @fail {Error} return Error
     */
     delete(profileUUID) {
        let params = {};
        return super.customexecuteAction(action+profileUUID+'/', 'DELETE', params);
    }

    /**
     * Create a new Profile
     *
     * @param {string} profile_alias 
     * @param {string} profile_type 
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
    create(profile_alias,profile_type,customer_type,entity_type, company_name,ein,vertical,ein_issuing_country,stock_symbol,stock_exchange, alt_business_id_type, website, address, authorized_contact){
        let params = {}
        params.profile_alias=profile_alias;
        params.profile_type=profile_type;
        params.customer_type=customer_type;
        params.entity_type=entity_type;
        params.company_name=company_name;
        params.ein=ein;
        params.vertical=vertical;
        params.ein_issuing_country=ein_issuing_country;
        params.stock_symbol=stock_symbol;
        params.stock_exchange=stock_exchange;
        params.alt_business_id_type=alt_business_id_type;
        params.website=website;
        params.address=address;
        params.authorized_contact=authorized_contact;
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new ProfileResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });

    }
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
    update(profile_uuid, params){
        return super.customexecuteAction(action+profile_uuid+'/', 'POST', params);
    }
}