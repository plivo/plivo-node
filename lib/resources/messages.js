import * as _ from "lodash";

import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';


const action = 'Message/';
const idField = 'messageUuid';
let actionKey = Symbol('api action');
let klassKey = Symbol('constructor');
let idKey = Symbol('id filed');
let clientKey = Symbol('make api call');

export class MessageResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
        this.messageUuid = params.messageUuid;
        if (params.invalidNumber != undefined ){
            this.invalid_number = params.invalidNumber;
        }
    }
}

export class MessageGetResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.errorCode = params.errorCode;
        this.fromNumber = params.fromNumber;
        this.messageDirection = params.messageDirection;
        this.messageState = params.messageState;
        this.messageTime = params.messageTime;
        this.messageType = params.messageType;
        this.messageUuid = params.messageUuid;
        this.resourceUri = params.resourceUri;
        this.toNumber = params.toNumber;
        this.totalAmount = params.totalAmount;
        this.totalRate = params.totalRate;
        this.units = params.units;
        this.powerpackID = params.powerpackId
        this.tendlcCampaignId = params.tendlcCampaignId;
        this.tendlcRegistrationStatus = params.tendlcRegistrationStatus;
        this.destinationCountryIso2 = params.destinationCountryIso2;
        this.requesterIP = params.requesterIp;
        this.isDomestic = params.isDomestic;
        this.replacedSender = params.replacedSender;

        this.conversationId = params.conversationId;
        this.conversationOrigin = params.conversationOrigin;
        this.conversationExpirationTimestamp = params.conversationExpirationTimestamp;
        this.dltEntityID = params.dltEntityId;
        this.dltTemplateID = params.dltTemplateId;
        this.dltTemplateCategory = params.dltTemplateCategory;
        this.destinationNetwork = params.destinationNetwork;
        this.carrierFees = params.carrierFees;
        this.carrierFeesRate = params.carrierFeesRate;
    }
}

export class MessageListResponse {
    constructor(params) {
        params = params || {};
        this.errorCode = params.errorCode;
        this.fromNumber = params.fromNumber;
        this.messageDirection = params.messageDirection;
        this.messageState = params.messageState;
        this.messageTime = params.messageTime;
        this.messageType = params.messageType;
        this.messageUuid = params.messageUuid;
        this.resourceUri = params.resourceUri;
        this.toNumber = params.toNumber;
        this.totalAmount = params.totalAmount;
        this.totalRate = params.totalRate;
        this.units = params.units;
        this.powerpackID = params.powerpackId;
        this.tendlcCampaignId = params.tendlcCampaignId;
        this.tendlcRegistrationStatus = params.tendlcRegistrationStatus;
        this.destinationCountryIso2 = params.destinationCountryIso2;
        this.requesterIP = params.requesterIp;
        this.isDomestic = params.isDomestic;
        this.replacedSender = params.replacedSender;
        this.conversationId = params.conversationId;
        this.conversationOrigin = params.conversationOrigin;
        this.conversationExpirationTimestamp = params.conversationExpirationTimestamp;
        this.dltEntityID = params.dltEntityId;
        this.dltTemplateID = params.dltTemplateId;
        this.dltTemplateCategory = params.dltTemplateCategory;
        this.destinationNetwork = params.destinationNetwork;
        this.carrierFees = params.carrierFees;
        this.carrierFeesRate = params.carrierFeesRate;
    }
}

export class MMSMediaResponse {

    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        let MMSMediaList = []
        params.objects.forEach(item => {
            MMSMediaList.push(new MMSMedia(item));
        });
        this.objects = MMSMediaList;
    }
}

export class MMSMedia {
    constructor(params) {
        params = params || {};
        this.contentType = params.contentType;
        this.fileName = params.fileName;
        this.mediaId = params.mediaId;
        this.mediaUrl = params.mediaUrl;
        this.messageUuid = params.messageUuid;
        this.size = params.size;
        this.uploadTime = params.uploadTime;
    }
}

