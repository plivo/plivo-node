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
        this.brand = params.brand;
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
     * @param {string} city
     * @param {string} company_name
     * @param {string} country
     * @param {string} ein
     * @param {string} ein_issuing_country
     * @param {string} email
     * @param {string} entity_type
     * @param {string} postal_code
     * @param {string} registration_status
     * @param {string} state
     * @param {string} stock_exchange
     * @param {string} stock_symbol
     * @param {string} street
     * @param {string} vertical
     * @param {string} [params.website] -
     * @param {string} [params.secondary_vetting]
     * @param {string} [params.first_name]
     * @param {string} [params.last_name]
     * @param {string} [params.alt_business_id_type]
     * @param {string} [params.alt_business_id]
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
     create(city,company_name,country,ein,ein_issuing_country,email,entity_type,phone,postal_code,registration_status,state,stock_exchange,stock_symbol,street,vertical, params = {}) {
         params.city=city;
         params.company_name=company_name;
         params.country=country;
         params.ein=ein;
         params.ein_issuing_country=ein_issuing_country;
         params.email=email;
         params.entity_type=entity_type;
         params.phone=phone;
         params.postal_code=postal_code;
         params.registration_status=registration_status;
         params.state=state;
         params.stock_exchange=stock_exchange;
         params.stock_symbol=stock_symbol;
         params.street=street;
         params.vertical=vertical;
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