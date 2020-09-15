import {
    extend,
    validate
} from '../utils/common.js';

import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';

import * as _ from "lodash";

const clientKey = Symbol();
const action = 'Lookup/Number/'; // unused as it is overridden, only for unit tests
const idField = 'OVERRIDDEN';
const LOOKUP_API_BASE_URL = 'https://api.plivo.com/v1/Lookup/Number'

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

    get(number, info = 'service_provider') {
        let errors = validate([{
            field: 'number',
            value: number,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let params = {
            info: info,
            overrideUrl: `${LOOKUP_API_BASE_URL}/${number}`,
        };

        return super.get(number, params);
    }
}
