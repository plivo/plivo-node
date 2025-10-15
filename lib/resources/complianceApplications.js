import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'ComplianceApplication/';
const idField = 'complianceApplicationId';

export class ComplianceApplicationResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.complianceApplicationId = params.complianceApplicationId;
        this.alias = params.alias;
        this.status = params.status;
        this.endUserType = params.endUserType;
        this.endUserId = params.endUserId;
        this.countryIso2 = params.countryIso2;
        this.numberType = params.numberType;
        this.complianceRequirementId= params.complianceRequirementId;
        this.documents = params.documents;
        this.rejectionReason = params.rejectionReason;
        this.createdAt = params.createdAt;
    }
}

export class CreateComplianceApplicationResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.complianceApplicationId = params.complianceApplicationId;
        this.alias = params.alias;
        this.status = params.status;
        this.endUserType = params.endUserType;
        this.endUserId = params.endUserId;
        this.countryIso2 = params.countryIso2;
        this.numberType = params.numberType;
        this.message = params.message;
        this.complianceRequirementId= params.complianceRequirementId;
        this.documents = params.documents;
        this.rejectionReason = params.rejectionReason;
        this.createdAt = params.createdAt;
    }
}

export class ListComplianceApplicationResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.meta = params.meta;
        this.objects = params.objects;
    }
}

export class UpdateComplianceApplicationResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
    }
}

export class ComplianceApplication extends PlivoResource {
    constructor(client, data = {}) {
        super(action, ComplianceApplication, idField, client);
        if (idField in data) {
            this.id = data[idField];
        }
        this[clientKey] = client;
        extend(this, data);
    }

    /**
    * update ComplianceApplication
    * @method
    * @param {string} id - id to update
    * @param {object} params
    * @param {string} [params.documentIds] - Document IDs
    * @promise {object} return {@link ComplianceApplication} object if success
    * @fail {Error} return Error
    */
    update(params, id) {
        let client = this[clientKey];
        let that = this;
        return new Promise((resolve, reject) => {
            client('POST', action + id + '/', params)
                .then(response => {
                    extend(that, response.body);
                    extend(that, params);
                    resolve(new UpdateComplianceApplicationResponse(that));
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

    /**
    * delete an Compliance application
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
export class ComplianceApplicationInterface extends PlivoResourceInterface {

    constructor(client, data = {}) {
        super(action, ComplianceApplication, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * get application by given id
     * @method
     * @param {string} id - id of application
     * @promise {object} return {@link EndUser} object
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
                    resolve(new ComplianceApplicationResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * list all applications
     * @method
     * @param {object} params - params to list endusers
     * @param {string} [params.status] - Status of the application
     * @param {string} [params.endUserId] - End user ID related to application
     * @param {string} [params.numberType] -Number Type related to application
     * @param {integer} [params.offset] - No of value items by which results should be offset
     * @param {integer} [params.limit] - No of value items by which results should be offset
     */
    list(params = {}) {
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('GET', action, params)
                .then(response => {
                    resolve(new ListComplianceApplicationResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Create a complaince application
     * @method
     * @param {object} params
     * @param {string} [params.complianceRequirementId] - compliance requirement ID.
     * @param {string} [params.endUserId] - End user ID.
     * @param {string} [params.alias] - Alias
     * @param {string} [params.documentIds] - Document IDs
     * @param {string} [params.endUserType] - End user type
     * @param {string} [params.countryIso2] - CountryISo2
     * @param {string} [params.numberType] - Number Type
     * @fail {Error} return Error
     */
    create(params = {}) {
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new CreateComplianceApplicationResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    /**
    * update ComplianceApplication
    * @method
    * @param {string} id - id to update
    * @param {object} params
    * @param {string} [params.documentIds] - Document IDs
    * @promise {object} return {@link ComplianceApplication} object if success
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
        return new ComplianceApplication(this[clientKey], {
          id: id
        }).update(params, id);
    }

    /**
    * delete ComplianceApplication
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
        return new ComplianceApplication(this[clientKey], {
          id: id
        }).delete();
    }

    /**
     * submit an application by given id
     * @method
     * @param {string} id - id of application
     * @fail {Error} return Error
     */
    submit(id) {
        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            if (action !== '' && !id) {
                reject(new Error(this[idKey] + ' must be set'));
            }

            client('POST', action + (id ? id + '/Submit/' : ''))
                .then(response => {
                    resolve(new ComplianceApplicationResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    } 
}