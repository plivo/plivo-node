import {extend, validate} from '../utils/common.js';
import {PlivoResource, PlivoResourceInterface} from '../base';

const clientKey = Symbol();
const action = 'Number/';
const idField = 'number';

/**
 * Represents a PhoneNumber
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhoneNumber extends PlivoResource {
  constructor(client, data = {}) {
    super('PhoneNumber/', PhoneNumber, idField, client);

    if (idField in data) {
      this.id = data[idField];
    }

    extend(this, data);
    this[clientKey] = client;
  }

/**
 * Buy Phone Number
 * @method
 * @param {string} appId - app id
 * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
 * @fail {Error} return Error
 */
  buy(appId) {
    return new PhoneNumberInterface(this[clientKey], {
      id: this.id
    }).buy(appId);
  }
}

/**
 * Represents a PhoneNumbers Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 * @param {string} [data.test] - test data
 */
export class PhoneNumberInterface extends PlivoResourceInterface {
  constructor(client, data = {}) {
    super('PhoneNumber/', PhoneNumber, idField, client);

    extend(this, data);
    this[clientKey] = client;
  }

/**
 * Buy Phone Number
 * @method
 * @param {string} appId - app id
 * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
 * @fail {Error} return Error
 */
  buy(appId) {
    let params = {};
    if (appId) {
      params.app_id = appId;
    }
    return super.create(params);
  }
}

/**
 * Represents a Number
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class NumberResource extends PlivoResource {
  constructor(client, data = {}) {
    super(action, NumberResource, idField, client);

    if (idField in data) {
      this.id = data[idField];
    }
    extend(this, data);
  }

/**
 * Unrent Number
 * @method
 * @promise {boolean} return true if success
 * @fail {Error} return Error
 */
  unrent() {
    return super.delete();
  }

/**
 * Update Number
 * @method
 * @param {object} params
 * @param {string} [params.appId] - app id
 * @param {string} [params.subAccount] - auth_id of subaccount
 * @param {string} [params.alias] - textual name of number
 * @promise {@link NumberResource} return NumberResource Object if success
 * @fail {Error} return Error
 */
  update(params) {
    return super.update(params);
  }
}

/**
 * Represents a Numbers
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class NumberInterface extends PlivoResourceInterface {

  constructor(client) {
    super(action, NumberResource, idField, client);
    this[clientKey] = client;
  }

/**
 * Buy Phone Number
 * @method
 * @param {string} number - number to buy
 * @param {string} appId - app id
 * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
 * @fail {Error} return Error
 */
  buy(number, appId) {
    let errors = validate([
      {field: 'number', value: number, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new PhoneNumber(this[clientKey], {
      id: number
    }).buy(appId);
  }

/**
 * Add own number from carrier
 * @method
 * @param {string} numbers - A comma separated list of numbers that need to be added for the carrier.
 * @param {string} carrier - The carrier_id of the IncomingCarrier that the number is associated with.
 * @param {string} region - region that is associated with the Number
 * @param {string} optionaParams - optional params
 * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
 * @fail {Error} return Error
 */
  addOwnNumber(numbers, carrier, region, optionalParams) {
    let errors = validate([
      {field: 'numbers', value: numbers, validators: ['isRequired']},
      {field: 'carrier', value: carrier, validators: ['isRequired']},
      {field: 'region', value: region, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    let params = optionalParams || {};

    params.numbers = numbers;
    params.carrier = carrier;
    params.region = region;

    return super.create(params);
  }

/**
 * Add own number from carrier
 * @method
 * @param {string} countryISO - The ISO code A2 of the country
 * @param {string} optionaParams - optional params
 * @promise {@link PhoneNumberInterface} return PhoneNumbers Object if success
 * @fail {Error} return Error
 */
  search(countryISO, optionalParams) {
    let errors = validate([
      {field: 'country_iso', value: countryISO, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }

    let params = optionalParams || {};
    params.country_iso = countryISO;
    return new PhoneNumberInterface(this[clientKey])
      .list(params);
  }

/**
 * Update Number
 * @method
 * @param {string} number - number to update
 * @param {object} params
 * @param {string} [params.appId] - app id
 * @param {string} [params.subAccount] - auth_id of subaccount
 * @param {string} [params.alias] - textual name of number
 * @promise {@link NumberResource} return NumberResource Object if success
 * @fail {Error} return Error
 */
  update(number, params) {
    let errors = validate([
      {field: 'number', value: number, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new NumberResource(this[clientKey], {
      id: number
    }).update(params);
  }

/**
 * Unrent Number
 * @method
 * @param {string} number - number to unrent
 * @promise {boolean} return true if success
 * @fail {Error} return Error
 */
  unrent(number) {
    let errors = validate([
      {field: 'number', value: number, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new NumberResource(this[clientKey], {
      id: number
    }).unrent();
  }
}
