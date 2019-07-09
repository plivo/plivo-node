'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberInterface = exports.NumberResource = exports.PhoneNumberInterface = exports.PhoneNumber = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require('../utils/common.js');

var _base = require('../base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var clientKey = Symbol();
var action = 'Number/';
var idField = 'number';

/**
 * Represents a PhoneNumber
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

var PhoneNumber = exports.PhoneNumber = function (_PlivoResource) {
  _inherits(PhoneNumber, _PlivoResource);

  function PhoneNumber(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PhoneNumber);

    var _this = _possibleConstructorReturn(this, (PhoneNumber.__proto__ || Object.getPrototypeOf(PhoneNumber)).call(this, 'PhoneNumber/', PhoneNumber, idField, client));

    // if (idField in data) {
    //   _this.id = data[idField];
    // }

    (0, _common.extend)(_this, data);
    _this[clientKey] = client;
    return _this;
  }

  /**
   * Buy Phone Number
   * @method
   * @param {string} appId - app id
   * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
   * @fail {Error} return Error
   */


  _createClass(PhoneNumber, [{
    key: 'buy',
    value: function buy(appId) {
      return new PhoneNumberInterface(this[clientKey], {
        id: this.id
      }).buy(appId);
    }
  }]);

  return PhoneNumber;
}(_base.PlivoResource);

/**
 * Represents a PhoneNumbers Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 * @param {string} [data.test] - test data
 */


var PhoneNumberInterface = exports.PhoneNumberInterface = function (_PlivoResourceInterfa) {
  _inherits(PhoneNumberInterface, _PlivoResourceInterfa);

  function PhoneNumberInterface(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PhoneNumberInterface);

    var _this2 = _possibleConstructorReturn(this, (PhoneNumberInterface.__proto__ || Object.getPrototypeOf(PhoneNumberInterface)).call(this, 'PhoneNumber/', PhoneNumber, idField, client));

    (0, _common.extend)(_this2, data);
    _this2[clientKey] = client;
    return _this2;
  }

  /**
   * Buy Phone Number
   * @method
   * @param {string} appId - app id
   * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
   * @fail {Error} return Error
   */


  _createClass(PhoneNumberInterface, [{
    key: 'buy',
    value: function buy(appId) {
      var params = {};
      if (appId) {
        params.app_id = appId;
      }
      return _get(PhoneNumberInterface.prototype.__proto__ || Object.getPrototypeOf(PhoneNumberInterface.prototype), 'create', this).call(this, params);
    }
  }]);

  return PhoneNumberInterface;
}(_base.PlivoResourceInterface);

/**
 * Represents a Number
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */


var NumberResource = exports.NumberResource = function (_PlivoResource2) {
  _inherits(NumberResource, _PlivoResource2);

  function NumberResource(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, NumberResource);

    var _this3 = _possibleConstructorReturn(this, (NumberResource.__proto__ || Object.getPrototypeOf(NumberResource)).call(this, action, NumberResource, idField, client));

    // if (idField in data) {
    //   _this3.id = data[idField];
    // }
    (0, _common.extend)(_this3, data);
    return _this3;
  }

  /**
   * Unrent Number
   * @method
   * @promise {boolean} return true if success
   * @fail {Error} return Error
   */


  _createClass(NumberResource, [{
    key: 'unrent',
    value: function unrent() {
      return _get(NumberResource.prototype.__proto__ || Object.getPrototypeOf(NumberResource.prototype), 'delete', this).call(this);
    }

    /**
     * Update Number
     * @method
     * @param {object} params
     * @param {string} [params.appId] - app id
     * @param {string} [params.subAccount] - auth_id of subaccount
     * @param {string} [params.alias] - textual name of number
     * @promise {@link NumberResource} return NumberResource Object if success
     * @fail {Error} return Error
     */

  }, {
    key: 'update',
    value: function update(params) {
      return _get(NumberResource.prototype.__proto__ || Object.getPrototypeOf(NumberResource.prototype), 'update', this).call(this, params);
    }
  }]);

  return NumberResource;
}(_base.PlivoResource);

/**
 * Represents a Numbers
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */


var NumberInterface = exports.NumberInterface = function (_PlivoResourceInterfa2) {
  _inherits(NumberInterface, _PlivoResourceInterfa2);

  function NumberInterface(client) {
    _classCallCheck(this, NumberInterface);

    var _this4 = _possibleConstructorReturn(this, (NumberInterface.__proto__ || Object.getPrototypeOf(NumberInterface)).call(this, action, NumberResource, idField, client));

    _this4[clientKey] = client;
    return _this4;
  }

  /**
   * Buy Phone Number
   * @method
   * @param {string} number - number to buy
   * @param {string} appId - app id
   * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
   * @fail {Error} return Error
   */


  _createClass(NumberInterface, [{
    key: 'buy',
    value: function buy(number, appId) {
      var errors = (0, _common.validate)([{ field: 'number', value: number, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new PhoneNumber(this[clientKey], {
        id: number
      }).buy(appId);
    }

    /**
     * Add own number from carrier
     * @method
     * @param {string} numbers - A comma separated list of numbers that need to be added for the carrier.
     * @param {string} carrier - The carrier_id of the IncomingCarrier that the number is associated with.
     * @param {string} region - region that is associated with the Number
     * @param {string} optionaParams - optional params
     * @promise {@link PlivoGenericResponse} return PlivoGenericResponse Object if success
     * @fail {Error} return Error
     */

  }, {
    key: 'addOwnNumber',
    value: function addOwnNumber(numbers, carrier, region, optionalParams) {
      var errors = (0, _common.validate)([{ field: 'numbers', value: numbers, validators: ['isRequired'] }, { field: 'carrier', value: carrier, validators: ['isRequired'] }, { field: 'region', value: region, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      var params = optionalParams || {};

      params.numbers = numbers;
      params.carrier = carrier;
      params.region = region;

      return _get(NumberInterface.prototype.__proto__ || Object.getPrototypeOf(NumberInterface.prototype), 'create', this).call(this, params);
    }

    /**
     * Add own number from carrier
     * @method
     * @param {string} countryISO - The ISO code A2 of the country
     * @param {string} optionaParams - optional params
     * @promise {@link PhoneNumberInterface} return PhoneNumbers Object if success
     * @fail {Error} return Error
     */

  }, {
    key: 'search',
    value: function search(countryISO, optionalParams) {
      var errors = (0, _common.validate)([{ field: 'country_iso', value: countryISO, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }

      var params = optionalParams || {};
      params.country_iso = countryISO;
      return new PhoneNumberInterface(this[clientKey]).list(params);
    }

    /**
     * Update Number
     * @method
     * @param {string} number - number to update
     * @param {object} params
     * @param {string} [params.appId] - app id
     * @param {string} [params.subAccount] - auth_id of subaccount
     * @param {string} [params.alias] - textual name of number
     * @promise {@link NumberResource} return NumberResource Object if success
     * @fail {Error} return Error
     */

  }, {
    key: 'update',
    value: function update(number, params) {
      var errors = (0, _common.validate)([{ field: 'number', value: number, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new NumberResource(this[clientKey], {
        id: number
      }).update(params);
    }

    /**
     * Unrent Number
     * @method
     * @param {string} number - number to unrent
     * @promise {boolean} return true if success
     * @fail {Error} return Error
     */

  }, {
    key: 'unrent',
    value: function unrent(number) {
      var errors = (0, _common.validate)([{ field: 'number', value: number, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new NumberResource(this[clientKey], {
        id: number
      }).unrent();
    }
  }]);

  return NumberInterface;
}(_base.PlivoResourceInterface);