export class PhoneNumberComplianceRequirementResponse {
    constructor(params: object);
    apiId: string;
    complianceRequirementId: string;
    countryIso2: string;
    numberType: string;
    endUserType: string;
    acceptableDocumentTypes: Array<Object>;
}

/**
 * Represents a Phone Number Compliance Requirement Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhoneNumberComplianceRequirementInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});

    /**
     * get phone number compliance requirements
     * @method
     * @param {object} params - params to get requirements
     * @param {string} [params.countryIso2] - Country ISO2 code
     * @param {string} [params.numberType] - Number type
     * @param {string} [params.endUserType] - End user type
     * @param {string} [params.phoneNumber] - Phone number
     * @promise {object} return {@link PhoneNumberComplianceRequirementResponse} object
     * @fail {Error} return Error
     */
    get(params?: object): Promise<PhoneNumberComplianceRequirementResponse>;
    [clientKey]: symbol;
}

export class PhoneNumberComplianceResponse {
    constructor(params: object);
    apiId: string;
    complianceId: string;
    alias: string;
    status: string;
    endUserType: string;
    endUserId: string;
    countryIso2: string;
    numberType: string;
    complianceRequirementId: string;
    documents: Array<Object>;
    data: object;
    rejectionReason?: string;
    createdAt: string;
}

export class CreatePhoneNumberComplianceResponse {
    constructor(params: object);
    apiId: string;
    complianceId: string;
    alias: string;
    status: string;
    endUserType: string;
    endUserId: string;
    countryIso2: string;
    numberType: string;
    complianceRequirementId: string;
    documents: Array<Object>;
    data: object;
    createdAt: string;
    message: string;
}

export class ListPhoneNumberComplianceResponse {
    constructor(params: object);
    apiId: string;
    meta: Object;
    objects: Array<Object>;
}

export class UpdatePhoneNumberComplianceResponse {
    constructor(params: object);
    apiId: string;
    message: string;
}

/**
 * Represents a PhoneNumberCompliance
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhoneNumberCompliance extends PlivoResource {
    constructor(client: Function, data?: {});
    id: string;

    /**
    * update PhoneNumberCompliance
    * @method
    * @param {string} id - id to update
    * @param {object} params
    * @promise {object} return {@link PhoneNumberCompliance} object if success
    * @fail {Error} return Error
    */
    update(params: object, id: string): Promise<UpdatePhoneNumberComplianceResponse>;

    /**
    * delete a PhoneNumberCompliance
    * @method
    * @param {string} id - id to delete
    * @promise {boolean} return true if success
    * @fail {Error} return Error
    */
    delete(): Promise<boolean>;
    [clientKey]: symbol;
}

/**
 * Represents a PhoneNumberCompliance Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhoneNumberComplianceInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});

    /**
     * get phone number compliance by given id
     * @method
     * @param {string} id - id of the compliance
     * @param {object} params - optional query params
     * @promise {object} return {@link PhoneNumberComplianceResponse} object
     * @fail {Error} return Error
     */
    get(id: string, params?: object): Promise<PhoneNumberComplianceResponse>;

    /**
     * list phone number compliances
     * @method
     * @param {object} params - params to list compliances
     * @param {string} [params.status] - Status of the compliance
     * @param {string} [params.endUserId] - End user ID
     * @param {string} [params.numberType] - Number Type
     * @param {integer} [params.offset] - No of value items by which results should be offset
     * @param {integer} [params.limit] - No of value items by which results should be offset
     */
    list(params?: object): Promise<ListPhoneNumberComplianceResponse>;

    /**
     * Create a phone number compliance
     * @method
     * @param {object} params
     * @param {string} [params.complianceRequirementId] - compliance requirement ID
     * @param {string} [params.endUserId] - End user ID
     * @param {string} [params.alias] - Alias
     * @param {string} [params.endUserType] - End user type
     * @param {string} [params.countryIso2] - Country ISO2
     * @param {string} [params.numberType] - Number Type
     * @param {object} [params.data] - Data object
     * @param {Array}  [params.documents] - Array of document objects with file paths
     * @fail {Error} return Error
     */
    create(params: object): Promise<CreatePhoneNumberComplianceResponse>;

    /**
    * update PhoneNumberCompliance
    * @method
    * @param {string} id - id to update
    * @param {object} params
    * @promise {object} return {@link PhoneNumberCompliance} object if success
    * @fail {Error} return Error
    */
    update(id: string, params: object): Promise<UpdatePhoneNumberComplianceResponse>;

    /**
    * delete a PhoneNumberCompliance
    * @method
    * @param {string} id - id to delete
    * @promise {boolean} return true if success
    * @fail {Error} return Error
    */
    delete(id: string): Promise<boolean>;
    [clientKey]: symbol;
}

export class PhoneNumberComplianceLinkResponse {
    constructor(params: object);
    apiId: string;
    message: string;
}

/**
 * Represents a Phone Number Compliance Link Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class PhoneNumberComplianceLinkInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});

    /**
     * Link a phone number to a compliance
     * @method
     * @param {object} params
     * @param {string} [params.complianceId] - Compliance ID
     * @param {string} [params.phoneNumber] - Phone number
     * @promise {object} return {@link PhoneNumberComplianceLinkResponse} object
     * @fail {Error} return Error
     */
    link(params: object): Promise<PhoneNumberComplianceLinkResponse>;
    [clientKey]: symbol;
}

import { PlivoResource } from "../base";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base";
export {};
