import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const action = 'RCS/Capability/';
const idField = 'phoneNumber';
let clientKey = Symbol('make api call');
let actionKey = Symbol('api action');
let idKey = Symbol('id filed');

export class RCSCapabilityCheckResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.phoneNumber = params.phoneNumber;
        this.isCapable = params.isCapable;
        this.features = params.features;
        this.message = params.message;
        this.error = params.error;
    }
}

/**
 * Represents an RCS Capability resource
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class RCSCapability extends PlivoResource {
    constructor(client, data = {}) {
        super(action, RCSCapability, idField, client);
        this[actionKey] = action;
        this[clientKey] = client;

        if (idField in data) {
            this.id = data[idField];
        }

        extend(this, data);
    }
}

/**
 * Represents an RCS Capability Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class RCSCapabilityInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, RCSCapability, idField, client);
        extend(this, data);
        this[clientKey] = client;
        this[actionKey] = action;
        this[idKey] = idField;
    }

    /**
     * Check if a phone number is RCS-enabled.
     * @method
     * @param {string} phoneNumber - Phone number to check for RCS capability.
     * @param {object} [params] - Optional params
     * @param {string} [params.agentUuid] - Agent UUID.
     * @promise {object} return {@link RCSCapabilityCheckResponse} object if success
     * @fail {Error} return Error
     */
    check(phoneNumber, params = {}) {
        let errors = validate([{
            field: 'phone_number',
            value: phoneNumber,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let queryParams = Object.assign({}, params);
        queryParams.phone_number = phoneNumber;

        if (queryParams.agentUuid) {
            queryParams.agent_uuid = queryParams.agentUuid;
            delete queryParams.agentUuid;
        }

        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('GET', action, queryParams)
                .then(response => {
                    resolve(new RCSCapabilityCheckResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}