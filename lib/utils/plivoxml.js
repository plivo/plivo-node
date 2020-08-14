var qs = require('querystring');
var xmlBuilder = require('xmlbuilder');
var util = require('util');
var plivoUtils = require('./../rest/utils');
import * as Exceptions from './exceptions';
var jsonStringifier = require('./jsonStrinfigier');

export class PlivoXMLError extends Error { }

/**
 * Response element
 * @constructor
 */
export function Response() {
  this.element = 'Response';
  this.nestables = ['Speak', 'Play', 'GetDigits', 'GetInput', 'Record', 'Dial', 'Message',
    'Redirect', 'Wait', 'Hangup', 'PreAnswer', 'Conference', 'DTMF', 'MultiPartyCall'];
  this.valid_attributes = [];
  this.elem = xmlBuilder.begin().ele(this.element);
}

Response.prototype = {
  init: function (name, body, attributes, parent) {
    this.name = name;
    this.body = body;
    this.elem = '';

    if (this.element !== 'Response') {
      this.elem = parent.ele(this.name);
      this.elem.parent = parent;
    } else {
      this.elem = this.elem.ele(this.name);
    }

    if (!attributes) {
      var attributes = {};
    }
    var keys = Object.keys(attributes);

    for (var i = 0; i < keys.length; i++) {
      if (this.valid_attributes.indexOf(keys[i]) === -1) {
        throw new PlivoXMLError('Not a valid attribute : "' + keys[i] + '" for "' + this.name + '" Element');
      }
      this.elem.att(keys[i], attributes[keys[i]])
    }

    if (body) {
      this.elem.text(body)
    }
  },

  add: function (new_element, body, attributes) {
    if (body == null) {
      throw new PlivoXMLError('No text set for ' + new_element.element + '.');
    }

    if (this.nestables.indexOf(new_element.element) > -1) {
      var parent = this.elem;
    } else {
      throw new PlivoXMLError(new_element.element + ' cannot be nested in ' + this.element + '.');
    }
    new_element.init(new_element.element, body, attributes, parent);
    return new_element;
  },

  /**
   * Add a Conference element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {boolean} [attributes.muted]
   * @param {string} [attributes.enterSound]
   * @param {string} [attributes.exitSound]
   * @param {boolean} [attributes.startConferenceOnEnter]
   * @param {boolean} [attributes.endConferenceOnExit]
   * @param {boolean} [attributes.stayAlone]
   * @param {string} [attributes.waitSound]
   * @param {number} [attributes.maxMembers]
   * @param {boolean} [attributes.record]
   * @param {string} [attributes.recordFileFormat]
   * @param {number} [attributes.timeLimit]
   * @param {boolean} [attributes.hangupOnStar]
   * @param {string} [attributes.action]
   * @param {string} [attributes.method]
   * @param {string} [attributes.callbackUrl]
   * @param {string} [attributes.callbackMethod]
   * @param {string} [attributes.digitsMatch]
   * @param {boolean} [attributes.floorEvent]
   * @param {boolean} [attributes.redirect]
   * @param {boolean} [attributes.relayDTMF]
   */
  addConference: function (body, attributes) {
    return this.add(new Conference(Response), body, attributes);
  },

  /**
   * Add a Number element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.sendDigits]
   * @param {boolean} [attributes.sendOnPreanswer]
   */
  addNumber: function (body, attributes) {
    return this.add(new Number(Response), body, attributes);
  },

  /**
   * Add a User element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.sendDigits]
   * @param {boolean} [attributes.sendOnPreanswer]
   * @param {string} [attributes.sipHeaders]
   */
  addUser: function (body, attributes) {
    return this.add(new User(Response), body, attributes);
  },

  /**
   * Add a Dial element
   * @method
   * @param {object} attributes
   * @param {string} [attributes.action]
   * @param {string} [attributes.method]
   * @param {boolean} [attributes.hangupOnStar]
   * @param {number} [attributes.timeLimit]
   * @param {number} [attributes.timeout]
   * @param {string} [attributes.callerID]
   * @param {string} [attributes.callerName]
   * @param {string} [attributes.confirmSound]
   * @param {string} [attributes.confirmKey]
   * @param {string} [attributes.dialMusic]
   * @param {string} [attributes.callbackUrl]
   * @param {string} [attributes.callbackMethod]
   * @param {boolean} [attributes.redirect]
   * @param {string} [attributes.digitsMatch]
   * @param {string} [attributes.digitsMatchBLeg]
   * @param {string} [attributes.sipHeaders]
   */
  addDial: function (attributes) {
    return this.add(new Dial(Response), '', attributes);
  },

  /**
   * Add a GetDigits element
   * @method
   * @param {object} attributes
   * @param {string} [attributes.action]
   * @param {string} [attributes.method]
   * @param {number} [attributes.timeout]
   * @param {number} [attributes.digitTimeout]
   * @param {string} [attributes.finishOnKey]
   * @param {number} [attributes.numDigits]
   * @param {number} [attributes.retries]
   * @param {boolean} [attributes.redirect]
   * @param {boolean} [attributes.playBeep]
   * @param {string} [attributes.validDigits]
   * @param {string} [attributes.invalidDigitsSound]
   * @param {boolean} [attributes.log]
   */
  addGetDigits: function (attributes) {
    return this.add(new GetDigits(Response), '', attributes);
  },

  /**
   * Add a GetInput element
   * @method
   * @param {object} attributes
   * @param {string} [attributes.action]
   * @param {string} [attributes.method]
   * @param {string} [attributes.inputType]
   * @param {number} [attributes.executionTimeout]
   * @param {number} [attributes.digitEndTimeout]
   * @param {number} [attributes.speechEndTimeout]
   * @param {string} [attributes.finishOnKey]
   * @param {number} [attributes.numDigits]
   * @param {string} [attributes.speechModel]
   * @param {string} [attributes.hints]
   * @param {string} [attributes.language]
   * @param {string} [attributes.interimSpeechResultsCallback]
   * @param {string} [attributes.interimSpeechResultsCallbackMethod]
   * @param {boolean} [attributes.log]
   * @param {boolean} [attributes.redirect]
   * @param {string} [attributes.profanityFilter]
   */
  addGetInput: function (attributes) {
    return this.add(new GetInput(Response), '', attributes);
  },

  /**
   * Add a Hangup element
   * @method
   * @param {object} attributes
   * @param {string} [attributes.reason]
   * @param {number} [attributes.schedule]
   */
  addHangup: function (attributes) {
    return this.add(new Hangup(Response), '', attributes);
  },

  /**
   * Add a Message element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.src]
   * @param {string} [attributes.dst]
   * @param {string} [attributes.type]
   * @param {string} [attributes.callbackUrl]
   * @param {string} [attributes.callbackMethod]
   */
  addMessage: function (body, attributes) {
    return this.add(new Message(Response), body, attributes);
  },

  /**
   * Add a Play element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {number} [attributes.loop]
   */
  addPlay: function (body, attributes) {
    return this.add(new Play(Response), body, attributes);
  },

  /**
   * Add a PreAnswer element
   * @method
   */
  addPreAnswer: function () {
    return this.add(new PreAnswer(Response), '', {});
  },

  /**
   * Add a Record element
   * @method
   * @param {object} attributes
   * @param {string} [attributes.action]
   * @param {string} [attributes.method]
   * @param {string} [attributes.fileFormat]
   * @param {boolean} [attributes.redirect]
   * @param {number} [attributes.timeout]
   * @param {number} [attributes.maxLength]
   * @param {boolean} [attributes.playBeep]
   * @param {string} [attributes.finishOnKey]
   * @param {boolean} [attributes.recordSession]
   * @param {boolean} [attributes.startOnDialAnswer]
   * @param {string} [attributes.transcriptionType]
   * @param {string} [attributes.transcriptionUrl]
   * @param {string} [attributes.transcriptionMethod]
   * @param {string} [attributes.callbackUrl]
   * @param {string} [attributes.callbackMethod]
   */
  addRecord: function (attributes) {
    return this.add(new Record(Response), '', attributes);
  },

  /**
   * Add a Redirect element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.method]
   */
  addRedirect: function (body, attributes) {
    return this.add(new Redirect(Response), body, attributes);
  },

  /**
   * Add a Speak element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.voice]
   * @param {string} [attributes.language]
   * @param {number} [attributes.loop]
   */
  addSpeak: function (body, attributes) {

    let validation;
    if (attributes && attributes.voice) {
      validation = plivoUtils.validateSpeakAttributes(body, attributes.voice);
    } else {
      validation = plivoUtils.validateSpeakAttributes(body);
    }
    var item = this;
    if (validation.success == true) {
      var result = item.add(new Speak(Response), body, attributes);
      return result;
    } else {
      throw new Exceptions.PlivoXMLValidationError(validation.msg);
    }
  },

  /**
   * Add a Break element
   * @method
   * @param {object} attributes
   * @param {string} [attributes.strength]
   * @param {string} [attributes.time]
   */
  addBreak: function (attributes) {
    return this.add(new Break(Response), '', attributes);
  },


  /**
   * Add a Emphasis element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.level]
   */
  addEmphasis: function (body, attributes) {
    return this.add(new Emphasis(Response), body, attributes);
  },

  /**
   * Add a Lang element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.xml:lang]
   */
  addLang: function (body, attributes) {
    return this.add(new Lang(Response), body, attributes);
  },

  /**
   * Add a P element
   * @method
   * @param {string} body
   */
  addP: function (body) {
    return this.add(new P(Response), body, {});
  },

  /**
   * Add a Phoneme element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.alphabet]
   * @param {string} [attributes.ph]
   */
  addPhoneme: function (body, attributes) {
    return this.add(new Phoneme(Response), body, attributes);
  },

  /**
   * Add a Prosody element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.pitch]
   * @param {string} [attributes.rate]
   * @param {string} [attributes.volume]
   */
  addProsody: function (body, attributes) {
    return this.add(new Prosody(Response), body, attributes);
  },

  /**
   * Add a S element
   * @method
   * @param {string} body
   */
  addS: function (body) {
    return this.add(new S(Response), body, {});
  },

  /**
   * Add a SayAs element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.interpret-as]
   * @param {string} [attributes.format]
   */
  addSayAs: function (body, attributes) {
    return this.add(new SayAs(Response), body, attributes);
  },

  /**
   * Add a Sub element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.alias]
   */
  addSub: function (body, attributes) {
    return this.add(new Sub(Response), body, attributes);
  },

  /**
   * Add a W element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.role]
   */
  addW: function (body, attributes) {
    return this.add(new W(Response), body, attributes);
  },

  /**
   * Add a body to the element
   * @method
   * @param {string} body
   */
  addText: function (body) {
    return this.elem.txt(body);
  },

  /**
   * Add a Wait element
   * @method
   * @param {object} attributes
   * @param {number} [attributes.length]
   * @param {boolean} [attributes.silence]
   * @param {number} [attributes.minSilence]
   * @param {boolean} [attributes.beep]
   */
  addWait: function (attributes) {
    return this.add(new Wait(Response), '', attributes);
  },

  /**
   * Add a DTMF element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {boolean} [attributes.async]
   */
  addDTMF: function (body, attributes) {
    return this.add(new DTMF(Response), body, attributes);
  },

  /**
   * Add a MultiPartyCall element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.role]
   * @param {number} [attributes.maxDuration]
   * @param {number} [attributes.maxParticipants]
   * @param {string} [attributes.waitMusicMethod]
   * @param {string} [attributes.agentHoldMusicMethod]
   * @param {string} [attributes.customerHoldMusicMethod]
   * @param {boolean} [attributes.record]
   * @param {string} [attributes.recordFileFormat]
   * @param {string} [attributes.recordingCallbackMethod]
   * @param {string} [attributes.statusCallbackEvents]
   * @param {string} [attributes.statusCallbackMethod]
   * @param {boolean} [attributes.stayAlone]
   * @param {boolean} [attributes.coachMode]
   * @param {boolean} [attributes.mute]
   * @param {boolean} [attributes.hold]
   * @param {boolean} [attributes.startMpcOnEnter]
   * @param {boolean} [attributes.endMpcOnExit]
   * @param {string} [attributes.enterSound]
   * @param {string} [attributes.enterSoundMethod]
   * @param {string} [attributes.exitSound]
   * @param {string} [attributes.exitSoundMethod]
   * @param {string} [attributes.onExitActionMethod]
   * @param {boolean} [attributes.relayDTMFInputs]
   * @param {string} [attributes.waitMusicUrl]
   * @param {string} [attributes.agentHoldMusicUrl]
   * @param {string} [attributes.customerHoldMusicUrl]
   * @param {string} [attributes.recordingCallbackUrl]
   * @param {string} [attributes.statusCallbackUrl]
   * @param {string} [attributes.customerHoldMusicUrl]
   */
  addMultiPartyCall: function (body, attributes){
    const VALID_ROLE_VALUES = ['agent', 'supervisor', 'customer']
    const VALID_METHOD_VALUES = ['GET', 'POST']
    const VALID_BOOL_VALUES = [true, false]
    const VALID_RECORD_FILE_FORMAT_VALUES = ['mp3', 'wav']

    if(attributes.role && VALID_ROLE_VALUES.indexOf(attributes.role.toLowerCase())===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.role + 'for role')
    }
    else if (!attributes.role){
      throw new PlivoXMLError('role not mentioned : possible values - Agent / Supervisor / Customer')
    }

    if(attributes.maxDuration && (attributes.maxDuration<300 || attributes.maxDuration>28800)){
      throw new PlivoXMLError('Invalid attribute value' + attributes.maxDuration + 'for maxDuration')
    }
    else if(!attributes.maxDuration){
      attributes.maxDuration = 14400
    }

    if(attributes.maxParticipants && (attributes.maxParticipants<2 || attributes.maxParticipants>10)){
      throw new PlivoXMLError('Invalid attribute value' + attributes.maxParticipants + 'for maxParticipants')
    }
    else if(!attributes.maxParticipants){
      attributes.maxParticipants = 10
    }

    if(attributes.waitMusicMethod && VALID_METHOD_VALUES.indexOf(attributes.waitMusicMethod.toUpperCase())===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.waitMusicMethod + 'for waitMusicMethod')
    }
    else if (!attributes.waitMusicMethod){
      attributes.waitMusicMethod = 'GET'
    }

    if(attributes.agentHoldMusicMethod && VALID_METHOD_VALUES.indexOf(attributes.agentHoldMusicMethod.toUpperCase())===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.agentHoldMusicMethod + 'for agentHoldMusicMethod')
    }
    else if (!attributes.agentHoldMusicMethod){
      attributes.agentHoldMusicMethod = 'GET'
    }

    if(attributes.customerHoldMusicMethod && VALID_METHOD_VALUES.indexOf(attributes.customerHoldMusicMethod.toUpperCase())===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.customerHoldMusicMethod + 'for customerHoldMusicMethod')
    }
    else if (!attributes.customerHoldMusicMethod){
      attributes.customerHoldMusicMethod = 'GET'
    }

    if(attributes.record && VALID_BOOL_VALUES.indexOf(attributes.record)===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.record + 'for record')
    }
    else if (!attributes.record){
      attributes.record = false
    }

    if(attributes.recordFileFormat && VALID_RECORD_FILE_FORMAT_VALUES.indexOf(attributes.recordFileFormat.toLowerCase())===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.recordFileFormat + 'for recordFileFormat')
    }
    else if (!attributes.recordFileFormat){
      attributes.recordFileFormat = 'mp3'
    }

    if(attributes.recordingCallbackMethod && VALID_METHOD_VALUES.indexOf(attributes.recordingCallbackMethod.toUpperCase())===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.recordingCallbackMethod + 'for recordingCallbackMethod')
    }
    else if (!attributes.recordingCallbackMethod){
      attributes.recordingCallbackMethod = 'GET'
    }

    if(attributes.statusCallbackEvents && !plivoUtils.multiValidParam('statusCallbackEvents', attributes.statusCallbackEvents, String, false, ['mpc-state-changes', 'participant-state-changes', 'participant-speak-events', 'participant-digit-input-events', 'add-participant-api-events'], true, ',')){
      throw new PlivoXMLError('Invalid attribute value' + attributes.statusCallbackEvents + 'for statusCallbackEvents')
    }
    else if(!attributes.statusCallbackEvents){
      attributes.statusCallbackEvents = 'mpc-state-changes,participant-state-changes'
    }

    if(attributes.statusCallbackMethod && VALID_METHOD_VALUES.indexOf(attributes.statusCallbackMethod.toUpperCase())===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.statusCallbackMethod + 'for statusCallbackMethod')
    }
    else if (!attributes.statusCallbackMethod){
      attributes.statusCallbackMethod = 'POST'
    }

    if(attributes.stayAlone && VALID_BOOL_VALUES.indexOf(attributes.stayAlone)===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.stayAlone + 'for stayAlone')
    }
    else if (!attributes.stayAlone){
      attributes.stayAlone = false
    }

    if(attributes.coachMode && VALID_BOOL_VALUES.indexOf(attributes.coachMode)===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.coachMode + 'for coachMode')
    }
    else if (!attributes.coachMode){
      attributes.coachMode = true
    }

    if(attributes.mute && VALID_BOOL_VALUES.indexOf(attributes.mute)===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.mute + 'for mute')
    }
    else if (!attributes.mute){
      attributes.mute = false
    }

    if(attributes.hold && VALID_BOOL_VALUES.indexOf(attributes.hold)===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.hold + 'for hold')
    }
    else if (!attributes.hold){
      attributes.hold = false
    }

    if(attributes.startMpcOnEnter && VALID_BOOL_VALUES.indexOf(attributes.startMpcOnEnter)===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.startMpcOnEnter + 'for startMpcOnEnter')
    }
    else if (!attributes.startMpcOnEnter){
      attributes.startMpcOnEnter = true
    }

    if(attributes.endMpcOnExit && VALID_BOOL_VALUES.indexOf(attributes.endMpcOnExit)===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.endMpcOnExit + 'for endMpcOnExit')
    }
    else if (!attributes.endMpcOnExit){
      attributes.endMpcOnExit = false
    }

    if(attributes.enterSound && !plivoUtils.isOneAmongStringUrl('enterSound', attributes.enterSound, false, ['beep:1', 'beep:2', 'none'])){
      throw new PlivoXMLError('Invalid attribute value' + attributes.enterSound + 'for enterSound')
    }
    else if(!attributes.enterSound){
      attributes.enterSound = 'beep:1'
    }

    if(attributes.enterSoundMethod && VALID_METHOD_VALUES.indexOf(attributes.enterSoundMethod.toUpperCase())===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.enterSoundMethod + 'for enterSoundMethod')
    }
    else if (!attributes.enterSoundMethod){
      attributes.enterSoundMethod = 'GET'
    }

    if(attributes.exitSound && !plivoUtils.isOneAmongStringUrl('exitSound', attributes.exitSound, false, ['beep:1', 'beep:2', 'none'])){
      throw new PlivoXMLError('Invalid attribute value' + attributes.exitSound + 'for exitSound')
    }
    else if(!attributes.exitSound){
      attributes.exitSound = 'beep:2'
    }

    if(attributes.exitSoundMethod && VALID_METHOD_VALUES.indexOf(attributes.exitSoundMethod.toUpperCase())===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.exitSoundMethod + 'for exitSoundMethod')
    }
    else if (!attributes.exitSoundMethod){
      attributes.exitSoundMethod = 'GET'
    }

    if(attributes.onExitActionMethod && VALID_METHOD_VALUES.indexOf(attributes.onExitActionMethod.toUpperCase())===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.onExitActionMethod + 'for onExitActionMethod')
    }
    else if (!attributes.onExitActionMethod){
      attributes.onExitActionMethod = 'POST'
    }

    if(attributes.relayDTMFInputs && VALID_BOOL_VALUES.indexOf(attributes.relayDTMFInputs)===-1){
      throw new PlivoXMLError('Invalid attribute value' + attributes.relayDTMFInputs + 'for relayDTMFInputs')
    }
    else if (!attributes.relayDTMFInputs){
      attributes.relayDTMFInputs = false
    }

    if(attributes.waitMusicUrl && !plivoUtils.validUrl('waitMusicUrl', attributes.waitMusicUrl, false)){
      throw new PlivoXMLError('Invalid attribute value' + attributes.waitMusicUrl + 'for waitMusicUrl')
    }

    if(attributes.agentHoldMusicUrl && !plivoUtils.validUrl('agentHoldMusicUrl', attributes.agentHoldMusicUrl, false)){
      throw new PlivoXMLError('Invalid attribute value' + attributes.agentHoldMusicUrl + 'for agentHoldMusicUrl')
    }

    if(attributes.customerHoldMusicUrl && !plivoUtils.validUrl('customerHoldMusicUrl', attributes.customerHoldMusicUrl, false)){
      throw new PlivoXMLError('Invalid attribute value' + attributes.customerHoldMusicUrl + 'for customerHoldMusicUrl')
    }

    if(attributes.recordingCallbackUrl && !plivoUtils.validUrl('recordingCallbackUrl', attributes.recordingCallbackUrl, false)){
      throw new PlivoXMLError('Invalid attribute value' + attributes.recordingCallbackUrl + 'for recordingCallbackUrl')
    }

    if(attributes.statusCallbackUrl && !plivoUtils.validUrl('statusCallbackUrl', attributes.statusCallbackUrl, false)){
      throw new PlivoXMLError('Invalid attribute value' + attributes.statusCallbackUrl + 'for statusCallbackUrl')
    }

    if(attributes.customerHoldMusicUrl && !plivoUtils.validUrl('customerHoldMusicUrl', attributes.customerHoldMusicUrl, false)){
      throw new PlivoXMLError('Invalid attribute value' + attributes.customerHoldMusicUrl + 'for customerHoldMusicUrl')
    }
    return this.add(new MultiPartyCall(Response), body, attributes);
  },

  toXML: function () {
    return this.elem.toString();
  },

  toJSON: jsonStringifier.stringify
};

