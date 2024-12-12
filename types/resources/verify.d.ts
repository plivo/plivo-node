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

interface Charges {
    totalCharge: number;
    validationCharge: number;
    attemptCharges: number;
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
    attemptDetails: any;
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
    attemptDetails: any;
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