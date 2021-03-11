import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'ComplianceDocument/';
const idField = 'complianceDocumentId';

export class ComplianceDocumentResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.documentTypeId = params.documentTypeId;
        this.documentId = params.documentId;
        this.endUserId = params.endUserId;
        this.alias = params.alias;
        this.metaInformation = params.metaInformation;
        this.fileName = params.fileName,
        this.createdAt = params.createdAt;
    }
}

export class CreateComplianceDocumentResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.documentTypeId = params.documentTypeId;
        this.documentId = params.documentId;
        this.endUserId = params.endUserId;
        this.alias = params.alias;
        this.message = params.message;
        this.metaInformation = params.metaInformation;
        this.fileName = params.fileName,
        this.createdAt = params.createdAt;
    }
}

export class ListComplianceDocumentsResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.meta = params.meta;
        this.objects = params.objects;
    }
}

export class UpdateComplianceDocumentResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
    }
}

export class ComplianceDocument extends PlivoResource {
    constructor(client, data = {}) {
        super(action, ComplianceDocument, idField, client);
        if (idField in data) {
            this.id = data[idField];
        }
        this[clientKey] = client;
        extend(this, data);
    }

    /**
    * update Compliance Document
    * @method
    * @param {string} id - compliance document id of the document.
    * @param {object} params - optional params array of updated values
    * @promise {object} return {@link ComplianceDocument} object if success
    * @fail {Error} return Error
    */
    update(params, id) {
        let client = this[clientKey];
        let that = this;
        return new Promise((resolve, reject) => {
            if ((params.file) != 'undefined') {
                params.multipart = true;
            }

            client('POST', action + id + '/', params)
                .then(response => {
                    extend(that, response.body);
                    extend(that, params);
                    resolve(new UpdateComplianceDocumentResponse(that));
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

    /**
    * delete an Compliance Document
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
 * Represents a Compliance Application interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class ComplianceDocumentInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, ComplianceDocument, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * get compliance document by given id
     * @method
     * @param {string} id - id of the document
     * @promise {object} return {@link ComplianceDocument} object
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
                    let object = new ComplianceDocumentResponse(response.body, client);
                    Object.keys(object).forEach(key => object[key] === undefined && delete object[key]);
                    resolve(object);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * list all documents
     * @method
     * @param {object} params - params containing options to list compliance documents by.
     */
    list(params = {}) {
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('GET', action, params)
                .then(response => {
                    resolve(new ListComplianceDocumentsResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Create a complaince document
     * @method
     * @param {object} params
     * @param {string} [params.complianceRequirementId] - compliance requirement ID.
     * @param {string} [params.endUserId] - End user ID.
     * @param {string} [params.alias] - Alias
     * @param {string} [params.documentTypeId] - Document Type ID
     * @param {string} [params.file] - File array of the files to be uploaded
     * @fail {Error} return Error
     */
    create(params = {}) {
        let client = this[clientKey];
        let errors = validate([
            { field: 'endUserId', value: params.endUserId, validators: ['isRequired', 'isString'] }
        ]);

        errors = validate([
            { field: 'documentTypeId', value: params.documentTypeId, validators: ['isRequired', 'isString'] }
        ]);

        errors = validate([
            { field: 'alias', value: params.alias, validators: ['isRequired', 'isString'] }
        ]);

        if (errors) {
            return errors;
        }

        return new Promise((resolve, reject) => {
            params.multipart = true;
            client('POST', action, params)
                .then(response => {
                    resolve(new CreateComplianceDocumentResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    /**
    * update Compliance Document
    * @method
    * @param {string} id - compliance document id of the document.
    * @param {object} params - optional params array of updated values
    * @promise {object} return {@link ComplianceDocument} object if success
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
        return new ComplianceDocument(this[clientKey], {
          id: id
        }).update(params, id);
    }

    /**
    * delete a Compliance Document
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
        return new ComplianceDocument(this[clientKey], {
          id: id
        }).delete();
    }
}