/**
 * Conference element
 * @constructor
 */
function Conference(Response) {
  this.element = 'Conference';
  this.valid_attributes = ['muted', 'beep', 'startConferenceOnEnter',
    'endConferenceOnExit', 'waitSound', 'enterSound', 'exitSound',
    'timeLimit', 'hangupOnStar', 'maxMembers', 'record', 'recordWhenAlone',
    'recordFileFormat', 'action', 'method', 'redirect',
    'digitsMatch', 'callbackUrl', 'callbackMethod', 'stayAlone',
    'floorEvent', 'transcriptionType', 'transcriptionUrl',
    'transcriptionMethod', 'relayDTMF'];
  this.nestables = [];
}
util.inherits(Conference, Response);

/**
 * Number element
 * @constructor
 */
function Number(Response) {
  this.element = 'Number';
  this.valid_attributes = ['sendDigits', 'sendOnPreanswer', 'sendDigitsMode'];
  this.nestables = [];
}
util.inherits(Number, Response);

/**
 * User element
 * @constructor
 */
function User(Response) {
  this.element = 'User';
  this.nestables = [];
  this.valid_attributes = ['sendDigits', 'sendOnPreanswer', 'sipHeaders'];
}
util.inherits(User, Response);

/**
 * Dial element
 * @constructor
 */
