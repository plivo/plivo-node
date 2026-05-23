import * as _ from "lodash";

import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const action = 'Message/Bulk/';
const idField = 'messageUuid';
let actionKey = Symbol('api action');
let klassKey = Symbol('constructor');
let idKey = Symbol('id filed');
let clientKey = Symbol('make api call');

export class BulkMessageResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.messageUuid = params.messageUuid;
        this.message = params.message;
        if (params.invalidNumber !== undefined) {
            this.invalidNumber = params.invalidNumber;
        }
    }
}

/**
 * Represents a BulkMessage
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class BulkMessage extends PlivoResource {
    constructor(client, data = {}) {
        super(action, BulkMessage, idField, client);
        this[actionKey] = action;
        this[clientKey] = client;

        if (idField in data) {
            this.id = data[idField];
        }

        extend(this, data);
    }
}

/**
 * Represents a BulkMessage Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class BulkMessageInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, BulkMessage, idField, client);
        extend(this, data);
        this[clientKey] = client;
        this[actionKey] = action;
        this[klassKey] = BulkMessage;
        this[idKey] = idField;
    }

    /**
     * Send a bulk SMS message to up to 1000 destinations in one API call.
     * @method
     * @param {string} src - The source phone number or sender ID.
     * @param {Array<string>} dst - List of destination phone numbers (1–1000 entries).
     * @param {string} text - The text content of the message (max 1600 characters).
     * @param {object} [optionalParams] - Optional parameters.
     * @param {string} [optionalParams.type] - The type of message (e.g. sms).
     * @param {string} [optionalParams.url] - Delivery status callback URL.
     * @param {string} [optionalParams.method] - HTTP method for the callback URL (GET or POST).
     * @param {boolean} [optionalParams.log] - Whether to log message content; defaults to false.
     * @param {string} [optionalParams.powerpack_uuid] - UUID of the Powerpack to use.
     * @promise {object} return {@link BulkMessageResponse} object if success
     * @fail {Error} return Error
     */
    create(src, dst, text, optionalParams) {
        let errors = validate([
            {
                field: 'src',
                value: src,
                validators: ['isRequired']
            },
            {
                field: 'dst',
                value: dst,
                validators: ['isRequired']
            },
            {
                field: 'text',
                value: text,
                validators: ['isRequired']
            }
        ]);

        if (errors) {
            return errors;
        }

        let params = optionalParams || {};

        params.src = src;
        params.dst = _.isArray(dst) ? dst : [dst];
        params.text = text;

        let client = this[clientKey];
        let idField = this[idKey];
        let action = this[actionKey];

        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new BulkMessageResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Send a bulk SMS message (alias for create).
     * @method
     * @param {string} src - The source phone number or sender ID.
     * @param {Array<string>} dst - List of destination phone numbers (1–1000 entries).
     * @param {string} text - The text content of the message (max 1600 characters).
     * @param {object} [optionalParams] - Optional parameters.
     * @promise {object} return {@link BulkMessageResponse} object if success
     * @fail {Error} return Error
     */
    send(src, dst, text, optionalParams) {
        return this.create(src, dst, text, optionalParams);
    }
}