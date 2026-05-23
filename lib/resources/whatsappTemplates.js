import {
    PlivoResource,
    PlivoResourceInterface,
    PlivoGenericResponse
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const action = 'WhatsApp/Template/';
const idField = 'templateId';
const clientKey = Symbol('make api call');
const actionKey = Symbol('api action');
const idKey = Symbol('id field');

export class WhatsAppTemplateResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
        this.templateId = params.templateId;
    }
}

/**
 * Represents a WhatsApp Template
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class WhatsAppTemplate extends PlivoResource {
    constructor(client, data = {}) {
        super(action, WhatsAppTemplate, idField, client);
        this[actionKey] = action;
        this[clientKey] = client;

        if (idField in data) {
            this.id = data[idField];
        }

        extend(this, data);
    }
}

/**
 * Represents a WhatsApp Template Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class WhatsAppTemplateInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, WhatsAppTemplate, idField, client);
        extend(this, data);
        this[clientKey] = client;
        this[actionKey] = action;
        this[idKey] = idField;
    }

    /**
     * Create a WhatsApp Template
     * @method
     * @param {string} wabaId - WABA ID associated with the template
     * @param {object} params - parameters for creating the template
     * @param {string} [params.applicationId] - Optional application ID associated with the WhatsApp template
     * @promise {object} return {@link WhatsAppTemplateResponse} object if success
     * @fail {Error} return Error
     */
    create(wabaId, params = {}) {
        let errors = validate([{
            field: 'wabaId',
            value: wabaId,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let requestParams = Object.assign({}, params);

        if (requestParams.applicationId !== undefined) {
            requestParams.application_id = requestParams.applicationId;
            delete requestParams.applicationId;
        }

        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('POST', action + wabaId + '/', requestParams)
                .then(response => {
                    resolve(new WhatsAppTemplateResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Update a WhatsApp Template
     * @method
     * @param {string} wabaId - WABA ID associated with the template
     * @param {string} templateId - ID of the template to update
     * @param {object} params - parameters for updating the template
     * @param {string} [params.applicationId] - Optional application ID associated with the WhatsApp template
     * @promise {object} return {@link WhatsAppTemplateResponse} object if success
     * @fail {Error} return Error
     */
    update(wabaId, templateId, params = {}) {
        let errors = validate([{
            field: 'wabaId',
            value: wabaId,
            validators: ['isRequired']
        }, {
            field: 'templateId',
            value: templateId,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let requestParams = Object.assign({}, params);

        if (requestParams.applicationId !== undefined) {
            requestParams.application_id = requestParams.applicationId;
            delete requestParams.applicationId;
        }

        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('POST', action + wabaId + '/' + templateId + '/', requestParams)
                .then(response => {
                    resolve(new WhatsAppTemplateResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Get a WhatsApp Template by WABA ID
     * @method
     * @param {string} wabaId - WABA ID associated with the template
     * @promise {object} return {@link WhatsAppTemplate} object if success
     * @fail {Error} return Error
     */
    get(wabaId) {
        let errors = validate([{
            field: 'wabaId',
            value: wabaId,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('GET', action + wabaId + '/')
                .then(response => {
                    resolve(new WhatsAppTemplate(client, response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * List WhatsApp Templates
     * @method
     * @param {object} [params] - optional filter parameters
     * @promise {object[]} return list of {@link WhatsAppTemplate} objects if success
     * @fail {Error} return Error
     */
    list(params = {}) {
        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('GET', action, params)
                .then(response => {
                    let objects = [];
                    Object.defineProperty(objects, 'meta', {
                        value: response.body.meta,
                        enumerable: true
                    });
                    Object.defineProperty(objects, 'apiId', {
                        value: response.body.apiId,
                        enumerable: true
                    });
                    (response.body.objects || []).forEach(item => {
                        objects.push(new WhatsAppTemplate(client, item));
                    });
                    resolve(objects);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Delete a WhatsApp Template
     * @method
     * @param {string} wabaId - WABA ID associated with the template
     * @param {string} templateId - ID of the template to delete
     * @promise {boolean} return true if success
     * @fail {Error} return Error
     */
    delete(wabaId, templateId) {
        let errors = validate([{
            field: 'wabaId',
            value: wabaId,
            validators: ['isRequired']
        }, {
            field: 'templateId',
            value: templateId,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('DELETE', action + wabaId + '/' + templateId + '/')
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}