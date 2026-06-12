export class BuyNumberResponse {
	constructor(params: object);
	apiId: string;
	numbers: object;
	status: string;
	fallbackNumber?: string;
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
	constructor(client: Function, data?: {});
	id: string;
	/**
	 * Buy Phone Number
	 * @method
	 * @param {string} appId - app id
	 * @param {string} cnamLookup - cnam lookup
	 * @param {boolean} haEnable - enable HA Number
	 * @param {string} complianceApplicationId - approved regulatory compliance application id to link at purchase (required for regulated numbers such as India)
	 * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
	 * @fail {Error} return Error
	 */
	buy(number: string, appId?: string, cnamLookup?: string, haEnable?: boolean, complianceApplicationId?: string): Promise<any>;
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
	constructor(client: Function, data?: {});
	/**
	 * Buy Phone Number
	 * @method
	 * @param {string} appId - app id
	 * @param {string} cnamLookup - cnam lookup
	 * @param {boolean} haEnable - enable HA Number
	 * @param {string} complianceApplicationId - approved regulatory compliance application id to link at purchase (required for regulated numbers such as India)
	 * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
	 * @fail {Error} return Error
	 */
	buy(number: string, appId?: string, cnamLookup?: string, haEnable?: boolean, complianceApplicationId?: string): Promise<any>;
	[clientKey]: symbol;
}
/**
 * Represents a Number
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class NumberResource extends PlivoResource {
	constructor(client: Function, data?: {});
	id: string;
	/**
	 * Unrent Number
	 * @method
	 * @promise {boolean} return true if success
	 * @fail {Error} return Error
	 */
	unrent(number: string): Promise<any>;
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
	 * @param {string} cnamLookup - cnam lookup
	 * @param {boolean} haEnable - enable HA Number
	 * @param {string} complianceApplicationId - approved regulatory compliance application id to link at purchase (required for regulated numbers such as India)
	 * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
	 * @fail {Error} return Error
	 */
	buy(number: string, appId?: string, cnamLookup?: string, haEnable?: boolean, complianceApplicationId?: string): Promise<BuyNumberResponse>;
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
	addOwnNumber(numbers: string, carrier: string, region: string, optionalParams: object): Promise<UpdateNumberResponse>;
	/**
	 * Add own number from carrier
	 * @method
	 * @param {string} countryISO - The ISO code A2 of the country
	 * @param {string} optionaParams - optional params
	 * @promise {@link PhoneNumberInterface} return PhoneNumbers Object if success
	 * @fail {Error} return Error
	 */
	search(countryISO: string, optionalParams: object): Promise<SearchNumberResponse[]>;
	/**
	 * List rented Account Phone Numbers
	 * @method
	 * @param {object} [params]
	 */
	list(params?: {
		type?: string;
		numberStartswith?: string;
		subAccount?: string;
		alias?: string;
		services?: string;
		cnamLookup?: string;
		renewal_date?: string;
		renewal_date__lt?: string;
		renewal_date__lte?: string;
		renewal_date__gt?: string;
		renewal_date__gte?: string;
		tendlcRegistrationStatus?: string;
		tendlcCampaignId?: string;
		tollFreeSmsVerification?: string;
		limit?: number;
		offset?: number;
	}): Promise<NumberResource[]>;
	/**
	 * Update Number
	 * @method
	 * @param {string} number - number to update
	 * @param {object} params
	 * @param {string} [params.appId] - app id linked to the number
	 * @param {string} [params.subAccount] - auth_id of subaccount the number is transferred to
	 * @param {string} [params.alias] - textual name of the number
	 * @param {string} [params.complianceApplicationId] - approved regulatory compliance application id to link to the number (note: the public docs show this as `compliance_id` but the backend wire param is `compliance_application_id`)
	 * @param {string} [params.cnamLookup] - 'enabled' or 'disabled' (US numbers only)
	 * @param {string} [params.cnam] - caller ID name to use for outbound calls
	 * @param {string} [params.cnamCallbackUrl] - URL to notify when CNAM registration changes
	 * @param {string} [params.cnamCallbackMethod] - 'GET' or 'POST' for the CNAM callback
	 * @param {string} [params.callerReputation] - 'enabled' or 'disabled'
	 * @param {string} [params.profileUuid] - business profile uuid to associate with the number
	 * @param {string} [params.callerReputationCallbackUrl] - URL to notify on caller reputation status changes
	 * @param {string} [params.callerReputationCallbackMethod] - 'GET' or 'POST' for the caller reputation callback
	 * @promise {@link NumberResource} return NumberResource Object if success
	 * @fail {Error} return Error
	 */
	update(number: string, params?: {
		appId?: string;
		subAccount?: string;
		alias?: string;
		complianceApplicationId?: string;
		cnamLookup?: string;
		cnam?: string;
		cnamCallbackUrl?: string;
		cnamCallbackMethod?: string;
		callerReputation?: string;
		profileUuid?: string;
		callerReputationCallbackUrl?: string;
		callerReputationCallbackMethod?: string;
	}): Promise<UpdateNumberResponse>;
	/**
	 * Unrent Number
	 * @method
	 * @param {string} number - number to unrent
	 * @promise {boolean} return true if success
	 * @fail {Error} return Error
	 */
	unrent(number: string): Promise<any>;
	[clientKey]: symbol;
}
import {
	PlivoResource
} from "../base";
declare const clientKey: unique symbol;
import {
	PlivoResourceInterface
} from "../base";
export { };