import {
  PlivoResource,
  PlivoResourceInterface
} from '../base';
import {
  extend,
  validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'Recording/';
const idField = 'recordingId';


export class RetrieveRecordingResponse {
  constructor(params) {
      params = params || {};
      this.addTime = params.addTime;
      this.apiId = params.apiId;
      this.callUuid = params.callUuid;
      this.conferenceName = params.conferenceName;
      this.recordingDurationMs = params.recordingDurationMs;
      this.recordingEndMs = params.recordingEndMs;
      this.recordingFormat = params.recordingFormat;
      this.recordingId = params.recordingId;
      this.recordingStartMs = params.recordingStartMs;
      this.recordingType = params.recordingType;
      this.recordingUrl = params.recordingUrl;
      this.resourceUri = params.resourceUri;
      this.fromNumber = params.fromNumber;
      this.toNumber = params.toNumber;
      this.cost = params.cost;
      this.roundedDuration = params.roundedDuration;
      this.daysOfStorage = params.daysOfStorage;
  }
}

export class ListRecordingResponse {
  constructor(params) {
      params = params || {};
      this.addTime = params.addTime;
      this.apiId = params.apiId;
      this.callUuid = params.callUuid;
      this.conferenceName = params.conferenceName;
      this.recordingDurationMs = params.recordingDurationMs;
      this.recordingEndMs = params.recordingEndMs;
      this.recordingFormat = params.recordingFormat;
      this.recordingId = params.recordingId;
      this.recordingStartMs = params.recordingStartMs;
      this.recordingType = params.recordingType;
      this.recordingUrl = params.recordingUrl;
      this.resourceUri = params.resourceUri;
      this.fromNumber = params.fromNumber;
      this.toNumber = params.toNumber;
      this.mpcName = params.mpcName;
      this.conferenceUuid = params.conferenceUuid;
      this.mpcUuid = params.mpcUuid;
      this.cost = params.cost;
      this.roundedDuration = params.roundedDuration;
      this.daysOfStorage = params.daysOfStorage;
  }
}

/**
* Represents a Recording
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class Recording extends PlivoResource {
  constructor(client, data = {}) {

      super(action, Recording, idField, client);
      this[clientKey] = client

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
  delete(id) {
      let params = {};
      params.isVoiceRequest = 'true';
      let client = this[clientKey];
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
      let errors = validate([{
          field: 'id',
          value: id,
          validators: ['isRequired']
      }]);

      if (errors) {
          return errors;
      }
      let params = {};
      params.isVoiceRequest = 'true';

      let client = this[clientKey];

      return new Promise((resolve, reject) => {
          if (action !== '' && !id) {
              reject(new Error(this[idKey] + ' must be set'));
          }
          client('GET', action + (id ? id + '/' : ''), params)
              .then(response => {
                  resolve(new RetrieveRecordingResponse(response.body, client));
              })
              .catch(error => {
                  reject(error);
              });
      });
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
   * @param {string} [params.roundedDuration] - Rounded duration of recording in seconds. valid values - multiples of 60
   */
  list(params = {}) {
      params.isVoiceRequest = 'true';
      let client = this[clientKey];
      return new Promise((resolve, reject) => {
          client('GET', action, params)
              .then(response => {
                  let objects = [];
                  Object.defineProperty(objects, 'meta', {
                      value: response.body.meta,
                      enumerable: true
                  });
                  response.body.objects.forEach(item => {
                      objects.push(new ListRecordingResponse(item, client));
                  });
                  resolve(objects);
              })
              .catch(error => {
                  reject(error);
              });
      });
  }

  /**
   * Delete recording by id
   * @method
   * @param {string} id - id to delete recording
   * @promise {boolean} return true if success
   * @fail {Error} return Error
   */
  delete(id) {
      let errors = validate([{
          field: 'id',
          value: id,
          validators: ['isRequired']
      }]);

      if (errors) {
          return errors;
      }
      return new Recording(this[clientKey], {
          id: id
      }).delete(id);
  }
}