/**
 * Represents a Message
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Message extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Message, idField, client);
        this[actionKey] = action;
        this[clientKey] = client;
        if (idField in data) {
            this.id = data[idField];
        };

        extend(this, data);
    }

    listMedia() {
        //return super.executeAction(this.id + '/Media/', 'Get', {});
        let client = this[clientKey];
        let idField = this[idKey];
        return new Promise((resolve, reject) => {
            client('Get', this[actionKey] + this.id + '/Media/', {})
                .then(response => {
                    resolve(new MMSMediaResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

}

/**
 * Represents a Message Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class MessageInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, Message, idField, client);
        extend(this, data);
        this[clientKey] = client;
        this[actionKey] = action;
        this[klassKey] = Message;
        this[idKey] = idField;
    }

    /**
     * Send Message
     * @method
     * @param {string} src - source number
     * @param {string} dst - destination number
     * @param {string} text - text to send
     * @param {object} optionalParams - Optional Params to send message
     * @param {string} [optionalParams.type] - The type of message. Should be `sms` `whatsapp` or `mms`. Defaults to `sms`.
     * @param {string} [optionalParams.url] The URL to which with the status of the message is sent.
     * @param {string} [optionalParams.method] The method used to call the url. Defaults to POST.
     * @param {list} [optionalParams.media_urls] For sending mms, specify the media urls in list of string
     * @param {int} [optionalParams.message_expiry] The method used to expiry the message specified time.
     * @param {boolean} [optionalParams.log] If set to false, the content of this message will not be logged on the Plivo infrastructure and the dst value will be masked (e.g., 141XXXXX528). Default is set to true.
     * @param {string} [optionalParams.dlt_entity_id] This is the DLT entity id passed in the message request.
     * @param {string} [optionalParams.dlt_template_id] This is the DLT template id passed in the message request.
     * @param {string} [optionalParams.dlt_template_category] This is the DLT template category passed in the message request.
     * @param {Template} [optionalParams.template] For sending templated whatsapp messages.
     * @promise {object} return {@link PlivoGenericMessage} object if success
     * @fail {Error} return Error
     */
 
  send(src, dst, text, optionalParams) {
        return this.create(src, dst, text, optionalParams);
    }

    /**
     * Send Message
     * @method
     * @param {string} src - source number
     * @param {string} dst - destination number
     * @param {string} text - text to send
     * @param {object} optionalParams - Optional Params to send message
     * @param {string} [optionalParams.type] - The type of message. Should be `sms` `whatsapp` or `mms`. Defaults to `sms`.
     * @param {string} [optionalParams.url] The URL to which with the status of the message is sent.
     * @param {string} [optionalParams.method] The method used to call the url. Defaults to POST.
     * @param {boolean} [optionalParams.log] If set to false, the content of this message will not be logged on the Plivo infrastructure and the dst value will be masked (e.g., 141XXXXX528). Default is set to true.
     * @param {Array} [optionalParams.media_urls] For sending mms, specify the media urls in list of string
     * @param {Template} [optionalParams.template] //For sending templated whatsapp messages
     * @param {string} [optionalParams.dlt_entity_id] This is the DLT entity id passed in the message request.
     * @param {string} [optionalParams.dlt_template_id] This is the DLT template id passed in the message request.
     * @param {string} [optionalParams.dlt_template_category] This is the DLT template category passed in the message request.
     * @param {Template} [optionalParams.template] For sending templated whatsapp messages.
     * @promise {object} return {@link PlivoGenericMessage} object if success
     * @fail {Error} return Error
     */
    create(src, dst, text, optionalParams, powerpackUUID) {
        var isObject = arguments.length;
        if (isObject == 1) {
            var powerpackUUID = src.powerpackUUID;
            var text = src.text;
            var dst = src.dst;
            var url = src.url;
            var method = src.method;
            var type = src.type;
            var media_urls = src.media_urls;
            var media_ids = src.media_ids;
            var log = src.log;
            var trackable = src.trackable;
            var messageExpiry = src.messageExpiry;
            var template = src.template;
            var dlt_entity_id = src.dlt_entity_id;
            var dlt_template_id = src.dlt_template_id;
            var dlt_template_category = src.dlt_template_category;
            var src = src.src;
        }

        let errors = validate([{
                field: 'dst',
                value: dst,
                validators: ['isRequired']
            },
        ]);

        if (errors) {
            return errors;
        }
        if (!src && !powerpackUUID) {
            let errorText = 'Neither of src or powerpack uuid present, either one is required'
            return new Promise(function(resolve, reject) {
                reject(new Error(errorText));
            });
        }

        if (src && powerpackUUID) {
            let errorText = 'Either of src or powerpack uuid, both of them are present'
            return new Promise(function(resolve, reject) {
                reject(new Error(errorText));
            })
        }

        let params = optionalParams || {};

        if (isObject == 1) {
            if (url) {
                params.url = url;
            }
            if (method) {
                params.method = method;
            }
            if (type) {
                params.type = type;
            }
            if (media_urls) {
                params.media_urls = media_urls;
            }
            if (media_ids) {
                params.media_ids = media_ids;
            }
            if (log) {
                params.log = log;
            }
            if (trackable) {
                params.trackable = trackable;
            }
            if (messageExpiry){
                params.message_expiry = messageExpiry;
            }
            if(template)
            {
                params.template = template;
            }
            if (dlt_entity_id) {
                params.dlt_entity_id = dlt_entity_id
            }
            if (dlt_template_id) {
                params.dlt_template_id = dlt_template_id
            }
            if (dlt_template_category) {
                params.dlt_template_category = dlt_template_category
            }
    
        }

        if ((params.type === 'whatsapp') && !src){
            let errorText = 'src parameter not present'
            return new Promise(function(resolve, reject) {
                reject(new Error(errorText));
            }); 
        }

        if ((params.type !== 'whatsapp') && params.template){
            let errorText = 'Template paramater is only applicable when message_type is whatsapp'
            return new Promise(function(resolve, reject) {
                reject(new Error(errorText));
            }); 
        }

        if (params.template){
            let errors = validate([{
                field: 'template',
                value: params.template,
                validators: ['isTemplate']
            },
            ]);

            if (errors) {
                return errors;
            }
        }

        if (src) {
            params.src = src;
        }
        params.dst = _.isArray(dst) ? _.join(dst, '<') : dst;
        params.text = text;
        if (powerpackUUID) {
            params.powerpackUUID = powerpackUUID;
        }
      
        let client = this[clientKey];
        let idField = this[idKey];
        let action = this[actionKey] + (this.id ? this.id + '/' : '');

        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new MessageResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    /**
     * Get Message by given id
     * @method
     * @param {string} id - id of message
     * @promise {object} return {@link Message} object if success
     * @fail {Error} return Error
     */
    get(id) {
        let errors = validate([{
            field: 'id',
            value: id,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let client = this[clientKey];
        let action = this[actionKey];

        return new Promise((resolve, reject) => {
            if (action !== '' && !id) {
                reject(new Error(this[idKey] + ' must be set'));
            }
            client('GET', action + (id ? id + '/' : ''))
                .then(response => {
                    resolve(new MessageGetResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    list(params) {
        let client = this[clientKey];
        let action = this[actionKey];
        return new Promise((resolve, reject) => {
            client('GET', action, params)
                .then(response => {
                    let objects = [];
                    Object.defineProperty(objects, 'meta', {
                        value: response.body.meta,
                        enumerable: true
                    });
                    Object.defineProperty(objects, 'apiId', {
                        value: response.body.apiId,
                        enumerable: true
                    })
                    response.body.objects.forEach(item => {
                        objects.push(new MessageListResponse(item, client));
                    });
                    resolve(objects);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    listMedia(messageUUID) {
        return new Message(this[clientKey], {
            id: messageUUID
        }).listMedia();
    }
}