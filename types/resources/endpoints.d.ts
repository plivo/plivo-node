export class UpdateEndpointResponse {
    constructor(params: object);
    apiId: string;
    message: string;
    alias: string;
}
export class RetrieveEndpointResponse {
    constructor(params: object);
    apiId: string;
    alias: string;
    application: string;
    endpointId: string;
    password: string;
    resourceUri: string;
    sipRegistered: string;
    sipUri: string;
    subAccount: string;
    username: string;
}
export class ListAllEndpointResponse {
    constructor(params: object);
    apiId: string;
    alias: string;
    application: string;
    endpointId: string;
    password: string;
    resourceUri: string;
    sipRegistered: string;
    sipUri: string;
    subAccount: string;
    username: string;
}
export class CreateEndpointResponse {
    constructor(params: object);
    alias: string;
    apiId: string;
    endpointId: string;
    message: string;
    username: string;
}
/**
* Represents a Endpoint
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class Endpoint extends PlivoResource {
    constructor(client: Function, data?: {});
    id: string;
    /**
     * update Endpoint
     * @method
     * @param {object} params
     * @param {string} [params.username] - username to update
     * @param {string} [params.password] - password to update
     * @param {string} [params.alias] - alias to update
     * @param {string} [params.appId] - app id to update
     * @promise {object} return {@link Endpoint} object if success
     * @fail {Error} return Error
     */
    update(params: object, id: string): Promise<UpdateEndpointResponse>;
    /**
     * delete Endpoint
     * @method
     * @promise {boolean} return true if success
     * @fail {Error} return Error
     */
    delete(): Promise<unknown>;
    [clientKey]: symbol;
}
/**
* Represents a Endpoint Interface
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class EndpointInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});
    /**
     * Get Endpoint by given id
     * @method
     * @param {string} id - id of endpoint
     * @promise {object} return {@link Endpoint} object if success
     * @fail {Error} return Error
     */
    get(id: string): Promise<RetrieveEndpointResponse>;
    list(): Promise<ListAllEndpointResponse>;
    /**
     * Create Endpoint
     * @method
     * @param {string} username - username to create
     * @param {string} passwowrd - password to create
     * @param {string} alias - alias to create
     * @param {string} appId - app id to create
     * @promise {object} return {@link PlivoGenericResponse} object if success
     * @fail {Error} return Error
     */
    create(username: string, password: string, alias: string, appId: string): Promise<CreateEndpointResponse>;
    /**
     * update Endpoint
     * @method
     * @param {string} id - id to update
     * @param {object} params
     * @param {string} [params.username] - username to update
     * @param {string} [params.password] - password to update
     * @param {string} [params.alias] - alias to update
     * @param {string} [params.appId] - app id to update
     * @promise {object} return {@link Endpoint} object if success
     * @fail {Error} return Error
     */
    update(id: string, params: object): Promise<UpdateEndpointResponse>;
    /**
     * delete Endpoint
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
