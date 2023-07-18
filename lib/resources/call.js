import * as _ from "lodash";

import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'Call/';
const idField = 'callUuid';

export class CallTransferResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.callUuids = params.callUuids;
        this.message = params.message;

    }
}
export class ListAllQueuedCalls {
    constructor(params) {
        params = params || {};
        this.apiId = params.id;
        this.calls = params.calls;
    }
}
export class ListAllLiveCallResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.id;
        this.callUuid = params.callUuid;
    }
}

export class CreateCallResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
        this.requestUuid = params.requestUuid;

    }
}
export class CreateMaskingSessionResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.sessionUuid = params.sessionUuid;
        this.virtualNumber = params.virtualNumber;
        this.message = params.message;
        this.session = params.session;
        

    }
}
export class GetMaskingSessionResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.response = params.response;        
    }
}
export class DeleteMaskingSessionResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;        
    }
}
export class UpdateMaskingSessionResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message; 
        this.session = params.session;       
    }
}
export class ListMaskingSessionResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.response = params.response;   
    }
}
export class GetQueuedCallResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.direction = params.direction;
        this.from = params.from;
        this.callStatus = params.callStatus;
        this.to = params.to;
        this.callerName = params.callerName;
        this.callUuid = params.callUuid;
        this.requestUuid = params.requestUuid;
    }
}


export class GetLiveCallResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.callStatus = params.callStatus;
        this.callUuid = params.callUuid;
        this.callerName = params.callerName;
        this.direction = params.direction;
        this.from = params.from;
        this.requestUuid = params.requestUuid;
        this.sessionStart = params.sessionStart;
        this.to = params.to;
        this.stirVerification = params.stirVerification;
        this.stirAttestation = params.stirAttestation;
    }
}
export class RetrieveCallResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.answerTime = params.answerTime;
        this.billDuration = params.billDuration;
        this.billedDuration = params.billedDuration;
        this.callDirection = params.callDirection;
        this.callDuration = params.callDuration;
        this.callState = params.callState;
        this.callUuid = params.callUuid;
        this.conferenceUuid = params.conferenceUuid;
        this.endTime = params.endTime;
        this.fromNumber = params.fromNumber;
        this.hangupCauseCode = params.hangupCauseCode;
        this.hangupCauseName = params.hangupCauseName;
        this.hangupSource = params.hangupSource;
        this.initiationTime = params.initiationTime;
        this.parentCallUuid = params.parentCallUuid;
        this.resourceUri = params.resourceUri;
        this.toNumber = params.toNumber;
        this.totalAmount = params.totalAmount;
        this.totalRate = params.totalRate;
        this.stirVerification = params.stirVerification;
        this.stirAttestation = params.stirAttestation;
        this.sourceIp = params.sourceIp;
        this.cnamLookup = params.cnamLookup;
    }
}

export class ListAllCallsResponse {
    constructor(params) {
        params = params || {};
        this.answerTime = params.answerTime;
        this.billDuration = params.billDuration;
        this.billedDuration = params.billedDuration;
        this.callDirection = params.callDirection;
        this.callDuration = params.callDuration;
        this.callState = params.callState;
        this.callUuid = params.callUuid;
        this.conferenceUuid = params.conferenceUuid;
        this.endTime = params.endTime;
        this.fromNumber = params.fromNumber;
        this.hangupCauseCode = params.hangupCauseCode;
        this.hangupCauseName = params.hangupCauseName;
        this.hangupSource = params.hangupSource;
        this.initiationTime = params.initiationTime;
        this.parentCallUuid = params.parentCallUuid;
        this.resourceUri = params.resourceUri;
        this.toNumber = params.toNumber;
        this.totalAmount = params.totalAmount;
        this.totalRate = params.totalRate;
        this.stirVerification = params.stirVerification;
        this.stirAttestation = params.stirAttestation;
        this.sourceIp = params.sourceIp;
        this.cnamLookup = params.cnamLookup;
    }
}

