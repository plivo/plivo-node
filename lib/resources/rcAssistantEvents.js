import {
    PlivoResource,
    PlivoResourceInterface,
    PlivoGenericResponse
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const action = 'RCS/AssistantEvents/';
const idField = 'apiId';
let actionKey = Symbol('api action');
let klassKey = Symbol('constructor');
let idKey = Symbol('id filed');
let clientKey = Symbol('make api call');

export class RcsAssistantEventResponse {
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
 * Represents an RCS Assistant Event
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class RcsAssistantEvent extends PlivoResource {
    constructor(client, data = {}) {
        super(action, RcsAssistantEvent, idField, client);
        this[actionKey] = action;
        this[clientKey] = client;

        if (idField in data) {
            this.id = data[idField];
        }

        extend(this, data);
    }
}

/**
 * Represents an RCS Assistant Events Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class RcsAssistantEventInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, RcsAssistantEvent, idField, client);
        extend(this, data);
        this[clientKey] = client;
        this[actionKey] = action;
        this[klassKey] = RcsAssistantEvent;
        this[idKey] = idField;
    }

    /**
     * Send RCS assistant events.
     * @method
     * @param {object} params - parameters for the RCS assistant event
     * @promise {object} return {@link RcsAssistantEventResponse} object if success
     * @fail {Error} return Error
     */
    create(params = {}) {
        let client = this[clientKey];
        let idField = this[idKey];
        let action = this[actionKey];

        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new RcsAssistantEventResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}