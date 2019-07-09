'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConferenceInterface = exports.Conference = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _common = require('../utils/common.js');

var _base = require('../base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var clientKey = Symbol();
var action = 'Conference/';
var idField = 'conferenceName';

/**
 * Represents a Conference
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

var Conference = exports.Conference = function (_PlivoResource) {
  _inherits(Conference, _PlivoResource);

  function Conference(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Conference);

    var _this = _possibleConstructorReturn(this, (Conference.__proto__ || Object.getPrototypeOf(Conference)).call(this, action, Conference, idField, client));

    // if (idField in data) {
    //   _this.id = data[idField];
    // }

    (0, _common.extend)(_this, data);
    _this[clientKey] = client;
    return _this;
  }

  /**
   * hangup conference
   * @method
   * @promise {Boolean} return true if call hung up
   * @fail {Error} return Error
   */


  _createClass(Conference, [{
    key: 'hangup',
    value: function hangup() {
      return _get(Conference.prototype.__proto__ || Object.getPrototypeOf(Conference.prototype), 'delete', this).call(this);
    }

    /**
     * hangup member from conference
     * @method
     * @param {string} memberId - id of member to be hangup
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'hangupMember',
    value: function hangupMember(memberId) {
      var errors = (0, _common.validate)([{ field: 'member_id', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return _get(Conference.prototype.__proto__ || Object.getPrototypeOf(Conference.prototype), 'executeAction', this).call(this, this.id + '/Member/' + memberId + '/', 'DELETE');
    }

    /**
     * kick member from conference
     * @method
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'kickMember',
    value: function kickMember(memberId) {
      var errors = (0, _common.validate)([{ field: 'member_id', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }

      return _get(Conference.prototype.__proto__ || Object.getPrototypeOf(Conference.prototype), 'executeAction', this).call(this, this.id + '/Member/' + memberId + '/Kick/', 'POST');
    }

    /**
     * mute member from conference
     * @method
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'muteMember',
    value: function muteMember(memberId) {
      var errors = (0, _common.validate)([{ field: 'member_id', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return _get(Conference.prototype.__proto__ || Object.getPrototypeOf(Conference.prototype), 'executeAction', this).call(this, this.id + '/Member/' + memberId + '/Mute/', 'POST');
    }

    /**
     * unmute member from conference
     * @method
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'unmuteMember',
    value: function unmuteMember(memberId) {
      var errors = (0, _common.validate)([{ field: 'member_id', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }

      return _get(Conference.prototype.__proto__ || Object.getPrototypeOf(Conference.prototype), 'executeAction', this).call(this, this.id + '/Member/' + memberId + '/Mute/', 'DELETE');
    }

    /**
     * deaf member from conference
     * @method
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'deafMember',
    value: function deafMember(memberId) {
      var errors = (0, _common.validate)([{ field: 'member_id', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return _get(Conference.prototype.__proto__ || Object.getPrototypeOf(Conference.prototype), 'executeAction', this).call(this, this.id + '/Member/' + memberId + '/Deaf/', 'POST');
    }

    /**
     * undeaf member from conference
     * @method
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'undeafMember',
    value: function undeafMember(memberId) {
      var errors = (0, _common.validate)([{ field: 'member_id', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return _get(Conference.prototype.__proto__ || Object.getPrototypeOf(Conference.prototype), 'executeAction', this).call(this, this.id + '/Member/' + memberId + '/Deaf/', 'DELETE');
    }

    /**
     * play audio to member
     * @method
     * @param {string} memberId - id of member
     * @param {string} url - url for audio
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'playAudioToMember',
    value: function playAudioToMember(memberId, url) {
      var errors = (0, _common.validate)([{ field: 'member_id', value: memberId, validators: ['isRequired'] }, { field: 'url', value: url, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      var params = { url: url };
      return _get(Conference.prototype.__proto__ || Object.getPrototypeOf(Conference.prototype), 'executeAction', this).call(this, this.id + '/Member/' + memberId + '/Play/', 'POST', params);
    }

    /**
     * stop playing audio to member
     * @method
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'stopPlayingAudioToMember',
    value: function stopPlayingAudioToMember(memberId) {
      var errors = (0, _common.validate)([{ field: 'member_id', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return _get(Conference.prototype.__proto__ || Object.getPrototypeOf(Conference.prototype), 'executeAction', this).call(this, this.id + '/Member/' + memberId + '/Play/', 'DELETE');
    }

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

  }, {
    key: 'speakTextToMember',
    value: function speakTextToMember(memberId, text, optionalParams) {
      var errors = (0, _common.validate)([{ field: 'member_id', value: memberId, validators: ['isRequired'] }, { field: 'text', value: text, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      var params = optionalParams || {};
      params.text = text;

      return _get(Conference.prototype.__proto__ || Object.getPrototypeOf(Conference.prototype), 'executeAction', this).call(this, this.id + '/Member/' + memberId + '/Speak/', 'POST', params);
    }

    /**
     * stop speaking text to member
     * @method
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'stopSpeakingTextToMember',
    value: function stopSpeakingTextToMember(memberId) {
      var errors = (0, _common.validate)([{ field: 'member_id', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return _get(Conference.prototype.__proto__ || Object.getPrototypeOf(Conference.prototype), 'executeAction', this).call(this, this.id + '/Member/' + memberId + '/Speak/', 'DELETE');
    }

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

  }, {
    key: 'record',
    value: function record(params) {
      return this.startRecording(params);
    }

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

  }, {
    key: 'startRecording',
    value: function startRecording(params) {
      return _get(Conference.prototype.__proto__ || Object.getPrototypeOf(Conference.prototype), 'executeAction', this).call(this, this.id + '/Record/', 'POST', params);
    }

    /**
     * stop recording conference
     * @method
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'stopRecording',
    value: function stopRecording() {
      return _get(Conference.prototype.__proto__ || Object.getPrototypeOf(Conference.prototype), 'executeAction', this).call(this, this.id + '/Record/', 'DELETE');
    }
  }]);

  return Conference;
}(_base.PlivoResource);

/**
 * Represents a Conference Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */


var ConferenceInterface = exports.ConferenceInterface = function (_PlivoResourceInterfa) {
  _inherits(ConferenceInterface, _PlivoResourceInterfa);

  function ConferenceInterface(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ConferenceInterface);

    var _this2 = _possibleConstructorReturn(this, (ConferenceInterface.__proto__ || Object.getPrototypeOf(ConferenceInterface)).call(this, action, Conference, idField, client));

    (0, _common.extend)(_this2, data);

    _this2[clientKey] = client;
    return _this2;
  }

  /**
   * get conference by id
   * @method
   * @param {string} id - id of conference
   * @promise {@link Conference} return {@link Conference} object if success
   * @fail {Error} return Error
   */


  _createClass(ConferenceInterface, [{
    key: 'get',
    value: function get(id) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return _get(ConferenceInterface.prototype.__proto__ || Object.getPrototypeOf(ConferenceInterface.prototype), 'get', this).call(this, id);
    }

    /**
     * get all conferences. returns name of all conferences
     * @method
     * @promise {@link [Conference]} returns list of {@link Conference} objects if success
     * @fail {Error} return Error
     */

  }, {
    key: 'list',
    value: function list() {
      var client = this[clientKey];

      return new Promise(function (resolve, reject) {
        client('GET', action).then(function (response) {
          var conferences = [];
          response.body.conferences.forEach(function (conference) {
            conferences.push(new Conference(client, {
              name: conference
            }));
          });
          resolve(conferences);
        }).catch(function (error) {
          reject(error);
        });
      });
    }

    /**
     * hangup conference
     * @method
     * @param {string} conferenceName - name of conference
     * @promise {@link Conference} return {@link Conference} object if success
     * @fail {Error} return Error
     */

  }, {
    key: 'hangup',
    value: function hangup(conferenceName) {
      var errors = (0, _common.validate)([{ field: 'conference_name', value: conferenceName, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Conference(this[clientKey], {
        id: conferenceName
      }).delete();
    }

    /**
     * hangup all
     * @method
     * @promise {@link PlivoGenericResponse} returns object of PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'hangupAll',
    value: function hangupAll() {
      return new Conference(this[clientKey]).executeAction('', 'DELETE');
    }

    /**
     * hangup member from conference
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member to be hangup
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'hangupMember',
    value: function hangupMember(id, memberId) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }, { field: 'memberId', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Conference(this[clientKey], {
        id: id
      }).hangupMember(memberId);
    }

    /**
     * kick member from conference
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'kickMember',
    value: function kickMember(id, memberId) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }, { field: 'memberId', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Conference(this[clientKey], {
        id: id
      }).kickMember(memberId);
    }

    /**
     * mute member
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'muteMember',
    value: function muteMember(id, memberId) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }, { field: 'memberId', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Conference(this[clientKey], {
        id: id
      }).muteMember(memberId);
    }

    /**
     * unmute member
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'unmuteMember',
    value: function unmuteMember(id, memberId) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }, { field: 'memberId', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Conference(this[clientKey], {
        id: id
      }).unmuteMember(memberId);
    }

    /**
     * deaf member
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'deafMember',
    value: function deafMember(id, memberId) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }, { field: 'memberId', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Conference(this[clientKey], {
        id: id
      }).deafMember(memberId);
    }

    /**
     * undeaf member
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'undeafMember',
    value: function undeafMember(id, memberId) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }, { field: 'memberId', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Conference(this[clientKey], {
        id: id
      }).undeafMember(memberId);
    }
    /**
     * play audio to member
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @param {string} url - urls for audio
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'playAudioToMember',
    value: function playAudioToMember(id, memberId, url) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }, { field: 'memberId', value: memberId, validators: ['isRequired'] }, { field: 'url', value: url, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Conference(this[clientKey], {
        id: id
      }).playAudioToMember(memberId, url);
    }

    /**
     * stop playing audio to member
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'stopPlayingAudioToMember',
    value: function stopPlayingAudioToMember(id, memberId) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }, { field: 'memberId', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Conference(this[clientKey], {
        id: id
      }).stopPlayingAudioToMember(memberId);
    }

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

  }, {
    key: 'speakTextToMember',
    value: function speakTextToMember(id, memberId, text, optionalParams) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }, { field: 'memberId', value: memberId, validators: ['isRequired'] }, { field: 'text', value: text, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Conference(this[clientKey], {
        id: id
      }).speakTextToMember(memberId, text, optionalParams);
    }

    /**
     * stop speaking text to member
     * @method
     * @param {string} id - id of conference
     * @param {string} memberId - id of member
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'stopSpeakingTextToMember',
    value: function stopSpeakingTextToMember(id, memberId) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }, { field: 'memberId', value: memberId, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Conference(this[clientKey], {
        id: id
      }).stopSpeakingTextToMember(memberId);
    }

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

  }, {
    key: 'record',
    value: function record(id, params) {
      return this.startRecording(id, params);
    }

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

  }, {
    key: 'startRecording',
    value: function startRecording(id, params) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }

      return new Conference(this[clientKey], {
        id: id
      }).startRecording(params);
    }

    /**
     * stop recording
     * @method
     * @param {string} id - id of conference
     * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
     * @fail {Error} return Error
     */

  }, {
    key: 'stopRecording',
    value: function stopRecording(id) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Conference(this[clientKey], {
        id: id
      }).stopRecording();
    }
  }]);

  return ConferenceInterface;
}(_base.PlivoResourceInterface);