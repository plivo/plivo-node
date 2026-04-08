import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'PhoneNumber/Compliance/';
const requirementsAction = 'PhoneNumber/Compliance/Requirements/';
const linkAction = 'PhoneNumber/Compliance/Link/';
const idField = 'complianceId';

// ---- Requirements ----

export class PhoneNumberComplianceRequirementResponse {
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

/**
 * Represents a Phone Number Compliance Requirement Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhoneNumberComplianceRequirementInterface extends PlivoResourceInterface {

    constructor(client, data = {}) {
        super(requirementsAction, PhoneNumberComplianceRequirementInterface, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * get phone number compliance requirements
     * @method
     * @param {object} params - params to get requirements
     * @param {string} [params.countryIso2] - Country ISO2 code
     * @param {string} [params.numberType] - Number type
     * @param {string} [params.endUserType] - End user type
     * @param {string} [params.phoneNumber] - Phone number
     * @promise {object} return {@link PhoneNumberComplianceRequirementResponse} object
     * @fail {Error} return Error
     */
    get(params = {}) {
        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('GET', requirementsAction, params)
                .then(response => {
                    resolve(new PhoneNumberComplianceRequirementResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

// ---- Phone Number Compliance (main CRUD) ----

export class PhoneNumberComplianceResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.complianceId = params.complianceId;
        this.alias = params.alias;
        this.status = params.status;
        this.endUserType = params.endUserType;
        this.endUserId = params.endUserId;
        this.countryIso2 = params.countryIso2;
        this.numberType = params.numberType;
        this.complianceRequirementId = params.complianceRequirementId;
        this.documents = params.documents;
        this.data = params.data;
        this.rejectionReason = params.rejectionReason;
        this.createdAt = params.createdAt;
    }
}

export class CreatePhoneNumberComplianceResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.complianceId = params.complianceId;
        this.alias = params.alias;
        this.status = params.status;
        this.endUserType = params.endUserType;
        this.endUserId = params.endUserId;
        this.countryIso2 = params.countryIso2;
        this.numberType = params.numberType;
        this.message = params.message;
        this.complianceRequirementId = params.complianceRequirementId;
        this.documents = params.documents;
        this.data = params.data;
        this.createdAt = params.createdAt;
    }
}

export class ListPhoneNumberComplianceResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.meta = params.meta;
        this.objects = params.objects;
    }
}

export class UpdatePhoneNumberComplianceResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
    }
}

export class PhoneNumberCompliance extends PlivoResource {
    constructor(client, data = {}) {
        super(action, PhoneNumberCompliance, idField, client);
        if (idField in data) {
            this.id = data[idField];
        }
        this[clientKey] = client;
        extend(this, data);
    }

