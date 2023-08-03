import {
    PlivoGenericResponse,
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'Number/';
const idField = 'number';


export class BuyNumberResponse {
    constructor(params, statusCode) {
        params = params || {};
        this.apiId = params.apiId;
        this.numbers = params.numbers;
        this.status = params.status;
        this.message = params.message;
        this.statusCode = statusCode;
        if (params.newCnam) {
          this.new_cnam = params.newCnam;
        }
        if (params.cnamUpdateStatus) {
          this.cnam_update_status = params.cnamUpdateStatus;
        }
    }
}

export class SearchNumberResponse {
    constructor(params) {
        params = params || {};
        this.number = params.number;
        this.prefix = params.prefix;
        this.city = params.city;
        this.country = params.country;
        this.region = params.region;
        this.rate_center = params.rate_center;
        this.lata = params.lata;
        this.type = params.type;
        this.sub_type = params.sub_type;
        this.setup_rate = params.setup_rate;
        this.monthly_rental_rate = params.monthly_rental_rate;
        this.sms_enabled = params.sms_enabled;
        this.sms_rate = params.sms_rate;
        this.voice_enabled = params.voice_enabled;
        this.voice_rate = params.voice_rate;
        this.restriction = params.restriction;
        this.restriction_text = params.restriction_text;
        this.resource_uri = params.resource_uri;
    }
}

export class UpdateNumberResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
        if (params.newCnam) {
          this.new_cnam = params.newCnam;
        }
        if (params.cnamUpdateStatus) {
          this.cnam_update_status = params.cnamUpdateStatus;
        }
    }
}

/**
 * Represents a PhoneNumber
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhoneNumber extends PlivoResource {
    constructor(client, data = {}) {
        super('PhoneNumber/', PhoneNumber, idField, client);

        if (idField in data) {
            this.id = data[idField];
        }

        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * Buy Phone Number
     * @method
     * @param {string} appId - app id
     * @param {string} cnamLookup - cnam lookup
     * @param {string} cnam - cnam attached to number
     * @param {string} callback_method - callback_method Method to call the url for attaching cnam
     * @param {string} callback_url - callback_url url to attach the cnam
     * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
     * @fail {Error} return Error
     */
    buy(number,appId,cnamLookup,cnam,callback_method,callback_url) {
        return new PhoneNumberInterface(this[clientKey], {
            id: this.id
        }).buy(number,appId,cnamLookup,cnam,callback_method,callback_url);
    }
}

/**
 * Represents a PhoneNumbers Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 * @param {string} [data.test] - test data
 */
