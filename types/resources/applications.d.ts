/**
 * Represents a Application
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Application extends PlivoResource {
    constructor(client: any, data?: {});
    id: any;
}
/**
 * Represents a Application interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class ApplicationInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
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
    }): Promise<any>;
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
    [clientKey]: any;
}
import { PlivoResource } from "../base.js";
import { PlivoResourceInterface } from "../base.js";
declare const clientKey: unique symbol;
export {};
