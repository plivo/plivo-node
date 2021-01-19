/**
* Represents a Conference
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class MuteMemberResponse {
    constructor(params: object);
    apiId: string;
    memberId: string;
    message: string;
}
export class StartRecordingConferenceResponse {
    constructor(params: object);
    apiId: string;
    message: string;
    recordingId: string;
    url: string;
}
export class RetrieveConferenceResponse {
    constructor(params: object);
    apiId: string;
    conferenceMemberCount: string;
    conferenceName: string;
    conferenceRunTime: string;
    members: string;
}
export class ListAllConferenceResponse {
    constructor(params: object);
    apiId: string;
    conferences: string;
}
export class SpeakMemberResponse {
    constructor(params: object);
    apiId: string;
    memberId: string;
    message: string;
}
export class PlayAudioMemberResponse {
    constructor(params: object);
    apiId: string;
    memberId: string;
    message: string;
}
export class DeafMemberResponse {
    constructor(params: string);
    apiId: string;
    memberId: string;
    message: string;
}
export class Conference extends PlivoResource {
    constructor(client: Function, data?: {});
    id: string;
    /**
     * hangup conference
     * @method
     * @promise {Boolean} return true if call hung up
     * @fail {Error} return Error
     */
    hangup(): Promise<any>;
    /**
     * hangup member from conference
     * @method
     * @param {string} memberId - id of member to be hangup
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    hangupMember(memberId: string): Promise<any>;
    /**
     * kick member from conference
     * @method
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    kickMember(memberId: string): Promise<any>;
    /**
     * mute member from conference
     * @method
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    muteMember(memberId: string): Promise<MuteMemberResponse>;
    /**
     * unmute member from conference
     * @method
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    unmuteMember(memberId: string): Promise<any>;
    /**
     * deaf member from conference
     * @method
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    deafMember(memberId: string): Promise<DeafMemberResponse>;
    /**
     * undeaf member from conference
     * @method
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    undeafMember(memberId: string): Promise<any>;
    /**
     * play audio to member
     * @method
     * @param {string} memberId - id of member
     * @param {string} url - url for audio
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    playAudioToMember(memberId: string, url: string): Promise<PlayAudioMemberResponse>;
    /**
     * stop playing audio to member
     * @method
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    stopPlayingAudioToMember(memberId: string): Promise<any>;
    /**
     * speak text to member
     * @method
     * @param {string} memberId - id of member
     * @param {string} text - text to be speak to member
     * @param {object} optionalParams - optionalPrams to speak text
     * @param {string} [optionalParams.voice] The voice to be used. Can be MAN or WOMAN. Defaults to WOMAN.
     * @param {string} [optionalParams.language] The language to be used. Defaults to en-US.
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    speakTextToMember(memberId: string, text: string, optionalParams: {
        voice: string;
        language: string;
    }): Promise<SpeakMemberResponse>;
    /**
     * stop speaking text to member
     * @method
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    stopSpeakingTextToMember(memberId: string): Promise<any>;
    /**
     * Record conference
     * @method
     * @param {object} params - optional params to record conference
     * @param {string} [params.fileFormat] The file format of the record can be of mp3 or wav format. Defaults to mp3 format.
     * @param {string} [params.transcriptionType] The type of transcription required. The following values are allowed:
     * - auto - This is the default value. Transcription is completely automated; turnaround time is about 5 minutes.
     * - hybrid - Transcription is a combination of automated and human verification processes; turnaround time is about 10-15 minutes.
     * @param {string} [params.transcriptionUrl] The URL where the transcription is available.
     * @param {string} [params.transcriptionMethod] The method used to invoke the transcription_url. Defaults to POST.
     * @param {string} [params.callbackUrl] The URL invoked by the API when the recording ends.
     * @param {string} [params.callbackMethod] The method which is used to invoke the callback_url URL. Defaults to POST.
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    record(params: {
        fileFormat: string;
        transcriptionType: string;
        transcriptionUrl: string;
        transcriptionMethod: string;
        callbackUrl: string;
        callbackMethod: string;
    }): Promise<any>;
    /**
     * Record conference
     * @method
     * @param {object} params - optional params to record conference
     * @param {string} [params.fileFormat] The file format of the record can be of mp3 or wav format. Defaults to mp3 format.
     * @param {string} [params.transcriptionType] The type of transcription required. The following values are allowed:
     * - auto - This is the default value. Transcription is completely automated; turnaround time is about 5 minutes.
     * - hybrid - Transcription is a combination of automated and human verification processes; turnaround time is about 10-15 minutes.
     * @param {string} [params.transcriptionUrl] The URL where the transcription is available.
     * @param {string} [params.transcriptionMethod] The method used to invoke the transcription_url. Defaults to POST.
     * @param {string} [params.callbackUrl] The URL invoked by the API when the recording ends.
     * @param {string} [params.callbackMethod] The method which is used to invoke the callback_url URL. Defaults to POST.
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    startRecording(params?: {
        fileFormat: string;
        transcriptionType: string;
        transcriptionUrl: string;
        transcriptionMethod: string;
        callbackUrl: string;
        callbackMethod: string;
    }): Promise<StartRecordingConferenceResponse>;
    /**
     * stop recording conference
     * @method
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    stopRecording(): Promise<any>;
    [clientKey]: symbol;
}
/**
* Represents a Conference Interface
* @constructor
* @param {function} client - make api call
* @param {object} [data] - data of call
*/
export class ConferenceInterface extends PlivoResourceInterface {
    constructor(client: Function, data?: {});

