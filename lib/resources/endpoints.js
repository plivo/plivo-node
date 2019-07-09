'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndpointInterface = exports.Endpoint = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _common = require('../utils/common.js');

var _base = require('../base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var clientKey = Symbol();
var action = 'Endpoint/';
var idField = 'endpointId';

/**
 * Represents a Endpoint
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

var Endpoint = exports.Endpoint = function (_PlivoResource) {
  _inherits(Endpoint, _PlivoResource);

  function Endpoint(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Endpoint);

    var _this = _possibleConstructorReturn(this, (Endpoint.__proto__ || Object.getPrototypeOf(Endpoint)).call(this, action, Endpoint, idField, client));

    // if (idField in data) {
    //   _this.id = data[idField];
    // }

    (0, _common.extend)(_this, data);
    _this[clientKey] = client;
    return _this;
  }

  /**
   * update Endpoint
   * @method
   * @param {object} params
   * @param {string} [params.username] - username to update
   * @param {string} [params.password] - password to update
   * @param {string} [params.alias] - alias to update
   * @param {string} [params.appId] - app id to update
   * @promise {object} return {@link Endpoint} object if success
   * @fail {Error} return Error
   */


  _createClass(Endpoint, [{
    key: 'update',
    value: function update(params) {
      return _get(Endpoint.prototype.__proto__ || Object.getPrototypeOf(Endpoint.prototype), 'update', this).call(this, params);
    }

    /**
     * delete Endpoint
     * @method
     * @promise {boolean} return true if success
     * @fail {Error} return Error
     */

  }, {
    key: 'delete',
    value: function _delete() {
      return _get(Endpoint.prototype.__proto__ || Object.getPrototypeOf(Endpoint.prototype), 'delete', this).call(this);
    }
  }]);

  return Endpoint;
}(_base.PlivoResource);
/**
 * Represents a Endpoint Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

var EndpointInterface = exports.EndpointInterface = function (_PlivoResourceInterfa) {
  _inherits(EndpointInterface, _PlivoResourceInterfa);

  function EndpointInterface(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, EndpointInterface);

    var _this2 = _possibleConstructorReturn(this, (EndpointInterface.__proto__ || Object.getPrototypeOf(EndpointInterface)).call(this, action, Endpoint, idField, client));

    (0, _common.extend)(_this2, data);

    _this2[clientKey] = client;
    return _this2;
  }

  /**
   * Get Endpoint by given id
   * @method
   * @param {string} id - id of endpoint
   * @promise {object} return {@link Endpoint} object if success
   * @fail {Error} return Error
   */


  _createClass(EndpointInterface, [{
    key: 'get',
    value: function get(id) {
      return _get(EndpointInterface.prototype.__proto__ || Object.getPrototypeOf(EndpointInterface.prototype), 'get', this).call(this, id);
    }

    /**
     * Create Endpoint
     * @method
     * @param {string} username - username to create
     * @param {string} passwowrd - password to create
     * @param {string} alias - alias to create
     * @param {string} appId - app id to create
     * @promise {object} return {@link PlivoGenericResponse} object if success
     * @fail {Error} return Error
     */

  }, {
    key: 'create',
    value: function create(username, password, alias, appId) {
      var params = {};

      var errors = (0, _common.validate)([{ field: 'username', value: username, validators: ['isRequired'] }, { field: 'password', value: password, validators: ['isRequired'] }, { field: 'alias', value: alias, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }

      params.username = username;
      params.password = password;
      params.alias = alias;
      if (appId) {
        params.app_id = appId;
      }

      return _get(EndpointInterface.prototype.__proto__ || Object.getPrototypeOf(EndpointInterface.prototype), 'create', this).call(this, params);
    }

    /**
     * update Endpoint
     * @method
     * @param {string} id - id to update
     * @param {object} params
     * @param {string} [params.username] - username to update
     * @param {string} [params.password] - password to update
     * @param {string} [params.alias] - alias to update
     * @param {string} [params.appId] - app id to update
     * @promise {object} return {@link Endpoint} object if success
     * @fail {Error} return Error
     */

  }, {
    key: 'update',
    value: function update(id, params) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Endpoint(this[clientKey], {
        id: id
      }).update(params);
    }

    /**
     * delete Endpoint
     * @method
     * @param {string} id - id to delete
     * @promise {boolean} return true if success
     * @fail {Error} return Error
     */

  }, {
    key: 'delete',
    value: function _delete(id) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Endpoint(this[clientKey], {
        id: id
      }).delete();
    }
  }]);

  return EndpointInterface;
}(_base.PlivoResourceInterface);