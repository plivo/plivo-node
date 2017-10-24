import {extend} from './utils/common.js';

let actionKey = Symbol('api action');
let klassKey = Symbol('constructor');
let idKey = Symbol('id filed');
let clientKey = Symbol('make api call');

export class PlivoGenericResponse {
  constructor(params, idString) {
    params = params || {};
    if (typeof idString !== 'undefined' && (idString in params)) {
      this.id = params[idString];
    } else if ('request_uuid' in params) {
      this.id = params.request_uuid;
    }
    extend(this, params);
  }
}

export class PlivoResource {
  constructor(action, klass, idField, request) {
    this[actionKey] = action;
    this[klassKey] = klass;
    this[idKey] = idField;
    this[clientKey] = request;
  }

  update(params, id) {
    let client = this[clientKey];
    let action = this[actionKey];
    let that = this;
    id = typeof id !== 'undefined' ? id : that.id;

    return new Promise((resolve, reject) => {
      client('POST', action + id + '/', params)
        .then(response => {
          extend(that, response.body);
          extend(that, params);
          resolve(that);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  delete() {
    let client = this[clientKey];
    let action = this[actionKey];
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

  executeAction(task = '', method = 'GET', params = {}, action) {
    let client = this[clientKey];
    action = action == null ? this[actionKey] : action;
    let idField = this[idKey];

    return new Promise((resolve, reject) => {
      client(method, action + task, params)
        .then(response => {
          resolve(new PlivoGenericResponse(response.body, idField));
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export class PlivoResourceInterface {
  constructor(action, klass, idField, request) {
    this[actionKey] = action;
    this[klassKey] = klass;
    this[idKey] = idField;
    this[clientKey] = request;
  }

  get(id, params = {}) {
    let client = this[clientKey];
    let action = this[actionKey];
    let Klass = this[klassKey];

    return new Promise((resolve, reject) => {
      if (action !== '' && !id) {
        reject(new Error(this[idKey] + ' must be set'));
      }

      client('GET', action + (id ? id + '/' : ''), params)
        .then(response => {
          resolve(new Klass(client, response.body));
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  list(params) {
    let client = this[clientKey];
    let action = this[actionKey];
    let Klass = this[klassKey];

    return new Promise((resolve, reject) => {
      client('GET', action, params)
        .then(response => {
          let objects = [];
          response.body.objects.forEach(item => {
            objects.push(new Klass(client, item));
          });
          resolve(objects);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  create(params) {
    let client = this[clientKey];
    let idField = this[idKey];
    let action = this[actionKey] + (this.id ? this.id + '/' : '');

    return new Promise((resolve, reject) => {
      client('POST', action, params)
        .then(response => {
          resolve(new PlivoGenericResponse(response.body, idField));
        })
        .catch(error => {
          reject(error);
        });
    });
  }

}

