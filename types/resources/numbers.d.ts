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
/**
 * Represents a PhoneNumber
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhoneNumber extends PlivoResource {
	constructor(client: function, data ? : {});
	id: string;
	/**
	 * Buy Phone Number
	 * @method
	 * @param {string} appId - app id
	 * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
	 * @fail {Error} return Error
	 */
	buy(appId: string): Promise < any > ;
	[clientKey]: any;
}
/**
 * Represents a PhoneNumbers Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 * @param {string} [data.test] - test data
 */
export class PhoneNumberInterface extends PlivoResourceInterface {
	constructor(client: function, data ? : {});
	/**
	 * Buy Phone Number
	 * @method
	 * @param {string} appId - app id
	 * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
	 * @fail {Error} return Error
	 */
	buy(number: string, appId: string): Promise < BuyNumberResponse > ;
	[clientKey]: any;
}
/**
 * Represents a Number
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class NumberResource extends PlivoResource {
	constructor(client: function, data ? : {});
	id: string;
	/**
	 * Unrent Number
	 * @method
	 * @promise {boolean} return true if success
	 * @fail {Error} return Error
	 */
	unrent(number: string): Promise < any > ;
	[clientKey]: any;
}
/**
 * Represents a Numbers
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class NumberInterface extends PlivoResourceInterface {
	constructor(client: function);
	/**
	 * Buy Phone Number
	 * @method
	 * @param {string} number - number to buy
	 * @param {string} appId - app id
	 * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
	 * @fail {Error} return Error
	 */
	buy(number: string, appId: string): Promise < any > ;
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
	addOwnNumber(numbers: string, carrier: string, region: string, optionalParams: any): Promise < any > ;
	/**
	 * Add own number from carrier
	 * @method
	 * @param {string} countryISO - The ISO code A2 of the country
	 * @param {string} optionaParams - optional params
	 * @promise {@link PhoneNumberInterface} return PhoneNumbers Object if success
	 * @fail {Error} return Error
	 */
	search(countryISO: string, optionalParams: any): Promise < any > ;
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
	}): Promise < any > ;
	/**
	 * Unrent Number
	 * @method
	 * @param {string} number - number to unrent
	 * @promise {boolean} return true if success
	 * @fail {Error} return Error
	 */
	unrent(number: string): Promise < any > ;
	[clientKey]: any;
}
import {
	PlivoResource
} from "../base";
declare const clientKey: unique symbol;
import {
	PlivoResourceInterface
} from "../base";
export {};