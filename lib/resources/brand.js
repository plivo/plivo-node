import * as _ from "lodash";

import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const action = '10dlc/Brand/';
const idField = 'brand_id';
let clientKey = Symbol();
let idKey = Symbol('id filed');


/**
 * Represents a Brand
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
 export class Brand extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Brand, idField, client);
        this[actionKey] = action;
        this[clientKey] = client;

        extend(this, data);
    }
}


export class BrandCreationResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.brand_id = params.brandId;
        this.message = params.message;
    }
}

/**
 * Represents a Brand Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
 export class BrandInterface extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Brand, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }

      /**
     * get Brand by given id
     * @method
     * @param {string} brandID - id of brand
     * @promise {object} return {@link Brand} object
     * @fail {Error} return Error
     */
    get(brandId) {
        let params = {}
        return super.customexecuteAction(action+brandId+'/', 'GET', params);
    }
    /**
     * Get All Brand Detail
     * @method
     * @param {object} params - params type and status to get all brand details.
     * @promise {object[]} returns list of Brand Object
     * @fail {Error} returns Error
     */
    list(params) {
        return super.customexecuteAction(action, 'GET', params);
    }

    /**
     * Brand Registration
     * @method
     * @param {object} params 
     * @param {string} brand_alias
     * @param {string} profile_uuid
     * @param {string} brand_type
     * @param {string} secondary_vetting
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
     create(brand_alias,profile_uuid,brand_type,secondary_vetting, params = {}) {
         params.brand_alias=brand_alias;
         params.profile_uuid=profile_uuid;
         params.brand_type=brand_type;
         params.secondary_vetting=secondary_vetting;
        let client = this[clientKey];
        let idField = this[idKey];
        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new BrandCreationResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });

    }
}