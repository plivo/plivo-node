import * as _ from "lodash";

import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'Number/'; // unused as it is overridden, only for unit tests
const idField = 'OVERRIDDEN';
const LOOKUP_API_BASE_URL = 'https://lookup.plivo.com/v1/Number'

export class LookupResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.phoneNumber = params.phoneNumber;
        this.country = params.country;
        this.format = params.format;
        this.carrier = params.carrier;
        this.resourceUri = params.resourceUri;

    }
}

export class Number extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Number, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }
}

export class LookupInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, Number, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }

    get(number, type = 'carrier') {
        let errors = validate([{
            field: 'number',
            value: number,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let params = {
            type: type,
            overrideUrl: `${LOOKUP_API_BASE_URL}/${number}`,
        };

        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('GET', action + '/', params)
                .then(response => {
                    resolve(new LookupResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}