export class SessionResponse {
    constructor(params: object);
    apiId: string;
    message: string;
    sessionUuid: string;
    invalid_number: string;
}

export class ValidateSessionResponse {
    constructor(params: object);
    apiId: string;
    message: string;
    invalid_number: string;
}

// Only the INR sibling is declared; other keys come through camelCased.
interface AttemptCharge {
    /** INR sibling of charge; present only for INR accounts. */
    chargeInr?: string;
    [key: string]: any;
}

// Only the INR sibling is declared; other keys come through camelCased.
interface AttemptDetail {
    /** INR sibling of amount; present only for INR accounts. */
    amountInr?: number;
    [key: string]: any;
}

interface Charges {
    totalCharge: number;
    /** INR sibling of totalCharge; present only for INR accounts, and omitted when any attempt has no INR amount (e.g. voice). */
    totalChargeInr?: string;
    validationCharge: number;
    attemptCharges: AttemptCharge[];
}

export class SessionGetResponse {
    constructor(params: object);
    apiId: string;
    sessionUuid: string;
    appUuid: string;
    alias: string;
    recipient: string;
    channel: string;
    status: string;
    count: number;
    requestor_ip: string;
    destination_country_iso2: string;
    destination_network: string;
    attemptDetails: AttemptDetail[];
    createdAt: string;
    updatedAt: string;
    charges: Charges;
}

export class SessionListResponse {
    constructor(params: object);
    sessionUuid: string;
    appUuid: string;
    recipient: string;
    alias: string;
    channel: string;
    status: string;
    count: number;
    requestor_ip: string;
    destination_country_iso2: string;
    destination_network: string;
    attemptDetails: AttemptDetail[];
    createdAt: string;
    updatedAt: string;
    charges: Charges;
}
  
export class Session extends PlivoResource {
	constructor(client: Function, data ? : {});
	id: string;
}

export class SessionInterface extends PlivoResourceInterface {
    get(id: string): Promise<SessionGetResponse>;
	  list(params: object): Promise < SessionListResponse> ;
    validate(req: object): Promise<ValidateSessionResponse> ;
    create(sessionReq: object): Promise<SessionResponse> ;
    [clientKey]: symbol;
}

declare const clientKey: unique symbol;
import {
    PlivoResource,
    PlivoResourceInterface
  } from "../base";