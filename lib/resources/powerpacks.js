import {
  extend,
  validate
} from '../utils/common.js';
import {
  PlivoResource,
  PlivoResourceInterface
} from '../base';
import * as _ from "lodash";

const action = 'Powerpack/';
const idField = 'uuid';
const numberpoolIdField = 'numberPool';
const clientKey = Symbol();

/**
 * Represents a Powerpack
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Powerpack extends PlivoResource {

  constructor(client, data = {}) {
    super(action, Powerpack, idField, client);

    if (idField in data) {
      this.uuid = data[idField];
    }
    if (numberpoolIdField in data) {
      this.number_pool_id = data[numberpoolIdField].split('/')[5];
    }
    this.number_pool = new NumberPool(client, {
      number_pool_id: this.number_pool_id
    });
    extend(this, data);
  }

  list_numbers(params) {
    if (params === undefined) {
      params = {};
    }
    let path = 'NumberPool/' + this.number_pool_id + '/Number/';
    return super.customexecuteAction(path.toString().trim(), "GET", params);
  }
  count_numbers(params) {
    if (params === undefined) {
      params = {};
    }
    let path = 'NumberPool/' + this.number_pool_id + '/Number/';
    return super.getMetaResponse(path.toString().trim(), "GET", params);
  }

  find_number(number) {
    let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
    return super.customexecuteAction(path.toString().trim(), "GET");
  }
  add_number(number) {
    let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
    return super.customexecuteAction(path.toString().trim(), "POST");
  }
  remove_number(number, unrent = false) {
    var params;
    params['unrent'] = unrent;
    let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
    return super.customexecuteAction(path.toString().trim(), "DELETE", params);
  }
  list_shortcodes(params) {
    if (params === undefined) {
      params = {};
    }
    let path = 'NumberPool/' + this.number_pool_id + '/Shortcode/';
    return super.customexecuteAction(path.toString().trim(), "GET", params);
  }
  find_shortcode(shortcode) {
    let path = 'NumberPool/' + this.number_pool_id + '/Shortcode/' + shortcode + '/';
    return super.customexecuteAction(path.toString().trim(), "GET");
  }
  buy_add_number(params) {
    var number = params.number
    if (params.number == undefined) {
      try {
        var response = super.customexecuteAction('PhoneNumber/', "GET", params);
        number = response.body.objects[0].number
      } catch (err) {
        return err.message;
      }
    }
    let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
    return super.customexecuteAction(path.toString().trim(), "POST");
  }

  /**
   * update powerpack
   * @method
   * @param {object} params - to update Powerpack
   * @param {string} [params.name]
   * @param {string} [params.application_type]
   * @param {string} [params.application_id]
   * @param {string} [params.sticky_sender]
   * @param {string} [params.local_connect]

   * @promise {object} return {@link Powerpack} object
   * @fail {Error} return Error
   */
  update(params) {
    let path = 'Powerpack/' + this.uuid + '/';
    return super.customexecuteAction(path.toString().trim(), "POST", params);
  }

  /**
   * delete Powerpack
   * @method
   * @promise {object} return true on success
   * @fail {Error} return Error
   */
  delete(unrent_numbers = false) {
    let params = {};
    if (typeof unrent_numbers === 'boolean') {
      params.unrent_numbers = unrent_numbers.toString();
    }
    let path = 'Powerpack/' + this.uuid + '/';
    return super.customexecuteAction(path.toString().trim(), "DELETE", params);
  }
}
const numberPoolField = "number_pool_id"
export class NumberPool extends PlivoResource {
  constructor(client, data = {}) {
    super(action, NumberPool, numberPoolField, client);
    this.numbers = new Numbers(client, {
      number_pool_id: data.number_pool_id
    });
    this.shortcodes = new Shortcode(client, {
      number_pool_id: data.number_pool_id
    });

    extend(this, data);
  }
}

