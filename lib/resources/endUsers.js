import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'EndUser/';
const idField = 'endUserId';

export class EndUsersResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.endUserId = params.endUserId;
        this.endUserType = params.endUserType;
        this.name = params.name;
        this.lastName = params.lastName;
        this.createdAt = params.createdAt;
    }
}

export class CreateEndUsersResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.endUserId = params.endUserId;
        this.endUserType = params.endUserType;
        this.name = params.name;
        this.lastName = params.lastName;
        this.message = params.message;
        this.createdAt = params.createdAt;
    }
}

export class ListEndUsersResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.meta = params.meta;
        this.objects = params.objects;
    }
}

export class UpdateEndUsersResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
    }
}

export class EndUser extends PlivoResource {
    constructor(client, data = {}) {
        super(action, EndUser, idField, client);
        if (idField in data) {
            this.id = data[idField];
        }
        this[clientKey] = client;
        extend(this, data);
    }

    /**
     * update end user
     * @method
     * @param {object} params - to update end user
     * @param {string} [params.name] - Name of the endUser if present.
     * @param {string} [params.last_name] - Last name of the endUser if present.
     * @param {string} [params.end_user_type] - Type of the end user.
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
                    resolve(new UpdateEndUsersResponse(that));
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

    /**
    * delete an EndUser
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
 * Represents a End Users interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class EndUserInterface extends PlivoResourceInterface {

    constructor(client, data = {}) {
        super(action, EndUser, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * get an enduser by given id
     * @method
     * @param {string} id - id of the endUser
     * @promise {object} return {@link EndUser} object
     * @fail {Error} return Error
     */
    get(id) {
        let errors = validate([
            {field: 'id', value: id, validators: ['isRequired']}
        ]);

        if (errors) {
          return errors;
        }

        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            if (action !== '' && !id) {
                reject(new Error(this[idKey] + ' must be set'));
            }
            client('GET', action + (id ? id + '/' : ''))
                .then(response => {
                    resolve(new EndUsersResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * list EndUsers
     * @method
     * @param {object} params - params to list endusers
     * @param {string} [params.name] - Name of the endUser, if present.
     * @param {string} [params.lastName] - Last name of the endUser, if present.
     * @param {string} [params.endUserType] - Type of an end user.
     * @param {integer} [params.offset] - No of value items by which results should be offset
     * @param {integer} [params.limit] - No of value items by which results should be offset
     */
    list(params = {}) {
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('GET', action, params)
                .then(response => {
                    resolve(new ListEndUsersResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Create end user
     * @method
     * @param {object} params - to update end user
     * @param {string} [params.name] - Name of the endUser if present.
     * @param {string} [params.lastName] - Last name of the endUser if present.
     * @param {string} [params.endUserType] - Type of the end user.
     * @fail {Error} return Error
     */
    create(params = {}) {
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new CreateEndUsersResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    /**
    * update end user
    * @method
    * @param {object} params - to update end user
    * @param {string} [params.name] - Name of the endUser if present.
    * @param {string} [params.lastName] - Last name of the endUser if present.
    * @param {string} [params.endUserType] - Type of the end user.
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
    
        return new EndUser(this[clientKey], {
          id: id
        }).update(params, id);
    }

    /**
    * delete EndUser
    * @method
    * @param {string} id - id to delete an enduser with
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
    
        return new EndUser(this[clientKey], {
          id: id
        }).delete();
    }
}