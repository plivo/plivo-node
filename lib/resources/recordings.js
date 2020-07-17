import {extend, validate} from '../utils/common.js';
import {PlivoResource, PlivoResourceInterface} from '../base';

const clientKey = Symbol();
const action = 'Recording/';
const idField = 'recordingId';

/**
 * Represents a Recording
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Recording extends PlivoResource {
  constructor(client, data = {}) {
    super(action, Recording, idField, client);

    if (idField in data) {
      this.id = data[idField];
    }
    extend(this, data);
  }

/**
 * Delete recording
 * @method
 * @promise {boolean} return true if success
 * @fail {Error} return Error
 */
  delete() {
    let params = {};
    params.isVoiceRequest = 'true';
    return super.delete(params);
  }

}

/**
 * Represents a Recording Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class RecordingInterface extends PlivoResourceInterface {

  constructor(client, data = {}) {
    super(action, Recording, idField, client);
    extend(this, data);

    this[clientKey] = client;
  }

/**
 * Get recording by id
 * @method
 * @param {string} id - id to get recording information
 * @promise {object} return {@link Pricing} object
 * @fail {Error} return Error
 */
  get(id) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    let params = {};
    params.isVoiceRequest = 'true';
    return super.get(id, params);
  }

  /**
   * list recordings
   * @method
   * @param {object} params - params to list recordings
   * @param {string} [params.subaccount] - ID of the subaccount if present
   * @param {string} [params.callUuid] - Call UUID of the call to filter recordings associated with it
   * @param {string} [params.addTime] - Filter based on the timings they were added
   * @param {string} [params.limit] - Display no of results per page
   * @param {string} [params.offset] - No of value items by which results should be offset
   */
  list(params= {}) {
    params.isVoiceRequest = 'true';
    return super.list(params);
  }

/**
 * Delete recording by id
 * @method
 * @param {string} id - id to delete recording
 * @promise {boolean} return true if success
 * @fail {Error} return Error
 */
  delete(id) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Recording(this[clientKey], {
      id: id
    }).delete();
  }
}
