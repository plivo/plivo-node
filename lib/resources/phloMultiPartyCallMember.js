'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PhloMultiPartyCallMemberInterface = exports.PhloMultiPartyCallMember = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _common = require('../utils/common.js');

var _base = require('../base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var clientKey = Symbol();
var action = 'Phlo/';
var idField = 'phloUuid';

/**
 * Represents a Multiparty Call Member
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of phlo
 */

var PhloMultiPartyCallMember = exports.PhloMultiPartyCallMember = function (_PlivoResource) {
    _inherits(PhloMultiPartyCallMember, _PlivoResource);

    function PhloMultiPartyCallMember(client) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, PhloMultiPartyCallMember);

        var action = 'phlo/' + data.phloId + '/multi_party_call/' + data.nodeId + '/members/';

        var _this = _possibleConstructorReturn(this, (PhloMultiPartyCallMember.__proto__ || Object.getPrototypeOf(PhloMultiPartyCallMember)).call(this, action, PhloMultiPartyCallMember, idField, client));

        (0, _common.extend)(_this, data);
        _this.action = action;
        _this.client = client;
        return _this;
    }

    _createClass(PhloMultiPartyCallMember, [{
        key: 'resumeCall',
        value: function resumeCall() {
            return this.update('resume_call');
        }
    }, {
        key: 'voicemailDrop',
        value: function voicemailDrop() {
            return this.update('voicemail_drop');
        }
    }, {
        key: 'hangup',
        value: function hangup() {
            return this.update('hangup');
        }
    }, {
        key: 'hold',
        value: function hold() {
            return this.update('hold');
        }
    }, {
        key: 'unhold',
        value: function unhold() {
            return this.update('unhold');
        }
    }, {
        key: 'update',
        value: function update(action) {

            var params = {
                action: action
            };

            // Build Url
            // https://phlorunner.plivo.com/v1/phlo/{PHLO_ID}/multi_party_call/{NODE_ID}/members/{MemberAddress}
            var task = this.action + this.memberAddress;

            return _get(PhloMultiPartyCallMember.prototype.__proto__ || Object.getPrototypeOf(PhloMultiPartyCallMember.prototype), 'executeAction', this).call(this, task, 'POST', params, '');
        }
    }]);

    return PhloMultiPartyCallMember;
}(_base.PlivoResource);

var PhloMultiPartyCallMemberInterface = exports.PhloMultiPartyCallMemberInterface = function (_PlivoResourceInterfa) {
    _inherits(PhloMultiPartyCallMemberInterface, _PlivoResourceInterfa);

    function PhloMultiPartyCallMemberInterface(client) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, PhloMultiPartyCallMemberInterface);

        var action = 'phlo/' + data.phloId + '/multi_party_call/' + data.nodeId + '/members/';

        var _this2 = _possibleConstructorReturn(this, (PhloMultiPartyCallMemberInterface.__proto__ || Object.getPrototypeOf(PhloMultiPartyCallMemberInterface)).call(this, action, PhloMultiPartyCallMember, idField, client));

        (0, _common.extend)(_this2, data);
        _this2.action = action;
        _this2.client = client;
        return _this2;
    }

    _createClass(PhloMultiPartyCallMemberInterface, [{
        key: 'get',
        value: function get(phloId, nodeId, memberAddress) {

            //Validate  memberAddress first
            var errors = (0, _common.validate)([{
                field: 'memberAddress',
                value: memberAddress,
                validators: ['isRequired']
            }]);
            if (errors) {
                return errors;
            }

            return new PhloMultiPartyCallMember(this.client, { phloId: phloId, nodeId: nodeId, memberAddress: memberAddress });
        }
    }]);

    return PhloMultiPartyCallMemberInterface;
}(_base.PlivoResourceInterface);