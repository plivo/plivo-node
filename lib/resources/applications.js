'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicationInterface = exports.Application = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _common = require('../utils/common.js');

var _base = require('../base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var clientKey = Symbol();
var action = 'Application/';
var idField = 'appId';

/**
 * Represents a Application
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

var Application = exports.Application = function (_PlivoResource) {
  _inherits(Application, _PlivoResource);

  function Application(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Application);

    var _this = _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this, action, Application, idField, client));

    // if (idField in data) {
    //   _this.id = data[idField];
    // }

    (0, _common.extend)(_this, data);
    return _this;
  }

  /**
   * update application
   * @method
   * @param {object} params - to update application
   * @param {string} [params.answerUrl] The URL invoked by Plivo when a call executes this application.
   * @param {string} [params.answerMethod] The method used to call the answer_url. Defaults to POST.
   * @param {string} [params.hangupUrl] The URL that is notified by Plivo when the call hangs up.
   * @param {string} [params.hangupMethod] The method used to call the hangup_url. Defaults to POST
   * @param {string} [params.fallbackAnswerUrl] Invoked by Plivo only if answer_url is unavailable or the XML response is invalid. Should contain a XML response.
   * @param {string} [params.fallbackMethod] The method used to call the fallback_answer_url. Defaults to POST.
   * @param {string} [params.messageUrl] The URL that is notified by Plivo when an inbound message is received. Defaults not set.
   * @param {string} [params.messageMethod] The method used to call the message_url. Defaults to POST.
   * @param {boolean} [params.defaultNumberApp] If set to true, associates all newly created Plivo numbers that have not specified an app_id, to this application.
   * @param {boolean} [params.defaultEndpointApp] If set to true, associates all newly created Plivo endpoints that have not specified an app_id, to this application.
   * @param {string} [params.subaccount] Id of the subaccount, in case only subaccount applications are needed.
   * @param {boolean} [params.logIncomingMessages] flag to control incoming message logs.
  
   * @promise {object} return {@link Application} object
   * @fail {Error} return Error
   */


  _createClass(Application, [{
    key: 'update',
    value: function update(params) {
      return _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'update', this).call(this, params);
    }

    /**
     * delete application
     * @method
     * @promise {object} return true on success
     * @fail {Error} return Error
     */

  }, {
    key: 'delete',
    value: function _delete() {
      return _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'delete', this).call(this);
    }
  }]);

  return Application;
}(_base.PlivoResource);
/**
 * Represents a Application interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */


var ApplicationInterface = exports.ApplicationInterface = function (_PlivoResourceInterfa) {
  _inherits(ApplicationInterface, _PlivoResourceInterfa);

  function ApplicationInterface(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ApplicationInterface);

    var _this2 = _possibleConstructorReturn(this, (ApplicationInterface.__proto__ || Object.getPrototypeOf(ApplicationInterface)).call(this, action, Application, idField, client));

    (0, _common.extend)(_this2, data);

    _this2[clientKey] = client;
    return _this2;
  }

  /**
   * get application by given id
   * @method
   * @param {string} id - id of application
   * @promise {object} return {@link Application} object
   * @fail {Error} return Error
   */


  _createClass(ApplicationInterface, [{
    key: 'get',
    value: function get(id) {
      return _get(ApplicationInterface.prototype.__proto__ || Object.getPrototypeOf(ApplicationInterface.prototype), 'get', this).call(this, id);
    }

    /**
     * create Application
     * @method
     * @param {string} appName - name of application
     * @param {object} params - params to create application
     * @param {string} [params.answerUrl] - answer url
     * @param {string} [params.appName] The name of your application
     * @param {string} [params.answerUrl] The URL invoked by Plivo when a call executes this application.
     * @param {string} [params.answerMethod] The method used to call the answer_url. Defaults to POST.
     * @param {string} [params.hangupUrl] The URL that is notified by Plivo when the call hangs up.
     * @param {string} [params.hangupMethod] The method used to call the hangup_url. Defaults to POST
     * @param {string} [params.fallbackAnswerUrl] Invoked by Plivo only if answer_url is unavailable or the XML response is invalid. Should contain a XML response.
     * @param {string} [params.fallbackMethod] The method used to call the fallback_answer_url. Defaults to POST.
     * @param {string} [params.messageUrl] The URL that is notified by Plivo when an inbound message is received. Defaults not set.
     * @param {string} [params.messageMethod] The method used to call the message_url. Defaults to POST.
     * @param {boolean} [params.defaultNumberApp] If set to true, associates all newly created Plivo numbers that have not specified an app_id, to this application.
     * @param {boolean} [params.defaultEndpointApp] If set to true, associates all newly created Plivo endpoints that have not specified an app_id, to this application.
     * @param {string} [params.subaccount] Id of the subaccount, in case only subaccount applications are needed.
     * @param {boolean} [params.logIncomingMessages] flag to control incoming message logs.
     * @promise {object} return {@link PlivoGenericResponse} object
     * @fail {Error} return Error
     */

  }, {
    key: 'create',
    value: function create(appName) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


      var errors = (0, _common.validate)([{ field: 'app_name', value: appName, validators: ['isRequired', 'isString'] }]);

      if (errors) {
        return errors;
      }

      params.app_name = appName;

      return _get(ApplicationInterface.prototype.__proto__ || Object.getPrototypeOf(ApplicationInterface.prototype), 'create', this).call(this, params);
    }

    /**
     * update Application
     * @method
     * @param {string} id - id of application
     * @param {object} params - to update application
     * @param {string} [params.answerUrl] The URL invoked by Plivo when a call executes this application.
     * @param {string} [params.answerMethod] The method used to call the answer_url. Defaults to POST.
     * @param {string} [params.hangupUrl] The URL that is notified by Plivo when the call hangs up.
     * @param {string} [params.hangupMethod] The method used to call the hangup_url. Defaults to POST
     * @param {string} [params.fallbackAnswerUrl] Invoked by Plivo only if answer_url is unavailable or the XML response is invalid. Should contain a XML response.
     * @param {string} [params.fallbackMethod] The method used to call the fallback_answer_url. Defaults to POST.
     * @param {string} [params.messageUrl] The URL that is notified by Plivo when an inbound message is received. Defaults not set.
     * @param {string} [params.messageMethod] The method used to call the message_url. Defaults to POST.
     * @param {boolean} [params.defaultNumberApp] If set to true, associates all newly created Plivo numbers that have not specified an app_id, to this application.
     * @param {boolean} [params.defaultEndpointApp] If set to true, associates all newly created Plivo endpoints that have not specified an app_id, to this application.
     * @param {string} [params.subaccount] Id of the subaccount, in case only subaccount applications are needed.
     * @param {boolean} [params.logIncomingMessages] flag to control incoming message logs.
     * @promise {object} return {@link Application} object
     * @fail {Error} return Error
     */

  }, {
    key: 'update',
    value: function update(id, params) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Application(this[clientKey], {
        id: id
      }).update(params);
    }

    /**
     * delete Application
     * @method
     * @param {string} id - id of application
     * @promise {object} return true on success
     * @fail {Error} return Error
     */

  }, {
    key: 'delete',
    value: function _delete(id) {
      return new Application(this[clientKey], {
        id: id
      }).delete();
    }
  }]);

  return ApplicationInterface;
}(_base.PlivoResourceInterface);