export class PhoneNumberInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super('PhoneNumber/', PhoneNumber, idField, client);

        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * Buy Phone Number
     * @method
     * @param {string} appId - app id
     * @param {string} cnamLookup - cnam lookup
     * @param {string} cnam - cnam attached to number
     * @param {string} callback_method - callback_method Method to call the url for attaching cnam
     * @param {string} callback_url - callback_url url to attach the cnam* @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
     * @fail {Error} return Error
     */
    buy(number, appId,cnamLookup, cnam, callback_method, callback_url) {
        let params = {};
        if (appId) {
            params.app_id = appId;
        }
        if (cnamLookup) {
          params.cnam_lookup = cnamLookup;
        }
        if (cnam) {
          params.cnam = cnam;
        }
        if (callback_url) {
          params.callback_url = callback_url;
        }
        if (callback_method) {
          params.callback_method = callback_method;
        }
        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('POST', 'PhoneNumber/' + number + '/', params)
                .then(response => {
                    resolve(new BuyNumberResponse(response.body, response.response.status, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

/**
 * Represents a Number
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class NumberResource extends PlivoResource {
    constructor(client, data = {}) {
        super(action, NumberResource, idField, client);

        if (idField in data) {
            this.id = data[idField];
        }
        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * Unrent Number
     * @method
     * @promise {boolean} return true if success
     * @fail {Error} return Error
     */
    unrent(number) {
        let client = this[clientKey];
        let action = 'Number/';
        return new Promise((resolve, reject) => {
            client('DELETE', action + number + '/')
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Update Number
     * @method
     * @param {object} params
     * @param {string} [params.appId] - app id
     * @param {string} [params.subAccount] - auth_id of subaccount
     * @param {string} [params.alias] - textual name of number
     * @param {string} [params.cnamLookup] - cnam lookup of number
     * @param {string} [params.cnam] - cnam attached to number
     * @param {string} [params.callback_method] - callback_method Method to call the url for attaching cnam
     * @param {string} [params.callback_url] - callback_url url to attach the cnam
     * @promise {@link NumberResource} return NumberResource Object if success
     * @fail {Error} return Error
     */
    update(number, params) {
        let client = this[clientKey];
        let action = 'Number/';
        let that = this;

        return new Promise((resolve, reject) => {
            client('POST', action + number + '/', params)
                .then(response => {
                    extend(that, response.body);
                    if (params.hasOwnProperty('isVoiceRequest')) {
                        delete params.isVoiceRequest;
                    }
                    extend(that, params);
                    resolve(new UpdateNumberResponse(that));
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

}

/**
 * Represents a Numbers
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class NumberInterface extends PlivoResourceInterface {

    constructor(client) {
        super(action, NumberResource, idField, client);
        this[clientKey] = client;
    }

    /**
     * Buy Phone Number
     * @method
     * @param {string} number - number to buy
     * @param {string} appId - app id
     * @param {string} cnamLookup - cnam lookup
     * @param {string} cnam - cnam attached to number
     * @param {string} callbackMethod - callback_method Method to call the url for attaching cnam
     * @param {string} callbackUrl - callback_url url to attach the cnam
     * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
     * @fail {Error} return Error
     */
    buy(number, appId, cnamLookup, cnam, callbackMethod, callbackUrl ) {
        let errors = validate([{
            field: 'number',
            value: number,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }
        return new PhoneNumber(this[clientKey], {
            id: number
        }).buy(number, appId, cnamLookup, cnam, callbackMethod, callbackUrl);
    }

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
    addOwnNumber(numbers, carrier, region, optionalParams) {
        let errors = validate([{
                field: 'numbers',
                value: numbers,
                validators: ['isRequired']
            },
            {
                field: 'carrier',
                value: carrier,
                validators: ['isRequired']
            },
            {
                field: 'region',
                value: region,
                validators: ['isRequired']
            }
        ]);

        if (errors) {
            return errors;
        }
        let params = optionalParams || {};

        params.numbers = numbers;
        params.carrier = carrier;
        params.region = region;

        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new PlivoGenericResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    /**
     * Add own number from carrier
     * @method
     * @param {string} countryISO - The ISO code A2 of the country
     * @param {string} optionaParams - optional params
     * @promise {@link PhoneNumberInterface} return PhoneNumbers Object if success
     * @fail {Error} return Error
     */
    search(countryISO, optionalParams) {
        let errors = validate([{
            field: 'country_iso',
            value: countryISO,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let params = optionalParams || {};
        params.country_iso = countryISO;
        return new PhoneNumberInterface(this[clientKey]).list(params);
    }

    /**
     * Update Number
     * @method
     * @param {string} number - number to update
     * @param {object} params
     * @param {string} [params.appId] - app id
     * @param {string} [params.subAccount] - auth_id of subaccount
     * @param {string} [params.alias] - textual name of number
     * @param {string} [params.cnamLookup] - cnam lookup of number
     * @param {string} [params.cnam] - cnam attached to number
     * @param {string} [params.callback_method] - callback_method Method to call the url for attaching cnam
     * @param {string} [params.callback_url] - callback_url url to attach the cnam
     * @promise {@link NumberResource} return NumberResource Object if success
     * @fail {Error} return Error
     */
    update(number, params) {
        let errors = validate([{
            field: 'number',
            value: number,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }
        return new NumberResource(this[clientKey], {
            id: number
        }).update(number, params);
    }

    /**
     * Unrent Number
     * @method
     * @param {string} number - number to unrent
     * @promise {boolean} return true if success
     * @fail {Error} return Error
     */
    unrent(number) {
        let errors = validate([{
            field: 'number',
            value: number,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }
        return new NumberResource(this[clientKey], {
            id: number
        }).unrent(number);
    }
}
