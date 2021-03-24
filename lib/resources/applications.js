import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'Application/';
const idField = 'appId';

/**
 * Represents a Application
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */


export class UpdateApplicationResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
    }
}

export class CreateApplicationResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.appId = params.appId;
        this.message = params.message;
    }
}

export class RetrieveApplicationResponse {
    constructor(params) {
        params = params || {};
        this.answerMethod = params.answerMethod;
        this.answerUrl = params.answerUrl;
        this.apiId = params.apiId;
        this.appId = params.appId;
        this.appName = params.appName;
        this.applicationType = params.applicationType;
        this.defaultApp = params.defaultApp;
        this.defaultEndpointApp = params.defaultEndpointApp;
        this.enabled = params.enabled;
        this.fallbackAnswerUrl = params.fallbackAnswerUrl;
        this.fallbackMethod = params.fallbackMethod;
        this.hangupMethod = params.hangupMethod;
        this.logIncomingMessage = params.logIncomingMessage;
        this.messageMethod = params.messageMethod;
        this.resourceUri = params.resourceUri;
        this.sipUri = params.sipUri;
        this.subAccount = params.subAccount;
    }
}
export class ListAllApplicationResponse {
    constructor(params) {
        params = params || {};
        this.answerMethod = params.answerMethod;
        this.answerUrl = params.answerUrl;
        this.apiId = params.apiId;
        this.appId = params.appId;
        this.appName = params.appName;
        this.applicationType = params.applicationType;
        this.defaultApp = params.defaultApp;
        this.defaultEndpointApp = params.defaultEndpointApp;
        this.enabled = params.enabled;
        this.fallbackAnswerUrl = params.fallbackAnswerUrl;
        this.fallbackMethod = params.fallbackMethod;
        this.hangupMethod = params.hangupMethod;
        this.logIncomingMessage = params.logIncomingMessage;
        this.messageMethod = params.messageMethod;
        this.resourceUri = params.resourceUri;
        this.sipUri = params.sipUri;
        this.subAccount = params.subAccount;
    }
}

export class Application extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Application, idField, client);
        if (idField in data) {
            this.id = data[idField];
        }
        this[clientKey] = client;
        extend(this, data);
    }

    /**
     * update application
     * @method
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
    update(params) {
        params.isVoiceRequest = 'true';
        let client = this[clientKey];
        let that = this;
        return new Promise((resolve, reject) => {
            client('POST', action + that.id + '/', params)
                .then(response => {
                    extend(that, response.body);
                    if (params.hasOwnProperty('isVoiceRequest')) {
                        delete params.isVoiceRequest;
                    }
                    extend(that, params);
                    resolve(new UpdateApplicationResponse(that));
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

    /**
     * delete application
     * @method
     * @param {object} params - params to delete application
     * @param {boolean} [params.cascade] - delete associated endpoints
     * @param {string} [params.newEndpointApplication] - link associated endpoints with app
     * @promise {object} return true on success
     * @fail {Error} return Error
     */
    delete(params, id) {
        let client = this[clientKey];
        params.isVoiceRequest = 'true';
        return new Promise((resolve, reject) => {
            client('DELETE', action + id + '/', params)
                .then(() => {
                    resolve(true);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

/**
 * Represents a Application interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class ApplicationInterface extends PlivoResourceInterface {

    constructor(client, data = {}) {
        super(action, Application, idField, client);
        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * get application by given id
     * @method
     * @param {string} id - id of application
     * @promise {object} return {@link Application} object
     * @fail {Error} return Error
     */
    get(id) {
        let params = {}
        params.isVoiceRequest = 'true'
        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            if (action !== '' && !id) {
                reject(new Error(this[idKey] + ' must be set'));
            }
            client('GET', action + (id ? id + '/' : ''), params)
                .then(response => {
                    resolve(new RetrieveApplicationResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * list applications
     * @method
     * @param {object} params - params to list applications
     * @param {string} [params.subaccount] - ID of the subaccount if present
     * @param {integer} [params.limit] - To display no of results per page
     * @param {integer} [params.offset] - No of value items by which results should be offset
     */
    list(params = {}) {
        let client = this[clientKey];
        params.isVoiceRequest = true;
        return new Promise((resolve, reject) => {
            client('GET', action, params)
                .then(response => {
                    let objects = [];
                    Object.defineProperty(objects, 'meta', {
                        value: response.body.meta,
                        enumerable: true
                    });
                    response.body.objects.forEach(item => {
                        objects.push(new ListAllApplicationResponse(item, client));
                    });
                    resolve(objects);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

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
    create(appName, params = {}) {

        let errors = validate([{
            field: 'app_name',
            value: appName,
            validators: ['isRequired', 'isString']
        }]);

        if (errors) {
            return errors;
        }
        params.app_name = appName;
        params.isVoiceRequest = 'true';
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            console.log(action, params)
            client('POST', action, params)
                .then(response => {
                    resolve(new CreateApplicationResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

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
    update(id, params) {
        let errors = validate([{
            field: 'id',
            value: id,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }
        return new Application(this[clientKey], {
            id: id
        }).update(params);
    }

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
    delete(id, params = {}) {
        if (typeof params.cascade === 'boolean') {
            params.cascade = params.cascade.toString();
        }
        return new Application(this[clientKey], {
            id: id
        }).delete(params, id);
    }
}