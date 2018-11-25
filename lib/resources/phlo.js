import { extend, validate } from '../utils/common.js';
import { PlivoResource, PlivoResourceInterface } from '../base';
import { PhloMultiPartyCallInterface } from "../resources/phloMultipartyCall";
import * as _ from "lodash";

const clientKey = Symbol();
const action = 'Phlo/';
const idField = 'phloUuid';

/**
 * Represents a Phlo
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of phlo
 */
export class Phlo {
  constructor(client, id) {
    console.log('creating new object of phlo instance');
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
  get(id) {
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

    let phloObj = new Phlo(this.client, id);
    return phloObj;

    // let errors = validate([{ field: 'id', value: id, validators: ['isRequired'] }]);

    // if (errors) {
    //     return errors;
    // }
    // return super.get(id);
  }

}
