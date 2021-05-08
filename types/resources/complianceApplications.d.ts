export class ComplianceApplicationResponse {
    constructor(params: object);
    apiId: string;
    complianceApplicationId: string;
    endUserID: string;
    endUserType: string;
    alias: string;
    status: string;
    countryIso2: string;
    numberType: string;
    complianceRequirementId: string;
    documents: Array<Object>;
    createdAt: string;
}

export class CreateComplianceApplicationResponse {
    constructor(params: object);
    apiId: string;
    complianceApplicationId: string;
    endUserID: string;
    endUserType: string;
    alias: string;
    status: string;
    countryIso2: string;
    numberType: string;
    complianceRequirementId: string;
    documents: Array<Object>;
    createdAt: string;
    message: string;
}

export class UpdateComplianceApplicationResponse {
    constructor(params: object);
    apiId: string;
    message: string;
}

export class ListComplianceApplicationResponse {
    constructor(params: object);
    apiId: string;
    meta: Object;
    objects: Array<Object>;
}

/**
* Represents a ComplianceApplication
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class ComplianceApplication extends PlivoResource {
    constructor(client: Function, data?: {});
    id: string;

    /**
    * update ComplianceApplication
    * @method
    * @param {string} id - id to update
    * @param {object} params
    * @param {string} [params.documentIds] - Document IDs
    * @promise {object} return {@link ComplianceApplication} object if success
    * @fail {Error} return Error
    */
    update(params: object, id: string): Promise<UpdateComplianceApplicationResponse>;

    /**
    * delete an Compliance application
    * @method
    * @param {string} id - id to delete
    * @promise {boolean} return true if success
    * @fail {Error} return Error
    */
    delete(): Promise<unknown>;
    [clientKey]: symbol;
}

/**
* Represents a ComplianceApplication Interface
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class ComplianceApplicationInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});
    /**
     * get application by given id
     * @method
     * @param {string} id - id of application
     * @promise {object} return {@link EndUser} object
     * @fail {Error} return Error
     */
    get(id: string): Promise<ComplianceApplicationResponse>;

    /**
     * list all applications
     * @method
     * @param {object} params - params to list endusers
     * @param {string} [params.status] - Status of the application
     * @param {string} [params.endUserId] - End user ID related to application
     * @param {string} [params.numberType] -Number Type related to application
     * @param {integer} [params.offset] - No of value items by which results should be offset
     * @param {integer} [params.limit] - No of value items by which results should be offset
     */
    list(params: object): Promise<ListComplianceApplicationResponse>;

    /**
     * Create a complaince application
     * @method
     * @param {object} params
     * @param {string} [params.complianceRequirementId] - compliance requirement ID.
     * @param {string} [params.endUserId] - End user ID.
     * @param {string} [params.alias] - Alias
     * @param {string} [params.documentIds] - Document IDs
     * @param {string} [params.endUserType] - End user type
     * @param {string} [params.countryIso2] - CountryISo2
     * @param {string} [params.numberType] - Number Type
     * @fail {Error} return Error
     */
    create(params: object): Promise<CreateComplianceApplicationResponse>;

    /**
    * update ComplianceApplication
    * @method
    * @param {string} id - id to update
    * @param {object} params
    * @param {string} [params.documentIds] - Document IDs
    * @promise {object} return {@link ComplianceApplication} object if success
    * @fail {Error} return Error
    */
    update(id: string, params: object): Promise<UpdateComplianceApplicationResponse>;
    
    /**
    * delete a ComplianceApplication
    * @method
    * @param {string} id - id to delete
    * @promise {boolean} return true if success
    * @fail {Error} return Error
    */
    delete(id: string): any;
    [clientKey]: symbol;
}

import { PlivoResource } from "../base";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base";
export {};
