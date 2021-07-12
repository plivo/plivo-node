export class EndUsersResponse {
    constructor(params: object);
    apiId: string;
    endUserId: string;
    endUserType: string;
    name: string;
    lastName: string;
    createdAt: string;
}

export class CreateEndUsersResponse {
    constructor(params: object);
    apiId: string;
    endUserId: string;
    endUserType: string;
    name: string;
    lastName: string;
    createdAt: string;
    message: string;
}

export class UpdateEndUsersResponse {
    constructor(params: object);
    apiId: string;
    message: string;
}

export class ListEndUsersResponse {
    constructor(params: object);
    apiId: string;
    meta: Object;
    objects: Array<string>;
}

/**
* Represents an EndUser
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class EndUser extends PlivoResource {
    constructor(client: Function, data?: {});
    id: string;
     /**
     * update end user
     * @method
     * @param {object} params - to update end user
     * @param {string} [params.name] - Name of the endUser if present.
     * @param {string} [params.last_name] - Last name of the endUser if present.
     * @param {string} [params.end_user_type] - Type of the end user.
     * @fail {Error} return Error
     */

    update(params: object, id: string): Promise<UpdateEndUsersResponse>;
    /**
     * delete EndUser
     * @method
     * @promise {boolean} return true if success
     * @fail {Error} return Error
     */
    delete(): Promise<unknown>;
    [clientKey]: symbol;
}

/**
* Represents a EndUser Interface
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class EndUserInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});
    /**
    * get EndUser by given id
    * @method
    * @param {string} id - id of the end user.
    * @promise {object} return {@link EndUser} object
    * @fail {Error} return Error
    */
    get(id: string): Promise<EndUsersResponse>;


    /**
     * list endUsers
     * @method
     * @param {object} params - params to list endusers
     * @param {string} [params.name] - Name of the endUser if present.
     * @param {string} [params.last_name] - Last name of the endUser if present.
     * @param {string} [params.end_user_type] - Type of the end user.
     * @param {integer} [params.offset] - No of value items by which results should be offset
     * @param {integer} [params.limit] - No of value items by which results should be offset
     */
    list(params: object): Promise<ListEndUsersResponse>;

    /**
     * Create end user
     * @method
     * @param {object} params - to update end user
     * @param {string} [params.name] - Name of the endUser if present.
     * @param {string} [params.last_name] - Last name of the endUser if present.
     * @param {string} [params.end_user_type] - Type of the end user.
     * @fail {Error} return Error
     */
    create(params: object): Promise<CreateEndUsersResponse>;

    /**
     * update end user
     * @method
     * @param {object} params - to update end user
     * @param {string} [params.name] - Name of the endUser if present.
     * @param {string} [params.last_name] - Last name of the endUser if present.
     * @param {string} [params.end_user_type] - Type of the end user.
     * @fail {Error} return Error
     */
    update(id: string, params: object): Promise<UpdateEndUsersResponse>;
    
    /**
    * delete an EndUser
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
