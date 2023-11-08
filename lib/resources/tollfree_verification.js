import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'TollfreeVerification/';
const idField = 'uuid';

/**
 * Represents a TollFreeVerification Request
 * @constructor
 * @param {function} client - make  the request
 * @param {object} [data] - data of request
 */


export class UpdateTollfreeVerificationResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
    }
}

export class CreateTollfreeVerificationResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.uuid = params.uuid;
        this.message = params.message;
    }
}

export class GetTollfreeVerificationResponse {
constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
	    this.uuid = params.uuid;
        this.profile_uuid = params.profileUuid;
        this.number = params.number;
        this.usecase = params.usecase;
        this.usecase_summary = params.usecaseSummary;
        this.message_sample = params.messageSample;
        this.optin_image_url = params.optinImageUrl;
        this.optin_type = params.optinType;
        this.volume = params.volume;
        this.additional_information = params.additionalInformation;
        this.extra_data = params.extraData;
        this.callback_url = params.callbackUrl;
        this.callback_method = params.callbackMethod;
        this.status = params.status;
        this.error_message = params.errorMessage;
        this.created = params.created;
        this.last_modified = params.lastModified;
    }
}
export class ListTollfreeVerificationResponse {
    constructor(params) {
        params = params || {};
	    this.uuid = params.uuid;
        this.profile_uuid = params.profileUuid;
        this.number = params.number;
        this.usecase = params.usecase;
        this.usecase_summary = params.usecaseSummary;
        this.message_sample = params.messageSample;
        this.optin_image_url = params.optinImageUrl;
        this.optin_type = params.optinType;
        this.volume = params.volume;
        this.additional_information = params.additionalInformation;
        this.extra_data = params.extraData;
        this.callback_url = params.callbackUrl;
        this.callback_method = params.callbackMethod;
        this.status = params.status;
        this.error_message = params.errorMessage;
        this.created = params.created;
        this.last_modified = params.lastModified;
    }
}

export class TollfreeVerification extends PlivoResource {
    constructor(client, data = {}) {
        super(action, TollfreeVerification, idField, client);
        if (idField in data) {
            this.id = data[idField];
        }
        this[clientKey] = client;
        extend(this, data);
    }

