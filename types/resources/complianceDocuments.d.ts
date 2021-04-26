export class ComplianceDocumentResponse {
    constructor(params: object);
    apiId: string;
    documentTypeId: string;
    complianceDocumentId: string;
    documentId: string;
    alias: string;
    metaInformation: string;
    file: string;
    fileName: string;
    createdAt: string;
}

export class CreateComplianceDocumentResponse {
    constructor(params: object);
    apiId: string;
    documentTypeId: string;
    complianceDocumentId: string;
    documentId: string;
    endUserId: string;
    alias: string;
    message: string;
    metaInformation: string;
    fileName: string;
    createdAt: string;
}

export class ListComplianceDocumentResponse {
    constructor(params: object);
    apiId: string;
    meta: Object;
    objects: Array<Object>;
}

export class UpdateComplianceDocumentResponse {
    constructor(params: object);
    apiId: string;
    message: string;
}
/**
* Represents a Compliance Document
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class ComplianceDocument extends PlivoResource {
    constructor(client: Function, data?: {});
    id: string;
    
    /**
    * update Compliance Document
    * @method
    * @param {string} id - compliance document id of the document.
    * @param {object} params - optional params array of updated values
    * @promise {object} return {@link ComplianceDocument} object if success
    * @fail {Error} return Error
    */
    update(params: object, id: string): Promise<UpdateComplianceDocumentResponse>;

    /**
    * delete an Compliance Document
    * @method
    * @param {string} id - id to delete
    * @promise {boolean} return true if success
    * @fail {Error} return Error
    */
    delete(): Promise<unknown>;
    [clientKey]: symbol;
}

/**
* Represents a ComplianceDocument Interface
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class ComplianceDocumentInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});

    /**
     * get compliance document by given id
     * @method
     * @param {string} id - id of the document
     * @promise {object} return {@link ComplianceDocument} object
     * @fail {Error} return Error
     */
    get(id: string): Promise<ComplianceDocumentResponse>;


    /**
     * list all documents
     * @method
     * @param {object} params - params containing options to list compliance documents by.
     */
    list(params: object): Promise<ListComplianceDocumentResponse>;

    /**
     * Create a complaince document
     * @method
     * @param {object} params
     * @param {string} [params.complianceRequirementId] - compliance requirement ID.
     * @param {string} [params.endUserId] - End user ID.
     * @param {string} [params.alias] - Alias
     * @param {string} [params.documentTypeId] - Document Type ID
     * @param {string} [params.file] - File array of the files to be uploaded
     * @fail {Error} return Error
     */
    create(params: object): Promise<CreateComplianceDocumentResponse>;

    /**
    * update Compliance Document
    * @method
    * @param {string} id - compliance document id of the document.
    * @param {object} params - optional params array of updated values
    * @promise {object} return {@link ComplianceDocument} object if success
    * @fail {Error} return Error
    */
    update(id: string, params: object): Promise<UpdateComplianceDocumentResponse>;
    
    /**
    * delete a Compliance Document
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
