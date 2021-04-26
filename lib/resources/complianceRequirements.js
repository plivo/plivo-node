import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'ComplianceRequirement/';
const idField = 'ComplianceRequirementId';


export class ComplianceRequirementResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.complianceRequirementId = params.complianceRequirementId;
        this.countryIso2 = params.countryIso2;
        this.numberType = params.numberType;
        this.endUserType = params.endUserType;
        this.acceptableDocumentTypes = params.acceptableDocumentTypes;
    }
}

export class ComplianceRequirement extends PlivoResource {
    constructor(client, data = {}) {
        super(action, ComplianceRequirement, idField, client);
        if (idField in data) {
            this.id = data[idField];
        }
        this[clientKey] = client;
        extend(this, data);
    }
}

/**
 * Represents a Compliance Requirement
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class ComplianceRequirementInterface extends PlivoResourceInterface {

    constructor(client, data = {}) {
        super(action, ComplianceRequirement, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * get compliance requirement by given id
     * @method
     * @param {string} id - id of the compliance requirement
     * @promise {object} return {@link ComplianceRequirement} object
     * @fail {Error} return Error
     */
    get(id) {
        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            if (action !== '' && !id) {
                reject(new Error(this[idKey] + ' must be set'));
            }
            client('GET', action + (id ? id + '/' : ''))
                .then(response => {
                    resolve(new ComplianceRequirementResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * list compliance requirements
     * @method
     * @param {object} params - params to list endusers
     * @param {string} [params.countryIso2] - Document Type ID of the document id.
     * @param {string} [params.numberType] - Document name of the document if present.
     * @param {string} [params.phoneNumber] - Description of the document type.
     * @param {string} [params.endUserType] - Information about the document type.
     * A combination of countryIso2, numberType, endUserType OR
     * phoneNumber, endUserType can be used to fetch compliance requirements.
     */
    list(params = {}) {
        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('GET', action, params)
                .then(response => {
                    resolve(new ComplianceRequirementResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}