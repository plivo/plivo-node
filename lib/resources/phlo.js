import { extend, validate } from '../utils/common.js';
import { PlivoResource, PlivoResourceInterface } from '../base';
import { PhloMultiPartyCall, PhloMultiPartyCallInterface } from "../resources/phloMultipartyCall";
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
export class Phlo extends PlivoResource {
  constructor(client, data = {}) {
    super(action, Phlo, idField, client);
    extend(this, data);

    this.client = client;

    // Define multiparty call getters
    let item = this;
    this.multiPartyCall = function (nodeId) {
      let dd = new PhloMultiPartyCall(client, { phloId: item.phloId, nodeId: nodeId });
      return dd;
    };

    this.multiPartyCall.get = function (nodeId) {
      let dd = new PhloMultiPartyCallInterface(client, { phloId: item.phloId, nodeId: nodeId });
      return dd.get(item.phloId, nodeId);
    }

  }

  /**
   * run phlo
   * @method
   * @promise {Boolean} return true if phlo is complete
   * @fail {Error} return Error
   */
  run(params) {

    //Url for phlo running
    // https://phlorunner.plivo.com/v1/account/{AUTH_ID}/phlo/{PHLO_ID} 
    let action = 'account/' + this.authId + '/phlo/' + this.phloId;
    return super.executeAction(action, 'POST', params, '');
  }

}

/**
 * Represents a Phlo Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhloInterface extends PlivoResourceInterface {

  constructor(client, data = {}) {
    super(action, Phlo, idField, client);
    extend(this, data);
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

    if (errors) {
      return errors;
    }

    let params = {
      phlo_id: id
    };

    // Url pattern for getting phlo resource by id
    // https://phlorunner.plivo.com/v1/phlo/{phlo_id}
    return super.get(id, params);
  }
}
