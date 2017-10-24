import {extend, validate} from '../utils/common.js';
import {PlivoResource, PlivoResourceInterface} from '../base';

const clientKey = Symbol();
const action = 'Endpoint/';
const idField = 'endpointId';

/**
 * Represents a Endpoint
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

export class Endpoint extends PlivoResource {
  constructor(client, data = {}) {
    super(action, Endpoint, idField, client);

    if (idField in data) {
      this.id = data[idField];
    }

    extend(this, data);
    this[clientKey] = client;
  }

/**
 * update Endpoint
 * @method
 * @param {object} params
 * @param {string} [params.username] - username to update
 * @param {string} [params.password] - password to update
 * @param {string} [params.alias] - alias to update
 * @param {string} [params.appId] - app id to update
 * @promise {object} return {@link Endpoint} object if success
 * @fail {Error} return Error
 */
  update(params) {
    return super.update(params);
  }

/**
 * delete Endpoint
 * @method
 * @promise {boolean} return true if success
 * @fail {Error} return Error
 */
  delete() {
    return super.delete();
  }

}
/**
 * Represents a Endpoint Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

export class EndpointInterface extends PlivoResourceInterface {

  constructor(client, data = {}) {
    super(action, Endpoint, idField, client);
    extend(this, data);

    this[clientKey] = client;
  }

/**
 * Get Endpoint by given id
 * @method
 * @param {string} id - id of endpoint
 * @promise {object} return {@link Endpoint} object if success
 * @fail {Error} return Error
 */
  get(id) {
    return super.get(id);
  }

/**
 * Create Endpoint
 * @method
 * @param {string} username - username to create
 * @param {string} passwowrd - password to create
 * @param {string} alias - alias to create
 * @param {string} appId - app id to create
 * @promise {object} return {@link PlivoGenericResponse} object if success
 * @fail {Error} return Error
 */
  create(username, password, alias, appId) {
    let params = {};

    let errors = validate([
      {field: 'username', value: username, validators: ['isRequired']},
      {field: 'password', value: password, validators: ['isRequired']},
      {field: 'alias', value: alias, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }

    params.username = username;
    params.password = password;
    params.alias = alias;
    if (appId) {
      params.app_id = appId;
    }

    return super.create(params);
  }

/**
 * update Endpoint
 * @method
 * @param {string} id - id to update
 * @param {object} params
 * @param {string} [params.username] - username to update
 * @param {string} [params.password] - password to update
 * @param {string} [params.alias] - alias to update
 * @param {string} [params.appId] - app id to update
 * @promise {object} return {@link Endpoint} object if success
 * @fail {Error} return Error
 */
  update(id, params) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Endpoint(this[clientKey], {
      id: id
    }).update(params);
  }

/**
 * delete Endpoint
 * @method
 * @param {string} id - id to delete
 * @promise {boolean} return true if success
 * @fail {Error} return Error
 */
  delete(id) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Endpoint(this[clientKey], {
      id: id
    }).delete();
  }
}