function Dial(Response) {
  this.element = 'Dial';
  this.valid_attributes = ['action', 'method', 'timeout', 'hangupOnStar',
    'timeLimit', 'callerId', 'callerName', 'confirmSound',
    'dialMusic', 'confirmKey', 'redirect', 'callbackUrl',
    'callbackMethod', 'digitsMatch', 'digitsMatchBLeg', 'sipHeaders'];
  this.nestables = ['Number', 'User'];
}
util.inherits(Dial, Response);

/**
 * GetDigits element
 * @constructor
 */
function GetDigits(Response) {
  this.element = 'GetDigits';
  this.valid_attributes = ['action', 'method', 'timeout', 'digitTimeout',
    'finishOnKey', 'numDigits', 'retries', 'invalidDigitsSound',
    'validDigits', 'playBeep', 'redirect', 'log'];
  this.nestables = ['Speak', 'Play', 'Wait'];
}
util.inherits(GetDigits, Response);

/**
 * GetInput element
 * @constructor
 */
function GetInput(Response) {
  this.element = 'GetInput';
  this.valid_attributes = ['action', 'method', 'inputType', 'executionTimeout',
    'digitEndTimeout', 'speechEndTimeout', 'finishOnKey', 'numDigits',
    'speechModel', 'hints','language', 'interimSpeechResultsCallback',
    'interimSpeechResultsCallbackMethod', 'log', 'redirect', 'profanityFilter'];
  this.nestables = ['Speak', 'Play', 'Wait'];
}
util.inherits(GetInput, Response);

