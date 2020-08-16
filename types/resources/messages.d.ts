import { PlivoResource, PlivoResourceInterface } from '../base';
/**
 * Represents a Message
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export declare class Message extends PlivoResource {
    constructor(client: any, data?: {});
    listMedia(): any;
}
/**
 * Represents a Message Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export declare class MessageInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
    /**
     * Send Message
     * @method
     * @param {string} src - source number
     * @param {string} dst - destination number
     * @param {string} text - text to send
     * @param {object} optionalParams - Optional Params to send message
     * @param {string} [optionalParams.type] - The type of message. Should be `sms` or `mms`. Defaults to `sms`.
     * @param {string} [optionalParams.url] The URL to which with the status of the message is sent.
     * @param {string} [optionalParams.method] The method used to call the url. Defaults to POST.
     * @param {list} [optionalParams.media_urls] For sending mms, specify the media urls in list of string
     * @param {boolean} [optionalParams.log] If set to false, the content of this message will not be logged on the Plivo infrastructure and the dst value will be masked (e.g., 141XXXXX528). Default is set to true.
     * @promise {object} return {@link PlivoGenericMessage} object if success
     * @fail {Error} return Error
     */
    send(src: any, dst: any, text: any, optionalParams: any): any;
    /**
     * Create Message
     * @method
     * @param {string} src - source number
     * @param {string} dst - destination number
     * @param {string} text - text to send
     * @param {object} optionalParams - Optional Params to send message
     * @param {string} [optionalParams.type] - The type of message. Should be `sms` or `mms`. Defaults to `sms`.
     * @param {string} [optionalParams.url] The URL to which with the status of the message is sent.
     * @param {string} [optionalParams.method] The method used to call the url. Defaults to POST.
     * @param {boolean} [optionalParams.log] If set to false, the content of this message will not be logged on the Plivo infrastructure and the dst value will be masked (e.g., 141XXXXX528). Default is set to true.
     * @param {Array} [optionalParams.media_urls] For sending mms, specify the media urls in list of string
     * @promise {object} return {@link PlivoGenericMessage} object if success
     * @fail {Error} return Error
     */
    create(src: any, dst: any, text: any, optionalParams?: any, powerpackUUID: any): any;
    /**
     * Get Message by given id
     * @method
     * @param {string} id - id of message
     * @promise {object} return {@link Message} object if success
     * @fail {Error} return Error
     */
    get(id: any): any;
    listMedia(messageUUID: any): any;
}