    /**
     * update TollfreeVerification request
     * @method
     * @param {object} params - to update TollfreeVerification request
     * @param {string} [params.profile_uuid] - The unique identifier of an existing Plivo profile. 
     * @param {string} [params.usecase] - The messaging usecase(s) for which the TF should be used for. One is mandatory, others can be added with comma separation
     * @param {string} [params.usecase_summary] - The explanation on how messaging is used on this toll-free phone number by the business or organization. Max character limit = 500.
     * @param {string} [params.message_sample] - Sample message(s) that the end-business will be sending to the end-user/mobile handset. Max character limit = 1000.
     * @param {string} [params.opt_in_image_url] - A valid url where the customer submits images explaining details of the opt-in process for the end user. Multiple urls allowed with comma separation 
     * @param {string} [params.opt_in_type] - Describes how a user opts-in to text messages.
     * @param {string} [params.volume] - The monthly volume estimation of messages from the Toll-Free Number.
     * @param {string} [params.additional_information] - Any additional information related to the website. Max character limit = 500.
     * @param {string} [params.extra_data] - Any extra information which the customer would like to pass for internal references. 
     * @param {string} [params.callback_url] - A valid URL where verification relatated callbacks will be sent. 
     * @param {string} [params.callback_method] - Valid Input: GET, POST
     * @promise {object} return {@link UpdateTollfreeVerificationResponse} object
     * @fail {Error} return Error
     */
    update(params) {
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action + this.id + '/', params)
                .then(response => {
                    extend(this, params);
                    resolve(new UpdateTollfreeVerificationResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

    /**
     * delete TollfreeVerification request
     * @method
     * @promise {object} return true on success
     * @fail {Error} return Error
     */
    delete() {
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('DELETE', action + this.id + '/')
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

/**
 * Represents a TollfreeVerification request interface
 * @constructor
 * @param {function} client - make API call
 * @param {object} [data] - data of the API call
 */
export class TollfreeVerificationInterface extends PlivoResourceInterface {

    constructor(client, data = {}) {
        super(action, TollfreeVerification, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * get TollfreeVerification request by uuid
     * @method
     * @param {string} uuid - uuid of TollfreeVerification request
     * @promise {object} return {@link TollfreeVerification} object
     * @fail {Error} return Error
     */
    get(uuid) {
        let params = {}
        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('GET', action + uuid + '/', params)
                .then(response => {
                    resolve(new GetTollfreeVerificationResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * list TollfreeVerification requests
     * @method
     * @param {object} params - params to list TollfreeVerification requests
     * @param {string} [params.number] - The toll free number in e.164 for which verification is being initiated. Only single US/CA number can be provided
     * @param {string} [params.status] - The verification status of toll-free verification request.
     * @param {string} [params.created__gt] - gt stands for greater than. Filters all records after the specified date. 
     * @param {string} [params.created__gte] - gte stands for greater than or equal. To get all records that were created after or exactly on the mentioned date
     * @param {string} [params.created__lt] - lt stands for lesser than. Filters all records before the specified date.
     * @param {string} [params.created__lte] - lte stands for lesser than or equal. To get all records that were created before or exactly on the mentioned date 
     * @param {string} [params.usecase] - One or more use-cases of tollfree number with comma separation
     * @param {integer} [params.limit] - To display no of results per page
     * @param {integer} [params.offset] - No of value items by which results should be offset

     */
    list(params) {
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('GET', action, params)
                .then(response => {
                    let objects = [];
                    Object.defineProperty(objects, 'meta', {
                        value: response.body.meta,
                        enumerable: true
                    });
	                Object.defineProperty(objects, 'api_id', {
                        value: response.body.apiId,
                    	enumerable: true
		            });
                    response.body.objects.forEach(item => {
                        objects.push(new ListTollfreeVerificationResponse(item, client));
                    });
                    resolve(objects);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
   
      
    /**
     * create TollfreeVerification request
     * @method
     * @param {object} params - params to create a TollfreeVerification request
     * @param {string} [params.profile_uuid] The unique identifier of an existing Plivo profile. 
     * @param {string} [params.usecase] The messaging usecase(s) for which the TF should be used for. One is mandatory, others can be added with comma separation
     * @param {string} [params.usecase_summary] The explanation on how messaging is used on this toll-free phone number by the business or organization. Max character limit = 500.
     * @param {string} [params.message_sample] Sample message(s) that the end-business will be sending to the end-user/mobile handset. Max character limit = 1000.
     * @param {string} [params.opt_in_image_url] A valid url where the customer submits images explaining details of the opt-in process for the end user. Multiple urls allowed with comma separation 
     * @param {string} [params.opt_in_type] Describes how a user opts-in to text messages.
     * @param {string} [params.volume] The monthly volume estimation of messages from the Toll-Free Number.
     * @param {string} [params.additional_information] Any additional information related to the website. Max character limit = 500.
     * @param {string} [params.extra_data] Any extra information which the customer would like to pass for internal references. 
     * @param {string} [params.number] The toll free number in e.164 for which verification is being initiated. Only single US/CA number can be provided
     * @param {string} [params.callback_url] A valid URL where verification relatated callbacks will be sent. 
     * @param {string} [params.callback_method] Valid Input: GET, POST
     * @promise {object} return {@link TollfreeVerification} object
     * @fail {Error} return Error
     */
    create(params = {}) {
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new CreateTollfreeVerificationResponse(response.body));
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    /**
     * update TollfreeVerification request
     * @method
     * @param {string} uuid - uuid of tollfreeVerification request
     * @param {object} params - to update tollfreeVerification request
     * @param {string} [params.profile_uuid] The unique identifier of an existing Plivo profile. 
     * @param {string} [params.usecase] The messaging usecase(s) for which the TF should be used for. One is mandatory, others can be added with comma separation
     * @param {string} [params.usecase_summary] The explanation on how messaging is used on this toll-free phone number by the business or organization. Max character limit = 500.
     * @param {string} [params.message_sample] Sample message(s) that the end-business will be sending to the end-user/mobile handset. Max character limit = 1000.
     * @param {string} [params.opt_in_image_url] A valid url where the customer submits images explaining details of the opt-in process for the end user. Multiple urls allowed with comma separation 
     * @param {string} [params.opt_in_type] Describes how a user opts-in to text messages.
     * @param {string} [params.volume] The monthly volume estimation of messages from the Toll-Free Number.
     * @param {string} [params.additional_information] Any additional information related to the website. Max character limit = 500.
     * @param {string} [params.extra_data] Any extra information which the customer would like to pass for internal references. 
     * @param {string} [params.callback_url] A valid URL where verification relatated callbacks will be sent. 
     * @param {string} [params.callback_method] Valid Input: GET, POST     
     * @promise {object} return {@link TollfreeVerification} object
     * @fail {Error} return Error
     */
    update(uuid, params={}) {
        return new TollfreeVerification(this[clientKey], {
            id: uuid
        }).update(params);
    }

    /**
     * delete TollfreeVerification request
     * @method
     * @param {string} uuid - uuid of tollfreeVerification request
     * @promise {object} return true on success
     * @fail {Error} return Error
     */
    delete(uuid) {
        return new TollfreeVerification(this[clientKey], {
            id: uuid
        }).delete();
    }
}
