export class UploadMediaResponse {
	constructor(params: object);
	apiId: string;
	objects: object;
}
export class RetrieveMediaResponse {
	constructor(params: object);
	apiId: string;
	contentType: string;
	fileName: string;
	mediaId: string;
	mediaUrl: string;
	size: string;
	uploadTime: string;
}
export class ListMediaResponse {
    constructor(params: object);
    apiId: string;
    meta: string;
    objects: string;
}
/**
 * Represents a Message
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Media extends PlivoResource {
	constructor(client: Function, data ? : {});
	id: string;
}
/**
 * Represents a Media Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class MediaInterface extends PlivoResourceInterface {
	constructor(client: Function, data ? : {});
	/**
	 * Upload Media
	 * @method
	 * @fail {Error} return Error
	 */
    upload(files: Array<string>): Promise<UploadMediaResponse>;
    /**
     * Get Media by given id
     * @method
     * @param {string} media_id - id of media
     * @promise {object} return {@link Media} object if success
     * @fail {Error} return Error
     */
    get(media_id: string): Promise<RetrieveMediaResponse>;
    /**
     * Get All Media Detail
     * @method
     * @param {object} params - params to get all media details.
     * @promise {object[]} returns list of Media Object
     * @fail {Error} returns Error
     */
    list(params: object): Promise<any>;
	[clientKey]: symbol;
}
import {
	PlivoResource
} from "../base";
import {
	PlivoResourceInterface
} from "../base";
declare const clientKey: unique symbol;
export {};