    /**
    * update PhoneNumberCompliance
    * @method
    * @param {string} id - id to update
    * @param {object} params
    * @promise {object} return {@link PhoneNumberCompliance} object if success
    * @fail {Error} return Error
    */
    update(params, id) {
        let client = this[clientKey];
        let that = this;

        // Handle multipart with documents
        if (params.documents && Array.isArray(params.documents)) {
            let documents = params.documents;
            for (let i = 0; i < documents.length; i++) {
                if (documents[i].file) {
                    params['documents[' + i + '].file'] = documents[i].file;
                }
            }
            delete params.documents;
        }
        if (params.data) {
            params.data = JSON.stringify(params.data);
        }
        params.multipart = true;

        return new Promise((resolve, reject) => {
            client('POST', action + id + '/', params)
                .then(response => {
                    extend(that, response.body);
                    extend(that, params);
                    resolve(new UpdatePhoneNumberComplianceResponse(that));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
    * delete a PhoneNumberCompliance
    * @method
    * @param {string} id - id to delete
    * @promise {boolean} return true if success
    * @fail {Error} return Error
    */
    delete() {
        let client = this[clientKey];
        let id = this.id;

        return new Promise((resolve, reject) => {
            client('DELETE', action + id + '/')
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

/**
 * Represents a Phone Number Compliance Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhoneNumberComplianceInterface extends PlivoResourceInterface {

    constructor(client, data = {}) {
        super(action, PhoneNumberCompliance, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * get phone number compliance by given id
     * @method
     * @param {string} id - id of the compliance
     * @param {object} params - optional query params
     * @promise {object} return {@link PhoneNumberComplianceResponse} object
     * @fail {Error} return Error
     */
    get(id, params = {}) {
        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            if (action !== '' && !id) {
                reject(new Error(idField + ' must be set'));
            }
            client('GET', action + (id ? id + '/' : ''), params)
                .then(response => {
                    resolve(new PhoneNumberComplianceResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * list phone number compliances
     * @method
     * @param {object} params - params to list compliances
     * @param {string} [params.status] - Status of the compliance
     * @param {string} [params.endUserId] - End user ID
     * @param {string} [params.numberType] - Number Type
     * @param {integer} [params.offset] - No of value items by which results should be offset
     * @param {integer} [params.limit] - No of value items by which results should be offset
     */
    list(params = {}) {
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('GET', action, params)
                .then(response => {
                    resolve(new ListPhoneNumberComplianceResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Create a phone number compliance
     * @method
     * @param {object} params
     * @param {string} [params.complianceRequirementId] - compliance requirement ID
     * @param {string} [params.endUserId] - End user ID
     * @param {string} [params.alias] - Alias
     * @param {string} [params.endUserType] - End user type
     * @param {string} [params.countryIso2] - Country ISO2
     * @param {string} [params.numberType] - Number Type
     * @param {object} [params.data] - Data object (will be JSON stringified)
     * @param {Array}  [params.documents] - Array of document objects with file paths
     * @fail {Error} return Error
     */
    create(params = {}) {
        let client = this[clientKey];

        // Handle multipart with documents
        if (params.documents && Array.isArray(params.documents)) {
            let documents = params.documents;
            for (let i = 0; i < documents.length; i++) {
                if (documents[i].file) {
                    params['documents[' + i + '].file'] = documents[i].file;
                }
            }
            delete params.documents;
        }
        if (params.data) {
            params.data = JSON.stringify(params.data);
        }
        params.multipart = true;

        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new CreatePhoneNumberComplianceResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    /**
    * update PhoneNumberCompliance
    * @method
    * @param {string} id - id to update
    * @param {object} params
    * @param {object} [params.data] - Data object (will be JSON stringified)
    * @param {Array}  [params.documents] - Array of document objects with file paths
    * @promise {object} return {@link PhoneNumberCompliance} object if success
    * @fail {Error} return Error
    */
    update(id, params) {
        let errors = validate([{
          field: 'id',
          value: id,
          validators: ['isRequired']
        }]);

        if (errors) {
          return errors;
        }
        return new PhoneNumberCompliance(this[clientKey], {
          id: id
        }).update(params, id);
    }

    /**
    * delete PhoneNumberCompliance
    * @method
    * @param {string} id - id to delete
    * @promise {boolean} return true if success
    * @fail {Error} return Error
    */
    delete(id) {
        let errors = validate([{
          field: 'id',
          value: id,
          validators: ['isRequired']
        }]);

        if (errors) {
          return errors;
        }
        return new PhoneNumberCompliance(this[clientKey], {
          id: id
        }).delete();
    }
}

// ---- Link ----

export class PhoneNumberComplianceLinkResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
    }
}

/**
 * Represents a Phone Number Compliance Link Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhoneNumberComplianceLinkInterface extends PlivoResourceInterface {

    constructor(client, data = {}) {
        super(linkAction, PhoneNumberComplianceLinkInterface, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * Link a phone number to a compliance
     * @method
     * @param {object} params
     * @param {string} [params.complianceId] - Compliance ID
     * @param {string} [params.phoneNumber] - Phone number
     * @promise {object} return {@link PhoneNumberComplianceLinkResponse} object
     * @fail {Error} return Error
     */
    link(params = {}) {
        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('POST', linkAction, params)
                .then(response => {
                    resolve(new PhoneNumberComplianceLinkResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
