import {
  Request
} from './request-test.js';
import {
  CallInterface
} from '../resources/call.js';
import {
  version
} from '../../package.json';
import {
  Phlo,
  PhloInterface
} from "../resources/phlo";
import {
  AccountInterface,
  SubaccountInterface
} from '../resources/accounts.js';
import {
  ApplicationInterface
} from '../resources/applications.js';
import {
  ConferenceInterface
} from '../resources/conferences.js';
import {
  EndpointInterface
} from '../resources/endpoints.js';
import {
  MessageInterface
} from '../resources/messages.js';
import {
  LookupInterface
} from '../resources/lookup.js';
import {
  PowerpackInterface
} from '../resources/powerpacks.js';
import {
  NumberInterface
} from '../resources/numbers.js';
import {
  PricingInterface
} from '../resources/pricings.js';
import {
  RecordingInterface
} from '../resources/recordings.js';
import {
  camelCaseRequestWrapper
} from './utils';
import {
  MediaInterface
} from '../resources/media.js';
import { EndUserInterface } from "../resources/endUsers";
import { ComplianceDocumentTypeInterface } from "../resources/complianceDocumentTypes";
import { ComplianceDocumentInterface} from "../resources/complianceDocuments";
import { ComplianceRequirementInterface } from "../resources/complianceRequirements";
import { ComplianceApplicationInterface } from "../resources/complianceApplications";
import {MultiPartyCallInterface} from "../resources/multiPartyCall";

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
    this.lookup = new LookupInterface(client);
    this.powerpacks = new PowerpackInterface(client);
    this.numbers = new NumberInterface(client);
    this.pricings = new PricingInterface(client);
    this.recordings = new RecordingInterface(client);
    this.media = new MediaInterface(client);
    this.endUsers = new EndUserInterface(client);
    this.complianceDocumentTypes = new ComplianceDocumentTypeInterface(client);
    this.complianceDocuments = new ComplianceDocumentInterface(client);
    this.complianceRequirements = new ComplianceRequirementInterface(client);
    this.complianceApplications = new ComplianceApplicationInterface(client);
    this.multiPartyCalls = new MultiPartyCallInterface(client);
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
      let dd = new Phlo(client, {
        phloId: phloId,
        authId: authId
      });
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
