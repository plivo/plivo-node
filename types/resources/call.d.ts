export class CallTransferResponse {
	constructor(params: object);
	apiId: string;
	callUuids: object;
	message: string;
}
export class ListAllQueuedCalls {
	constructor(params: object);
	apiId: string;
	calls: object;
}
export class ListAllLiveCallResponse {
	constructor(params: object);
	apiId: string;
	callUuid: object;
}
export class CreateCallResponse {
	constructor(params: object);
	apiId: string;
	message: string;
	requestUuid: Array<string>;
}
export class GetQueuedCallResponse {
	constructor(params: object);
	apiId: string;
	direction: string;
	from: string;
	callStatus: string;
	to: string;
	callerName: string;
	callUuid: string;
	requestUuid: string;
}
export class GetLiveCallResponse {
	constructor(params: object);
	apiId: string;
	callStatus: string;
	callUuid: string;
	callerName: string;
	direction: string;
	from: string;
	requestUuid: string;
	sessionStart: string;
	to: string;
}
export class RetrieveCallResponse {
	constructor(params: object);
	apiId: string;
	answerTime: string;
	billDuration: string;
	billedDuration: string;
	callDirection: string;
	callDuration: string;
	callState: string;
	callUuid: string;
	conferenceUuid: string;
	endTime: string;
	fromNumber: string;
	hangupCauseCode: string;
	hangupCauseName: string;
	hangupSource: string;
	initiationTime: string;
	parentCallUuid: string;
	resourceUri: string;
	toNumber: string;
	totalAmount: string;
	totalRate: string;
}
export class ListAllCallsResponse {
	constructor(params: object);
	apiId: string;
	answerTime: string;
	billDuration: string;
	billedDuration: string;
	callDirection: string;
	callDuration: string;
	callState: string;
	callUuid: string;
	conferenceUuid: string;
	endTime: string;
	fromNumber: string;
	hangupCauseCode: string;
	hangupCauseName: string;
	hangupSource: string;
	initiationTime: string;
	parentCallUuid: string;
	resourceUri: string;
	toNumber: string;
	totalAmount: string;
	totalRate: string;
}
export class StartPlayingMusicResponse {
	constructor(params: object);
	apiId: string;
	message: string;
}
export class StartSpeakingTextResponse {
	constructor(params: object);
	apiId: string;
	message: string;
}
export class SendDigitsResponse {
	constructor(params: object);
	apiId: string;
	message: string;
}
export class RecordCallResponse {
	constructor(params: object);
	apiId: string;
	message: string;
	recordingId: string;
	url: string;
}
/**
 * Represents a Call
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Call extends PlivoResource {
	constructor(client: Function, data ? : {});
	id: string;
	/**
	 * hangup call
	 * @method
	 * @promise {Boolean} return true if call hung up
	 * @fail {Error} return Error
	 */
	hangup(): Promise < any > ;
	/**
	 * transfer call
	 * @method
	 * @param {object} params - optional params to transfer a call
	 * @param {string} [params.legs] aleg, bleg or both Defaults to aleg. aleg will transfer call_uuid ; bleg will transfer the bridged leg (if found) of call_uuid ; both will transfer call_uuid and bridged leg of call_uuid
	 * @param {string} [params.alegUrl] URL to transfer for aleg, if legs is aleg or both, then aleg_url has to be specified.
	 * @param {string} [params.alegMethod] HTTP method to invoke aleg_url. Defaults to POST.
	 * @param {string} [params.blegUrl] URL to transfer for bridged leg, if legs is bleg or both, then bleg_url has to be specified.
	 * @param {string} [params.blegMethod] HTTP method to invoke bleg_url. Defaults to POST.
	 * @promise {object} return call object
	 * @fail {Error} return Error
	 */
	transfer(params: {
		legs: string;
		alegUrl: string;
		alegMethod: string;
		blegUrl: string;
		blegMethod: string;
	}, callUUid: string): Promise < CallTransferResponse > ;
	/**
	 * record call
	 * @method
	 * @param {object} params - to record call
	 * @promise {object} return PlivoGenericResponse Object
	 * @fail {Error} return Error
	 */
	record(params: object): Promise < any > ;
	/**
	 * record call
	 * @method
	 * @param {object} params - to record call
	 * @promise {object} return PlivoGenericResponse Object
	 * @fail {Error} return Error
	 */
	startRecording(params: object): Promise < RecordCallResponse > ;
	/**
	 * stop recording call
	 * @method
	 * @param {object} params - to stop recording call
	 * @promise {object} return PlivoGenericResponse Object
	 * @fail {Error} return Error
	 */
	stopRecording(params: object): Promise < any > ;
	/**
	 * play music for call
	 * @method
	 * @param {string} url - url which contains audio to play for call
	 * @param {object} optionalParams - to stop recording call
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	playMusic(url: string, optionalParams: object): Promise < any > ;
	/**
	 * play music for call
	 * @method
	 * @param {string} url - url which contains audio to play for call
	 * @param {object} optionalParams - to stop recording call
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	startPlayingMusic(urls: any, optionalParams: object): Promise < StartPlayingMusicResponse > ;
	/**
	 * stop playing music for call
	 * @method
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	stopPlayingMusic(): Promise < any > ;
	/**
	 * speak text for call
	 * @method
	 * @param {string} text - text to speak for call
	 * @param {object} optionalParams - to speak for call
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	speakText(text: string, optionalParams: object): Promise < any > ;
	/**
	 * speak text for call
	 * @method
	 * @param {string} text - text to speak for call
	 * @param {object} optionalParams - to speak for call
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	startSpeakingText(text: string, optionalParams: object): Promise < StartSpeakingTextResponse > ;
	/**
	 * stop speaking text for call
	 * @method
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	stopSpeakingText(): Promise < any > ;
	/**
	 * Send digits on a call
	 * @method
	 * @param {number} digits - digits to be send
	 * @param {object} optionalParams - to send digits for call
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	sendDigits(digits: number, optionalParams: object): Promise < SendDigitsResponse > ;
	/**
	 * Hangup a Call Request
	 * @method
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	cancel(): Promise < any > ;
	[clientKey]: symbol;
}
/**
 * Represents a Call Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class CallInterface extends PlivoResourceInterface {
	constructor(client: Function, data ? : {});
	/**
	 * Get A Call Detail
	 * @method
	 * @param {string} id - call uuid to get information of.
	 * @promise {object} returns Call Object
	 * @fail {Error} returns Error
	 */
	get(id: string): Promise < RetrieveCallResponse > ;
	/**
	 * Get All Call Detail
	 * @method
	 * @param {object} params - params to get all call details.
	 * @promise {object[]} returns list of Call Object
	 * @fail {Error} returns Error
	 */
	list(params: object): Promise < ListAllCallsResponse > ;
	/**
	 * Create a call
	 * @method
	 * @param {string} from - The phone number to be used as the caller id (with the country code).For e.g, a USA caller id number could be, 15677654321, with '1' for the country code.
	 * @param {string} to - The regular number(s) or sip endpoint(s) to call. Regular number must be prefixed with country code but without the + sign). For e.g, to dial a number in the USA, the number could be, 15677654321, with '1' for the country code. Multiple numbers can be sent by using a delimiter. For e.g. 15677654321<12077657621<12047657621. Sip endpoints must be prefixed with sip: E.g., sip:john1234@phone.plivo.com. To make bulk calls, the delimiter < is used. For example, 15677654321<15673464321<sip:john1234@phone.plivo.com Yes, you can mix regular numbers and sip endpoints.
	 * @param {string} answerUrl - The URL invoked by Plivo when the outbound call is answered.
	 * @param {object} params - optional params to make a call
	 * @param {string} [params.answerUrl] The URL invoked by Plivo when a call executes this application.
	 * @param {string} [params.answerMethod] The method used to call the answer_url. Defaults to POST.
	 * @param {string} [params.hangupUrl] The URL that is notified by Plivo when the call hangs up.
	 * @param {string} [params.hangupMethod] The method used to call the hangup_url. Defaults to POST
	 * @param {string} [params.fallbackAnswerUrl] Invoked by Plivo only if answer_url is unavailable or the XML response is invalid. Should contain a XML response.
	 * @param {string} [params.fallbackMethod] The method used to call the fallback_answer_url. Defaults to POST.
	 * @param {string} [params.callerName] Caller name to use with the call.
	 * @param {string} [params.sendDigits] Each 'w' character waits 0.5 second before sending a digit. Each 'W' character waits 1 second before sending a digit. You can also add the tone duration in ms by appending @duration after the string (default duration is 2000 ms). For example, 1w2w3@1000
	 * @param {boolean} [params.sendOnPreanswer]    If set to true and send_digits is also set, digits are sent when the call is in preanswer state. Defaults to false.
	 * @param {number} [params.timeLimit] Schedules the call for hangup at a specified time after the call is answered. Value should be an integer > 0(in seconds).
	 * @param {number} [params.hangupOnRing] Schedules the call for hangup at a specified time after the call starts ringing. Value should be an integer >= 0 (in seconds).
	 * @param {string} [params.machineDetection] Used to detect if the call has been answered by a machine. The valid values are true and hangup.
	 * @param {number} [params.machineDetectionTime] Time allotted to analyze if the call has been answered by a machine. It should be an integer >= 2000 and <= 10000 and the unit is ms. The default value is 5000 ms.
	 * @param {string} [params.machineDetectionUrl] A URL where machine detection parameters will be sent by Plivo. This parameter should be used to make machine detection asynchronous
	 * @param {string} [params.machineDetectionMethod] The HTTP method which will be used by Plivo to request the machine_detection_url. Defaults to POST.
	 * @param {string} [params.sipHeaders] List of SIP headers in the form of 'key=value' pairs, separated by commas.
	 * @param {number} [params.ringTimeout] Determines the time in seconds the call should ring. If the call is not answered within the ring_timeout value or the default value of 120s, it is canceled.
	 * @param {string} [params.parentCallUuid] The call_uuid of the first leg in an ongoing conference call. It is recommended to use this parameter in scenarios where a member who is already present in the conference intends to add new members by initiating outbound API calls.
	 * @param {boolean} [params.errorIfParentNotFound] if set to true and the parent_call_uuid cannot be found, the API request would return an error. If set to false, the outbound call API request will be executed even if the parent_call_uuid is not found. Defaults to false.
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	create(from: string, to: string, answerUrl: string, params ? : {}): Promise < CreateCallResponse > ;
	/**
	 * Hangup A Specific Call
	 * @method
	 * @param {string} callUUID - call uuid to hangup call
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	hangup(callUUID: string): Promise < any > ;
	/**
	 * Transfer a Call
	 * @method
	 * @param {string} callUUID - call uuid to transfer call
	 * @param {object} params - optional params to transfer a call
	 * @param {string} [params.legs] aleg, bleg or both Defaults to aleg. aleg will transfer call_uuid ; bleg will transfer the bridged leg (if found) of call_uuid ; both will transfer call_uuid and bridged leg of call_uuid
	 * @param {string} [params.alegUrl] URL to transfer for aleg, if legs is aleg or both, then aleg_url has to be specified.
	 * @param {string} [params.alegMethod] HTTP method to invoke aleg_url. Defaults to POST.
	 * @param {string} [params.blegUrl] URL to transfer for bridged leg, if legs is bleg or both, then bleg_url has to be specified.
	 * @param {string} [params.blegMethod] HTTP method to invoke bleg_url. Defaults to POST.
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	transfer(callUUID: string, params: {
		legs: string;
		alegUrl: string;
		alegMethod: string;
		blegUrl: string;
		blegMethod: string;
	}): Promise < any > ;
	/**
	 * Record a Call
	 * @method
	 * @param {string} callUUID - call uuid to record call
	 * @param {object} optionalParams - optional params to record a call
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	record(callUUID: string, optionalParams: object): Promise < any > ;
	/**
	 * Stop Recording a Call
	 * @method
	 * @param {string} callUUID - call uuid to stop recording a call
	 * @param {object} optionalParams - optional params to stop recording a call
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	stopRecording(callUUID: string, optionalParams: object): Promise < any > ;
	/**
	 * Play a music file
	 * @method
	 * @param {string} callUUID - call uuid to play music file
	 * @param {string} url - A single URL or a list of comma separated URLs linking to an mp3 or wav file.
	 * @param {object} optionalParams - optional params to play music file.
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	playMusic(callUUID: string, urls: any, optionalParams: object): Promise < any > ;
	/**
	 * Stop Playing a music file
	 * @method
	 * @param {string} callUUID - call uuid to stop plaing music file
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	stopPlayingMusic(callUUID: string): Promise < any > ;
	/**
	 * Speak text during a call
	 * @method
	 * @param {string} callUUID - call uuid to speak text during a call
	 * @param {string} text - text to be played.
	 * @param {object} optionalParams - optional params to speak text during a call
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	speakText(callUUID: string, text: string, optionalParams: object): Promise < any > ;
	/**
	 * Stop Speaking text during a call
	 * @method
	 * @param {string} callUUID - call uuid to stop speaking text during a call
	 * @param {object} optionalParams - optional params to stop speaking text during a call
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	stopSpeakingText(callUUID: string): Promise < any > ;
	/**
	 * Send digits on a call
	 * @method
	 * @param {string} callUUID - call uuid to send digits on a call
	 * @param {number} digits - digits to be send
	 * @param {object} optionalParams - optional params to send digits
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	sendDigits(callUUID: string, digits: number, optionalParams: object): Promise < any > ;
	/**
	 * Hangup a call request
	 * @method
	 * @param {string} callUUID - call uuid to send digits on a call
	 * @promise {object} returns PlivoGenericResponse Object
	 * @fail {Error} returns Error
	 */
	cancel(id: string): Promise < any > ;
	listLiveCalls(params: object): Promise < any > ;
	getLiveCall(id: string): Promise < any > ;
	listQueuedCalls(): Promise < any > ;
	getQueuedCall(id: string): Promise < any > ;
	[clientKey]: symbol;
	[liveCallInterfaceKey]: LiveCallInterface;
	[queuedCallInterfaceKey]: QueuedCallInterface;
}
export class LiveCallResource extends PlivoResource {
	constructor(client: Function, data ? : {});
	id: string;
	[clientKey]: symbol;
}
export class QueuedCallResource extends PlivoResource {
	constructor(client: Function, data ? : {});
	id: string;
	[clientKey]: symbol;
}
import {
	PlivoResource
} from "../base";
declare const clientKey: unique symbol;
import {
	PlivoResourceInterface
} from "../base";
declare const liveCallInterfaceKey: unique symbol;
/**
 * Represents a LiveCall interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
declare class LiveCallInterface extends PlivoResourceInterface {
	constructor(client: Function, data ? : {});
	[clientKey]: symbol;
}
declare const queuedCallInterfaceKey: unique symbol;
/**
 * Represents a QueuedCall interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

declare class QueuedCallInterface extends PlivoResourceInterface {
	constructor(client: Function, data ? : {});
	get(id: string): Promise < GetQueuedCallResponse > ;
	list(): Promise < ListAllQueuedCalls > ;
	[clientKey]: symbol;
}
export {};