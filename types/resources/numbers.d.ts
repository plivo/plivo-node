export class BuyNumberResponse {
	constructor(params: object);
	apiId: string;
	numbers: object;
	status: string;
}
export class UpdateNumberResponse {
	constructor(params: object);
	apiId: string;
	message: string;
}

export class SearchNumberResponse {
	constructor(params: object);
	number: string;
	prefix: string;
	city: string;	
	country: string;
	region: string;
	rate_center: string;
	lata: number;
	type: string;
	sub_type: string;
	setup_rate: string;
	monthly_rental_rate: string;
	sms_enabled: boolean;
	sms_rate: string;
	voice_enabled: boolean;
	voice_rate: string;
	restriction: string;
	restriction_text: string;
	resource_uri: string;
}

/**
 * Represents a PhoneNumber
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhoneNumber extends PlivoResource {
	constructor(client: Function, data ? : {});
	id: string;
	/**
	 * Buy Phone Number
	 * @method
	 * @param {string} appId - app id
	 * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
	 * @fail {Error} return Error
	 */
	buy(appId?: string): Promise < any > ;
	[clientKey]: symbol;
}
/**
 * Represents a PhoneNumbers Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 * @param {string} [data.test] - test data
 */
export class PhoneNumberInterface extends PlivoResourceInterface {
	constructor(client: Function, data ? : {});
	/**
	 * Buy Phone Number
	 * @method
	 * @param {string} appId - app id
	 * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
	 * @fail {Error} return Error
	 */
	buy(number: string, appId?: string): Promise < any > ;
	[clientKey]: symbol;
}
/**
 * Represents a Number
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class NumberResource extends PlivoResource {
	constructor(client: Function, data ? : {});
	id: string;
	/**
	 * Unrent Number
	 * @method
	 * @promise {boolean} return true if success
	 * @fail {Error} return Error
	 */
	unrent(number: string): Promise < any > ;
	[clientKey]: symbol;
}
/**
 * Represents a Numbers
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class NumberInterface extends PlivoResourceInterface {
	constructor(client: Function);
	/**
	 * Buy Phone Number
	 * @method
	 * @param {string} number - number to buy
	 * @param {string} appId - app id
	 * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
	 * @fail {Error} return Error
	 */
	buy(number: string, appId?: string): Promise < BuyNumberResponse > ;
	/**
	 * Add own number from carrier
	 * @method
	 * @param {string} numbers - A comma separated list of numbers that need to be added for the carrier.
	 * @param {string} carrier - The carrier_id of the IncomingCarrier that the number is associated with.
	 * @param {string} region - region that is associated with the Number
	 * @param {string} optionaParams - optional params
	 * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
	 * @fail {Error} return Error
	 */
	addOwnNumber(numbers: string, carrier: string, region: string, optionalParams: object): Promise < UpdateNumberResponse > ;
	/**
	 * Add own number from carrier
	 * @method
	 * @param {string} countryISO - The ISO code A2 of the country
	 * @param {string} optionaParams - optional params
	 * @promise {@link PhoneNumberInterface} return PhoneNumbers Object if success
	 * @fail {Error} return Error
	 */
	search(countryISO: string, optionalParams: object): Promise < SearchNumberResponse[] > ;
	/**
	 * Update Number
	 * @method
	 * @param {string} number - number to update
	 * @param {object} params
	 * @param {string} [params.appId] - app id
	 * @param {string} [params.subAccount] - auth_id of subaccount
	 * @param {string} [params.alias] - textual name of number
	 * @promise {@link NumberResource} return NumberResource Object if success
	 * @fail {Error} return Error
	 */
	update(number: string, params: {
		appId: string;
		subAccount: string;
		alias: string;
	}): Promise < UpdateNumberResponse > ;
	/**
	 * Unrent Number
	 * @method
	 * @param {string} number - number to unrent
	 * @promise {boolean} return true if success
	 * @fail {Error} return Error
	 */
	unrent(number: string): Promise < any > ;
	[clientKey]: symbol;
}
import {
	PlivoResource
} from "../base";
declare const clientKey: unique symbol;
import {
	PlivoResourceInterface
} from "../base";
export {};