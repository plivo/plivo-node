import {
  extend,
  validate
} from '../utils/common.js';
import {
  PlivoResource,
  PlivoResourceInterface
} from '../base';
import * as _ from "lodash";

const clientKey = Symbol();
const action = 'Message/';
const idField = 'messageUuid';

/**
 * Represents a Message
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Message extends PlivoResource {
  constructor(client, data = {}) {
    super(action, Message, idField, client);

    if (idField in data) {
      this.id = data[idField];
    };

    extend(this, data);
  }

  listMedia() {
    return super.executeAction(this.id + '/Media/', 'Get', {});
  }
  deleteMedia() {
    return super.executeAction(this.id + '/Media/', 'Delete', {});
  }
  getMedia(mediaID) {
    return super.executeAction(this.id + '/Media/' + mediaID + '/', 'Get', {});
  }
}
/**
 * Represents a Message Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

export class MessageInterface extends PlivoResourceInterface {

  constructor(client, data = {}) {
    super(action, Message, idField, client);
    extend(this, data);
    this[clientKey] = client;
  }

  /**
   * Send Message
   * @method
   * @param {string} src - source number
   * @param {string} dst - destination number
   * @param {string} text - text to send
   * @param {object} optionalParams - Optional Params to send message
   * @param {string} [optionalParams.type] - The type of message. Should be `sms` or `mms`. Defaults to `sms`.
   * @param {string} [optionalParams.url] The URL to which with the status of the message is sent.
   * @param {string} [optionalParams.method] The method used to call the url. Defaults to POST.
   * @param {list} [optionalParams.media_urls] For sending mms, specify the media urls in list of string
   * @param {boolean} [optionalParams.log] If set to false, the content of this message will not be logged on the Plivo infrastructure and the dst value will be masked (e.g., 141XXXXX528). Default is set to true.
   * @promise {object} return {@link PlivoGenericMessage} object if success
   * @fail {Error} return Error
   */
  send(src, dst, text, optionalParams) {
    return this.create(src, dst, text, optionalParams);
  }

  /**
   * Send Message
   * @method
   * @param {string} src - source number
   * @param {string} dst - destination number
   * @param {string} text - text to send
   * @param {object} optionalParams - Optional Params to send message
   * @param {string} [optionalParams.type] - The type of message. Should be `sms` or `mms`. Defaults to `sms`.
   * @param {string} [optionalParams.url] The URL to which with the status of the message is sent.
   * @param {string} [optionalParams.method] The method used to call the url. Defaults to POST.
   * @param {boolean} [optionalParams.log] If set to false, the content of this message will not be logged on the Plivo infrastructure and the dst value will be masked (e.g., 141XXXXX528). Default is set to true.
   * @param {Array} [optionalParams.media_urls] For sending mms, specify the media urls in list of string
   * @promise {object} return {@link PlivoGenericMessage} object if success
   * @fail {Error} return Error
   */
  create(src, dst, text, optionalParams, powerpackUUID) {
    let errors = validate([{
      field: 'dst',
      value: dst,
      validators: ['isRequired']
    }]);

    if (errors) {
      return errors;
    }

    if (!src && !powerpackUUID) {
      let errorText = 'Neither of src or powerpack uuid present, either one is required'
      return new Promise(function (resolve, reject) {
        reject(new Error(errorText));
      });
    }

    if (src && powerpackUUID) {
      let errorText = 'Either of src or powerpack uuid, both of them are present'
      return new Promise(function (resolve, reject) {
        reject(new Error(errorText));
      })
    }

    let params = optionalParams || {};
    if (src) {
      params.src = src;
    }
    params.dst = _.isArray(dst) ? _.join(dst, '<') : dst;
    params.text = text;
    if (powerpackUUID) {
      params.powerpackUUID = powerpackUUID;
    }
    return super.create(params);
  }

  /**
   * Get Message by given id
   * @method
   * @param {string} id - id of message
   * @promise {object} return {@link Message} object if success
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

    return super.get(id);
  }

  listMedia(messageUUID) {
    return new Message(this[clientKey], {
      id: messageUUID
    }).listMedia();
  }
  getMedia(messageUUID, mediaID) {
    return new Message(this[clientKey], {
      id: messageUUID
    }).getMedia(mediaID);
  }
  deleteMedia(messageUUID) {
    return new Message(this[clientKey], {
      id: messageUUID
    }).deleteMedia();
  }
}