/**
 * Hangup element
 * @constructor
 */
function Hangup(Response) {
  this.element = 'Hangup';
  this.valid_attributes = ['schedule', 'reason'];
  this.nestables = [];
}
util.inherits(Hangup, Response);

/**
 * Message element
 * @constructor
 */
function Message(Response) {
  this.element = 'Message';
  this.nestables = [];
  this.valid_attributes = ['src', 'dst', 'type', 'callbackUrl',
    'callbackMethod'];
}
util.inherits(Message, Response);

/**
 * Play element
 * @constructor
 */
function Play(Response) {
  this.element = 'Play';
  this.valid_attributes = ['loop'];
  this.nestables = [];
}
util.inherits(Play, Response);

/**
 * PreAnswer element
 * @constructor
 */
function PreAnswer(Response) {
  this.element = 'PreAnswer';
  this.valid_attributes = [];
  this.nestables = ['Play', 'Speak', 'GetDigits', 'Wait', 'Redirect',
    'Message', 'DTMF'];
}
util.inherits(PreAnswer, Response);

/**
 * Record element
 * @constructor
 */
function Record(Response) {
  this.element = 'Record';
  this.nestables = [];
  this.valid_attributes = ['action', 'method', 'timeout', 'finishOnKey',
    'maxLength', 'playBeep', 'recordSession',
    'startOnDialAnswer', 'redirect', 'fileFormat',
    'callbackUrl', 'callbackMethod', 'transcriptionType',
    'transcriptionUrl', 'transcriptionMethod'];
}
util.inherits(Record, Response);

