
import {extend, validate} from '../utils/common.js';
import {PlivoResource, PlivoResourceInterface} from '../base';
import * as _ from "lodash";

const clientKey = Symbol();
const action = 'Call/';
const idField = 'callUuid';

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
    return super.delete();
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
  transfer(params) {
    return super.update(params);
  }
/**
 * record call
 * @method
 * @param {object} params - to record call
 * @promise {object} return PlivoGenericResponse Object
 * @fail {Error} return Error
 */
  record(params) {
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
    return super.executeAction(this.id + '/Record/', 'POST', params);
  }
/**
 * stop recording call
 * @method
 * @param {object} params - to stop recording call
 * @promise {object} return PlivoGenericResponse Object
 * @fail {Error} return Error
 */
  stopRecording(params) {
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

    let errors = validate([
      {field: 'urls', value: urls, validators: ['isRequired', 'isString']}
    ]);

    if (errors) {
      return errors;
    }
    return super.executeAction(this.id + '/Play/', 'POST', params);
  }

/**
 * stop playing music for call
 * @method
 * @promise {object} returns PlivoGenericResponse Object
 * @fail {Error} returns Error
 */
  stopPlayingMusic() {
    return super.executeAction(this.id + '/Play/', 'DELETE');
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
    let errors = validate([{field: 'text', value: text, validators: ['isRequired', 'isString']}]);

    if (errors) {
      return errors;
    }

    let params = optionalParams || {};
    params.text = text;

    return super.executeAction(this.id + '/Speak/', 'POST', params);
  }

/**
 * stop speaking text for call
 * @method
 * @promise {object} returns PlivoGenericResponse Object
 * @fail {Error} returns Error
 */
  stopSpeakingText() {
    return super.executeAction(this.id + '/Speak/', 'DELETE');
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
    let errors = validate([{field: 'digits', value: digits, validators: ['isRequired']}]);

    if (errors) {
      return errors;
    }

    let params = optionalParams || {};
    params.digits = digits;

    return super.executeAction(this.id + '/DTMF/', 'POST', params);
  }

/**
 * Hangup a Call Request
 * @method
 * @promise {object} returns PlivoGenericResponse Object
 * @fail {Error} returns Error
 */
  cancel() {
    return super.executeAction('Request/' + this.id + '/', 'DELETE', {}, '');
  }
}

const liveCallInterfaceKey = Symbol('liveCallInterface');

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
  }

/**
 * Get A Call Detail
 * @method
 * @param {string} id - call uuid to get information of.
 * @promise {object} returns Call Object
 * @fail {Error} returns Error
 */
  get(id) {
    let errors = validate([{field: 'id', value: id, validators: ['isRequired']}]);

    if (errors) {
      return errors;
    }
    return super.get(id);
  }

/**
 * Get All Call Detail
 * @method
 * @param {object} params - params to get all call details.
 * @promise {object[]} returns list of Call Object
 * @fail {Error} returns Error
 */
  list(params) {
    return super.list(params);
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
    let errors = validate([
      {field: 'from', value: from, validators: ['isRequired']},
      {field: 'to', value: to, validators: ['isRequired']},
      {field: 'answer_url', value: answerUrl, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    params.from = from;
    params.to = _.isArray(to) ? _.join(to, '<') : to;
    params.answer_url = answerUrl;

    return super.create(params);
  }

/**
 * Hangup A Specific Call
 * @method
 * @param {string} callUUID - call uuid to hangup call
 * @promise {object} returns PlivoGenericResponse Object
 * @fail {Error} returns Error
 */
  hangup(callUUID) {
    let errors = validate([
      {field: 'call_uuid', value: callUUID, validators: ['isRequired']}
    ]);

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
    let errors = validate([
      {field: 'call_uuid', value: callUUID, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Call(this[clientKey], {
      id: callUUID
    }).transfer(params);
  }

/**
 * Record a Call
 * @method
 * @param {string} callUUID - call uuid to record call
 * @param {object} optionalParams - optional params to record a call
 * @promise {object} returns PlivoGenericResponse Object
 * @fail {Error} returns Error
 */
  record(callUUID, optionalParams) {
    let errors = validate([
      {field: 'call_uuid', value: callUUID, validators: ['isRequired']}
    ]);

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
  stopRecording(callUUID, optionalParams) {
    let errors = validate([
      {field: 'call_uuid', value: callUUID, validators: ['isRequired']}
    ]);

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
    let errors = validate([
      {field: 'call_uuid', value: callUUID, validators: ['isRequired']},
      {field: 'urls', value: urls, validators: ['isRequired', 'isString']}
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
    let errors = validate([
      {field: 'call_uuid', value: callUUID, validators: ['isRequired']}
    ]);

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
    let errors = validate([
      {field: 'call_uuid', value: callUUID, validators: ['isRequired']},
      {field: 'text', value: text, validators: ['isRequired', 'isString']}
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
    let errors = validate([
      {field: 'call_uuid', value: callUUID, validators: ['isRequired']}
    ]);

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
    let errors = validate([
      {field: 'call_uuid', value: callUUID, validators: ['isRequired']},
      {field: 'digits', value: digits, validators: ['isRequired']}
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
    let errors = validate([
      {field: 'call_uuid', value: id, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Call(this[clientKey], {
      id: id
    }).cancel();
  }

  listLiveCalls() {
    return this[liveCallInterfaceKey].list();
  }

  getLiveCall(id) {
    return this[liveCallInterfaceKey].get(id);
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
    let errors = validate([{field: 'id', value: id, validators: ['isRequired']}]);

    if (errors) {
      return errors;
    }
    return super.get(id, {
      status: 'live',
    });
  }

  list() {
    let client = this[clientKey];

    return new Promise((resolve, reject) => {
      client('GET', action, {status: 'live'})
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
