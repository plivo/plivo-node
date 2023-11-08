/**
* Represents TollfreeVerification
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class UpdateTollfreeVerificationResponse {
    constructor(params: object);
    apiId: string;
    message: string;
}

export class CreateTollfreeVerificationResponse {
    constructor(params: object);
    apiId: string;
    uuid: string;
    message: string;
}

export class GetTollfreeVerificationResponse {
    constructor(params: object);
    api_id: string;
    uuid: string;
    profile_uuid: string;
    number: string;
    usecase: string;
    usecase_summary: string;
    message_sample: string;
    optin_image_url: string;
    optin_type: string;
    volume: string;
    additional_information: string;
    extra_data: string;
    callback_url: string;
    callback_method: string;
    status: string;
    error_message: string;
    created: string;
    last_modified: string;
}
export class ListTollfreeVerificationResponse {
    constructor(params: object);
    uuid: string;
    profile_uuid: string;
    number: string;
    usecase: string;
    usecase_summary: string;
    message_sample: string;
    optin_image_url: string;
    optin_type: string;
    volume: string;
    additional_information: string;
    extra_data: string;
    callback_url: string;
    callback_method: string;
    status: string;
    error_message: string;
    created: string;
    last_modified: string;
 }
export class TollfreeVerification extends PlivoResource {
    constructor(client: Function, data?: {});
    id: string;
    [clientKey]: symbol;
}
/**
* Represents a TollfreeVerification request interface
* @constructor
* @param {function} client - make API call
* @param {object} [data] - data of API call
*/
export class TollfreeVerificationInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});
    
    /**
     * get TollfreeVerification request by given id
     * @method
     * @param {string} uuid - uuid of TollfreeVerification request
     * @promise {object} return {@link TollfreeVerification} object
     * @fail {Error} return Error
     */
    get(id: string): Promise<GetTollfreeVerificationResponse>;
    
    /**
     * list TollfreeVerification request
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
    list(params?: {}): Promise<ListTollfreeVerificationResponse>;
    
    /**
     * create TollfreeVerification request
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
     * @param {string} [params.number] - The toll free number in e.164 for which verification is being initiated. Only single US/CA number can be provided
     * @param {string} [params.callback_url] - A valid URL where verification relatated callbacks will be sent. 
     * @param {string} [params.callback_method] - Valid Input: GET, POST
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    create(params?: {}): Promise<CreateTollfreeVerificationResponse>;
    
    /**
     * update TollfreeVerification request
     * @method
     * @param {string} uuid - uuid of TollfreeVerification request
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
     * @promise {object} return {@link TollfreeVerification} object
     * @fail {Error} return Error
     */
    update(uuid: string, params?: {}): Promise<UpdateTollfreeVerificationResponse>;

    /**
     * delete TollfreeVerification request
     * @method
     * @param {string} uuid - uuid of TollfreeVerification request
     * @promise {object} return true on success
     * @fail {Error} return Error
     */
    delete(uuid: string): Promise<any>;
    [clientKey]: symbol;
}

import { TollfreeVerification } from "../../lib/resources/tollfree_verification";
import { PlivoResource } from "../base";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base";
