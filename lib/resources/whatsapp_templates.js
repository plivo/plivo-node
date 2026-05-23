import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const action = 'WhatsApp/Template/';
const idField = 'templateId';
let actionKey = Symbol('api action');
let klassKey = Symbol('constructor');
let idKey = Symbol('id filed');
let clientKey = Symbol('make api call');

export class WhatsAppTemplateCreateResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.templateId = params.templateId;
        this.templateName = params.templateName;
        this.templateStatus = params.templateStatus;
        this.templateCategory = params.templateCategory;
        this.templateLanguage = params.templateLanguage;
        this.status = params.status;
        this.message = params.message;
        this.error = params.error;
    }
}

export class WhatsAppTemplateUpdateResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.templateId = params.templateId;
        this.templateName = params.templateName;
        this.templateStatus = params.templateStatus;
        this.templateCategory = params.templateCategory;
        this.templateLanguage = params.templateLanguage;
        this.status = params.status;
        this.message = params.message;
        this.error = params.error;
    }
}

export class WhatsAppTemplateGetResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.templateId = params.templateId;
        this.name = params.name;
        this.category = params.category;
        this.language = params.language;
        this.status = params.status;
        this.components = params.components;
        this.qualityScore = params.qualityScore;
        this.rejectedReason = params.rejectedReason;
        this.message = params.message;
        this.error = params.error;
    }
}

export class WhatsAppTemplateListResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.objects = params.objects;
        this.meta = params.meta;
        this.status = params.status;
        this.message = params.message;
        this.error = params.error;
    }
}

/**
 * Represents a WhatsAppTemplate
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
 * Represents a WhatsAppTemplate Interface
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
        this[klassKey] = WhatsAppTemplate;
        this[idKey] = idField;
    }

    /**
     * Create a WhatsApp template
     * @method
     * @param {string} wabaId - WhatsApp Business Account ID
     * @param {object} [params] - optional params
     * @param {string} [params.name] - Template name
     * @param {string} [params.category] - Template category
     * @param {string} [params.language] - Template language
     * @param {Array}  [params.components] - Template components
     * @param {boolean} [params.allow_category_change] - Whether to allow category change
     * @promise {object} return {@link WhatsAppTemplateCreateResponse} object if success
     * @fail {Error} return Error
     */
    create(wabaId, params = {}) {
        let errors = validate([{
            field: 'waba_id',
            value: wabaId,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('POST', action + wabaId + '/', params)
                .then(response => {
                    resolve(new WhatsAppTemplateCreateResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Update an existing WhatsApp template
     * @method
     * @param {string} wabaId - WhatsApp Business Account ID
     * @param {string} templateId - Template ID to update
     * @param {object} [params] - optional params
     * @param {string} [params.name] - Template name
     * @param {string} [params.category] - Template category
     * @param {string} [params.language] - Template language
     * @param {Array}  [params.components] - Template components
     * @param {boolean} [params.allow_category_change] - Whether to allow category change
     * @promise {object} return {@link WhatsAppTemplateUpdateResponse} object if success
     * @fail {Error} return Error
     */
    update(wabaId, templateId, params = {}) {
        let errors = validate([{
                field: 'waba_id',
                value: wabaId,
                validators: ['isRequired']
            },
            {
                field: 'template_id',
                value: templateId,
                validators: ['isRequired']
            }
        ]);

        if (errors) {
            return errors;
        }

        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('POST', action + wabaId + '/' + templateId + '/', params)
                .then(response => {
                    resolve(new WhatsAppTemplateUpdateResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Retrieve a WhatsApp template by its ID
     * @method
     * @param {string} wabaId - WhatsApp Business Account ID
     * @param {string} templateId - Template ID to retrieve
     * @promise {object} return {@link WhatsAppTemplateGetResponse} object if success
     * @fail {Error} return Error
     */
    get(wabaId, templateId) {
        let errors = validate([{
                field: 'waba_id',
                value: wabaId,
                validators: ['isRequired']
            },
            {
                field: 'template_id',
                value: templateId,
                validators: ['isRequired']
            }
        ]);

        if (errors) {
            return errors;
        }

        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('GET', action + wabaId + '/' + templateId + '/')
                .then(response => {
                    resolve(new WhatsAppTemplateGetResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * List WhatsApp templates for the given WABA
     * @method
     * @param {string} wabaId - WhatsApp Business Account ID
     * @param {object} [params] - optional params
     * @param {string} [params.template_name] - Filter by template name
     * @param {number} [params.limit] - Page size (default 20)
     * @param {number} [params.offset] - Page offset (default 0)
     * @promise {object} return {@link WhatsAppTemplateListResponse} object if success
     * @fail {Error} return Error
     */
    list(wabaId, params = {}) {
        let errors = validate([{
            field: 'waba_id',
            value: wabaId,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('GET', action + wabaId + '/', params)
                .then(response => {
                    resolve(new WhatsAppTemplateListResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Delete a WhatsApp template by ID and name
     * @method
     * @param {string} wabaId - WhatsApp Business Account ID
     * @param {string} templateId - Template ID to delete
     * @param {string} name - Template name
     * @promise {boolean} return true if success
     * @fail {Error} return Error
     */
    delete(wabaId, templateId, name) {
        let errors = validate([{
                field: 'waba_id',
                value: wabaId,
                validators: ['isRequired']
            },
            {
                field: 'template_id',
                value: templateId,
                validators: ['isRequired']
            },
            {
                field: 'name',
                value: name,
                validators: ['isRequired']
            }
        ]);

        if (errors) {
            return errors;
        }

        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('DELETE', action + wabaId + '/' + templateId + '/', {
                    name: name
                })
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}