import {
  PlivoResource, PlivoResourceInterface
} from '../base';
import {
  extend, validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'HostedMessagingNumber/';
const idField = 'hosted_messaging_number_id';

export class HostedMessagingNumberResponse {
  constructor(params) {
    params = params || {};
    this.apiId = params.apiId;
    this.alias = params.alias;
    this.application = params.application
    this.failureReason = params.failureReason
    this.file = params.file;
    this.hostedMessagingNumberId = params.hostedMessagingNumberId;
    this.loaId = params.loaId;
    this.number = params.number;
    this.hostedStatus = params.hostedStatus;
    this.linkedNumbers = params.linkedNumbers;
    this.createdAt = params.createdAt;
  }
}

export class CreateHostedMessagingNumberResponse {
  constructor(params) {
    params = params || {};
    this.apiId = params.apiId;
    this.alias = params.alias;
    this.application = params.application
    this.failureReason = params.failureReason
    this.file = params.file;
    this.hostedMessagingNumberId = params.hostedMessagingNumberId;
    this.loaId = params.loaId;
    this.number = params.number;
    this.hostedStatus = params.hostedStatus;
    this.linkedNumbers = params.linkedNumbers;
    this.createdAt = params.createdAt;
  }
}

export class ListHostedMessagingNumberResponse {
  constructor(params) {
    params = params || {};
    this.apiId = params.apiId;
    this.meta = params.metaResponse;
    this.objects = params.objects;
  }
}


export class HostedMessagingNumber extends PlivoResource {
  constructor(client, data = {}) {
    super(action, HostedMessagingNumber, idField, client);
    if (idField in data) {
      this.id = data[idField];
    }
    this[clientKey] = client;
    extend(this, data);
  }

  /**
   * get HostedMessagingNumber by given id
   * @method
   * @param {string} id - id of the HostedMessagingNumber
   * @promise {object} return {@link HostedMessagingNumber} object
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
          let object = new HostedMessagingNumberResponse(response.body, client);
          Object.keys(object).forEach(key => object[key] === undefined && delete object[key]);
          resolve(object);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * list all HostedMessagingNumber
   * @method
   * @param {object} params - params containing options to list HostedMessagingNumber by.
   * @param {string} [params.alias] - Alias
   * @param {string} [params.hostedStatus] - Hosted Status
   * @param {string} [params.number] - Phone Number
   * @param {string} [params.loaId] - LOA ID
   * @fail {Error} return Error
   */
  list(params = {}) {
    let client = this[clientKey];
    return new Promise((resolve, reject) => {
      client('GET', action, params)
        .then(response => {
          resolve(new ListHostedMessagingNumberResponse(response.body, idField));
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Create a HostedMessagingNumber
   * @method
   * @param {object} params
   * @param {string} [params.alias] - Alias
   * @param {string} [params.applicationId] - Application ID
   * @param {string} [params.number] - Phone Number
   * @param {string} [params.applicationId] - LOA ID
   * @fail {Error} return Error
   */
  create(params = {}) {
    let client = this[clientKey];
    return new Promise((resolve, reject) => {
      params.multipart = true;
      client('POST', action, params)
        .then(response => {
          let object = new CreateHostedMessagingNumberResponse(response.body, idField);
          Object.keys(object).forEach(key => object[key] === undefined && delete object[key]);
          resolve(object);
        })
        .catch(error => {
          reject(error);
        });
    })
  }
}

/**
 * Represents a HostedMessagingNumber interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class HostedMessagingNumberInterface extends PlivoResourceInterface {
  constructor(client, data = {}) {
    super(action, HostedMessagingNumber, idField, client);
    extend(this, data);
    this[clientKey] = client;
  }

  /**
   * get HostedMessagingNumber by given id
   * @method
   * @param {string} id - id of the HostedMessagingNumber
   * @promise {object} return {@link HostedMessagingNumber} object
   * @fail {Error} return Error
   */
  get(id) {
    let errors = validate([{field: 'id', value: id, validators: ['isRequired', 'isString']},]);
    if (errors) {
      return errors;
    }
    return new HostedMessagingNumber(this[clientKey], {id: idField}).get(id)
  }

  /**
   * list all HostedMessagingNumber
   * @method
   * @param {object} params - params containing options to list HostedMessagingNumber by.
   * @param {string} [params.alias] - Alias
   * @param {string} [params.hostedStatus] - Hosted Status
   * @param {string} [params.number] - Phone Number
   * @param {string} [params.loaId] - LOA ID
   * @fail {Error} return Error
   */
  list(params = {}) {
    const validations = []
    if (params.hasOwnProperty("alias")) {
      validations.push({field: 'alias', value: params.alias, validators: ['isString']})
    }
    if (params.hasOwnProperty("hostedStatus")) {
      validations.push({field: 'hostedStatus', value: params.hostedStatus, validators: ['isString']})
    }
    if (params.hasOwnProperty("number")) {
      validations.push({field: 'number', value: params.number, validators: ['isString']})
    }
    if (params.hasOwnProperty("loaId")) {
      validations.push({field: 'loaId', value: params.loaId, validators: ['isString']})
    }
    let errors = validate(validations);
    if (errors) {
      return errors;
    }
    return new HostedMessagingNumber(this[clientKey], {id: idField}).list(params)
  }

  /**
   * Create a HostedMessagingNumber
   * @method
   * @param {object} params
   * @param {string} [params.alias] - Alias
   * @param {string} [params.applicationId] - Application ID
   * @param {string} [params.number] - Phone Number
   * @param {string} [params.applicationId] - LOA ID
   * @fail {Error} return Error
   */
  create(params = {}) {
    let errors = validate([
      {field: 'alias', value: params.alias, validators: ['isRequired', 'isString']},
      {field: 'applicationId', value: params.applicationId, validators: ['isRequired', 'isString']},
      {field: 'loaId', value: params.loaId, validators: ['isRequired', 'isString']},
      {field: 'number', value: params.number, validators: ['isRequired', 'isString']},
    ]);
    if (errors) {
      return errors;
    }
    return new HostedMessagingNumber(this[clientKey], {id: idField}).create(params)
  }
}
