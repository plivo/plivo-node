import {
  extend,
  validate
} from '../utils/common.js';
import {
  PlivoResource,
  PlivoResourceInterface
} from '../base';
import * as _ from 'lodash';
var fs = require('fs');

const clientKey = Symbol();
const action = 'Media/';
const idField = 'media_id';

/**
 * Represents a Message
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Media extends PlivoResource {
  constructor(client, data = {}) {
    super(action, Media, idField, client);

    if (idField in data) {
      this.id = data[idField];
    }

    extend(this, data);
  }
}
/**
 * Represents a Media Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

export class MediaInterface extends PlivoResourceInterface {
  constructor(client, data = {}) {
    super(action, Media, idField, client);
    extend(this, data);
    this[clientKey] = client;
  }

  /**
   * Upload Media
   * @method
   * @fail {Error} return Error
   */
  upload(files) {
    let errors = validate([{
      field: 'files',
      value: files,
      validators: ['isRequired']
    }]);

    if (errors) {
      return errors;
    }
    let params = {}
    params.file = files
    return super.create(params);
  }

  /**
   * Get Media by given id
   * @method
   * @param {string} media_id - id of media
   * @promise {object} return {@link Media} object if success
   * @fail {Error} return Error
   */
  get(media_id) {
    let errors = validate([{
      field: 'media_id',
      value: media_id,
      validators: ['isRequired']
    }]);

    if (errors) {
      return errors;
    }

    return super.get(media_id);
  }

  /**
   * Get All Media Detail
   * @method
   * @param {object} params - params to get all media details.
   * @promise {object[]} returns list of Media Object
   * @fail {Error} returns Error
   */
  list(params) {
    return super.list(params);
  }
}
