import { Axios } from "./axios.js";
import { camelCaseRequestWrapper } from "./utils";
import { name, version } from "../../package.json";
import { Phlo, PhloInterface } from "../resources/phlo";
import { CallInterface } from "../resources/call";
import { SubaccountInterface, AccountInterface } from "../resources/accounts";
import { ApplicationInterface } from "../resources/applications";
import { ConferenceInterface } from "../resources/conferences";
import { EndpointInterface } from "../resources/endpoints";
import { MessageInterface } from "../resources/messages";
import { LookupInterface } from "../resources/lookup";
import { PowerpackInterface } from "../resources/powerpacks";
import { BrandInterface } from "../resources/brand.js";
import { CampaignInterface } from "../resources/campaign.js";
import { NumberInterface } from "../resources/numbers";
import { PricingInterface } from "../resources/pricings";
import { RecordingInterface } from "../resources/recordings";
import { Response } from "../utils/plivoxml";
import { AccessToken } from "../utils/jwt";
import { validateSignature } from "../utils/security";
import { validateV3Signature } from "../utils/v3Security";
import { stringify } from "./../utils/jsonStrinfigier";
import { CallFeedbackInterface } from "../resources/callFeedback";
import { MediaInterface } from "../resources/media.js";
import { EndUserInterface } from "../resources/endUsers";
import { ComplianceDocumentTypeInterface } from "../resources/complianceDocumentTypes";
import { ComplianceDocumentInterface} from "../resources/complianceDocuments";
import { ComplianceRequirementInterface } from "../resources/complianceRequirements";
import { ComplianceApplicationInterface } from "../resources/complianceApplications";
import { MultiPartyCallInterface } from "../resources/multiPartyCall";
import { LOAInterface } from "../resources/loa";
import { HostedMessagingNumberInterface } from "../resources/hostedMessagingNumber";


exports.Response = function() {
  return new Response();
};

exports.AccessToken = function(authId, authToken, username, validity, uid) {
  return new AccessToken(authId, authToken, username, validity, uid);
};

exports.validateV3Signature = function(method, uri, nonce, auth_token, v3_signature, params={}) {
  return validateV3Signature(method, uri, nonce, auth_token, v3_signature, params);
};

exports.validateSignature = function(uri, nonce, signature, auth_token) {
  return validateSignature(uri, nonce, signature, auth_token);
};

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
      throw new Error("Please provide authId");
    }
    if (authToken == null) {
      throw new Error("Please provide authToken");
    }

    options = Object.assign(
      {},
      {
        authId: authId,
        authToken: authToken,
        version: "v1",
        url: "https://api.plivo.com/v1/Account/" + authId,
        userAgent: `${"plivo-node"}/${version || "Unknown Version"} (Node: ${
          process.version
        })`
      },
      options
    );
    let client = camelCaseRequestWrapper(Axios(options));

    this.calls = new CallInterface(client);
    this.accounts = new AccountInterface(client);
    this.subaccounts = this.subAccounts = new SubaccountInterface(client);
    this.applications = new ApplicationInterface(client);
    this.conferences = new ConferenceInterface(client);
    this.endpoints = new EndpointInterface(client);
    this.messages = new MessageInterface(client);
    this.lookup = new LookupInterface(client);
    this.powerpacks = new PowerpackInterface(client);
    this.brand = new BrandInterface(client);
    this.campaign = new CampaignInterface(client);
    this.numbers = new NumberInterface(client);
    this.pricings = new PricingInterface(client);
    this.recordings = new RecordingInterface(client);
    this.callFeedback = new CallFeedbackInterface(client);
    this.media = new MediaInterface(client);
    this.endUsers = new EndUserInterface(client);
    this.complianceDocumentTypes = new ComplianceDocumentTypeInterface(client);
    this.complianceDocuments = new ComplianceDocumentInterface(client);
    this.complianceRequirements = new ComplianceRequirementInterface(client);
    this.complianceApplications = new ComplianceApplicationInterface(client);
    this.multiPartyCalls = new MultiPartyCallInterface(client);
    this.loa = new LOAInterface(client);
    this.hostedMessagingNumber = new HostedMessagingNumberInterface(client);
  }

  toJSON() {
    // return "hello..";
    return stringify.apply(arguments);
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
      throw new Error("Please provide authId");
    }
    if (authToken == null) {
      throw new Error("Please provide authToken");
    }

    options = Object.assign(
      {},
      {
        authId: authId,
        authToken: authToken,
        version: "v1",
        url: "https://phlorunner.plivo.com/v1",
        userAgent: `${"plivo-node"}/${version || "Unknown Version"} (Node: ${
          process.version
        })`
      },
      options
    );

    let client = camelCaseRequestWrapper(Axios(options));

    this.phlo = function(phloId) {
      let dd = new Phlo(client, { phloId: phloId, authId: authId });
      return dd;
    };

    this.phlo.get = function(phloId) {
      return new Promise((resolve, reject) => {
        let dd = new PhloInterface(client);
        dd.get(phloId)
          .then(function(data) {
            data.authId = authId;
            resolve(data);
          })
          .catch(function(err) {
            reject(err);
          });
      });
    };
  }
}
