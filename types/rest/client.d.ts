export function Response(): any;
export function validateV3Signature(method: string, uri: string, nonce: string, auth_token: string, v3_signature: string, params?: {}): Boolean;
export function validateSignature(uri: string, nonce: string, signature: string, auth_token: string): Boolean;
/**
 * Plivo API client which can be used to access the Plivo APIs.
 * To set a proxy or timeout, pass in options.proxy (url) or options.timeout (number in ms)
 * You can also pass in additional parameters accepted by the node requests module.
 */
export class Client {
    constructor(authId?: string, authToken?: string, options?: string);
    calls: CallInterface;
    accounts: AccountInterface;
    subaccounts: SubaccountInterface;
    subAccounts: SubaccountInterface;
    applications: ApplicationInterface;
    conferences: ConferenceInterface;
    endpoints: EndpointInterface;
    messages: MessageInterface;
    lookup: LookupInterface;
    powerpacks: PowerpackInterface;
    numbers: NumberInterface;
    pricings: PricingInterface;
    recordings: RecordingInterface;
    callFeedback: CallFeedbackInterface;
    media: MediaInterface;
    endUsers: EndUserInterface;
    complianceDocumentTypes: ComplianceDocumentTypeInterface;
    complianceDocuments: ComplianceDocumentInterface;
    complianceRequirements: ComplianceRequirementInterface;
    complianceApplications: ComplianceApplicationInterface;
    toJSON(...args: any[]): any;
}
/**
 * Plivo API client which can be used to access the Plivo APIs.
 * To set a proxy or timeout, pass in options.proxy (url) or options.timeout (number in ms)
 * You can also pass in additional parameters accepted by the node requests module.
 */
export class PhloClient {
    constructor(authId: any, authToken: any, options: any);
    phlo: (phloId: any) => Phlo;
}
import { CallInterface } from "../resources/call.js";
import { AccountInterface } from "../resources/accounts.js";
import { SubaccountInterface } from "../resources/accounts.js";
import { ApplicationInterface } from "../resources/applications.js";
import { ConferenceInterface } from "../resources/conferences.js";
import { EndpointInterface } from "../resources/endpoints.js";
import { MessageInterface } from "../resources/messages.js";
import { LookupInterface } from "../resources/lookup.js";
import { PowerpackInterface } from "../resources/powerpacks.js";
import { NumberInterface } from "../resources/numbers.js";
import { PricingInterface } from "../resources/pricings.js";
import { RecordingInterface } from "../resources/recordings.js";
import { CallFeedbackInterface } from "../resources/callFeedback.js";
import { MediaInterface } from "../resources/media.js";
import { Phlo } from "../resources/phlo.js";
import { EndUserInterface } from "../resources/endUsers";
import { ComplianceDocumentTypeInterface } from "../resources/complianceDocumentTypes";
import { ComplianceDocumentInterface} from "../resources/complianceDocuments";
import { ComplianceRequirementInterface } from "../resources/complianceRequirements";
import { ComplianceApplicationInterface } from "../resources/complianceApplications";