export class InitiateVerifyResponse {
	constructor(params: object);
	apiId: string;
	message: string;
	verificationUuid: string;
}
export class VerifyCallerIdResponse {
	constructor(params: object);
	apiId: string;
	alias: string;
    channel:string;
    country:string;
    createdAt:string;
    phoneNumber:string;
    subaccount:string;
    verificationUuid:string;
}

export class GetVerifiedCallerIdResponse {
	constructor(params: object);
	apiId: string;
	alias: string;
    country:string;
    createdAt:string;
    modifiedAt:string;
    phoneNumber:string;
    subaccount:string;
    verificationUuid:string;
}

export class ListVerifiedCallerIdResponse {
	constructor(params: object);
	apiId: string;
    meta:string;
	objects: object;
}

export class Verify extends PlivoResource {
	constructor(client: Function, data ? : {});
	id: string;

}

export class VerifyInterface extends PlivoResourceInterface {
	constructor(client: Function, data ? : {});

	initiate(phoneNumber: string,params ? : {}): Promise < InitiateVerifyResponse > ;

    verify(verificationUuid: string,otp:string,params ? : {}): Promise < VerifyCallerIdResponse > ;

	updateVerifiedCallerId(phoneNumber: string, params ? : {}): Promise < GetVerifiedCallerIdResponse > ;

	listVerifiedCallerId(params ? : {}): Promise < ListVerifiedCallerIdResponse > ;

	getVerifiedCallerId(phoneNumber: string): Promise < GetVerifiedCallerIdResponse > ;

	deleteVerifiedCallerId(phoneNumber: string): Promise < any > ;
}
import {
  PlivoResource,
	PlivoResourceInterface
} from "../base";
