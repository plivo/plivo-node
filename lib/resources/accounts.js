import {PlivoResource, PlivoResourceInterface} from '../base';
import {extend, validate} from '../utils/common.js';

import { PlivoGenericResponse } from '../../dist/base';

const clientKey = Symbol();
const action = 'Subaccount/';
const idField = 'authId';

/**
 * Represents a SubAccount
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

export class GetAccountDetails
{
  constructor(params) {
    params = params || {};
    this.accountType= params.accountType;
    this.address = params.address;
    this.apiId = params.apiId;
    this.autoRecharge = params.autoRecharge;
    this.billingMode = params.billingMode;
    this.cashCredits = params.cashCredits;
    this.city = params.city;
    this.name = params.name;
    this.resourceUri = params.resourceUri;
    this.state = params.state;
    this.timezone = params.timezone;
  }
  
}

export class CreateSubAccountResponse
{
  constructor(params) {
    params = params || {};
    this.apiId= params.apiId;
    this.authId = params.authId;
    this.authToken = params.authToken;
    this.message = params.message;
  }
  
}

export class UpdateSubAccountDetails
{
  constructor(params) {
    params = params || {};
    this.apiId= params.apiId;
    this.message = params.message;
  }
  
}

export class UpdateAccountDetailsResponse
{
  constructor(params) {
    params = params || {};
    this.apiId= params.apiId;
    this.message = params.message;
  }
  
}

export class GetSubAccountDetails {
  constructor(params) {
    params = params || {};
    this.account= params.account;
    this.apiId = params.apiId;
    this.authId = params.authId;
    this.authToken = params.authToken;
    this.created = params.created;
    this.enabled = params.enabled;
    this.modified = params.modified;
    this.name = params.name;
    this.resourceUri = params.resourceUri;

  }
}
export class Subaccount extends PlivoResource {
  constructor(client, data = {}) {
    super('Subaccount/', Subaccount, idField, client);
    this[clientKey] = client; 
    if (idField in data) {
      this.id = data[idField];
    }

    extend(this, data);
  }

/**
 * update subaccount
 * @method
 * @param {string} name - name of subaccount
 * @param {boolean} enabled - make account enable or disable
 * @promise {Subaccount} return object of subaccount
 * @fail {Error} return Error
 */
  update(name, enabled) {
    let params = {};

    let errors = validate([
      {field: 'name', value: name, validators: ['isRequired', 'isString']}
    ]);

    if (errors) {
      return errors;
    }

    params.name = name;

    if (typeof enabled === 'boolean') {
      params.enabled = enabled.toString();
    }

    let client = this[clientKey];
    let that = this;
    return new Promise((resolve, reject) => {
      client('POST', action + that.id + '/', params)
        .then(response => {
          extend(that, response.body);
          if (params.hasOwnProperty('isVoiceRequest')){
            delete params.isVoiceRequest;
          }
          extend(that, params);
          resolve(new UpdateSubAccountDetails(that));
        })
        .catch(error => {
          reject(error);
        });
    });
  }

/**
 * delete subaccount
 * @method
 * @param {boolean} cascade - delete associated applications, phonenumbers & endpoints
 * @promise {boolean} return true if subaccount deleted
 * @fail {Error} return Error
 */
  delete(cascade) 
  {
    let params = {};

    if (typeof cascade === 'boolean') {
      params.cascade = cascade.toString();
    }
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
 * Represents a Subaccount Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class SubaccountInterface extends PlivoResourceInterface {

  constructor(client, data = {}) {
    super('Subaccount/', Subaccount, idField, client);
    extend(this, data);
    this[clientKey] = client;
  }

/**
 * get subaccount by id
 * @method
 * @param {string} id - id of subaccount
 * @promise {Subaccount} return object of subaccount
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
            resolve(new GetSubAccountDetails(response.body,client));
          })
          .catch(error => {
            reject(error);
          });
      });
  }

/**
 * create subaccount
 * @method
 * @param {string} name - name of subaccount
 * @param {boolean} enabled - enable or disable subaccount
 * @promise {PlivoGenericResponse} return object of PlivoGenericObject
 * @fail {Error} return Error
 */
  create(name, enabled) {
    let params = {};

    let errors = validate([
      {field: 'name', value: name, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }

    params.name = name;

    if (typeof enabled === 'boolean') {
      params.enabled = enabled.toString();
    }
    let client = this[clientKey];
    return new Promise((resolve, reject) => {
      client('POST', action + (this.id ? this.id + '/' : ''), params)
        .then(response => {
          resolve(new CreateSubAccountResponse(response.body, idField));
        })
        .catch(error => {
          reject(error);
        });
    })
  }

/**
 * update subaccount
 * @method
 * @param {id} id - id of subaccount
 * @param {string} name - name of subaccount
 * @param {boolean} enabled - make account enable or disable
 * @promise {Subaccount} return object of subaccount
 * @fail {Error} return Error
 */
  update(id, name, enabled) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Subaccount(this[clientKey], {
      id: id
    }).update(name, enabled);
  }

/**
 * delete subaccount
 * @method
 * @param {id} id - id of subaccount
 * @param {boolean} cascade - delete associated applications, phonenumbers & endpoints
 * @promise {boolean} return true if subaccount deleted
 * @fail {Error} return Error
 */
  delete(id, cascade) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Subaccount(this[clientKey], {
      id: id
    }).delete(cascade);
  }
}

/**
 * Represents a Account
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Account extends PlivoResource {
  constructor(client, data = {}) {
    super(action, Account, idField, client);
    extend(this, data);

    if (idField in data) {
      this.id = data[idField];
    }

    this[clientKey] = client;
  }

/**
 * get account detail
 * @method
 * @promise {PlivoGenericResponse} return PlivoGenericResponse object
 * @fail {Error} return Error
 */
get() {
  return new AccountInterface(this[clientKey])
    .get();
}

  

/**
 * update account detail
 * @method
 * @param {object} params - parameters
 * @param {string} [params.name] - name of account
 * @param {string} [params.city] - city of account
 * @param {string} [params.address] - address of account
 * @promise {Account} return Account object
 * @fail {Error} return Error
 */
  update(params) {

      let client = this[clientKey];
      let that = this;
      return new Promise((resolve, reject) => {
        client('POST', '/', params)
          .then(response => {
            extend(that, response.body);
            if (params.hasOwnProperty('isVoiceRequest')){
              delete params.isVoiceRequest;
            }
            extend(that, params);
            resolve(new UpdateAccountDetailsResponse(that));
          })
          .catch(error => {
            reject(error);
          });
      });
  }
}

/**
 * Represents a Account Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class AccountInterface extends PlivoResourceInterface {
  constructor(client, data = {}) {
    super(action, Account, idField, client);
    extend(this, data);

    this[clientKey] = client;
  }

/**
 * get account detail
 * @method
 * @promise {PlivoGenericResponse} return PlivoGenericResponse object
 * @fail {Error} return Error
 */
  get() {
    let client = this[clientKey];
    return new Promise((resolve, reject) => {
      client('GET', '/')
      .then(response => {
        resolve(new GetAccountDetails(response.body, client));
      })
      .catch(error => {
        reject(error);
      });
    });
}

/**
 * update account detail
 * @method
 * @param {object} params - parameters
 * @param {string} [params.name] - name of account
 * @param {string} [params.city] - city of account
 * @param {string} [params.address] - address of account
 * @promise {Account} return Account object
 * @fail {Error} return Error
 */
  update(params) {
    return new Account(this[clientKey])
      .update(params);
  }
}
