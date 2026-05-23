import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const action = 'Verify/App/';
const idField = 'appUuid';
let actionKey = Symbol('api action');
let klassKey = Symbol('constructor');
let idKey = Symbol('id filed');
let clientKey = Symbol('make api call');

export class VerifyAppCreateResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.appUuid = params.appUuid;
        this.message = params.message;
        this.error = params.error;
    }
}

export class VerifyAppGetResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.verifyApp = params.verifyApp;
        this.verifyWhatsapp = params.verifyWhatsapp;
    }
}

export class VerifyAppListResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.verifyApps = params.verifyApps;
        this.meta = params.meta;
    }
}

export class VerifyAppListTemplatesResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.templates = params.templates;
    }
}

export class VerifyAppUpdateResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.appUuid = params.appUuid;
        this.message = params.message;
        this.error = params.error;
    }
}

/**
 * Represents a VerifyApp
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class VerifyApp extends PlivoResource {
    constructor(client, data = {}) {
        super(action, VerifyApp, idField, client);
        this[actionKey] = action;
        this[clientKey] = client;
        if (idField in data) {
            this.id = data[idField];
        }
        extend(this, data);
    }
}

/**
 * Represents a VerifyApp Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class VerifyAppInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, VerifyApp, idField, client);
        extend(this, data);
        this[clientKey] = client;
        this[actionKey] = action;
        this[klassKey] = VerifyApp;
        this[idKey] = idField;
    }

    /**
     * Create a Verify Application
     * @method
     * @param {string} name - Application name (required)
     * @param {object} [optionalParams] - Optional parameters
     * @param {string} [optionalParams.brand_name] - Brand name for the OTP message
     * @param {string} [optionalParams.otp_type] - OTP type (numeric, alpha, alphanumeric)
     * @param {integer} [optionalParams.otp_length] - OTP code length
     * @param {integer} [optionalParams.otp_expiry] - OTP expiry in seconds
     * @param {integer} [optionalParams.otp_attempts] - Maximum OTP validation attempts
     * @param {integer} [optionalParams.max_validation_attempts] - Maximum validation attempts
     * @param {boolean} [optionalParams.sms_channel] - Enable SMS channel
     * @param {boolean} [optionalParams.voice_channel] - Enable voice channel
     * @param {boolean} [optionalParams.wa_channel] - Enable WhatsApp channel
     * @param {string} [optionalParams.waba_id] - WhatsApp Business Account ID
     * @param {string} [optionalParams.waba_phone_number] - WhatsApp phone number
     * @param {string} [optionalParams.waba_template_id] - WhatsApp template ID
     * @param {string} [optionalParams.template_uuid] - SMS template UUID
     * @param {boolean} [optionalParams.is_default] - Set as default app
     * @param {boolean} [optionalParams.message_redaction] - Enable message redaction
     * @param {boolean} [optionalParams.enable_fraudshield] - Enable FraudShield
     * @param {string} [optionalParams.fs_protection_level] - FraudShield protection level
     * @param {string} [optionalParams.customer_app_hash] - Android app hash for SMS retriever
     * @param {string} [optionalParams.number_pool] - Number pool identifier
     * @promise {object} return {@link VerifyAppCreateResponse} object if success
     * @fail {Error} return Error
     */
    create(name, optionalParams) {
        let errors = validate([{
            field: 'name',
            value: name,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let params = optionalParams || {};
        params.name = name;

        let client = this[clientKey];
        let idField = this[idKey];
        let action = this[actionKey];

        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new VerifyAppCreateResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * List Verify Applications
     * @method
     * @param {object} [params] - Optional filter params
     * @param {string} [params.name] - Filter by app name
     * @param {string} [params.subaccount] - Filter by subaccount auth_id
     * @param {integer} [params.limit] - Page size
     * @param {integer} [params.offset] - Page offset
     * @param {string} [params.created_at] - Filter by exact created_at timestamp
     * @param {string} [params.created_at__lt] - Filter by created_at less than
     * @param {string} [params.created_at__lte] - Filter by created_at less than or equal
     * @param {string} [params.created_at__gt] - Filter by created_at greater than
     * @param {string} [params.created_at__gte] - Filter by created_at greater than or equal
     * @promise {object} return {@link VerifyAppListResponse} object if success
     * @fail {Error} return Error
     */
    list(params) {
        let client = this[clientKey];
        let action = this[actionKey];

        return new Promise((resolve, reject) => {
            client('GET', action, params)
                .then(response => {
                    resolve(new VerifyAppListResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * List default Verify templates
     * @method
     * @promise {object} return {@link VerifyAppListTemplatesResponse} object if success
     * @fail {Error} return Error
     */
    listTemplates() {
        let client = this[clientKey];
        let action = this[actionKey];

        return new Promise((resolve, reject) => {
            client('GET', action + 'templates/', {})
                .then(response => {
                    resolve(new VerifyAppListTemplatesResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Get a Verify Application by UUID
     * @method
     * @param {string} appUuid - Verify App UUID
     * @promise {object} return {@link VerifyAppGetResponse} object if success
     * @fail {Error} return Error
     */
    get(appUuid) {
        let errors = validate([{
            field: 'appUuid',
            value: appUuid,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let client = this[clientKey];
        let action = this[actionKey];

        return new Promise((resolve, reject) => {
            client('GET', action + appUuid + '/', {})
                .then(response => {
                    resolve(new VerifyAppGetResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Update a Verify Application
     * @method
     * @param {string} appUuid - Verify App UUID
     * @param {object} [params] - Fields to update
     * @param {string} [params.name] - Application name
     * @param {string} [params.brand_name] - Brand name
     * @param {string} [params.otp_type] - OTP type
     * @param {integer} [params.otp_length] - OTP code length
     * @param {integer} [params.otp_expiry] - OTP expiry in seconds
     * @param {integer} [params.otp_attempts] - Maximum OTP attempts
     * @param {integer} [params.max_validation_attempts] - Maximum validation attempts
     * @param {boolean} [params.sms_channel] - Enable SMS channel
     * @param {boolean} [params.voice_channel] - Enable voice channel
     * @param {boolean} [params.wa_channel] - Enable WhatsApp channel
     * @param {string} [params.waba_id] - WhatsApp Business Account ID
     * @param {string} [params.waba_phone_number] - WhatsApp phone number
     * @param {string} [params.waba_template_id] - WhatsApp template ID
     * @param {string} [params.template_uuid] - SMS template UUID
     * @param {boolean} [params.is_default] - Set as default app
     * @param {boolean} [params.message_redaction] - Enable message redaction
     * @param {boolean} [params.enable_fraudshield] - Enable FraudShield
     * @param {string} [params.fs_protection_level] - FraudShield protection level
     * @param {string} [params.customer_app_hash] - Android app hash
     * @param {string} [params.client] - Client identifier
     * @promise {object} return {@link VerifyAppUpdateResponse} object if success
     * @fail {Error} return Error
     */
    update(appUuid, params) {
        let errors = validate([{
            field: 'appUuid',
            value: appUuid,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let client = this[clientKey];
        let action = this[actionKey];

        return new Promise((resolve, reject) => {
            client('POST', action + appUuid + '/', params || {})
                .then(response => {
                    resolve(new VerifyAppUpdateResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Delete a Verify Application
     * @method
     * @param {string} appUuid - Verify App UUID
     * @promise {boolean} return true if success
     * @fail {Error} return Error
     */
    delete(appUuid) {
        let errors = validate([{
            field: 'appUuid',
            value: appUuid,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let client = this[clientKey];
        let action = this[actionKey];

        return new Promise((resolve, reject) => {
            client('DELETE', action + appUuid + '/', {})
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}