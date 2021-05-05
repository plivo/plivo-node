export class ComplianceDocumentTypeResponse {
    constructor(params: object);
    apiId: string;
    documentTypeID: string;
    documentName: string;
    description: string;
    information: object;
    proofRequired: string;
    createdAt: string;
}

export class ListComplianceDocumentTypeResponse {
    constructor(params: object);
    apiId: string;
    objects: Array<Object>;
    meta: Object;
}

/**
* Represents a Compliance Document Type.
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class ComplianceDocumentType extends PlivoResource {
    constructor(client: Function, data?: {});
    [clientKey]: symbol;
}

/**
* Represents a ComplianceDocumentTypeInterface Interface
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class ComplianceDocumentTypeInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});
    
    /**
     * get compliance document types by id
     * @method
     * @param {string} id - id of the compliane document type.
     * @promise {object} return {@link ComplianceDocumentType} object
     * @fail {Error} return Error
     */
    get(id: string): Promise<ComplianceDocumentTypeResponse>;


    /**
     * list compliance document types
     * @method
     * @param {object} params - params to list endusers
     * @param {string} [params.documentTypeID] - Document Type ID of the document id.
     * @param {string} [params.documentName] - Document name of the document if present.
     * @param {string} [params.description] - Description of the document type.
     * @param {string} [params.information] - Information about the document type.
     * @param {string} [params.proofRequired] - Proofs required for the document.
     */
    list(params: object): Promise<ListComplianceDocumentTypeResponse>;
}

import { PlivoResource } from "../base";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base";
export {};
