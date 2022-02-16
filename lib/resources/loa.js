import {
  PlivoResource, PlivoResourceInterface
} from '../base';
import {
  extend, validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'HostedMessagingNumber/LOA/';
const idField = 'loaID';

export class LOAResponse {
  constructor(params) {
    params = params || {};
    this.apiId = params.apiId;
    this.alias = params.alias;
    this.file = params.file;
    this.loaId = params.loaId;
    this.linkedNumbers = params.linkedNumbers;
    this.createdAt = params.createdAt;
    this.resourceUri = params.resourceUri;
  }
}

export class CreateLOAResponse {
  constructor(params) {
    params = params || {};
    this.apiId = params.apiId;
    this.alias = params.alias;
    this.file = params.file;
    this.linkedNumbers = params.linkedNumbers;
    this.createdAt = params.createdAt;
    this.resourceUri = params.resourceUri;
    this.message = params.message;
  }
}

export class ListLOAResponse {
  constructor(params) {
    params = params || {};
    this.apiId = params.apiId;
    this.meta = params.metaResponse;
    this.objects = params.objects;
  }
}


export class LOA extends PlivoResource {
  constructor(client, data = {}) {
    super(action, LOA, idField, client);
    if (idField in data) {
      this.id = data[idField];
    }
    this[clientKey] = client;
    extend(this, data);
  }

  /**
   * get LOA by given id
   * @method
   * @param {string} id - id of the LOA
   * @promise {object} return {@link LOA} object
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
          let object = new LOAResponse(response.body, client);
          Object.keys(object).forEach(key => object[key] === undefined && delete object[key]);
          resolve(object);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * list all LOA
   * @method
   * @param {object} params - params containing options to list LOA by.
   * @param {string} [params.alias] - Alias
   */
  list(params = {}) {
    let client = this[clientKey];
    return new Promise((resolve, reject) => {
      client('GET', action, params)
        .then(response => {
          resolve(new ListLOAResponse(response.body, idField));
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Create an LOA
   * @method
   * @param {object} params
   * @param {string} [params.alias] - Alias
   * @param {string} [params.file] - File to be uploaded
   * @fail {Error} return Error
   */
  create(params = {}) {
    let client = this[clientKey];
    return new Promise((resolve, reject) => {
      params.multipart = true;
      client('POST', action, params)
        .then(response => {
          let object = new CreateLOAResponse(response.body, idField);
          Object.keys(object).forEach(key => object[key] === undefined && delete object[key]);
          resolve(object);
        })
        .catch(error => {
          reject(error);
        });
    })
  }

  /**
   * deletes an LOA
   * @method
   * @param {string} id - id to delete
   * @promise {boolean} return true if success
   * @fail {Error} return Error
   */
  delete(id) {
    let client = this[clientKey];

    return new Promise((resolve, reject) => {
      if (action !== '' && !id) {
        reject(new Error(this[idKey] + ' must be set'));
      }
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
 * Represents a LOA interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class LOAInterface extends PlivoResourceInterface {
  constructor(client, data = {}) {
    super(action, LOA, idField, client);
    extend(this, data);
    this[clientKey] = client;
  }

  /**
   * get LOA by given id
   * @method
   * @param {string} id - id of the loa
   * @promise {object} return {@link LOA} object
   * @fail {Error} return Error
   */
  get(id) {
    let errors = validate([{field: 'id', value: id, validators: ['isRequired', 'isString']},]);
    if (errors) {
      return errors;
    }
    return new LOA(this[clientKey], {id: idField}).get(id)
  }

  /**
   * list all LOA
   * @method
   * @param {object} params - params containing options to list LOA by.
   * @param {string} [params.alias] - Alias
   * @fail {Error} return Error
   */
  list(params = {}) {
    const validations = []
    if (params.hasOwnProperty("alias")) {
      validations.push({field: 'alias', value: params.alias, validators: ['isString']},)
    }
    let errors = validate(validations);
    if (errors) {
      return errors;
    }
    return new LOA(this[clientKey], {id: idField}).list(params)
  }

  /**
   * Create an LOA
   * @method
   * @param {object} params
   * @param {string} [params.alias] - Alias
   * @param {string} [params.file] - File to be uploaded
   * @fail {Error} return Error
   */
  create(params = {}) {
    let errors = validate([{
      field: 'alias',
      value: params.alias,
      validators: ['isRequired', 'isString']
    }, {field: 'file', value: params.alias, validators: ['isRequired']}]);

    if (errors) {
      return errors;
    }

    return new LOA(this[clientKey], {id: idField}).create(params)
  }

  /**
   * delete an LOA
   * @method
   * @param {string} id - id to delete
   * @promise {boolean} return true if success
   * @fail {Error} return Error
   */
  delete(id) {
    let errors = validate([{
      field: 'id', value: id, validators: ['isRequired', "isString"]
    }]);

    if (errors) {
      return errors;
    }
    return new LOA(this[clientKey], {id: idField}).delete(id);
  }
}
