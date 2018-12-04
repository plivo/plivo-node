import { extend, validate } from '../utils/common.js';
import { PlivoResource, PlivoResourceInterface } from '../base';
import { PhloMultiPartyCallInterface } from "../resources/phloMultipartyCall";
import * as _ from "lodash";

const clientKey = Symbol();
const action = 'phlo/';
const idField = 'phloUuid';

/**
 * Represents a Phlo
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of phlo
 */
export class Phlo extends PlivoResourceInterface {
  constructor(client, id) {
    console.log('creating new object of phlo instance with id', id);
    super(action, Phlo, idField, client);

    this.id = id;
    this.client = client;

    // Define multiparty call getters
    let mpCallGetter = function (nodeId) {
      let dd = new PhloMultiPartyCallInterface(client, this.id);
      return dd.get(nodeId);
    };
    this.multiPartyCall = mpCallGetter;
    this.multiPartyCall.get = function (nodeId) {
      return mpCallGetter(nodeId);
    }
  }

  async init() {
    // Fetch phlo resource for specified id.


    // Url pattern for getting phlo resource by id
    // https://phlorunner.plivo.com/v1/phlo/{phlo_id}
    let params = {
      phlo_id: this.id
    };

    return new Promise(async (resolve, reject) => {
      try {
        let result = await super.get(this.id, params);
        console.log('get result is =>', result);
        resolve('name is ravi');
      } catch (err) {
        reject(err);
      }
    });

  }

  /**
   * run phlo
   * @method
   * @promise {Boolean} return true if phlo is complete
   * @fail {Error} return Error
   */
  run() {
    // return super.delete();
  }

  /**
   * update phlo
   * @method
   * @param {object} params - to update phlo
   * @promise {object} return PlivoGenericResponse Object
   * @fail {Error} return Error
   */
  update(action, params) {
    // return this.startRecording(params);
  }

}

/**
 * Represents a Phlo Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhloInterface {

  constructor(client, data = {}) {
    this.client = client;
  }

  /**
   * Get A Phlo Detail
   * @method
   * @param {string} id - phlo uuid to get information of.
   * @promise {object} returns Phlo Object
   * @fail {Error} returns Error
   */
  async get(id) {

    //Validate id first
    let errors = validate([{
      field: 'id',
      value: id,
      validators: ['isRequired']
    }]);
    console.log('at getter interface.');
    if (errors) {
      return errors;
    }

    // Return phlo object 
    let phloObj = new Phlo(this.client, id);
    return phloObj.init();
  }

}
