import {
  PlivoResource,
  PlivoResourceInterface
} from '../base';
import {
  extend,
  validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'Endpoint/';
const idField = 'endpointId';


export class UpdateEndpointResponse {
  constructor(params) {
      params = params || {};
      this.apiId = params.apiId;
      this.message = params.message;
      this.alias = params.alias;

  }
}
export class RetrieveEndpointResponse {
  constructor(params) {
      params = params || {};
      this.apiId = params.apiId;
      this.alias = params.alias;
      this.application = params.application;
      this.endpointId = params.endpointId;
      this.password = params.password;
      this.resourceUri = params.resourceUri;
      this.sipRegistered = params.sipRegistered;
      this.sipUri = params.sipUri;
      this.subAccount = params.subAccount;
      this.username = params.username;
  }
}

export class ListAllEndpointResponse {
  constructor(params) {
      params = params || {};
      this.alias = params.alias;
      this.application = params.application;
      this.endpointId = params.endpointId;
      this.password = params.password;
      this.resourceUri = params.resourceUri;
      this.sipRegistered = params.sipRegistered;
      this.sipUri = params.sipUri;
      this.subAccount = params.subAccount;
      this.username = params.username;
  }
}

export class CreateEndpointResponse {
  constructor(params) {
      params = params || {};
      this.alias = params.alias;
      this.apiId = params.apiId;
      this.endpointId = params.endpointId;
      this.message = params.message;
      this.username = params.username;
  }
}

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
  update(params, id) {
      params.isVoiceRequest = 'true';
      let client = this[clientKey];
      let that = this;
      return new Promise((resolve, reject) => {
          client('POST', action + id + '/', params)
              .then(response => {
                  extend(that, response.body);
                  if (params.hasOwnProperty('isVoiceRequest')) {
                      delete params.isVoiceRequest;
                  }
                  extend(that, params);
                  resolve(new UpdateEndpointResponse(that));
              })
              .catch(error => {
                  reject(error);
              });
      });
  }

  /**
   * delete Endpoint
   * @method
   * @promise {boolean} return true if success
   * @fail {Error} return Error
   */
  delete() {
      let params = {};
      params.isVoiceRequest = 'true';

      let client = this[clientKey];
      let id = this.id;

      return new Promise((resolve, reject) => {
          client('DELETE', action + id + '/', params)
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
      let params = {};
      params.isVoiceRequest = 'true';
      let client = this[clientKey];

      return new Promise((resolve, reject) => {
          if (action !== '' && !id) {
              reject(new Error(this[idKey] + ' must be set'));
          }
          client('GET', action + (id ? id + '/' : ''), params)
              .then(response => {
                  resolve(new RetrieveEndpointResponse(response.body, client));
              })
              .catch(error => {
                  reject(error);
              });
      });
  }

  list() {
      let params = {};
      params.isVoiceRequest = 'true';

      let client = this[clientKey];

      return new Promise((resolve, reject) => {
          client('GET', action, params)
              .then(response => {
                  let objects = [];
                  Object.defineProperty(objects, 'meta', {
                      value: response.body.meta,
                      enumerable: true
                  });
                  response.body.objects.forEach(item => {
                      objects.push(new ListAllEndpointResponse(item, client));
                  });
                  console.log(objects)
                  resolve(objects);
              })
              .catch(error => {
                  reject(error);
              });
      });
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

      let errors = validate([{
              field: 'username',
              value: username,
              validators: ['isRequired']
          },
          {
              field: 'password',
              value: password,
              validators: ['isRequired']
          },
          {
              field: 'alias',
              value: alias,
              validators: ['isRequired']
          }
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
      params.isVoiceRequest = 'true';
      let client = this[clientKey];

      return new Promise((resolve, reject) => {
          client('POST', action, params)
              .then(response => {
                  resolve(new CreateEndpointResponse(response.body, idField));
              })
              .catch(error => {
                  reject(error);
              });
      });


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
      let errors = validate([{
          field: 'id',
          value: id,
          validators: ['isRequired']
      }]);

      if (errors) {
          return errors;
      }
      return new Endpoint(this[clientKey], {
          id: id
      }).update(params, id);
  }

  /**
   * delete Endpoint
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
      return new Endpoint(this[clientKey], {
          id: id
      }).delete();
  }
}