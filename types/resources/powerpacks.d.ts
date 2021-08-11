export class ListAllNumbersResponse {
	constructor(params: object);
	apiId: string;
	meta: object;
	objects: object;
}
export class CreatePowerpackResponse {
	constructor(params: object);
	apiId: string;
	applicationId: string;
	applicationType: string;
	createdOn: string;
	localConnect: string;
	name: string;
	numberPool: string;
	numberPriority: string;
	stickySender: string;
	uuid: string;
}

export class RetrievePowerpack {
	constructor(params: object);
	apiId: string;
	applicationId: string;
	applicationType: string;
	createdOn: string;
	localConnect: string;
	name: string;
	numberPool: string;
	numberPriority: object;
	stickySender: string;
	uuid: string;
}

export class UpdatePowerpackResponse {
	constructor(params: object);
	apiId: string;
	applicationId: string;
	applicationType: string;
	createdOn: string;
	localConnect: string;
  name: string;
	numberPool: string;
	stickySender: string;
	uuid: string;
}
export class ListShortCodeResponse {
	constructor(params: object);
	apiId: string;
	meta: object;
	objects: object;
}
export class ListTollFreeResponse {
	constructor(params: object);
	apiId: string;
	meta: object;
	objects: object;
}
export class AddNumberResponse {
	constructor(params: object);
	apiId: string;
  accountPhoneNumberResource: string;
	addedOn: string;
	countryIso2: string;
	number: string;
	numberPoolUuid: string;
	type: string;
	service: string;
}
export class RemoveNumberResponse {
	constructor(params: object);
    apiId: string;
    response: string;
}
export class RemoveTollFreeNumberResponse {
	constructor(params: object);
    apiid: string;
    response: string;
}
export class RemoveShortCodeResponse {
	constructor(params: object);
    apiid: string;
    response: string;
}
export class AddTollFreeNumberresponse {
	constructor(params: object);
	apiId: string;
	accountPhoneNumberResource: string;
	addedOn: string;
	countryIso2: string;
	number: string;
	numberPoolUuid: string;
	type: string;
	service: string;
}
export class RetrieveNumberResponse {
	constructor(params: object);
	apiId: string;
	accountPhoneNumberResource: string;
	addedOn: string;
	countryIso2: string;
	number: string;
	numberPoolUuid: string;
	type: string;
}
export class RetrieveTollFreeResponse {
	constructor(params: object);
	apiId: string;
	accountPhoneNumberResource: string;
	addedOn: string;
	countryIso2: string;
	number: string;
	numberPoolUuid: string;
	type: string;
}
export class RetrieveShortCodeResponse {
	constructor(params: object);
	apiId: string;
	addedOn: string;
	countryIso2: string;
	shortCode: string;
	numberPoolUuid: string;
}
/**
 * Represents a Powerpack
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Powerpack extends PlivoResource {
	constructor(client: Function, data ? : {});
	uuid: string;
	number_pool_id: string;
	number_pool: NumberPool;
	list_numbers(params: object): Promise < ListAllNumbersResponse > ;
	search_query(params: object): string;
	count_numbers(params: object): Promise < any > ;
	find_number(number: string): Promise < RetrieveNumberResponse > ;
	add_number(number: string, service ? : string): Promise < AddNumberResponse > ;
	add_tollfree(tollfree: string, service ? : string): Promise < AddTollFreeNumberresponse > ;
	remove_number(number: string, unrent ? : boolean): Promise < RemoveNumberResponse > ;
	remove_tollfree(tollfree: string, unrent ? : boolean): Promise < RemoveTollFreeNumberResponse > ;
	remove_shortcode(shortcode: string): Promise < RemoveShortCodeResponse > ;
	list_shortcodes(params: object): Promise < ListShortCodeResponse > ;
	list_tollfree(params: object): Promise < ListTollFreeResponse > ;
	find_shortcode(shortcode: object, service ? : string): Promise < RetrieveShortCodeResponse > ;
	find_tollfree(tollfree: string, service ? : string): Promise < RetrieveTollFreeResponse > ;
	buy_add_number(params: object): Promise <AddNumberResponse>;
	[clientKey]: symbol;
}
export class NumberPool extends PlivoResource {
	constructor(client: Function, data ? : {});
	numbers: Numbers;
	shortcodes: Shortcode;
	tollfree: Tollfree;
}
export class Numbers extends PlivoResource {
	constructor(client: Function, data ? : {});
	buy_add_number(params: object): any;
	list(params: object): Promise < any > ;
	count(params: object): Promise < any > ;
	search_query(params: object): string;
	find(number: object): Promise < any > ;
	add(number: string, service ? : string): Promise < any > ;
	remove(number: string, unrent ? : boolean): Promise < any > ;
}
export class Shortcode extends PlivoResource {
	constructor(client: Function, data ? : {});
	number_pool_id: string;
	list(params: object): Promise < any > ;
	find(shortcode: object): Promise < any > ;
	remove(shortcode: object): Promise < any > ;
}
export class Tollfree extends PlivoResource {
	constructor(client: Function, data ? : {});
	number_pool_id: string;
	add(tollfree: string): Promise < any > ;
	remove(tollfree: string, unrent ? : boolean): Promise < any > ;
	list(params: object): Promise < any > ;
	find(tollfree: object): Promise < any > ;
}
/**
 * Represents a Powerpack interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PowerpackInterface extends PlivoResourceInterface {
	constructor(client: Function, data ? : {});
    /**
     * get Powerpack by given id
     * @method
     * @param {string} uuid - id of Powerpack
     * @promise {object} return {@link Powerpack} object
     * @fail {Error} return Error
     */
    get(uuid: string): Promise<RetrievePowerpack>;
    /**
     * create Powerpack
     * @method
     * @param {string} name - name of Powerpack
     * @param {object} params - params to create Powerpack
     * @param {string} [params.sticky_sender] -
     * @param {string} [params.local_connect]
     * @param {string} [params.application_type]
     * @param {string} [params.application_id]
     * @promise {object} return {@link RetrievePowerpack} object
     * @fail {Error} return Error
     */
    create(name: string, params?: {}): Promise<CreatePowerpackResponse>;
    /**
	 * update Powerpack
	 * @method
	 * @param {string} uuid - id of Powerpack
	 * @param {object} params - to update Powerpack
	 * @param {string} [params.name]
	 * @param {string} [params.sticky_sender]
	 * @param {string} [params.local_connect]
	 * @param {string} [params.application_type]
	 * @param {string} [params.application_id]
	 * @promise {object} return {@link Powerpack} object
	 * @fail {Error} return Error
	 */
	update(uuid: string, params: {
		name: string;
		sticky_sender: string;
		local_connect: string;
		application_type: string;
		application_id: string;
	}): Promise < UpdatePowerpackResponse > ;
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