    /**
     * get conference by id
     * @method
     * @param {string} id - id of conference
     * @promise {@link Conference} return {@link Conference} object if success
     * @fail {Error} return Error
     */
    get(id: string): Promise<RetrieveConferenceResponse>;
    /**
     * get all conferences. returns name of all conferences
     * @method
     * @promise {@link [Conference]} returns list of {@link Conference} objects if success
     * @fail {Error} return Error
     */
    list(): Promise<ListAllConferenceResponse>;
    /**
     * hangup conference
     * @method
     * @param {string} conferenceName - name of conference
     * @promise {@link Conference} return {@link Conference} object if success
     * @fail {Error} return Error
     */
    hangup(conferenceName: string): Promise<any>;
    /**
     * hangup all
     * @method
     * @promise {@link PlivoGenericResponse} returns object of PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    hangupAll(): Promise<any>;
    /**
     * hangup member from conference
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member to be hangup
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    hangupMember(id: string, memberId: string): Promise<any>;
    /**
     * kick member from conference
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    kickMember(id: string, memberId: string): Promise<any>;
    /**
     * mute member
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    muteMember(id: string, memberId: string): Promise<any>;
    /**
     * unmute member
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    unmuteMember(id: string, memberId: string): Promise<any>;
    /**
     * deaf member
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    deafMember(id: string, memberId: string): Promise<any>;
    /**
     * undeaf member
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    undeafMember(id: string, memberId: string): Promise<any>;
    /**
     * play audio to member
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @param {string} url - urls for audio
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    playAudioToMember(id: string, memberId: string, url: string): Promise<any>;
    /**
     * stop playing audio to member
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    stopPlayingAudioToMember(id: string, memberId: string): Promise<any>;
    /**
     * speak text to member
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @param {string} text - text to speak
     * @param {object} optionalParams - optional params
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    speakTextToMember(id: string, memberId: string, text: string, optionalParams: object): Promise<any>;
    /**
     * stop speaking text to member
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    stopSpeakingTextToMember(id: string, memberId: string): Promise<any>;
    /**
     * record conference
     * @method
     * @param {string} id - id of conference
     * @param {object} params - optional params to record conference
     * @param {string} [params.fileFormat] The file format of the record can be of mp3 or wav format. Defaults to mp3 format.
     * @param {string} [params.transcriptionType] The type of transcription required. The following values are allowed:
     * - auto - This is the default value. Transcription is completely automated; turnaround time is about 5 minutes.
     * - hybrid - Transcription is a combination of automated and human verification processes; turnaround time is about 10-15 minutes.
     * @param {string} [params.transcriptionUrl] The URL where the transcription is available.
     * @param {string} [params.transcriptionMethod] The method used to invoke the transcription_url. Defaults to POST.
     * @param {string} [params.callbackUrl] The URL invoked by the API when the recording ends.
     * @param {string} [params.callbackMethod] The method which is used to invoke the callback_url URL. Defaults to POST.
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    record(id: string, params: {
        fileFormat: string;
        transcriptionType: string;
        transcriptionUrl: string;
        transcriptionMethod: string;
        callbackUrl: string;
        callbackMethod: string;
    }): Promise<any>;
    /**
     * record conference
     * @method
     * @param {string} id - id of conference
     * @param {object} params - optional params to record conference
     * @param {string} [params.fileFormat] The file format of the record can be of mp3 or wav format. Defaults to mp3 format.
     * @param {string} [params.transcriptionType] The type of transcription required. The following values are allowed:
     * - auto - This is the default value. Transcription is completely automated; turnaround time is about 5 minutes.
     * - hybrid - Transcription is a combination of automated and human verification processes; turnaround time is about 10-15 minutes.
     * @param {string} [params.transcriptionUrl] The URL where the transcription is available.
     * @param {string} [params.transcriptionMethod] The method used to invoke the transcription_url. Defaults to POST.
     * @param {string} [params.callbackUrl] The URL invoked by the API when the recording ends.
     * @param {string} [params.callbackMethod] The method which is used to invoke the callback_url URL. Defaults to POST.
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    startRecording(id: string, params: {
        fileFormat: string;
        transcriptionType: string;
        transcriptionUrl: string;
        transcriptionMethod: string;
        callbackUrl: string;
        callbackMethod: string;
    }): Promise<any>;
    /**
     * stop recording
     * @method
     * @param {string} id - id of conference
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */
    stopRecording(id: string): Promise<any>;
    [clientKey]: symbol;
}
import { PlivoResource } from "../base";
declare const clientKey: unique symbol;
import { PlivoResourceInterface } from "../base";
export {};