/**
 * Redirect element
 * @constructor
 */
function Redirect(Response) {
  this.element = 'Redirect';
  this.valid_attributes = ['method'];
  this.nestables = [];
}
util.inherits(Redirect, Response);

/**
 * Speak element
 * @constructor
 */
function Speak(Response) {
  this.element = 'Speak';
  this.valid_attributes = ['voice', 'language', 'loop'];
  this.nestables = ['break', 'emphasis', 'lang', 'p', 'phoneme', 'prosody', 's', 'say-as', 'sub', 'w'];
}
util.inherits(Speak, Response);

/**
 * Break element
 * @constructor
 */
function Break(Response) {
  this.element = 'break';
  this.valid_attributes = ['strength', 'time'];
  this.nestables = [];
}
util.inherits(Break, Response);

/**
 * Emphasis element
 * @constructor
 */
function Emphasis(Response) {
  this.element = 'emphasis';
  this.valid_attributes = ['level'];
  this.nestables = ['break', 'emphasis', 'lang', 'phoneme', 'prosody', 'say-as', 'sub', 'w'];
}
util.inherits(Emphasis, Response);

/**
 * Lang element
 * @constructor
 */
function Lang(Response) {
  this.element = 'lang';
  this.valid_attributes = ['xml:lang'];
  this.nestables = ['break', 'emphasis', 'lang', 'p', 'phoneme', 'prosody', 's', 'say-as', 'sub', 'w'];
}
util.inherits(Lang, Response);

