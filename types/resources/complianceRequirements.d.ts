export class ComplianceRequirementResponse {
    constructor(params: object);
    apiId: string;
    ComplianceRequirementId: string;
    countryIso2: string;
    numberType: string;
    endUserType: object;
    acceptableDocumentTypes: string;
}

/**
* Represents a Compliance Requirement
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class ComplianceRequirement extends PlivoResource {
    constructor(client: Function, data?: {});
    [clientKey]: symbol;
}

/**
 * Represents a Compliance Requirement
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class ComplianceRequirementInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});
    
    /**
     * get compliance requirement by given id
     * @method
     * @param {string} id - id of the compliance requirement
     * @promise {object} return {@link ComplianceRequirement} object
     * @fail {Error} return Error
     */
    get(id: string): Promise<ComplianceRequirementResponse>;


    /**
    * list compliance requirements
    * @method
    * @param {object} params - params to list endusers
    * @param {string} [params.countryIso2] - Document Type ID of the document id.
    * @param {string} [params.numberType] - Document name of the document if present.
    * @param {string} [params.phoneNumber] - Description of the document type.
    * @param {string} [params.endUserType] - Information about the document type.
    * A combination of country_iso2, number_type, end_user_type OR
    * phone_number, end_user_type can be used to fetch compliance requirements.
    */
    list(params: object): Promise<ComplianceRequirementResponse>;
}

import { PlivoResource } from "../base";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base";
export {};
