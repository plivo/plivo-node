'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PricingInterface = exports.Pricing = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _common = require('../utils/common.js');

var _base = require('../base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var clientKey = Symbol();
var action = 'Pricing/';
var idField = 'countryIso';

/**
 * Represents a Pricing
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

var Pricing = exports.Pricing = function (_PlivoResource) {
  _inherits(Pricing, _PlivoResource);

  function Pricing(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Pricing);

    var _this = _possibleConstructorReturn(this, (Pricing.__proto__ || Object.getPrototypeOf(Pricing)).call(this, action, Pricing, idField, client));

    (0, _common.extend)(_this, data);
    return _this;
  }

  /**
   * Get pricings by country
   * @method
   * @promise {object} return {@link PlivoGenericResponse} object
   * @fail {Error} return Error
   */


  _createClass(Pricing, [{
    key: 'get',
    value: function get() {
      var params = {
        country_iso: this.id
      };
      return _get(Pricing.prototype.__proto__ || Object.getPrototypeOf(Pricing.prototype), 'executeAction', this).call(this, '', 'GET', params);
    }
  }]);

  return Pricing;
}(_base.PlivoResource);
/**
 * Represents a Pricing Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */


var PricingInterface = exports.PricingInterface = function (_PlivoResourceInterfa) {
  _inherits(PricingInterface, _PlivoResourceInterfa);

  function PricingInterface(client) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PricingInterface);

    var _this2 = _possibleConstructorReturn(this, (PricingInterface.__proto__ || Object.getPrototypeOf(PricingInterface)).call(this, action, Pricing, idField, client));

    (0, _common.extend)(_this2, data);

    _this2[clientKey] = client;
    return _this2;
  }

  /**
   * Get pricings by country
   * @method
   * @param {string} countryISO - country iso to get pricings
   * @promise {object} return {@link PlivoGenericResponse} object
   * @fail {Error} return Error
   */


  _createClass(PricingInterface, [{
    key: 'get',
    value: function get(countryISO) {
      var errors = (0, _common.validate)([{ field: 'country_iso', value: countryISO, validators: ['isRequired'] }]);

      if (errors) {
        return errors;
      }
      return new Pricing(this[clientKey], {
        id: countryISO
      }).get();
    }
  }]);

  return PricingInterface;
}(_base.PlivoResourceInterface);