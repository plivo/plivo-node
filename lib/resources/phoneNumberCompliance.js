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
        this.requirementId = params.requirementId;
        this.countryIso = params.countryIso;
        this.numberType = params.numberType;
        this.userType = params.userType;
        this.documentTypes = params.documentTypes;
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
     * @param {string} [params.countryIso] - Country ISO code
     * @param {string} [params.numberType] - Number type
     * @param {string} [params.userType] - User type
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
        this.countryIso = params.countryIso;
        this.numberType = params.numberType;
        this.userType = params.userType;
        this.callbackUrl = params.callbackUrl;
        this.callbackMethod = params.callbackMethod;
        this.rejectionReason = params.rejectionReason;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.endUser = params.endUser;
        this.documents = params.documents;
        this.linkedNumbers = params.linkedNumbers;
    }
}

export class CreatePhoneNumberComplianceResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.complianceId = params.complianceId;
        this.message = params.message;
    }
}

export class ListPhoneNumberComplianceResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.meta = params.meta;
        this.compliances = params.compliances;
    }
}

export class UpdatePhoneNumberComplianceResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
        this.compliance = params.compliance;
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
            client('PATCH', action + id + '/', params)
                .then(response => {
                    extend(that, response.body);
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
     * @param {object} [params] - optional query params
     * @param {string} [params.expand] - Comma-separated related objects to include (end_user, documents, linked_numbers)
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
                    let body = response.body;
                    // The API wraps the compliance data inside a "compliance" key.
                    // Unwrap it and merge with the top-level apiId so the
                    // response constructor can read all fields flat.
                    if (body && body.compliance && typeof body.compliance === 'object') {
                        body = Object.assign({apiId: body.apiId}, body.compliance);
                    }
                    resolve(new PhoneNumberComplianceResponse(body, client));
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
     * @param {string} [params.status] - Filter by status (draft, submitted, accepted, rejected, suspended, expired)
     * @param {string} [params.countryIso] - Filter by country ISO code (e.g., IN, DE, US)
     * @param {string} [params.numberType] - Filter by number type (local, mobile, tollfree)
     * @param {string} [params.userType] - Filter by user type (individual, business)
     * @param {string} [params.alias] - Filter by alias
     * @param {string} [params.expand] - Comma-separated related objects to include (end_user, documents, linked_numbers)
     * @param {integer} [params.offset] - No of value items by which results should be offset
     * @param {integer} [params.limit] - Max results per page (default 20, max 100)
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
     * Create a phone number compliance application
     * @method
     * @param {object} params
     * @param {object} params.data - Compliance application data (JSON stringified internally). Contains:
     *   country_iso (string, required), number_type (string, required), alias (string, required),
     *   end_user (object, required: {type, name, email, address_line1, city, state, postal_code, country}),
     *   documents (array, required: [{document_type_id, data_fields: {key: value}}]),
     *   callback_url (string, optional), callback_method (string, optional: GET or POST)
     * @param {Array} [params.documents] - Array of file objects [{file: '/path/to/file.pdf'}] for document uploads.
     *   Each entry corresponds to the document at the same index in data.documents.
     *   Required when document type has proof_required: true.
     * @promise {object} return {@link CreatePhoneNumberComplianceResponse} object
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
        this.totalCount = params.totalCount;
        this.updatedCount = params.updatedCount;
        this.report = params.report;
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
     * Bulk link phone numbers to compliance applications
     * @method
     * @param {object} params
     * @param {Array} params.numbers - Array of objects, each with:
     *   number (string, required: phone number in E.164 format),
     *   compliance_application_id (string, required: UUID of an accepted compliance application)
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