export class StartPlayingMusicResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
    }
}

export class StartSpeakingTextResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
    }
}

export class SendDigitsResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
    }
}

export class RecordCallResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
        this.recordingId = params.recordingId;
        this.url = params.url;
    }
}

export class StartStreamResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;
        this.streamId = params.streamId;
    }
}

/**
 * Represents a Call
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Call extends PlivoResource {
    constructor(client, data = {}) {
        super(action, Call, idField, client);

        if (idField in data) {
            this.id = data[idField];
        }

        extend(this, data);
        this[clientKey] = client;
    }

    /**
     * hangup call
     * @method
     * @promise {Boolean} return true if call hung up
     * @fail {Error} return Error
     */
    hangup() {
        let params = {}
        params.isVoiceRequest = 'true';
        return super.delete(params);
    }

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
    transfer(params, callUUID) {
        params.isVoiceRequest = 'true';
        let client = this[clientKey];
        let that = this;
        callUUID = typeof callUUID !== 'undefined' ? callUUID : that.callUUID;

        return new Promise((resolve, reject) => {
            client('POST', action + callUUID + '/', params)
                .then(response => {
                    extend(that, response.body);
                    if (params.hasOwnProperty('isVoiceRequest')) {
                        delete params.isVoiceRequest;
                    }
                    extend(that, params);
                    resolve(new CallTransferResponse(that));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }


    /**
     * start audio stream over a call
     * @method
     * @param {object} params - to start stream
     * @promise {object} return PlivoGenericResponse Object
     * @fail {Error} return Error
     */
    stream(params= {}) {
        params.isVoiceRequest = 'true';
        return this.startStreaming(params);
    }

    /**
     * start audio stream over a call
     * @method
     * @param {object} params - to start stream
     * @promise {object} return PlivoGenericResponse Object
     * @fail {Error} return Error
     */
    startStreaming(params) {
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action + this.id + '/Stream/', params)
                .then(response => {
                    resolve(new StartStreamResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    stopStream(params= {}) {
        params.isVoiceRequest = 'true';
        return super.executeAction(this.id + '/Stream/' + this.secondaryId, 'DELETE', params);
    }

    stopAllStream(params= {}) {
        params.isVoiceRequest = 'true';
        return super.executeAction(this.id + '/Stream/', 'DELETE', params);
    }

    getStream(params= {}) {
        params.isVoiceRequest = 'true';
        return super.executeAction(this.id + '/Stream/' + this.secondaryId, 'GET', params);
    }

    getAllStream(params= {}) {
        params.isVoiceRequest = 'true';
        return super.executeAction(this.id + '/Stream/', 'GET', params);
    }

    /**
     * record call
     * @method
     * @param {object} params - to record call
     * @promise {object} return PlivoGenericResponse Object
     * @fail {Error} return Error
     */
    record(params= {}) {
        params.isVoiceRequest = 'true';
        return this.startRecording(params);
    }

    /**
     * record call
     * @method
     * @param {object} params - to record call
     * @promise {object} return PlivoGenericResponse Object
     * @fail {Error} return Error
     */
    startRecording(params) {
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action + this.id + '/Record/', params)
                .then(response => {
                    resolve(new RecordCallResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    /**
     * stop recording call
     * @method
     * @param {object} params - to stop recording call
     * @promise {object} return PlivoGenericResponse Object
     * @fail {Error} return Error
     */
    stopRecording(params= {}) {
        params.isVoiceRequest = 'true';
        return super.executeAction(this.id + '/Record/', 'DELETE', params);
    }

    /**
     * play music for call
     * @method
     * @param {string} url - url which contains audio to play for call
     * @param {object} optionalParams - to stop recording call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    playMusic(url, optionalParams) {
        return this.startPlayingMusic(url, optionalParams);
    }
    /**
     * play music for call
     * @method
     * @param {string} url - url which contains audio to play for call
     * @param {object} optionalParams - to stop recording call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    startPlayingMusic(urls, optionalParams) {
        let params = optionalParams || {};
        params.urls = urls;
        params.isVoiceRequest = 'true';

        let errors = validate([{
            field: 'urls',
            value: urls,
            validators: ['isRequired', 'isString']
        }]);

        if (errors) {
            return errors;
        }
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action + this.id + '/Play/', params)
                .then(response => {
                    resolve(new StartPlayingMusicResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * stop playing music for call
     * @method
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    stopPlayingMusic() {
        let params = {}
        params.isVoiceRequest = 'true'
        return super.executeAction(this.id + '/Play/', 'DELETE', params);
    }

    /**
     * speak text for call
     * @method
     * @param {string} text - text to speak for call
     * @param {object} optionalParams - to speak for call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    speakText(text, optionalParams) {
        return this.startSpeakingText(text, optionalParams);
    }

    /**
     * speak text for call
     * @method
     * @param {string} text - text to speak for call
     * @param {object} optionalParams - to speak for call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    startSpeakingText(text, optionalParams) {
        let errors = validate([{
            field: 'text',
            value: text,
            validators: ['isRequired', 'isString']
        }]);

        if (errors) {
            return errors;
        }

        let params = optionalParams || {};
        params.text = text;
        params.isVoiceRequest = 'true';

        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action + this.id + '/Speak/', params)
                .then(response => {
                    resolve(new StartSpeakingTextResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * stop speaking text for call
     * @method
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    stopSpeakingText() {
        let params = {}
        params.isVoiceRequest = 'true';
        return super.executeAction(this.id + '/Speak/', 'DELETE', params);
    }

    /**
     * Send digits on a call
     * @method
     * @param {number} digits - digits to be send
     * @param {object} optionalParams - to send digits for call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    sendDigits(digits, optionalParams) {
        let errors = validate([{
            field: 'digits',
            value: digits,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }

        let params = optionalParams || {};
        params.digits = digits;
        params.isVoiceRequest = 'true';

        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action + this.id + '/DTMF/', params)
                .then(response => {
                    resolve(new SendDigitsResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });


    }

    /**
     * Hangup a Call Request
     * @method
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    cancel() {
        let params = {};
        params.isVoiceRequest = 'true';
        return super.executeAction('Request/' + this.id + '/', 'DELETE', params, '');
    }
    getMaskingSession(params={}) {       
        params.isVoiceRequest = 'true';
        return super.executeAction('Masking/Session/' + this.id, 'GET', params);
    }
    deleteMaskingSession(params={}) {       
        params.isVoiceRequest = 'true';
        return super.executeAction('Masking/Session/' + this.id, 'DELETE', params);
    }
}

const liveCallInterfaceKey = Symbol('liveCallInterface');
const queuedCallInterfaceKey = Symbol('queuedCallInterface');

/**
 * Represents a Call Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class CallInterface extends PlivoResourceInterface {

    constructor(client, data = {}) {
        super(action, Call, idField, client);
        extend(this, data);

        this[clientKey] = client;
        this[liveCallInterfaceKey] = new LiveCallInterface(client);
        this[queuedCallInterfaceKey] = new QueuedCallInterface(client);
    }

    /**
     * Get A Call Detail
     * @method
     * @param {string} id - call uuid to get information of.
     * @promise {object} returns Call Object
     * @fail {Error} returns Error
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
        let params = {}
        params.isVoiceRequest = 'true';
        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            if (action !== '' && !id) {
                reject(new Error(this[idKey] + ' must be set'));
            }
            client('GET', action + (id ? id + '/' : ''), params)
                .then(response => {
                    resolve(new RetrieveCallResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

    /**
     * Get All Call Detail
     * @method
     * @param {object} params - params to get all call details.
     * @promise {object[]} returns list of Call Object
     * @fail {Error} returns Error
     */
    list(params = {}) {
        params.isVoiceRequest = 'true';
        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('GET', action, params)
                .then(response => {
                    let objects = [];
                    Object.defineProperty(objects, 'meta', {
                        value: response.body.meta,
                        enumerable: true
                    });
                    response.body.objects.forEach(item => {
                        objects.push(new ListAllCallsResponse(item, client));
                    });
                    resolve(objects);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

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
     * @param {boolean} [params.sendOnPreanswer]	If set to true and send_digits is also set, digits are sent when the call is in preanswer state. Defaults to false.
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
    create(from, to, answerUrl, params = {}) {
        let errors = validate([{
                field: 'from',
                value: from,
                validators: ['isRequired']
            },
            {
                field: 'to',
                value: to,
                validators: ['isRequired']
            },
            {
                field: 'answer_url',
                value: answerUrl,
                validators: ['isRequired']
            }
        ]);

        if (errors) {
            return errors;
        }
        params.from = from;
        params.to = _.isArray(to) ? _.join(to, '<') : to;
        params.answer_url = answerUrl;
        params.isVoiceRequest = 'true';

        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', action, params)
                .then(response => {
                    resolve(new CreateCallResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Create a masking session
     * @method
     * @param {string} firstParty - The phone number or SIP endpoint of the first party.
     * @param {string} secondParty - The phone number or SIP endpoint of the second party.
     * @param {object} params - optional params to make a call
     * @param {number} [params.sessionExpiry]- The duration in seconds for which the masking session will be active.
     * @param {number} [params.callTimeLimit] - The maximum duration in seconds for each call in the masking session.
     * @param {boolean} [params.record] - Indicates whether the calls in the masking session should be recorded.
     * @param {string} [params.recordFileFormat] - The file format for the recorded calls.
     * @param {string} [params.recordingCallbackUrl] - The URL to which the recording callback will be sent.
     * @param {boolean} [params.initiateCallToFirstParty] - Indicates whether the call to the first party should be initiated automatically.
     * @param {string} [params.callbackUrl] - The URL to which the callback for the masking session will be sent.
     * @param {string} [params.callbackMethod] - The HTTP method for the callback request.
     * @param {number} [params.ringTimeout] - The duration in seconds for which the call will ring before being canceled.
     * @param {string} [params.firstPartyPlayUrl] - The URL to play audio to the first party when the call is established.
     * @param {string} [params.secondPartyPlayUrl] - The URL to play audio to the second party when the call is established.
     * @param {string} [params.recordingCallbackMethod] - The HTTP method for the recording callback request.
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    createMaskingSession(firstParty, secondParty, params = {}) {
        let errors = validate([{
                field: 'first_party',
                value: firstParty,
                validators: ['isRequired']
            },
            {
                field: 'second_party',
                value: secondParty,
                validators: ['isRequired']
            }
        ]);        
        params.firstParty = firstParty;
        params.secondParty = secondParty
        params.isVoiceRequest = 'true';

        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', 'Masking/Session/', params)
                .then(response => {
                    resolve(new CreateMaskingSessionResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

	/**
	 * Update a masking session
	 * @method
	 * @param {string} sessionUuid - unique idenfier of a session
	 * @param {object} params - optional params to update a session
	 * @param {number} [params.sessionExpiry] - The duration in seconds for which the masking session will be active.
	 * @param {number} [params.callTimeLimit] - The maximum duration in seconds for each call in the masking session.
	 * @param {boolean} [params.record] - Indicates whether the calls in the masking session should be recorded.
	 * @param {string} [params.recordFileFormat] - The file format for the recorded calls.
	 * @param {string} [params.recordingCallbackUrl] - The URL to which the recording callback will be sent.
	 * @param {string} [params.callbackUrl] - The URL to which the callback for the masking session will be sent.
	 * @param {string} [params.callbackMethod] - The HTTP method for the callback request.
	 * @param {number} [params.ringTimeout] - The duration in seconds for which the call will ring before being canceled.
	 * @param {string} [params.firstPartyPlayUrl] - The URL to play audio to the first party when the call is established.
	 * @param {string} [params.secondPartyPlayUrl] - The URL to play audio to the second party when the call is established.
	 * @param {string} [params.recordingCallbackMethod] - The HTTP method for the recording callback request.
	 * @returns {Promise<PlivoGenericResponse>} - Resolves to a PlivoGenericResponse object
	 * @throws {Error} - Throws an error if the update masking session request fails
	 */
    updateMaskingSession(sessionUuid, params = {}) {
        let errors = validate([{
                field: 'session_uuid',
                value: sessionUuid,
                validators: ['isRequired']
            }
        ]);        
        params.sessionUuid = sessionUuid;
        params.isVoiceRequest = 'true';

        if (errors) {
            return errors;
        }
        return new Call(this[clientKey], {
                id: sessionUuid,
            }).updateMaskingSession(params);
    }
 	/**
	 * List masking sessions with optional filters
	 * @method
	 * @param {object} filterParams - Optional filter parameters to list masking sessions
	 * @param {string} [filterParams.firstParty] - The phone number or SIP endpoint of the first party.
	 * @param {string} [filterParams.secondParty] - The phone number or SIP endpoint of the second party.
	 * @param {string} [filterParams.virtualNumber] - The virtual number associated with the masking session.
	 * @param {string} [filterParams.status] - The status of the masking session.
	 * @param {string} [filterParams.createdTimeEquals] - The specific created time to filter sessions.
	 * @param {string} [filterParams.createdTimeLessThan] - Filter sessions created before this time.
	 * @param {string} [filterParams.createdTimeGreaterThan] - Filter sessions created after this time.
	 * @param {string} [filterParams.createdTimeLessOrEqual] - Filter sessions created before or at this time.
	 * @param {string} [filterParams.createdTimeGreaterOrEqual] - Filter sessions created after or at this time.
	 * @param {string} [filterParams.expiryTimeEquals] - The specific expiry time to filter sessions.
	 * @param {string} [filterParams.expiryTimeLessThan] - Filter sessions expiring before this time.
	 * @param {string} [filterParams.expiryTimeGreaterThan] - Filter sessions expiring after this time.
	 * @param {string} [filterParams.expiryTimeLessOrEqual] - Filter sessions expiring before or at this time.
	 * @param {string} [filterParams.expiryTimeGreaterOrEqual] - Filter sessions expiring after or at this time.
	 * @param {number} [filterParams.durationEquals] - The duration in seconds to filter sessions.
	 * @param {number} [filterParams.durationLessThan] - Filter sessions with duration less than this value.
	 * @param {number} [filterParams.durationGreaterThan] - Filter sessions with duration greater than this value.
	 * @param {number} [filterParams.durationLessOrEqual] - Filter sessions with duration less than or equal to this value.
	 * @param {number} [filterParams.durationGreaterOrEqual] - Filter sessions with duration greater than or equal to this value.
	 * @param {number} [filterParams.limit] - The maximum number of sessions to retrieve.
	 * @param {number} [filterParams.offset] - The offset for paginated results.
	 * @returns {Promise<PlivoGenericResponse>} - Resolves to a PlivoGenericResponse object
	 * @throws {Error} - Throws an error if the list masking sessions request fails
	 */
    listMaskingSession(params) {
        let client = this[clientKey];
        if (params === undefined) {
            params = {}
        }
        params.isVoiceRequest = 'true';
        return new Promise(function (resolve, reject) {
            client('GET', 'Masking/Session/', params).then(function (response) {
                resolve(new ListMaskingSessionResponse(response.body, idField));
            }).catch(function (error) {
                reject(error);
            });
        });
    }
	/**
     * Get a masking session
     * @method
	 * @param {string} sessionUuid - unique idenfier of a session
	 * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */    
    getMaskingSession(sessionUuid){
        let errors = validate([{
            field: 'sessionUuid',
            value: sessionUuid,
            validators: ['isRequired']
        }
        ]);
        if (errors) {
            return errors;
        }
        return new Call(this[clientKey], {
                id: sessionUuid,
            }).getMaskingSession();
    }
    /**
     * Delete a masking session
     * @method
	 * @param {string} sessionUuid - unique idenfier of a session
	 * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */    
    deleteMaskingSession(sessionUuid){
        let errors = validate([{
            field: 'sessionUuid',
            value: sessionUuid,
            validators: ['isRequired']
        }
        ]);
        if (errors) {
            return errors;
        }
        return new Call(this[clientKey], {
                id: sessionUuid,
            }).deleteMaskingSession();
    }
    /**
     * Hangup A Specific Call
     * @method
     * @param {string} callUUID - call uuid to hangup call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    hangup(callUUID) {
        let errors = validate([{
            field: 'call_uuid',
            value: callUUID,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }
        return new Call(this[clientKey], {
            id: callUUID
        }).hangup();
    }
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
    transfer(callUUID, params) {
        let errors = validate([{
            field: 'call_uuid',
            value: callUUID,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }
        return new Call(this[clientKey], {
            id: callUUID
        }).transfer(params, callUUID);
    }

    /**
     * Start a Stream over a Call
     * @method
     * @param {string} serviceUrl - Wss url over which data packets will be send.
     * @param {string} callUuid - For this callUuid audio streaming will start.
     * @param {object} params - optional params to start a stream
     * @param {string} [params.bidirectional] Specifies if the audio being streamed over web-sockets is oneway (read only for the wss service) only or bidirectional (the wss service can read as well as write audio back).
     * @param {string} [params.audioTrack] The audio track (inbound or outbound) of the underlying call which Plivo will fork and stream to the wss service. Inbound [default], outbound, both. Note: only inbound is allowed if bidirectional is true.
     * @param {string} [params.streamTimeout] Maximum duration, in seconds, for which audio will be streamed once streaming starts. At the end of the specified duration, streaming will stop. This will have no impact on the rest of the call flow. Defaults to 86400 (24 hrs).
     * @param {string} [params.statusCallbackUrl] URL that is notified by Plivo when stream is connected, stopped, failed to connect or disconnected. Note: not called when the call gets disconnected.
     * @param {string} [params.statusCallbackMethod] POST[default], GET.
     * @param {string} [params.contentType] Preferred audio codec and sampling rate. Allowed, audio/x-l16;rate=8000 [default], audio/x-l16;rate=16000 and audio/x-mulaw;rate=8000.
     * @param {string} [params.extraHeaders] These are key value pairs which will be passed to the wss service along with your stream. Total length of the string being passed should be less than equal to 512 bytes.
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    stream(callUUID, serviceUrl, optionalParams = {}) {
        let errors = validate([{
            field: 'serviceUrl',
            value: serviceUrl,
            validators: ['isRequired']
        },
        {
            field: 'callUUID',
            value: callUUID,
            validators: ['isRequired']
        }
        ]);

        if (errors) {
            return errors;
        }

        optionalParams.serviceUrl = serviceUrl
        return new Call(this[clientKey], {
            id: callUUID
        }).stream(optionalParams);
    }

    stopStream(callUUID, streamId){
        let errors = validate([{
            field: 'callUUID',
            value: callUUID,
            validators: ['isRequired']
        },
        {
            field: 'streamId',
            value: streamId,
            validators: ['isRequired']
        }
        ]);

        if (errors) {
            return errors;
        }

        return new Call(this[clientKey], {
                id: callUUID,
                secondaryId: streamId
            }).stopStream();
    }

    stopAllStream(callUUID){
        let errors = validate([{
            field: 'callUUID',
            value: callUUID,
            validators: ['isRequired']
        }
        ]);

        if (errors) {
            return errors;
        }

        return new Call(this[clientKey], {
                id: callUUID
            }).stopAllStream();
    }

    getStream(callUUID, streamId){
        let errors = validate([{
            field: 'callUUID',
            value: callUUID,
            validators: ['isRequired']
        },
        {
            field: 'streamId',
            value: streamId,
            validators: ['isRequired']
        }
        ]);

        if (errors) {
            return errors;
        }

        return new Call(this[clientKey], {
                id: callUUID,
                secondaryId: streamId
            }).getStream();
    }

    getAllStream(callUUID){
        let errors = validate([{
            field: 'callUUID',
            value: callUUID,
            validators: ['isRequired']
        }
        ]);

        if (errors) {
            return errors;
        }

        return new Call(this[clientKey], {
                id: callUUID
            }).getAllStream();
    }

    /**
     * Record a Call
     * @method
     * @param {string} callUUID - call uuid to record call
     * @param {object} optionalParams - optional params to record a call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    record(callUUID, optionalParams = {}) {
        let errors = validate([{
            field: 'call_uuid',
            value: callUUID,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }
        return new Call(this[clientKey], {
            id: callUUID
        }).record(optionalParams);
    }

    /**
     * Stop Recording a Call
     * @method
     * @param {string} callUUID - call uuid to stop recording a call
     * @param {object} optionalParams - optional params to stop recording a call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    stopRecording(callUUID, optionalParams= {}) {
        let errors = validate([{
            field: 'call_uuid',
            value: callUUID,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }
        return new Call(this[clientKey], {
            id: callUUID
        }).stopRecording(optionalParams);
    }

    /**
     * Play a music file
     * @method
     * @param {string} callUUID - call uuid to play music file
     * @param {string} url - A single URL or a list of comma separated URLs linking to an mp3 or wav file.
     * @param {object} optionalParams - optional params to play music file.
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    playMusic(callUUID, urls, optionalParams) {
        let errors = validate([{
                field: 'call_uuid',
                value: callUUID,
                validators: ['isRequired']
            },
            {
                field: 'urls',
                value: urls,
                validators: ['isRequired', 'isString']
            }
        ]);

        if (errors) {
            return errors;
        }
        return new Call(this[clientKey], {
            id: callUUID
        }).playMusic(urls, optionalParams);
    }

    /**
     * Stop Playing a music file
     * @method
     * @param {string} callUUID - call uuid to stop plaing music file
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    stopPlayingMusic(callUUID) {
        let errors = validate([{
            field: 'call_uuid',
            value: callUUID,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }
        return new Call(this[clientKey], {
            id: callUUID
        }).stopPlayingMusic();
    }

    /**
     * Speak text during a call
     * @method
     * @param {string} callUUID - call uuid to speak text during a call
     * @param {string} text - text to be played.
     * @param {object} optionalParams - optional params to speak text during a call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    speakText(callUUID, text, optionalParams) {
        let errors = validate([{
                field: 'call_uuid',
                value: callUUID,
                validators: ['isRequired']
            },
            {
                field: 'text',
                value: text,
                validators: ['isRequired', 'isString']
            }
        ]);

        if (errors) {
            return errors;
        }
        return new Call(this[clientKey], {
            id: callUUID
        }).speakText(text, optionalParams);
    }

    /**
     * Stop Speaking text during a call
     * @method
     * @param {string} callUUID - call uuid to stop speaking text during a call
     * @param {object} optionalParams - optional params to stop speaking text during a call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    stopSpeakingText(callUUID) {
        let errors = validate([{
            field: 'call_uuid',
            value: callUUID,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }
        return new Call(this[clientKey], {
            id: callUUID
        }).stopSpeakingText();
    }

    /**
     * Send digits on a call
     * @method
     * @param {string} callUUID - call uuid to send digits on a call
     * @param {number} digits - digits to be send
     * @param {object} optionalParams - optional params to send digits
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    sendDigits(callUUID, digits, optionalParams) {
        let errors = validate([{
                field: 'call_uuid',
                value: callUUID,
                validators: ['isRequired']
            },
            {
                field: 'digits',
                value: digits,
                validators: ['isRequired']
            }
        ]);

        if (errors) {
            return errors;
        }
        return new Call(this[clientKey], {
            id: callUUID
        }).sendDigits(digits, optionalParams);
    }

    /**
     * Hangup a call request
     * @method
     * @param {string} callUUID - call uuid to send digits on a call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
    cancel(id) {
        let errors = validate([{
            field: 'call_uuid',
            value: id,
            validators: ['isRequired']
        }]);

        if (errors) {
            return errors;
        }
        return new Call(this[clientKey], {
            id: id
        }).cancel();
    }

    listLiveCalls(params) {
        return this[liveCallInterfaceKey].list(params);
    }

    getLiveCall(id) {
        return this[liveCallInterfaceKey].get(id);
    }

    listQueuedCalls() {
        return this[queuedCallInterfaceKey].list();
    }

    getQueuedCall(id) {
        return this[queuedCallInterfaceKey].get(id);
    }
}

export class LiveCallResource extends PlivoResource {
    constructor(client, data = {}) {
        super(action, LiveCallResource, idField, client);

        if (idField in data) {
            this.id = data[idField];
        }

        extend(this, data);
        this[clientKey] = client;
    }
}

export class QueuedCallResource extends PlivoResource {
    constructor(client, data = {}) {
        super(action, QueuedCallResource, idField, client);

        if (idField in data) {
            this.id = data[idField];
        }

        extend(this, data);
        this[clientKey] = client;
    }
}

/**
 * Represents a LiveCall interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
class LiveCallInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, LiveCallResource, idField, client);
        extend(this, data);

        this[clientKey] = client;
    }

    /**
     * Get A Live Call Detail
     * @method
     * @param {string} id - call uuid to get information of.
     * @promise {object} returns LiveCallResource Object
     * @fail {Error} returns Error
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
        return new Promise((resolve, reject) => {
            if (action !== '' && !id) {
                reject(new Error(this[idKey] + ' must be set'));
            }
            client('GET', action + id, {
                    isVoiceRequest: 'true', status: 'live'
                })
                .then(response => {
                    resolve(new GetLiveCallResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    //List all Live calls
    list(params) {
        let client = this[clientKey];
        if (params === undefined) {
            params = {}
        }
        params.status = 'live'
        params.isVoiceRequest = 'true';
        return new Promise((resolve, reject) => {
            client('GET', action, params)
                .then(response => {
                    let calls = [];
                    response.body.calls.forEach(callUuid => {
                        calls.push(new LiveCallResource(client, {
                            callUuid: callUuid
                        }));
                    });
                    resolve(calls);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}


/**
 * Represents a QueuedCall interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
class QueuedCallInterface extends PlivoResourceInterface {
    constructor(client, data = {}) {
        super(action, QueuedCallResource, idField, client);
        extend(this, data);

        this[clientKey] = client;
    }

    /**
     * Get A Queued Call Detail
     * @method
     * @param {string} id - call uuid to get information of.
     * @promise {object} returns QueuedCallResource Object
     * @fail {Error} returns Error
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

        return new Promise((resolve, reject) => {
            if (action !== '' && !id) {
                reject(new Error(this[idKey] + ' must be set'));
            }

            client('GET', action + id, {
                    isVoiceRequest: 'true', status: 'queued'
                })
                .then(response => {
                    resolve(new GetQueuedCallResponse(response.body, client));
                })
                .catch(error => {
                    reject(error);
                });
        });


    }

    list() {
        let client = this[clientKey];

        return new Promise((resolve, reject) => {
            client('GET', action, {
                    isVoiceRequest: 'true', status: 'queued'
                })
                .then(response => {
                    let calls = [];
                    response.body.calls.forEach(callUuid => {
                        calls.push(new QueuedCallResource(client, {
                            callUuid: callUuid
                        }));
                    });
                    resolve(calls);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
