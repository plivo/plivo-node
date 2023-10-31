import * as _ from "lodash";

import {
  PlivoResource,
  PlivoResourceInterface
} from '../base';
import {
  extend,
  validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'VerifiedCallerId/';
const idField = 'verificationUuid';


export class InitiateVerifyResponse {
  constructor(params) {
    params = params || {};
    this.apiId = params.apiId;
    this.message = params.message;
    this.verificationUuid = params.verificationUuid;
  }
}

export class VerifyCallerIdResponse {
  constructor(params) {
    params = params || {};
    this.apiId = params.apiId;
    this.alias = params.alias;
    this.channel = params.channel;
    this.country = params.country;
    this.createdAt = params.createdAt;
    this.phoneNumber = params.phoneNumber;
    this.subaccount = params.subaccount;
    this.verificationUuid = params.verificationUuid;
  }
}

export class GetVerifiedCallerIdResponse {
  constructor(params) {
    params = params || {};
    this.apiId = params.apiId;
    this.alias = params.alias;
    this.country = params.country;
    this.createdAt = params.createdAt;
    this.modifiedAt = params.modifiedAt;
    this.phoneNumber = params.phoneNumber;
    this.subaccount = params.subaccount;
    this.verificationUuid = params.verificationUuid;
  }
}

export class ListVerifiedCallerIdResponse {
  constructor(params) {
    params = params || {};
    this.apiId = params.apiId;
    this.meta = params.meta;
    this.objects = params.objects;
  }
}

/**
 * Represents a Verify
 * @constructor
 * @param {function} client - make verify api call
 * @param {object} [data] - data of verify
 */

export class Verify extends PlivoResource {
  constructor(client, data = {}) {
    super(action, Verify, idField, client);
    this[clientKey] = client;
    if (idField in data) {
      this.id = data[idField];
    }
    extend(this, data);
  }

}

export class VerifyInterface extends PlivoResourceInterface {

  constructor(client, data = {}) {
    super(action, Verify, client);
    this[clientKey] = client;
    if (idField in data) {
      this.id = data[idField];
    }
    extend(this, data);
  }

  initiate(phoneNumber, optionalParams = {}) {
    let errors = validate([{
      field: 'phoneNumber',
      value: phoneNumber,
      validators: ['isRequired']
    }
    ]);

    if (errors) {
      return errors;
    }

    optionalParams.phoneNumber = phoneNumber

    let client = this[clientKey];

    return new Promise((resolve, reject) => {
      client('POST', action, optionalParams)
        .then(response => {
          resolve(new InitiateVerifyResponse(response.body));
        })
        .catch(error => {
          reject(error);
        });
    })
  }

  verify(verificationUuid, otp) {

    let errors = validate([{
      field: 'verificationUuid',
      value: verificationUuid,
      validators: ['isRequired']
    },
      {
        field: 'otp',
        value: otp,
        validators: ['isRequired']
      }

    ]);
    let params = {}
    params.otp = otp

    if (errors) {
      return errors;
    }

    let client = this[clientKey];

    return new Promise((resolve, reject) => {
      client('POST', action + 'Verification/' + verificationUuid, params)
        .then(response => {
          resolve(new VerifyCallerIdResponse(response.body));
        })
        .catch(error => {
          reject(error);
        });
    })
  }

  updateVerifiedCallerId(phoneNumber, optionalParams = {}) {

    let errors = validate([{
      field: 'phoneNumber',
      value: phoneNumber,
      validators: ['isRequired']
    },
    ]);

    if (errors) {
      return errors;
    }

    let client = this[clientKey];

    return new Promise((resolve, reject) => {
      client('POST', action + phoneNumber + '/', optionalParams)
        .then(response => {
          resolve(new GetVerifiedCallerIdResponse(response.body));
        })
        .catch(error => {
          reject(error);
        });
    })
  }

  getVerifiedCallerId(phoneNumber) {

    let errors = validate([{
      field: 'phoneNumber',
      value: phoneNumber,
      validators: ['isRequired']
    },
    ]);

    if (errors) {
      return errors;
    }

    let client = this[clientKey];

    return new Promise((resolve, reject) => {
      client('GET', action + phoneNumber + '/')
        .then(response => {
          resolve(new GetVerifiedCallerIdResponse(response.body));
        })
        .catch(error => {
          reject(error);
        });
    })
  }

  listVerifiedCallerId(params = {}) {
    let client = this[clientKey];

    return new Promise((resolve, reject) => {
      client('GET', action, params)
        .then(response => {
          resolve(new ListVerifiedCallerIdResponse(response.body));
        })
        .catch(error => {
          reject(error);
        });
    })
  }

  deleteVerifiedCallerId(phoneNumber) {

    let errors = validate([{
      field: 'phoneNumber',
      value: phoneNumber,
      validators: ['isRequired']
    },
    ]);

    if (errors) {
      return errors;
    }

    let client = this[clientKey];

    return new Promise((resolve, reject) => {
      client('DELETE', action + phoneNumber + '/')
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    })
  }

}
