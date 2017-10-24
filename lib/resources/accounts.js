import {extend, validate} from '../utils/common.js';
import {PlivoResource, PlivoResourceInterface} from '../base';

const clientKey = Symbol();
const action = '';
const idField = 'authId';

/**
 * Represents a SubAccount
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Subaccount extends PlivoResource {
  constructor(client, data = {}) {
    super('Subaccount/', Subaccount, idField, client);

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

    return super.update(params);
  }

/**
 * delete subaccount
 * @method
 * @promise {boolean} return true if subaccount deleted
 * @fail {Error} return Error
 */
  delete() {
    return super.delete();
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
    return super.get(id);
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
      params.enabled = enabled;
    }

    return super.create(params);
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
 * @promise {boolean} return true if subaccount deleted
 * @fail {Error} return Error
 */
  delete(id) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Subaccount(this[clientKey], {
      id: id
    }).delete();
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
    return super.update(params, '');
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
    return super.get();
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
