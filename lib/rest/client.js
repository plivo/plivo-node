import { Request } from './request.js';
import { camelCaseRequestWrapper } from './utils';
import { name, version } from '../../package.json';
import { Phlo, PhloInterface } from "../resources/phlo";
import { CallInterface } from "../resources/call";
import { SubaccountInterface, AccountInterface } from "../resources/accounts";
import { ApplicationInterface } from "../resources/applications";
import { ConferenceInterface } from "../resources/conferences";
import { EndpointInterface } from "../resources/endpoints";
import { MessageInterface } from "../resources/messages";
import { NumberInterface } from "../resources/numbers";
import { PricingInterface } from "../resources/pricings";
import { RecordingInterface } from "../resources/recordings";
import { Response } from "../utils/plivoxml";
import { validateSignature } from "../utils/security";
import { AddressInterface } from "../resources/addresses";
import { IdentityInterface } from "../resources/identities";

exports.Response = function () {
  return new Response();
}

exports.validateSignature = function (uri, nonce, signature, auth_token) {
  return validateSignature(uri, nonce, signature, auth_token);
}

/**
 * Plivo API client which can be used to access the Plivo APIs.
 * To set a proxy or timeout, pass in options.proxy (url) or options.timeout (number in ms)
 * You can also pass in additional parameters accepted by the node requests module.
 */
export class Client {
  constructor(authId, authToken, options) {
    if (!(this instanceof Client)) {
      return new Client(authId, authToken, options);
    }
    authId = authId || process.env.PLIVO_AUTH_ID;
    authToken = authToken || process.env.PLIVO_AUTH_TOKEN;

    if (authId == null) {
      throw (new Error('Please provide authId'));
    }
    if (authToken == null) {
      throw (new Error('Please provide authToken'));
    }

    options = Object.assign({}, {
      authId: authId,
      authToken: authToken,
      version: 'v1',
      // url: 'https://api.plivo.com/v1/Account/' + authId,
      // url: 'https://api.test.plivo.com/v1/Account/' + authId,
      url: 'https://api.numbers.plivodev.com/v1/Account/' + authId,

      userAgent: `${'plivo-node'}/${version || 'Unknown Version'} (Node: ${process.version})`,
    }, options);


    let client = camelCaseRequestWrapper(Request(options));

    this.calls = new CallInterface(client);
    this.accounts = new AccountInterface(client);
    this.subaccounts = this.subAccounts = new SubaccountInterface(client);
    this.applications = new ApplicationInterface(client);
    this.conferences = new ConferenceInterface(client);
    this.endpoints = new EndpointInterface(client);
    this.messages = new MessageInterface(client);
    this.numbers = new NumberInterface(client);
    this.pricings = new PricingInterface(client);
    this.recordings = new RecordingInterface(client);
    this.addresses = new AddressInterface(client);
    this.identities = new IdentityInterface(client);

  }
}

/**
 * Plivo API client which can be used to access the Plivo APIs.
 * To set a proxy or timeout, pass in options.proxy (url) or options.timeout (number in ms)
 * You can also pass in additional parameters accepted by the node requests module.
 */
export class PhloClient {
  constructor(authId, authToken, options) {

    if (!(this instanceof PhloClient)) {
      return new PhloClient(authId, authToken, options);
    }
    authId = authId || process.env.PLIVO_AUTH_ID;
    authToken = authToken || process.env.PLIVO_AUTH_TOKEN;

    if (authId == null) {
      throw (new Error('Please provide authId'));
    }
    if (authToken == null) {
      throw (new Error('Please provide authToken'));
    }

    options = Object.assign({}, {
      authId: authId,
      authToken: authToken,
      version: 'v1',
      url: 'https://phlorunner.plivo.com/v1',
      userAgent: `${'plivo-node'}/${version || 'Unknown Version'} (Node: ${process.version})`,
    }, options);

    let client = camelCaseRequestWrapper(Request(options));


    this.phlo = function (phloId) {
      let dd = new Phlo(client, { phloId: phloId, authId: authId });
      return dd;
    };

    this.phlo.get = function (phloId) {
      return new Promise((resolve, reject) => {
        let dd = new PhloInterface(client);
        dd.get(phloId).then(function (data) {
          data.authId = authId;
          resolve(data);
        }).catch(function (err) {
          reject(err);
        });
      });
    }

  }
}