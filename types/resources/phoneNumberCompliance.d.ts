export class PhoneNumberComplianceRequirementResponse {
    constructor(params: object);
    apiId: string;
    requirementId: string;
    countryIso: string;
    numberType: string;
    userType: string;
    documentTypes: Array<Object>;
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
     * @param {string} [params.countryIso] - Country ISO code
     * @param {string} [params.numberType] - Number type
     * @param {string} [params.userType] - User type
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
    countryIso: string;
    numberType: string;
    userType: string;
    callbackUrl?: string;
    callbackMethod?: string;
    rejectionReason?: string;
    createdAt: string;
    updatedAt?: string;
    endUser?: object;
    documents: Array<Object>;
    linkedNumbers?: Array<string>;
}

export class CreatePhoneNumberComplianceResponse {
    constructor(params: object);
    apiId: string;
    complianceId: string;
    message: string;
}

export class ListPhoneNumberComplianceResponse {
    constructor(params: object);
    apiId: string;
    meta: Object;
    compliances: Array<Object>;
}

export class UpdatePhoneNumberComplianceResponse {
    constructor(params: object);
    apiId: string;
    message: string;
    compliance?: object;
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
     * @param {string} [params.status] - Filter by status (draft, submitted, accepted, rejected, suspended, expired)
     * @param {string} [params.countryIso] - Filter by country ISO code (e.g., IN, DE, US)
     * @param {string} [params.numberType] - Filter by number type (local, mobile, tollfree)
     * @param {string} [params.userType] - Filter by user type (individual, business)
     * @param {string} [params.alias] - Filter by alias
     * @param {string} [params.expand] - Comma-separated related objects to include (end_user, documents, linked_numbers)
     * @param {integer} [params.offset] - No of value items by which results should be offset
     * @param {integer} [params.limit] - Max results per page (default 20, max 100)
     */
    list(params?: object): Promise<ListPhoneNumberComplianceResponse>;

    /**
     * Create a phone number compliance application
     * @method
     * @param {object} params
     * @param {object} params.data - Compliance application data (JSON stringified internally). Contains:
     *   country_iso (required), number_type (required), alias (required),
     *   end_user (required: {type, name, email, address_line1, city, state, postal_code, country}),
     *   documents (required: [{document_type_id, data_fields: {key: value}}]),
     *   callback_url (optional), callback_method (optional: GET or POST)
     * @param {Array} [params.documents] - Array of file objects [{file: '/path/to/file.pdf'}] for uploads
     * @promise {object} return {@link CreatePhoneNumberComplianceResponse} object
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
    totalCount: number;
    updatedCount: number;
    report: Array<Object>;
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
     * Bulk link phone numbers to compliance applications
     * @method
     * @param {object} params
     * @param {Array} params.numbers - Array of objects [{number: '+E.164', compliance_application_id: 'uuid'}]
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
