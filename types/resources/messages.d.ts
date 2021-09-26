export class MessageResponse {
	constructor(params: object);
	apiId: string;
	message: string;
	messageUuid: Array<string>;
	invalidNumber?: Array<string>;
}
export class MessageGetResponse {
	constructor(params: object);
	apiId: string;
	errorCode: string;
	fromNumber: string;
	messageDirection: string;
	messageState: string;
	messageTime: string;
	messageType: string;
	messageUuid: string;
	resourceUri: string;
	toNumber: string;
	totalAmount: string;
	totalRate: string;
	units: string;
	powerpackId: string;
}
export class MessageListResponse {
	constructor(params: object);
  errorCode: string;
	fromNumber: string;
	messageDirection: string;
	messageState: string;
	messageTime: string;
	messageType: string;
	messageUuid: string;
	resourceUri: string;
	toNumber: string;
	totalAmount: string;
	totalRate: string;
  units: string;
	powerpackId: string;
}
export class MMSMediaResponse {
	constructor(params: object);
	apiid: string;
	objects: MMSMedia[];
}
export class MMSMedia {
	constructor(params: object);
	contentType: string;
	fileName: string;
	mediaId: string;
	mediaUrl: string;
	messageUuid: string;
	size: string;
	uploadTime: string;
}
/**
 * Represents a Message
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Message extends PlivoResource {
	constructor(client: Function, data ? : {});
	id: string;
	listMedia(): Promise < any > ;
}
/**
 * Represents a Message Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class MessageInterface extends PlivoResourceInterface {
	constructor(client: Function, data?: {});
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
	send(src: string, dst: string, text: string, optionalParams?: {
		type: string;
		url: string;
		method: string;
		media_urls: Array<string>;
		log: boolean;
	}): Promise < MessageResponse > ;
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
	 * @promise {object} return {@link MessageResponse} object if success
	 * @fail {Error} return Error
	 */
	create(src: any, dst: any, text: string, optionalParams?: object, powerpackUUID?: string ): Promise < MessageResponse >;

	get(id: string): Promise<MessageGetResponse>;

	list(params: object): Promise < MessageListResponse> ;

	listMedia(messageUUID: string): Promise <MMSMediaResponse> ;
}
import {
	PlivoResource
} from "../base";
import {
	PlivoResourceInterface
} from "../base";