/**
 * P element
 * @constructor
 */
function P(Response) {
  this.element = 'p';
  this.valid_attributes = [];
  this.nestables = ['break', 'emphasis', 'lang', 'prosody', 's', 'say-as', 'sub', 'w'];
}
util.inherits(P, Response);

/**
 * SayAs element
 * @constructor
 */
function Phoneme(Response) {
  this.element = 'phoneme';
  this.valid_attributes = ['alphabet', 'ph'];
  this.nestables = [];
}
util.inherits(Phoneme, Response);

/**
 * Prosody element
 * @constructor
 */
function Prosody(Response) {
  this.element = 'prosody';
  this.valid_attributes = ['pitch', 'rate', 'volume'];
  this.nestables = ['break', 'emphasis', 'lang', 'p', 'phoneme', 'prosody', 's', 'say-as', 'sub', 'w'];
}
util.inherits(Prosody, Response);

/**
 * S element
 * @constructor
 */
function S(Response) {
  this.element = 's';
  this.valid_attributes = [];
  this.nestables = ['break', 'emphasis', 'lang', 'phoneme', 'prosody', 'say-as', 'sub', 'w'];
}
util.inherits(S, Response);

/**
 * SayAs element
 * @constructor
 */
function SayAs(Response) {
  this.element = 'say-as';
  this.valid_attributes = ['interpret-as', 'format'];
  this.nestables = [];
}
util.inherits(SayAs, Response);