export class Numbers extends PlivoResource {
  constructor(client, data = {}) {
    super(action, Numbers, numberPoolField, client);
    extend(this, data);
  }
  buy_add_number(params) {
    var number = params.number
    if (params.number == undefined) {
      try {
        var response = super.customexecuteAction('PhoneNumber/', "GET", params);
        number = response.body.objects[0].number
      } catch (err) {
        return err.message;
      }
    }
    let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
    return super.customexecuteAction(path.toString().trim(), "POST");
  }

  list(params) {
    if (params === undefined) {
      params = {};
    }
    let path = 'NumberPool/' + this.number_pool_id + '/Number/';
    return super.customexecuteAction(path.toString().trim(), "GET", params);
  }
  count(params) {
    if (params === undefined) {
      params = {};
    }
    let path = 'NumberPool/' + this.number_pool_id + '/Number/';
    return super.getMetaResponse(path.toString().trim(), "GET", params);
  }

  find(number) {
    let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
    return super.customexecuteAction(path.toString().trim(), "GET");
  }
  add(number) {
    let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
    return super.customexecuteAction(path.toString().trim(), "POST");
  }
  remove(number, unrent = false) {
    var params;
    params['unrent'] = unrent;
    let path = 'NumberPool/' + this.number_pool_id + '/Number/' + number + '/';
    return super.customexecuteAction(path.toString().trim(), "DELETE", params);
  }

}
export class Shortcode extends PlivoResource {
  constructor(client, data = {}) {
    super(action, Shortcode, numberPoolField, client);
    extend(this, data);
    this.number_pool_id = data.number_pool_id;
  }
  list(params) {
    if (params === undefined) {
      params = {};
    }
    let path = 'NumberPool/' + this.number_pool_id + '/Shortcode/';
    return super.customexecuteAction(path.toString().trim(), "GET", params);
  }
  find(shortcode) {
    let path = 'NumberPool/' + this.number_pool_id + '/Shortcode/' + shortcode + '/';
    return super.customexecuteAction(path.toString().trim(), "GET");
  }


}
/**
 * Represents a Powerpack interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PowerpackInterface extends PlivoResourceInterface {

  constructor(client, data = {}) {
    super(action, Powerpack, idField, client);
    extend(this, data);
  }

  /**
   * get Powerpack by given id
   * @method
   * @param {string} uuid - id of Powerpack
   * @promise {object} return {@link Powerpack} object
   * @fail {Error} return Error
   */
  get(uuid) {
    return super.get(uuid);
  }

  /**
   * create Powerpack
   * @method
   * @param {string} name - name of Powerpack
   * @param {object} params - params to create Powerpack
   * @param {string} [params.sticky_sender] -
   * @param {string} [params.local_connect]
   * @param {string} [params.application_type]
   * @param {string} [params.application_id]
   * @promise {object} return {@link PlivoGenericResponse} object
   * @fail {Error} return Error
   */
  create(name, params = {}) {

    let errors = validate([{
      field: 'name',
      value: name,
      validators: ['isRequired', 'isString']
    }]);

    if (errors) {
      return errors;
    }

    params.name = name;

    return super.create(params);
  }

  /**
   * update Powerpack
   * @method
   * @param {string} uuid - id of Powerpack
   * @param {object} params - to update Powerpack
   * @param {string} [params.name]
   * @param {string} [params.sticky_sender]
   * @param {string} [params.local_connect]
   * @param {string} [params.application_type]
   * @param {string} [params.application_id]
   * @promise {object} return {@link Powerpack} object
   * @fail {Error} return Error
   */
  update(uuid, params) {
    let errors = validate([{
      field: 'uuid',
      value: uuid,
      validators: ['isRequired']
    }]);

    if (errors) {
      return errors;
    }
    return new Powerpack(this[clientKey], {
      uuid: uuid
    }).update(params);
  }

  /**
   * Get All Call Detail
   * @method
   * @param {object} params - params to get all call details.
   * @promise {object[]} returns list of Call Object
   * @fail {Error} returns Error
   */
  list(params) {
    return super.list(params);
  }
}
