import * as _ from "lodash";

import {
  PlivoResource,
  PlivoResourceInterface
} from '../base';
import {
  extend,
  validate
} from '../utils/common.js';

const action = 'Verify/Session/';
const idField = 'session_uuid';
let actionKey = Symbol('api action');
let klassKey = Symbol('constructor');
let idKey = Symbol('id filed');
let clientKey = Symbol('make api call');


export class SessionResponse {
  constructor(params) {
    params = params || {};
    this.apiId = params.apiId;
    this.message = params.message;
    this.sessionUuid = params.sessionUuid;
    if (params.invalidNumber != undefined ){
      this.invalid_number = params.invalidNumber;
    }
  }
}

export class ValidateSessionResponse {
  constructor(params) {
    params = params || {};
    this.apiId = params.apiId;
    this.message = params.message;
    if (params.invalidNumber != undefined ){
      this.invalid_number = params.invalidNumber;
    }
  }
}

export class SessionGetResponse {
  constructor(params) {
    params = params || {};
    this.apiId = params.apiId;
    this.sessionUuid = params.sessionUuid;
    this.appUuid = params.appUuid;
    this.alias = params.alias;
    this.recipient = params.recipient;
    this.channel = params.channel;
    this.status = params.status;
    this.count = params.count;
    this.requestor_ip = params.requestorIp;
    this.destination_country_iso2 = params.destinationCountryIso2;
    this.destination_network = params.destinationNetwork;
    this.attemptDetails = params.attemptDetails;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;

    this.charges = Object.assign({}, params.charges);

    this.charges.totalCharge = params.charges.totalCharge;
    this.charges.validationCharge = params.charges.validationCharge;
    this.charges.attemptCharges = params.charges.attemptCharges
  }
}

export class SessionListResponse {
  constructor(params) {
    params = params || {};
    this.sessionUuid = params.sessionUuid;
    this.appUuid = params.appUuid;
    this.recipient = params.recipient;
    this.alias = params.alias;
    this.channel = params.channel;
    this.status = params.status;
    this.count = params.count;
    this.requestor_ip = params.requestorIp;
    this.destination_country_iso2 = params.destinationCountryIso2;
    this.destination_network = params.destinationNetwork;
    this.attemptDetails = params.attemptDetails;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;

    this.charges = Object.assign({}, params.charges);

    this.charges.totalCharge = params.charges.totalCharge;
    this.charges.validationCharge = params.charges.validationCharge;
    this.charges.attemptCharges = params.charges.attemptCharges
  }
}

/**
 * Represents a Session
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Session extends PlivoResource {
  constructor(client, data = {}) {
    super(action, Session, idField, client);
    this[actionKey] = action;
    this[clientKey] = client;
    if (idField in data) {
      this.id = data[idField];
    };

    extend(this, data);
  }

}


/**
 * Represents a Session Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class SessionInterface extends PlivoResourceInterface {
  constructor(client, data = {}) {
    super(action, Session, idField, client);
    extend(this, data);
    this[clientKey] = client;
    this[actionKey] = action;
    this[klassKey] = Session;
    this[idKey] = idField;
  }

  /**
   * Send Session
   * @method
   * @param {Object} sessionReq- request body fields
   * @promise {object} return {@link PlivoGenericMessage} object if success
   * @fail {Error} return Error
   */
  create(sessionReq){

    var isObject = arguments.length;
    var app_uuid, recipient, url, method, channel

    if (isObject === 1) {
      app_uuid = sessionReq.app_uuid
      recipient = sessionReq.recipient
      url = sessionReq.url
      method = sessionReq.method
      channel = sessionReq.channel
    }

    let errors = validate([{
      field: 'recipient',
      value: recipient,
      validators: ['isRequired']
    },
    ]);

    if (errors) {
      return errors
    }

    let params = {}
    if (isObject === 1) {
      if(app_uuid) {
        params.app_uuid = app_uuid
      }
      if(recipient) {
        params.recipient = recipient
      }
      if(channel) {
        params.channel = channel
      }
      if(url) {
        params.url = url
      }
      if(method) {
        params.method = method
      }
    }

    let client = this[clientKey];
    let idField = this[idKey];
    let action = this[actionKey] + (this.id ? this.id + '/' : '');

    return new Promise((resolve, reject) => {
      client('POST', action, params)
        .then(response => {
          resolve(new SessionResponse(response.body, idField));
        })
        .catch(error => {
          reject(error);
        });
    })

  }


  /**
   * Get Session by given id
   * @method
   * @param {string} id - id of session
   * @promise {object} return {@link Session} object if success
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

    let client = this[clientKey];
    let action = this[actionKey];

    return new Promise((resolve, reject) => {
      if (action !== '' && !id) {
        reject(new Error(this[idKey] + ' must be set'));
      }
      client('GET', action + (id ? id + '/' : ''))
        .then(response => {
          resolve(new SessionGetResponse(response.body, client));
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  list(params) {
    let client = this[clientKey];
    let action = this[actionKey];
    return new Promise((resolve, reject) => {
      client('GET', action, params)
        .then(response => {
          let sessions = {
            api_id: response.body.apiId,
            meta: response.body.meta
          }
          let objects = [];
          Object.defineProperty(objects, 'meta', {
            value: response.body.meta,
            enumerable: true
          });
          Object.defineProperty(objects, 'apiId', {
            value: response.body.apiId,
            enumerable: true
          })
          if (response.body.sessions !== null) {
            response.body.sessions.forEach(item => {
              objects.push(new SessionListResponse(item, client));
            });
            sessions.sessions = objects
          } else {
            sessions.sessions = null
          }
          resolve(sessions);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  validate(req) {
    var id, otp
    var isObject = arguments.length;
    if (isObject === 1) {
        id = req.id
        otp = req.otp
    }
    let errors = validate([{
      field: 'id',
      value: id,
      validators: ['isRequired']
    }]);

    if (errors) {
      return errors;
    }

     errors = validate([{
      field: 'otp',
      value: otp,
      validators: ['isRequired']
    }]);

    if (errors) {
      return errors;
    }

    let params = {}
    params.otp = otp

    let client = this[clientKey];
    let idField = this[idKey];
    let action = this[actionKey];

    return new Promise((resolve, reject) => {
      client('POST', action + (id ? id + '/' : ''), params)
        .then(response => {
          resolve(new ValidateSessionResponse(response.body, idField));
        })
        .catch(error => {
          reject(error);
        });
    })

  }
}
