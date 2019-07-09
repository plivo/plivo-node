'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordingInterface = exports.Recording = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _common = require('../utils/common.js');

var _base = require('../base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var clientKey = Symbol();
var action = 'Recording/';
var idField = 'recordingId';

/**
 * Represents a Recording
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

var Recording = exports.Recording = function (_PlivoResource) {
  _inherits(Recording, _PlivoResource);

  function Recording(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Recording);

    var _this = _possibleConstructorReturn(this, (Recording.__proto__ || Object.getPrototypeOf(Recording)).call(this, action, Recording, idField, client));

    // if (idField in data) {
    //   _this.id = data[idField];
    // }
    (0, _common.extend)(_this, data);
    return _this;
  }

  /**
   * Delete recording
   * @method
   * @promise {boolean} return true if success
   * @fail {Error} return Error
   */


  _createClass(Recording, [{
    key: 'delete',
    value: function _delete() {
      return _get(Recording.prototype.__proto__ || Object.getPrototypeOf(Recording.prototype), 'delete', this).call(this);
    }
  }]);

  return Recording;
}(_base.PlivoResource);

/**
 * Represents a Recording Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */


var RecordingInterface = exports.RecordingInterface = function (_PlivoResourceInterfa) {
  _inherits(RecordingInterface, _PlivoResourceInterfa);

  function RecordingInterface(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, RecordingInterface);

    var _this2 = _possibleConstructorReturn(this, (RecordingInterface.__proto__ || Object.getPrototypeOf(RecordingInterface)).call(this, action, Recording, idField, client));

    (0, _common.extend)(_this2, data);

    _this2[clientKey] = client;
    return _this2;
  }

  /**
   * Get recording by id
   * @method
   * @param {string} id - id to get recording information
   * @promise {object} return {@link Pricing} object
   * @fail {Error} return Error
   */


  _createClass(RecordingInterface, [{
    key: 'get',
    value: function get(id) {
      var errors = (0, _common.validate)([{ field: 'id', value: id, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return _get(RecordingInterface.prototype.__proto__ || Object.getPrototypeOf(RecordingInterface.prototype), 'get', this).call(this, id);
    }

    /**
     * Delete recording by id
     * @method
     * @param {string} id - id to delete recording
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
      return new Recording(this[clientKey], {
        id: id
      }).delete();
    }
  }]);

  return RecordingInterface;
}(_base.PlivoResourceInterface);