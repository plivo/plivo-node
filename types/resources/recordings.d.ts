export class RetrieveRecordingResponse {
	constructor(params: object);
	addTime: string;
	apiId: string;
    callUuid: string;
	conferenceName: string;
	recordingDurationMs: string;
	recordingEndMs: string;
	recordingFormat: string;
	recordingId: string;
	recordingStartMs: string;
	recordingType: string;
	recordingUrl: string;
    resourceUri: string;
}
export class ListRecordingResponse {
	constructor(params: object);
	addTime: string;
	apiId: string;
	callUuid: string;
	conferenceName: string;
	recordingDurationMs: string;
	recordingEndMs: string;
	recordingFormat: string;
	recordingId: string;
	recordingStartMs: string;
	recordingType: string;
	recordingUrl: string;
	resourceUri: string;
}
/**
 * Represents a Recording
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Recording extends PlivoResource {
	constructor(client: Function, data ? : {});
	id: string;
	[clientKey]: symbol;
}
/**
 * Represents a Recording Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class RecordingInterface extends PlivoResourceInterface {
	constructor(client: Function, data ? : {});
	/**
	 * Delete recording by id
	 * @method
	 * @param {string} id - id to delete recording
	 * @promise {boolean} return true if success
	 * @fail {Error} return Error
	 */
	delete(id: string): Promise < any > ;
    [clientKey]: symbol;
    /**
     * Get recording by id
     * @method
     * @param {string} id - id to get recording information
     * @promise {object} return {@link Pricing} object
     * @fail {Error} return Error
     */
    get(id: string): Promise<RetrieveRecordingResponse>;
    /**
     * list recordings
     * @method
     * @param {object} params - params to list recordings
     * @param {string} [params.subaccount] - ID of the subaccount if present
     * @param {string} [params.callUuid] - Call UUID of the call to filter recordings associated with it
     * @param {string} [params.addTime] - Filter based on the timings they were added
     * @param {string} [params.limit] - Display no of results per page
     * @param {string} [params.offset] - No of value items by which results should be offset
     */
    list(params?: {}): Promise<ListRecordingResponse>;
}
import {
	PlivoResource
} from "../base";
declare const clientKey: unique symbol;
import {
	PlivoResourceInterface
} from "../base";
export {};