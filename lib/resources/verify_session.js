import {
    PlivoResource,
    PlivoResourceInterface,
    PlivoGenericResponse
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const action = 'Verify/Session/';
const idField = 'sessionUuid';
let actionKey = Symbol('api action');
let klassKey = Symbol('constructor');
let idKey = Symbol('id filed');
let clientKey = Symbol('make api call');

export class CreateVerifySessionResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.sessionUuid = params.sessionUuid;
        this.message = params.message;
    }
}

/**
 * Represents a VerifySession
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class VerifySession extends PlivoResource {
    constructor(client, data = {}) {
        super(action, VerifySession, idField, client);
        this[actionKey] = action;
        this[clientKey] = client;

        if (idField in data) {
            this.id = data[idField];
        }

        extend(this, data);
    }
}

/**
 * Represents a VerifySession Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class VerifySessionInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, VerifySession, idField, client);
        extend(this, data);
        this[clientKey] = client;
        this[actionKey] = action;
        this[klassKey] = VerifySession;
        this[idKey] = idField;
    }

    /**
     * Create a Verify Session (generate OTP)
     * @method
     * @param {object} [params] - optional params
     * @param {string} [params.app_hash] - Android app hash for SMS retriever.
     * @param {string} [params.brand_name] - Brand name displayed in the OTP message.
     * @param {integer} [params.code_length] - Length of the OTP code.
     * @param {string} [params.dlt_entity_id] - DLT entity ID for India DLT compliance.
     * @param {string} [params.dlt_sender_id] - DLT sender ID.
     * @param {string} [params.dlt_template_category] - DLT template category.
     * @param {string} [params.dlt_template_id] - DLT template ID.
     * @param {string} [params.dlt_text] - DLT template text.
     * @param {integer} [params.dtmf] - DTMF tone for voice OTP.
     * @param {string} [params.fraud_check] - FraudShield check level.
     * @param {string} [params.text] - Custom OTP message text.
     * @promise {object} return {@link CreateVerifySessionResponse} object if success
     * @fail {Error} return Error
     */
    create(params = {}) {
        let client = this[clientKey];
        let idField = this[idKey];
        let action = this[actionKey];

        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new CreateVerifySessionResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}