/**
 * Represents a Call
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Call extends PlivoResource {
    constructor(client: any, data?: {});
    id: any;
    /**
     * hangup call
     * @method
     * @promise {Boolean} return true if call hung up
     * @fail {Error} return Error
     */
    hangup(): Promise<any>;
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
    }): Promise<any>;
    /**
     * record call
     * @method
     * @param {object} params - to record call
     * @promise {object} return PlivoGenericResponse Object
     * @fail {Error} return Error
     */
    record(params: object): Promise<any>;
    /**
     * record call
     * @method
     * @param {object} params - to record call
     * @promise {object} return PlivoGenericResponse Object
     * @fail {Error} return Error
     */
    startRecording(params: object): Promise<any>;
    /**
     * stop recording call
     * @method
     * @param {object} params - to stop recording call
     * @promise {object} return PlivoGenericResponse Object
     * @fail {Error} return Error
     */
    stopRecording(params: object): Promise<any>;
    /**
     * play music for call
     * @method
     * @param {string} url - url which contains audio to play for call
     * @param {object} optionalParams - to stop recording call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    playMusic(url: string, optionalParams: object): Promise<any>;
    /**
     * play music for call
     * @method
     * @param {string} url - url which contains audio to play for call
     * @param {object} optionalParams - to stop recording call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    startPlayingMusic(urls: any, optionalParams: object): Promise<any>;
    /**
     * stop playing music for call
     * @method
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    stopPlayingMusic(): Promise<any>;
    /**
     * speak text for call
     * @method
     * @param {string} text - text to speak for call
     * @param {object} optionalParams - to speak for call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    speakText(text: string, optionalParams: object): Promise<any>;
    /**
     * speak text for call
     * @method
     * @param {string} text - text to speak for call
     * @param {object} optionalParams - to speak for call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    startSpeakingText(text: string, optionalParams: object): Promise<any>;
    /**
     * stop speaking text for call
     * @method
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    stopSpeakingText(): Promise<any>;
    /**
     * Send digits on a call
     * @method
     * @param {number} digits - digits to be send
     * @param {object} optionalParams - to send digits for call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    sendDigits(digits: number, optionalParams: object): Promise<any>;
    /**
     * Hangup a Call Request
     * @method
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    cancel(): Promise<any>;
    [clientKey]: any;
}
/**
 * Represents a Call Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class CallInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
    /**
     * Hangup A Specific Call
     * @method
     * @param {string} callUUID - call uuid to hangup call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    hangup(callUUID: string): Promise<any>;
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
    }): Promise<any>;
    /**
     * Record a Call
     * @method
     * @param {string} callUUID - call uuid to record call
     * @param {object} optionalParams - optional params to record a call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    record(callUUID: string, optionalParams: object): Promise<any>;
    /**
     * Stop Recording a Call
     * @method
     * @param {string} callUUID - call uuid to stop recording a call
     * @param {object} optionalParams - optional params to stop recording a call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    stopRecording(callUUID: string, optionalParams: object): Promise<any>;
    /**
     * Play a music file
     * @method
     * @param {string} callUUID - call uuid to play music file
     * @param {string} url - A single URL or a list of comma separated URLs linking to an mp3 or wav file.
     * @param {object} optionalParams - optional params to play music file.
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    playMusic(callUUID: string, urls: any, optionalParams: object): Promise<any>;
    /**
     * Stop Playing a music file
     * @method
     * @param {string} callUUID - call uuid to stop plaing music file
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    stopPlayingMusic(callUUID: string): Promise<any>;
    /**
     * Speak text during a call
     * @method
     * @param {string} callUUID - call uuid to speak text during a call
     * @param {string} text - text to be played.
     * @param {object} optionalParams - optional params to speak text during a call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    speakText(callUUID: string, text: string, optionalParams: object): Promise<any>;
    /**
     * Stop Speaking text during a call
     * @method
     * @param {string} callUUID - call uuid to stop speaking text during a call
     * @param {object} optionalParams - optional params to stop speaking text during a call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    stopSpeakingText(callUUID: string): Promise<any>;
    /**
     * Send digits on a call
     * @method
     * @param {string} callUUID - call uuid to send digits on a call
     * @param {number} digits - digits to be send
     * @param {object} optionalParams - optional params to send digits
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    sendDigits(callUUID: string, digits: number, optionalParams: object): Promise<any>;
    /**
     * Hangup a call request
     * @method
     * @param {string} callUUID - call uuid to send digits on a call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    cancel(id: any): Promise<any>;
    listLiveCalls(params: any): Promise<any>;
    getLiveCall(id: any): Promise<any>;
    listQueuedCalls(): Promise<any>;
    getQueuedCall(id: any): Promise<any>;
    [clientKey]: any;
    [liveCallInterfaceKey]: LiveCallInterface;
    [queuedCallInterfaceKey]: QueuedCallInterface;
}
export class LiveCallResource extends PlivoResource {
    constructor(client: any, data?: {});
    id: any;
    [clientKey]: any;
}
export class QueuedCallResource extends PlivoResource {
    constructor(client: any, data?: {});
    id: any;
    [clientKey]: any;
}
import { PlivoResource } from "../base.js";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base.js";
declare const liveCallInterfaceKey: unique symbol;
/**
 * Represents a LiveCall interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
declare class LiveCallInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
    [clientKey]: any;
}
declare const queuedCallInterfaceKey: unique symbol;
/**
 * Represents a QueuedCall interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
declare class QueuedCallInterface extends PlivoResourceInterface {
    constructor(client: any, data?: {});
    [clientKey]: any;
}
export {};
