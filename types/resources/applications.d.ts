/**
* Represents a Application
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class UpdateApplicationResponse {
    constructor(params: object);
    apiId: string;
    message: string;
}
export class CreateApplicationResponse {
    constructor(params: object);
    apiId: string;
    appId: string;
    message: string;
}
export class RetrieveApplicationResponse {
    constructor(params: object);
    answerMethod: string;
    answerUrl: string;
    apiId: string;
    appId: string;
    appName: string;
    applicationType: string;
    defaultApp: string;
    defaultEndpointApp: string;
    enabled: string;
    fallbackAnswerUrl: string;
    fallbackMethod: string;
    hangupMethod: string;
    logIncomingMessage: string;
    messageMethod: string;
    resourceUri: string;
    sipUri: string;
    subAccount: string;
}
export class ListAllApplicationResponse {
    constructor(params: object);
    answerMethod: string;
    answerUrl: string;
    appId: string;
    appName: string;
    applicationType: string;
    defaultApp: string;
    defaultEndpointApp: string;
    enabled: string;
    fallbackAnswerUrl: string;
    fallbackMethod: string;
    hangupMethod: string;
    logIncomingMessage: string;
    messageMethod: string;
    resourceUri: string;
    sipUri: string;
    subAccount: string;
}
export class Application extends PlivoResource {
    constructor(client: Function, data?: {});
    id: string;
    [clientKey]: symbol;
}
/**
* Represents a Application interface
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class ApplicationInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});
    /**
     * get application by given id
     * @method
     * @param {string} id - id of application
     * @promise {object} return {@link Application} object
     * @fail {Error} return Error
     */
    get(id: string): Promise<RetrieveApplicationResponse>;
    /**
     * list applications
     * @method
     * @param {object} params - params to list applications
     * @param {string} [params.subaccount] - ID of the subaccount if present
     * @param {integer} [params.limit] - To display no of results per page
     * @param {integer} [params.offset] - No of value items by which results should be offset
     */
    list(params?: {}): Promise<ListAllApplicationResponse>;
    /**
     * create Application
     * @method
     * @param {string} appName - name of application
     * @param {object} params - params to create application
     * @param {string} [params.answerUrl] - answer url
     * @param {string} [params.appName] The name of your application
     * @param {string} [params.answerUrl] The URL invoked by Plivo when a call executes this application.
     * @param {string} [params.answerMethod] The method used to call the answer_url. Defaults to POST.
     * @param {string} [params.hangupUrl] The URL that is notified by Plivo when the call hangs up.
     * @param {string} [params.hangupMethod] The method used to call the hangup_url. Defaults to POST
     * @param {string} [params.fallbackAnswerUrl] Invoked by Plivo only if answer_url is unavailable or the XML response is invalid. Should contain a XML response.
     * @param {string} [params.fallbackMethod] The method used to call the fallback_answer_url. Defaults to POST.
     * @param {string} [params.messageUrl] The URL that is notified by Plivo when an inbound message is received. Defaults not set.
     * @param {string} [params.messageMethod] The method used to call the message_url. Defaults to POST.
     * @param {boolean} [params.defaultNumberApp] If set to true, associates all newly created Plivo numbers that have not specified an app_id, to this application.
     * @param {boolean} [params.defaultEndpointApp] If set to true, associates all newly created Plivo endpoints that have not specified an app_id, to this application.
     * @param {string} [params.subaccount] Id of the subaccount, in case only subaccount applications are needed.
     * @param {boolean} [params.logIncomingMessages] flag to control incoming message logs.
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */
    create(appName: string, params?: {}): Promise<CreateApplicationResponse>;
    /**
     * update Application
     * @method
     * @param {string} id - id of application
     * @param {object} params - to update application
     * @param {string} [params.answerUrl] The URL invoked by Plivo when a call executes this application.
     * @param {string} [params.answerMethod] The method used to call the answer_url. Defaults to POST.
     * @param {string} [params.hangupUrl] The URL that is notified by Plivo when the call hangs up.
     * @param {string} [params.hangupMethod] The method used to call the hangup_url. Defaults to POST
     * @param {string} [params.fallbackAnswerUrl] Invoked by Plivo only if answer_url is unavailable or the XML response is invalid. Should contain a XML response.
     * @param {string} [params.fallbackMethod] The method used to call the fallback_answer_url. Defaults to POST.
     * @param {string} [params.messageUrl] The URL that is notified by Plivo when an inbound message is received. Defaults not set.
     * @param {string} [params.messageMethod] The method used to call the message_url. Defaults to POST.
     * @param {boolean} [params.defaultNumberApp] If set to true, associates all newly created Plivo numbers that have not specified an app_id, to this application.
     * @param {boolean} [params.defaultEndpointApp] If set to true, associates all newly created Plivo endpoints that have not specified an app_id, to this application.
     * @param {string} [params.subaccount] Id of the subaccount, in case only subaccount applications are needed.
     * @param {boolean} [params.logIncomingMessages] flag to control incoming message logs.
     * @promise {object} return {@link Application} object
     * @fail {Error} return Error
     */
    update(id: string, params: {
        answerUrl: string;
        answerMethod: string;
        hangupUrl: string;
        hangupMethod: string;
        fallbackAnswerUrl: string;
        fallbackMethod: string;
        messageUrl: string;
        messageMethod: string;
        defaultNumberApp: boolean;
        defaultEndpointApp: boolean;
        subaccount: string;
        logIncomingMessages: boolean;
    }): Promise<UpdateApplicationResponse>;
    /**
     * delete Application
     * @method
     * @param {string} id - id of application
     * @param {object} params - params to delete application
     * @param {boolean} [params.cascade] - delete associated endpoints
     * @param {string} [params.newEndpointApplication] - link associated endpoints with app
     * @promise {object} return true on success
     * @fail {Error} return Error
     */
    delete(id: string, params?: {
        cascade: boolean;
        newEndpointApplication: string;
    }): Promise<any>;
    [clientKey]: symbol;
}
import { PlivoResource } from "../base";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base";
export {};
