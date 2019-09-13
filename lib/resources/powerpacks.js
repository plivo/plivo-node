
import { extend, validate } from '../utils/common.js';
import { PlivoResource, PlivoResourceInterface } from '../base';
import * as _ from "lodash";

const action = 'Powerpack/';
const idField = 'uuid';

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

    extend(this, data);
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
  return super.update(params);
}

/**
 * delete powerpack
 * @method
 * @param {boolean} unrent_numbers -
 * @promise response
 * @fail {Error} return Error
 */
delete( unrent_numbers=false) {
  let params = {};

  if (typeof unrent_numbers === 'boolean') {
    params.unrent_numbers = unrent_numbers.toString();
  }

  return super.delete(params);
}


}
export class NumberpoolResource extends PlivoResource {
  constructor(client, data = {}) {
    super(action, NumberpoolResource, idField, client);

    if (idField in data) {
      this.id = data[idField];
    }

    extend(this, data);
    this[clientKey] = client;
  }
}

export class ShortcodeResource extends PlivoResource {
  constructor(client, data = {}) {
    super(action, ShortcodeResource, idField, client);

    if (idField in data) {
      this.id = data[idField];
    }

    extend(this, data);
    this[clientKey] = client;
  }
}

class ShortcodeInterface extends PlivoResourceInterface {
  constructor(client, data = {}) {
    super(action, ShortcodeResource, idField, client);
    extend(this, data);

    this[clientKey] = client;
  }
  listshortcode(number_pool_uuid, params) {
    let client = this[clientKey];
    if (params === undefined){
      params = {}
    }

    return new Promise((resolve, reject) => {
      client('GET', 'NumberPool/'+number_pool_uuid+'/Shortcode/', params)
        .then(response => {
          let objects = [];
          Object.defineProperty(objects, 'meta', { value: response.body.meta });
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

  findshortcode(number_pool_uuid, shortcode){
    let client = this[clientKey];
    try {
      return new Promise((resolve, reject) => {
        client('GET', 'NumberPool/' + number_pool_uuid + '/Shortcode/' + shortcode + '/', params)
          .then(response => {
            resolve(new Klass(client, response.body));
          });
      });
    }
    catch (error) {
      reject(error);
    }
  }
}

class NumberpoolInterface extends PlivoResourceInterface {
  constructor(client, data = {}) {
    super(action, NumberpoolResource, idField, client);
    extend(this, data);

    this[clientKey] = client;
  }

  listnumbers(number_pool_uuid, params) {
    let client = this[clientKey];
    if (params === undefined){
      params = {}
    }

    return new Promise((resolve, reject) => {
      client('GET', 'NumberPool/'+number_pool_uuid+'/Number/', params)
        .then(response => {
          let objects = [];
          Object.defineProperty(objects, 'meta', { value: response.body.meta });
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

  findnumbers(number_pool_uuid, number){
    params = {}
    return new Promise((resolve, reject) => {
      client('GET', 'NumberPool/'+number_pool_uuid+'/Number/'+number+'/', params)
      .then(response => {
        resolve(new Klass(client, response.body));
      })
        .catch(error => {
          reject(error);
        });
    });
  }

  addnumbers(number_pool_uuid, number){
    params = {}
    return new Promise((resolve, reject) => {
      client('POST', 'NumberPool/'+number_pool_uuid+'/Number/'+number+'/', params)
        .then(response => {
            resolve(new Klass(client, response.body));
          })
        })
        .catch(error => {
          reject(error);

    });
  }
  removeumbers(number_pool_uuid, number, params){
    return new Promise((resolve, reject) => {
      client('DELETE', 'NumberPool/'+number_pool_uuid+'/Number/'+number+'/', params)
      .then(response => {
        resolve(new Klass(client, response.body));
      })
        .catch(error => {
          reject(error);
        });
    });
  }

  countnumbers(number_pool_uuid, params) {
    let client = this[clientKey];
    if (params === undefined){
      params = {}
    }

    return new Promise((resolve, reject) => {
      client('GET', 'NumberPool/'+number_pool_uuid+'/Number/', params)
        .then(response => {
          let count = 0;
          count= response.body.meta.total_count
          resolve(count);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  buyandadd(number_pool_uuid, params){
    number = params.number
    if (params.number == undefined){
      number = new Promise((resolve, reject) => {
        client('GET', 'PhoneNumber/', params)
          .then(response => {
           phonenumber = response.body.objects[0].number
          resolve(phonenumber);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
    return new Promise((resolve, reject) => {
      client('POST', 'NumberPool/'+number_pool_uuid+'/Number/'+number+'/', params)
        .then(response => {
            resolve(new Klass(client, response.body));
          })
        })
        .catch(error => {
          reject(error);

    });

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

    this[clientKey] = client;
    this[NumberpoolInterfaceKey] = new NumberpoolInterface(client);
    this[ShortcodeInterfaceKey] = new ShortcodeInterface(client);
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

    let errors = validate([
      {field: 'name', value: name, validators: ['isRequired', 'isString']}
    ]);

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
    let errors = validate([
      {field: 'uuid', value: uuid, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Powerpack(this[clientKey], {
      uuid: uuid
    }).update(params);
  }

/**
 * delete Powerpack
 * @method
 * @param {string} id - id of Powerpack
 * @promise {object} return true on success
 * @fail {Error} return Error
 */
  delete(uuid, unrent_numbers=false) {
    return new Powerpack(this[clientKey], {
      uuid: uuid
    }).delete(unrent_numbers);
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
get_numberpooluuid(uuid){
  numberpool_path = new Promise((resolve, reject) => {
    client('GET', 'Powerpack/', params)
      .then(response => {
       phonenumber = response.body.number_pool
      resolve(phonenumber);
      })
      .catch(error => {
        reject(error);
      });
  });
  numberpool = numberpool_path.split('/')
  return numberpool[5]
}

listnumbers(uuid, params) {
  number_pool_uuid = get_numberpooluuid(uuid)
  return this[NumberpoolInterfaceKey].listnumbers(number_pool_uuid, params);
}
findnumbers(uuid, number){
  number_pool_uuid = get_numberpooluuid(uuid)
  return this[NumberpoolInterfaceKey].findnumbers(number_pool_uuid, number);

}

addnumbers(uuid, number){
  number_pool_uuid = get_numberpooluuid(uuid)
  return this[NumberpoolInterfaceKey].addnumbers(number_pool_uuid, number);
}
removeumbers(uuid, number, params){
  number_pool_uuid = get_numberpooluuid(uuid)
  return this[NumberpoolInterfaceKey].removeumbers(number_pool_uuid, number, params);
}

countnumbers(uuid, params){
  number_pool_uuid = get_numberpooluuid(uuid)
  return this[NumberpoolInterfaceKey].countnumbers(number_pool_uuid, params);
}

buyandadd(uuid, param){
  number_pool_uuid = get_numberpooluuid(uuid)
  return this[NumberpoolInterfaceKey].buyandadd(number_pool_uuid, params);
}

listshortcode(uuid){
  number_pool_uuid = get_numberpooluuid(uuid)
  return this[ShortcodeInterface].listshortcode(number_pool_uuid);
}

findshortcode(uuid,shortcode){
  number_pool_uuid = get_numberpooluuid(uuid)
  return this[ShortcodeInterface].findshortcode(number_pool_uuid, shortcode);
}

}
