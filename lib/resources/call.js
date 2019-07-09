'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueuedCallResource = exports.LiveCallResource = exports.CallInterface = exports.Call = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _common = require('../utils/common.js');

var _base = require('../base');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var clientKey = Symbol();
var action = 'Call/';
var idField = 'callUuid';

/**
 * Represents a Call
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

var Call = exports.Call = function (_PlivoResource) {
  _inherits(Call, _PlivoResource);

  function Call(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Call);

    var _this = _possibleConstructorReturn(this, (Call.__proto__ || Object.getPrototypeOf(Call)).call(this, action, Call, idField, client));

    // if (idField in data) {
    //    _this.id = data[idField];
    // }

    (0, _common.extend)(_this, data);
    _this[clientKey] = client;
    return _this;
  }

  /**
   * hangup call
   * @method
   * @promise {Boolean} return true if call hung up
   * @fail {Error} return Error
   */


  _createClass(Call, [{
    key: 'hangup',
    value: function hangup() {
      return _get(Call.prototype.__proto__ || Object.getPrototypeOf(Call.prototype), 'delete', this).call(this);
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

  }, {
    key: 'transfer',
    value: function transfer(params) {
      return _get(Call.prototype.__proto__ || Object.getPrototypeOf(Call.prototype), 'update', this).call(this, params);
    }
    /**
     * record call
     * @method
     * @param {object} params - to record call
     * @promise {object} return PlivoGenericResponse Object
     * @fail {Error} return Error
     */

  }, {
    key: 'record',
    value: function record(params) {
      return this.startRecording(params);
    }

    /**
     * record call
     * @method
     * @param {object} params - to record call
     * @promise {object} return PlivoGenericResponse Object
     * @fail {Error} return Error
     */

  }, {
    key: 'startRecording',
    value: function startRecording(params) {
      return _get(Call.prototype.__proto__ || Object.getPrototypeOf(Call.prototype), 'executeAction', this).call(this, this.id + '/Record/', 'POST', params);
    }
    /**
     * stop recording call
     * @method
     * @param {object} params - to stop recording call
     * @promise {object} return PlivoGenericResponse Object
     * @fail {Error} return Error
     */

  }, {
    key: 'stopRecording',
    value: function stopRecording(params) {
      return _get(Call.prototype.__proto__ || Object.getPrototypeOf(Call.prototype), 'executeAction', this).call(this, this.id + '/Record/', 'DELETE', params);
    }

    /**
     * play music for call
     * @method
     * @param {string} url - url which contains audio to play for call
     * @param {object} optionalParams - to stop recording call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */

  }, {
    key: 'playMusic',
    value: function playMusic(url, optionalParams) {
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

  }, {
    key: 'startPlayingMusic',
    value: function startPlayingMusic(urls, optionalParams) {
      var params = optionalParams || {};
      params.urls = urls;

      var errors = (0, _common.validate)([{ field: 'urls', value: urls, validators: ['isRequired', 'isString'] }]);

      if (errors) {
        return errors;
      }
      return _get(Call.prototype.__proto__ || Object.getPrototypeOf(Call.prototype), 'executeAction', this).call(this, this.id + '/Play/', 'POST', params);
    }

    /**
     * stop playing music for call
     * @method
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */

  }, {
    key: 'stopPlayingMusic',
    value: function stopPlayingMusic() {
      return _get(Call.prototype.__proto__ || Object.getPrototypeOf(Call.prototype), 'executeAction', this).call(this, this.id + '/Play/', 'DELETE');
    }

    /**
     * speak text for call
     * @method
     * @param {string} text - text to speak for call
     * @param {object} optionalParams - to speak for call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */

  }, {
    key: 'speakText',
    value: function speakText(text, optionalParams) {
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

  }, {
    key: 'startSpeakingText',
    value: function startSpeakingText(text, optionalParams) {
      var errors = (0, _common.validate)([{ field: 'text', value: text, validators: ['isRequired', 'isString'] }]);

      if (errors) {
        return errors;
      }

      var params = optionalParams || {};
      params.text = text;

      return _get(Call.prototype.__proto__ || Object.getPrototypeOf(Call.prototype), 'executeAction', this).call(this, this.id + '/Speak/', 'POST', params);
    }

    /**
     * stop speaking text for call
     * @method
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */

  }, {
    key: 'stopSpeakingText',
    value: function stopSpeakingText() {
      return _get(Call.prototype.__proto__ || Object.getPrototypeOf(Call.prototype), 'executeAction', this).call(this, this.id + '/Speak/', 'DELETE');
    }

    /**
     * Send digits on a call
     * @method
     * @param {number} digits - digits to be send
     * @param {object} optionalParams - to send digits for call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */

  }, {
    key: 'sendDigits',
    value: function sendDigits(digits, optionalParams) {
      var errors = (0, _common.validate)([{ field: 'digits', value: digits, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }

      var params = optionalParams || {};
      params.digits = digits;

      return _get(Call.prototype.__proto__ || Object.getPrototypeOf(Call.prototype), 'executeAction', this).call(this, this.id + '/DTMF/', 'POST', params);
    }

    /**
     * Hangup a Call Request
     * @method
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */

  }, {
    key: 'cancel',
    value: function cancel() {
      return _get(Call.prototype.__proto__ || Object.getPrototypeOf(Call.prototype), 'executeAction', this).call(this, 'Request/' + this.id + '/', 'DELETE', {}, '');
    }
  }]);

  return Call;
}(_base.PlivoResource);

var liveCallInterfaceKey = Symbol('liveCallInterface');
var queuedCallInterfaceKey = Symbol('queuedCallInterface');

/**
 * Represents a Call Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

var CallInterface = exports.CallInterface = function (_PlivoResourceInterfa) {
  _inherits(CallInterface, _PlivoResourceInterfa);

  function CallInterface(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CallInterface);

    var _this2 = _possibleConstructorReturn(this, (CallInterface.__proto__ || Object.getPrototypeOf(CallInterface)).call(this, action, Call, idField, client));

    (0, _common.extend)(_this2, data);

    _this2[clientKey] = client;
    _this2[liveCallInterfaceKey] = new LiveCallInterface(client);
    _this2[queuedCallInterfaceKey] = new QueuedCallInterface(client);
    return _this2;
  }

  /**
   * Get A Call Detail
   * @method
   * @param {string} id - call uuid to get information of.
   * @promise {object} returns Call Object
   * @fail {Error} returns Error
   */


  _createClass(CallInterface, [{
    key: 'get',
    value: function get(id) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return _get(CallInterface.prototype.__proto__ || Object.getPrototypeOf(CallInterface.prototype), 'get', this).call(this, id);
    }

    /**
     * Get All Call Detail
     * @method
     * @param {object} params - params to get all call details.
     * @promise {object[]} returns list of Call Object
     * @fail {Error} returns Error
     */

  }, {
    key: 'list',
    value: function list(params) {
      return _get(CallInterface.prototype.__proto__ || Object.getPrototypeOf(CallInterface.prototype), 'list', this).call(this, params);
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

  }, {
    key: 'create',
    value: function create(from, to, answerUrl) {
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var errors = (0, _common.validate)([{ field: 'from', value: from, validators: ['isRequired'] }, { field: 'to', value: to, validators: ['isRequired'] }, { field: 'answer_url', value: answerUrl, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      params.from = from;
      params.to = _.isArray(to) ? _.join(to, '<') : to;
      params.answer_url = answerUrl;

      return _get(CallInterface.prototype.__proto__ || Object.getPrototypeOf(CallInterface.prototype), 'create', this).call(this, params);
    }

    /**
     * Hangup A Specific Call
     * @method
     * @param {string} callUUID - call uuid to hangup call
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */

  }, {
    key: 'hangup',
    value: function hangup(callUUID) {
      var errors = (0, _common.validate)([{ field: 'call_uuid', value: callUUID, validators: ['isRequired'] }]);

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

  }, {
    key: 'transfer',
    value: function transfer(callUUID, params) {
      var errors = (0, _common.validate)([{ field: 'call_uuid', value: callUUID, validators: ['isRequired'] }]);

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

  }, {
    key: 'record',
    value: function record(callUUID, optionalParams) {
      var errors = (0, _common.validate)([{ field: 'call_uuid', value: callUUID, validators: ['isRequired'] }]);

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

  }, {
    key: 'stopRecording',
    value: function stopRecording(callUUID, optionalParams) {
      var errors = (0, _common.validate)([{ field: 'call_uuid', value: callUUID, validators: ['isRequired'] }]);

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

  }, {
    key: 'playMusic',
    value: function playMusic(callUUID, urls, optionalParams) {
      var errors = (0, _common.validate)([{ field: 'call_uuid', value: callUUID, validators: ['isRequired'] }, { field: 'urls', value: urls, validators: ['isRequired', 'isString'] }]);

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

  }, {
    key: 'stopPlayingMusic',
    value: function stopPlayingMusic(callUUID) {
      var errors = (0, _common.validate)([{ field: 'call_uuid', value: callUUID, validators: ['isRequired'] }]);

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

  }, {
    key: 'speakText',
    value: function speakText(callUUID, text, optionalParams) {
      var errors = (0, _common.validate)([{ field: 'call_uuid', value: callUUID, validators: ['isRequired'] }, { field: 'text', value: text, validators: ['isRequired', 'isString'] }]);

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

  }, {
    key: 'stopSpeakingText',
    value: function stopSpeakingText(callUUID) {
      var errors = (0, _common.validate)([{ field: 'call_uuid', value: callUUID, validators: ['isRequired'] }]);

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

  }, {
    key: 'sendDigits',
    value: function sendDigits(callUUID, digits, optionalParams) {
      var errors = (0, _common.validate)([{ field: 'call_uuid', value: callUUID, validators: ['isRequired'] }, { field: 'digits', value: digits, validators: ['isRequired'] }]);

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

  }, {
    key: 'cancel',
    value: function cancel(id) {
      var errors = (0, _common.validate)([{ field: 'call_uuid', value: id, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Call(this[clientKey], {
        id: id
      }).cancel();
    }
  }, {
    key: 'listLiveCalls',
    value: function listLiveCalls(params) {
      return this[liveCallInterfaceKey].list(params);
    }
  }, {
    key: 'getLiveCall',
    value: function getLiveCall(id) {
      return this[liveCallInterfaceKey].get(id);
    }
  }, {
    key: 'listQueuedCalls',
    value: function listQueuedCalls() {
      return this[queuedCallInterfaceKey].list();
    }
  }, {
    key: 'getQueuedCall',
    value: function getQueuedCall(id) {
      return this[queuedCallInterfaceKey].get(id);
    }
  }]);

  return CallInterface;
}(_base.PlivoResourceInterface);

var LiveCallResource = exports.LiveCallResource = function (_PlivoResource2) {
  _inherits(LiveCallResource, _PlivoResource2);

  function LiveCallResource(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, LiveCallResource);

    var _this3 = _possibleConstructorReturn(this, (LiveCallResource.__proto__ || Object.getPrototypeOf(LiveCallResource)).call(this, action, LiveCallResource, idField, client));

    // if (idField in data) {
    //   _this3.id = data[idField];
    // }

    (0, _common.extend)(_this3, data);
    _this3[clientKey] = client;
    return _this3;
  }

  return LiveCallResource;
}(_base.PlivoResource);

var QueuedCallResource = exports.QueuedCallResource = function (_PlivoResource3) {
  _inherits(QueuedCallResource, _PlivoResource3);

  function QueuedCallResource(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, QueuedCallResource);

    var _this4 = _possibleConstructorReturn(this, (QueuedCallResource.__proto__ || Object.getPrototypeOf(QueuedCallResource)).call(this, action, QueuedCallResource, idField, client));

    // if (idField in data) {
    //   _this4.id = data[idField];
    // }

    (0, _common.extend)(_this4, data);
    _this4[clientKey] = client;
    return _this4;
  }

  return QueuedCallResource;
}(_base.PlivoResource);

/**
 * Represents a LiveCall interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */


var LiveCallInterface = function (_PlivoResourceInterfa2) {
  _inherits(LiveCallInterface, _PlivoResourceInterfa2);

  function LiveCallInterface(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, LiveCallInterface);

    var _this5 = _possibleConstructorReturn(this, (LiveCallInterface.__proto__ || Object.getPrototypeOf(LiveCallInterface)).call(this, action, LiveCallResource, idField, client));

    (0, _common.extend)(_this5, data);

    _this5[clientKey] = client;
    return _this5;
  }

  /**
   * Get A Live Call Detail
   * @method
   * @param {string} id - call uuid to get information of.
   * @promise {object} returns LiveCallResource Object
   * @fail {Error} returns Error
   */


  _createClass(LiveCallInterface, [{
    key: 'get',
    value: function get(id) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return _get(LiveCallInterface.prototype.__proto__ || Object.getPrototypeOf(LiveCallInterface.prototype), 'get', this).call(this, id, {
        status: 'live'
      });
    }
  }, {
    key: 'list',
    value: function list(params) {
      var client = this[clientKey];
      if (params === undefined) {
        params = {};
      }
      params.status = 'live';

      return new Promise(function (resolve, reject) {
        client('GET', action, params).then(function (response) {
          var calls = [];
          response.body.calls.forEach(function (callUuid) {
            calls.push(new LiveCallResource(client, {
              callUuid: callUuid
            }));
          });
          resolve(calls);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }]);

  return LiveCallInterface;
}(_base.PlivoResourceInterface);

/**
 * Represents a QueuedCall interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */


var QueuedCallInterface = function (_PlivoResourceInterfa3) {
  _inherits(QueuedCallInterface, _PlivoResourceInterfa3);

  function QueuedCallInterface(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, QueuedCallInterface);

    var _this6 = _possibleConstructorReturn(this, (QueuedCallInterface.__proto__ || Object.getPrototypeOf(QueuedCallInterface)).call(this, action, QueuedCallResource, idField, client));

    (0, _common.extend)(_this6, data);

    _this6[clientKey] = client;
    return _this6;
  }

  /**
   * Get A Queued Call Detail
   * @method
   * @param {string} id - call uuid to get information of.
   * @promise {object} returns QueuedCallResource Object
   * @fail {Error} returns Error
   */


  _createClass(QueuedCallInterface, [{
    key: 'get',
    value: function get(id) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return _get(QueuedCallInterface.prototype.__proto__ || Object.getPrototypeOf(QueuedCallInterface.prototype), 'get', this).call(this, id, {
        status: 'queued'
      });
    }
  }, {
    key: 'list',
    value: function list() {
      var client = this[clientKey];

      return new Promise(function (resolve, reject) {
        client('GET', action, { status: 'queued' }).then(function (response) {
          var calls = [];
          response.body.calls.forEach(function (callUuid) {
            calls.push(new QueuedCallResource(client, {
              callUuid: callUuid
            }));
          });
          resolve(calls);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }]);

  return QueuedCallInterface;
}(_base.PlivoResourceInterface);