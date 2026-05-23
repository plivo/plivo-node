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
        this.meta = params.meta;
        this.verifyApps = params.verifyApps;
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

export class VerifyAppDeleteResponse {
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
     * Create a Verify App
     * @method
     * @param {string} name - Human-friendly app name (must be non-empty).
     * @param {object} [params] - Optional parameters
     * @param {string} [params.otp_type] - Format of the generated OTP: integer or string. Defaults to integer.
     * @param {integer} [params.otp_length] - Number of digits/characters in the OTP. Allowed range: 4–8. Defaults to 6.
     * @param {integer} [params.otp_expiry] - OTP validity duration in minutes. Allowed range: 1–15. Defaults to 3.
     * @param {integer} [params.otp_attempts] - Number of attempts allowed for the recipient. Allowed range: 3–10. Defaults to 3.
     * @param {string} [params.brand_name] - Brand name interpolated into template variables.
     * @param {boolean} [params.sms_channel] - Enable SMS as a delivery channel. Defaults to true.
     * @param {boolean} [params.voice_channel] - Enable voice-call as a delivery channel. Defaults to false.
     * @param {boolean} [params.wa_channel] - Enable WhatsApp as a delivery channel. Defaults to false.
     * @param {boolean} [params.is_default] - Mark this app as the account's default Verify App. Defaults to false.
     * @param {string} [params.template_uuid] - UUID of the SMS OTP template to bind to this app.
     * @param {boolean} [params.message_redaction] - When true, the OTP value is redacted from Plivo's internal logs. Defaults to false.
     * @param {string} [params.customer_app_hash] - 11-character Android app hash for the SMS Retriever API.
     * @param {integer} [params.max_validation_attempts] - Number of validation attempts allowed per session. Allowed range: 1–10. Defaults to 5.
     * @param {boolean} [params.enable_fraudshield] - Enable Plivo FraudShield protection. Defaults to true.
     * @param {string} [params.fs_protection_level] - FraudShield protection level: low, medium, or high. Defaults to medium.
     * @param {string} [params.waba_id] - Required when wa_channel is true. The WhatsApp Business Account ID.
     * @param {string} [params.waba_phone_number] - Required when wa_channel is true. The WhatsApp-registered sender number (E.164).
     * @param {string} [params.waba_template_id] - Required when wa_channel is true. The Meta WhatsApp template ID.
     * @promise {object} return {@link VerifyAppCreateResponse} object if success
     * @fail {Error} return Error
     */
    create(name, params = {}) {
        let errors = validate([{
            field: 'name',
            value: name,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        params.name = name;

        let client = this[clientKey];
        let idField = this[idKey];
        let action = this[actionKey];

        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new VerifyAppCreateResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * List Verify Apps
     * @method
     * @param {object} [params] - Optional filter parameters
     * @param {string} [params.name] - Filter by app name (substring match, case-insensitive).
     * @param {string} [params.app_uuid] - Filter by app UUID.
     * @param {string} [params.channel] - Filter to apps with given channel(s) enabled: sms, voice, sms&voice, or voice&sms.
     * @param {string} [params.status] - Filter by app status: active or deleted.
     * @param {integer} [params.limit] - Maximum number of results to return. Defaults to 20.
     * @param {integer} [params.offset] - Number of results to skip. Defaults to 0.
     * @param {string} [params.created_at] - Filter to apps created at exactly this timestamp.
     * @param {string} [params.created_at__lt] - Filter to apps created before this timestamp.
     * @param {string} [params.created_at__lte] - Filter to apps created at or before this timestamp.
     * @param {string} [params.created_at__gt] - Filter to apps created after this timestamp.
     * @param {string} [params.created_at__gte] - Filter to apps created at or after this timestamp.
     * @param {string} [params.subaccount_auth_id] - Filter to apps owned by the given subaccount.
     * @promise {object} return {@link VerifyAppListResponse} object if success
     * @fail {Error} return Error
     */
    list(params = {}) {
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
     * Get a Verify App by UUID
     * @method
     * @param {string} appUuid - UUID of the Verify App to retrieve.
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
            client('GET', action + appUuid + '/')
                .then(response => {
                    resolve(new VerifyAppGetResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Update a Verify App
     * @method
     * @param {string} appUuid - UUID of the Verify App to update.
     * @param {object} [params] - Fields to update (only included fields are modified)
     * @param {string} [params.name] - Updated app name.
     * @param {string} [params.brand_name] - Updated brand name.
     * @param {string} [params.otp_type] - Updated OTP type: integer or string.
     * @param {integer} [params.otp_length] - Updated OTP length (4–8).
     * @param {integer} [params.otp_expiry] - Updated OTP expiry in minutes (1–15).
     * @param {integer} [params.otp_attempts] - Updated number of OTP attempts (3–10).
     * @param {boolean} [params.sms_channel] - Enable or disable SMS channel.
     * @param {boolean} [params.voice_channel] - Enable or disable voice channel.
     * @param {boolean} [params.wa_channel] - Enable or disable WhatsApp channel.
     * @param {boolean} [params.is_default] - Mark or unmark as account default app.
     * @param {string} [params.template_uuid] - Updated SMS OTP template UUID.
     * @param {boolean} [params.message_redaction] - Enable or disable OTP redaction from logs.
     * @param {string} [params.customer_app_hash] - Updated Android app hash (≤11 characters).
     * @param {integer} [params.max_validation_attempts] - Updated max validation attempts per session (1–10).
     * @param {boolean} [params.enable_fraudshield] - Enable or disable FraudShield protection.
     * @param {string} [params.fs_protection_level] - Updated FraudShield protection level: low, medium, or high.
     * @param {string} [params.waba_id] - Updated WhatsApp Business Account ID.
     * @param {string} [params.waba_phone_number] - Updated WhatsApp-registered sender number.
     * @param {string} [params.waba_template_id] - Updated Meta WhatsApp template ID.
     * @promise {object} return {@link VerifyAppUpdateResponse} object if success
     * @fail {Error} return Error
     */
    update(appUuid, params = {}) {
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
            client('POST', action + appUuid + '/', params)
                .then(response => {
                    resolve(new VerifyAppUpdateResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Delete a Verify App
     * @method
     * @param {string} appUuid - UUID of the Verify App to delete.
     * @promise {object} return {@link VerifyAppDeleteResponse} object if success
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
            client('DELETE', action + appUuid + '/')
                .then(response => {
                    resolve(new VerifyAppDeleteResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}