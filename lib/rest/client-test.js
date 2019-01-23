import { Request } from './request-test.js';
import { CallInterface } from '../resources/call.js';
import { AccountInterface, SubaccountInterface } from '../resources/accounts.js';
import { ApplicationInterface } from '../resources/applications.js';
import { ConferenceInterface } from '../resources/conferences.js';
import { EndpointInterface } from '../resources/endpoints.js';
import { MessageInterface } from '../resources/messages.js';
import { NumberInterface } from '../resources/numbers.js';
import { PricingInterface } from '../resources/pricings.js';
import { RecordingInterface } from '../resources/recordings.js';
import { camelCaseRequestWrapper } from './utils';
import { Phlo, PhloInterface } from "../resources/phlo";
import { version } from '../../package.json';

export class Client {
  constructor(authId, authToken, proxy) {
    if (!(this instanceof Client)) {
      return new Client(authId, authToken, proxy);
    }
    authId = authId || process.env.PLIVO_AUTH_ID;
    authToken = authToken || process.env.PLIVO_AUTH_TOKEN;

    if (typeof authId === 'undefined') {
      throw 'Please provide authId';
    }
    if (typeof authToken === 'undefined') {
      throw 'Please provide authToken';
    }

    let options = {
      authId: authId,
      authToken: authToken,
      version: 'v1',
      url: 'https://api.plivo.com/v1/Account/' + authId,
      userAgent: 'NodePlivo'
    };
    if (typeof proxy !== 'undefined') {
      options.proxy = proxy;
    }

    let client = camelCaseRequestWrapper(Request(options));

    this.calls = new CallInterface(client);
    this.accounts = new AccountInterface(client);
    this.subAccounts = new SubaccountInterface(client);
    this.applications = new ApplicationInterface(client);
    this.conferences = new ConferenceInterface(client);
    this.endpoints = new EndpointInterface(client);
    this.messages = new MessageInterface(client);
    this.numbers = new NumberInterface(client);
    this.pricings = new PricingInterface(client);
    this.recordings = new RecordingInterface(client);
  }
}

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

    this.phlo.get = async function (phloId) {
      console.log('at fetching');
      let dd = new PhloInterface(client);
      let phloObj = await dd.get(phloId);
      phloObj.authId = authId;
    }
  }

}
