import {
    PlivoResource,
    PlivoResourceInterface,
    PlivoGenericResponse
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const action = 'Verify/App/templates/';
const idField = 'templateUuid';

let actionKey = Symbol('api action');
let klassKey = Symbol('constructor');
let idKey = Symbol('id filed');
let clientKey = Symbol('make api call');

export class VerifyTemplate {
    constructor(params) {
        params = params || {};
        this.templateUuid = params.templateUuid;
        this.text = params.text;
        this.friendlyName = params.friendlyName;
        this.locale = params.locale;
    }
}

export class VerifyAppTemplatesListResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        let templateList = [];
        if (params.templates && Array.isArray(params.templates)) {
            params.templates.forEach(item => {
                templateList.push(new VerifyTemplate(item));
            });
        }
        this.templates = templateList;
    }
}

/**
 * Represents a VerifyAppTemplate
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class VerifyAppTemplate extends PlivoResource {
    constructor(client, data = {}) {
        super(action, VerifyAppTemplate, idField, client);
        this[actionKey] = action;
        this[clientKey] = client;

        if (idField in data) {
            this.id = data[idField];
        }

        extend(this, data);
    }
}

/**
 * Represents a VerifyAppTemplates Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class VerifyAppTemplateInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, VerifyAppTemplate, idField, client);
        extend(this, data);
        this[clientKey] = client;
        this[actionKey] = action;
        this[klassKey] = VerifyAppTemplate;
        this[idKey] = idField;
    }

    /**
     * List available SMS OTP templates for the account including account-owned and Plivo system defaults.
     * @method
     * @param {object} [params] - optional query params
     * @promise {object} return {@link VerifyAppTemplatesListResponse} object if success
     * @fail {Error} return Error
     */
    list(params = {}) {
        let client = this[clientKey];
        let act = this[actionKey];

        return new Promise((resolve, reject) => {
            client('GET', act, params)
                .then(response => {
                    resolve(new VerifyAppTemplatesListResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}