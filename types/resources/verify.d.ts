interface SessionResponseParams {
    apiId?: string;
    message?: string;
    sessionUuid?: string;
    invalidNumber?: string;
  }
  
export class SessionResponse {
    apiId?: string;
    message?: string;
    sessionUuid?: string;
    invalid_number?: string;
  
    constructor(params: SessionResponseParams = {}) {
      this.apiId = params.apiId;
      this.message = params.message;
      this.sessionUuid = params.sessionUuid;
      if (params.invalidNumber !== undefined) {
        this.invalid_number = params.invalidNumber;
      }
    }
  }
  
interface ValidateSessionResponseParams {
    apiId?: string;
    message?: string;
    invalidNumber?: string;
  }
  
export class ValidateSessionResponse {
    apiId?: string;
    message?: string;
    invalid_number?: string;
  
    constructor(params: ValidateSessionResponseParams = {}) {
      this.apiId = params.apiId;
      this.message = params.message;
      if (params.invalidNumber !== undefined) {
        this.invalid_number = params.invalidNumber;
      }
    }
  }
  
interface Charges {
    totalCharge?: number;
    validationCharge?: number;
    attemptCharges?: number;
  }
  
interface SessionGetResponseParams {
    apiId?: string;
    sessionUuid?: string;
    appUuid?: string;
    alias?: string;
    recipient?: string;
    channel?: string;
    status?: string;
    count?: number;
    requestorIp?: string;
    destinationCountryIso2?: string;
    destinationNetwork?: string;
    attemptDetails?: any;
    createdAt?: string;
    updatedAt?: string;
    charges?: Charges;
  }
  
export class SessionGetResponse {
    apiId?: string;
    sessionUuid?: string;
    appUuid?: string;
    alias?: string;
    recipient?: string;
    channel?: string;
    status?: string;
    count?: number;
    requestor_ip?: string;
    destination_country_iso2?: string;
    destination_network?: string;
    attemptDetails?: any;
    createdAt?: string;
    updatedAt?: string;
    charges: Charges;
  
    constructor(params: SessionGetResponseParams = {}) {
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
  
      if (params.charges) {
        this.charges.totalCharge = params.charges.totalCharge;
        this.charges.validationCharge = params.charges.validationCharge;
        this.charges.attemptCharges = params.charges.attemptCharges;
      }
    }
  }
  
interface SessionListResponseParams {
    sessionUuid?: string;
    appUuid?: string;
    recipient?: string;
    alias?: string;
    channel?: string;
    status?: string;
    count?: number;
    requestorIp?: string;
    destinationCountryIso2?: string;
    destinationNetwork?: string;
    attemptDetails?: any;
    createdAt?: string;
    updatedAt?: string;
    charges?: Charges;
  }
  
export class SessionListResponse {
    sessionUuid?: string;
    appUuid?: string;
    recipient?: string;
    alias?: string;
    channel?: string;
    status?: string;
    count?: number;
    requestor_ip?: string;
    destination_country_iso2?: string;
    destination_network?: string;
    attemptDetails?: any;
    createdAt?: string;
    updatedAt?: string;
    charges: Charges;
  
    constructor(params: SessionListResponseParams = {}) {
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
  
      if (params.charges) {
        this.charges.totalCharge = params.charges.totalCharge;
        this.charges.validationCharge = params.charges.validationCharge;
        this.charges.attemptCharges = params.charges.attemptCharges;
      }
    }
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