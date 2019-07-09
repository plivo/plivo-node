'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MessageInterface = exports.Message = undefined;

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;
        if (getter === undefined) {
            return undefined;
        }
        return getter.call(receiver);
    }
};

var _common = require('../utils/common.js');

var _base = require('../base');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }
        newObj.default = obj;
        return newObj;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var action = 'Message/';
var idField = 'messageUuid';

/**
 * Represents a Message
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

var Message = exports.Message = function(_PlivoResource) {
    _inherits(Message, _PlivoResource);

    function Message(client) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Message);

        var _this = _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, action, Message, idField, client));

        // if (idField in data) {
        //     _this.id = data[idField];
        // }

        (0, _common.extend)(_this, data);
        return _this;
    }

    return Message;
}(_base.PlivoResource);
/**
 * Represents a Message Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */

var MessageInterface = exports.MessageInterface = function(_PlivoResourceInterfa) {
    _inherits(MessageInterface, _PlivoResourceInterfa);

    function MessageInterface(client) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, MessageInterface);

        var _this2 = _possibleConstructorReturn(this, (MessageInterface.__proto__ || Object.getPrototypeOf(MessageInterface)).call(this, action, Message, idField, client));

        (0, _common.extend)(_this2, data);
        return _this2;
    }

    /**
     * Send Message
     * @method
     * @param {string} src - source number
     * @param {string} dst - destination number
     * @param {string} text - text to send
     * @param {object} optionalParams - Optional Params to send message
     * @param {string} [optionalParams.type] - The type of message. Should be `sms` for a text message. Defaults to `sms`.
     * @param {string} [optionalParams.url] The URL to which with the status of the message is sent.
     * @param {string} [optionalParams.method] The method used to call the url. Defaults to POST.
     * @param {boolean} [optionalParams.log] If set to false, the content of this message will not be logged on the Plivo infrastructure and the dst value will be masked (e.g., 141XXXXX528). Default is set to true.
     * @promise {object} return {@link PlivoGenericMessage} object if success
     * @fail {Error} return Error
     */


    _createClass(MessageInterface, [{
        key: 'send',
        value: function send(src, dst, text, optionalParams) {
            return this.create(src, dst, text, optionalParams);
        }

        /**
         * Send Message
         * @method
         * @param {string} src - source number
         * @param {string} dst - destination number
         * @param {string} text - text to send
         * @param {object} optionalParams - Optional Params to send message
         * @param {string} [optionalParams.type] - The type of message. Should be `sms` for a text message. Defaults to `sms`.
         * @param {string} [optionalParams.url] The URL to which with the status of the message is sent.
         * @param {string} [optionalParams.method] The method used to call the url. Defaults to POST.
         * @param {boolean} [optionalParams.log] If set to false, the content of this message will not be logged on the Plivo infrastructure and the dst value will be masked (e.g., 141XXXXX528). Default is set to true.
         * @promise {object} return {@link PlivoGenericMessage} object if success
         * @fail {Error} return Error
         */

    }, {
        key: 'create',
        value: function create(src, dst, text, optionalParams, powerpackUUID) {
            var errors = (0, _common.validate)([{
                field: 'dst',
                value: dst,
                validators: ['isRequired']
            }, {
                field: 'text',
                value: text,
                validators: ['isRequired']
            }]);

            if (errors) {
                return errors;
            }

            if (!src && !powerpackUUID) {
                var errorText = 'Neither of src or powerpack uuid present, either one is required';
                return new Promise(function(resolve, reject) {
                    reject(new Error(errorText));
                });
            }

            if (src && powerpackUUID) {
                var _errorText = 'Either of src or powerpack uuid, both of them are present';
                return new Promise(function(resolve, reject) {
                    reject(new Error(_errorText));
                });
            }

            var params = optionalParams || {};
            if (src) {
                params.src = src;
            }
            params.dst = _.isArray(dst) ? _.join(dst, '<') : dst;
            params.text = text;
            if (powerpackUUID) {
                params.powerpackUUID = powerpackUUID;
            }
            return _get(MessageInterface.prototype.__proto__ || Object.getPrototypeOf(MessageInterface.prototype), 'create', this).call(this, params);
        }

        /**
         * Get Message by given id
         * @method
         * @param {string} id - id of message
         * @promise {object} return {@link Message} object if success
         * @fail {Error} return Error
         */

    }, {
        key: 'get',
        value: function get(id) {
            var errors = (0, _common.validate)([{
                field: 'id',
                value: id,
                validators: ['isRequired']
            }]);

            if (errors) {
                return errors;
            }

            return _get(MessageInterface.prototype.__proto__ || Object.getPrototypeOf(MessageInterface.prototype), 'get', this).call(this, id);
        }
    }]);

    return MessageInterface;
}(_base.PlivoResourceInterface);