/**
 * Sub element
 * @constructor
 */
function Sub(Response) {
  this.element = 'sub';
  this.valid_attributes = ['alias'];
  this.nestables = [];
}
util.inherits(Sub, Response);

/**
 * W element
 * @constructor
 */
function W(Response) {
  this.element = 'w';
  this.valid_attributes = ['role'];
  this.nestables = ['break', 'emphasis', 'phoneme', 'prosody', 'say-as', 'sub'];
}
util.inherits(W, Response);

/**
 * Wait element
 * @constructor
 */
function Wait(Response) {
  this.element = 'Wait';
  this.valid_attributes = ['length', 'silence', 'min_silence', 'minSilence', 'beep'];
  this.nestables = [];
}
util.inherits(Wait, Response);

/**
 * DTMF element
 * @constructor
 */
function DTMF(Response) {
  this.element = 'DTMF';
  this.nestables = [];
  this.valid_attributes = ['digits', 'async'];
}

util.inherits(DTMF, Response);

/**
 * MultiPartyCall element
 * @constructor
 */
function MultiPartyCall(Response){
  this.element = 'MultiPartyCall';
  this.nestables = [];
  this.valid_attributes = ['role', 'maxDuration', 'maxParticipants', 'waitMusicUrl',
    'waitMusicMethod', 'agentHoldMusicUrl', 'agentHoldMusicMethod',
    'customerHoldMusicUrl', 'customerHoldMusicMethod', 'record',
    'recordFileFormat', 'recordingCallbackUrl', 'recordingCallbackMethod',
    'statusCallbackEvents', 'statusCallbackUrl', 'statusCallbackMethod',
    'stayAlone', 'coachMode', 'mute', 'hold', 'startMpcOnEnter', 'endMpcOnExit',
    'enterSound', 'enterSoundMethod', 'exitSound', 'exitSoundMethod',
    'onExitActionUrl', 'onExitActionMethod', 'relayDTMFInputs'];
}
util.inherits(MultiPartyCall, Response);
