//Get required modules
var util = require('util');
var crypto = require('crypto');
var Request = require('request');
var qs = require('querystring');
var xmlBuilder = require('xmlbuilder');
var doc = xmlBuilder.create();

var plivo = {};

plivo.options = {};
plivo.options.host = 'api.plivo.com';
plivo.options.version = 'v1';
plivo.options.authId = '';
plivo.options.authToken = '';

var UserAgent = 'NodePlivo';

// Generic Plivo Error
function PlivoError(msg) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = (msg || '') + '\n';
    this.name = 'PlivoError';
}

PlivoError.prototype = Error.prototype;

// Main request function
var request = function (action, method, params, callback, optional) {
    if (optional) {
        if (typeof params != 'object') {
            if (typeof params == 'function') {
                var callback = params;
            }
            var params = {};
        }
    }

    if (!callback) {
        var callback = function() {};
    }

    var err = null;
    var path = 'https://' + plivo.options.host + '/' + plivo.options.version + '/Account/' + plivo.options.authId + '/' + action;

    var auth = 'Basic ' + new Buffer(plivo.options.authId + ':' + plivo.options.authToken)
        .toString('base64');

    var headers = {
        'Authorization': auth,
        'User-Agent': UserAgent,
        'Content-Type': 'application/json'
    };

    var request_options = {
        uri: path,
        headers: headers,
        json: true,
    };

    if (method == 'POST') {
        var body = JSON.stringify(params);

        request_options.json = true;
        request_options.body = body;
        Request.post(request_options, function (error, response, body) {
            if (error || !response) {
              return callback(500, body)
            }
            if (response.statusCode != 201) {
                err = new PlivoError(error);
            }
            callback(response.statusCode, body);

        });
    } else if (method == 'GET') {
        request_options.qs = params;
        Request.get(request_options, function (error, response, body) {
            callback(response.statusCode, body);
        });
    } else if (method == 'DELETE') {
        Request.del(request_options, function (error, response, body) {
            callback(response.statusCode, body);
        });
    } else if (method == 'PUT') {
        var body = JSON.stringify(params);

        request_options.json = true;
        request_options.body = body,
        Request.put(request_options, function (error, response, body) {
            callback(response.statusCode, body);
        });
    }
};

// Exposing generic request functionality as well.
plivo.request = request;

// For verifying the plivo server signature
plivo.create_signature = function (url, params) {
  var toSign = url;

  Object.keys(params).sort().forEach(function(key) {
    toSign += key + params[key];
  });

  var signature = crypto
    .createHmac('sha1', plivo.options.authToken)
    .update(new Buffer(toSign, 'utf-8'))
    .digest('base64');

  return signature;
};

// Express middleware for verifying signature
plivo.middleware = function(options) {
  return function (req, res, next) {
    if (process.env.NODE_ENV === 'test') return next()

    var toSign;
    if (options && options.host) {
      toSign = options.host;
    } else {
      toSign = req.protocol + '://' + req.host;
    }
    toSign += req.originalUrl;

    var expectedSignature = plivo.create_signature(toSign, req.body);

    if (expectedSignature === req.header('X-Plivo-Signature')) {
      next();
    } else {
      var msg = 'Invalid Plivo Signature toSign=' + toSign + ', ' +
                'expected=' + expectedSignature + ', ' +
                'actual=' + req.header('X-Plivo-Signature');
      next(new Error(msg));
    }
  };
};

// Calls

plivo.make_call = function (params, callback) {
    var action = 'Call/';
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.get_cdrs = function (params, callback) {
    var action = 'Call/';
    var method = 'GET';

    request(action, method, params, callback, true);
};

plivo.get_cdr = function (params, callback) {
    var action = 'Call/' + params['call_uuid'] + '/';
    delete params.call_uuid;
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.get_live_calls = function (params, callback) {
    var action = 'Call/';
    var method = 'GET';

    params.status = 'live';
    request(action, method, params, callback, true);
};

plivo.get_live_call = function (params, callback) {
    var action = 'Call/' + params['call_uuid'] + '/';
    delete params.call_uuid;
    var method = 'GET';

    params.status = 'live';
    request(action, method, params, callback);
};

plivo.transfer_call = function (params, callback) {
    var action = 'Call/' + params['call_uuid'] + '/';
    delete params.call_uuid;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.hangup_all_calls = function (callback) {
    var action = 'Call/';
    var method = 'DELETE';
    var params = {};

    request(action, method, params, callback);
};

plivo.hangup_call = function (params, callback) {
    var action = 'Call/' + params['call_uuid'] + '/';
    delete params.call_uuid;
    var method = 'DELETE';

    request(action, method, params, callback);
};

plivo.record = function (params, callback) {
    var action = 'Call/' + params['call_uuid'] + '/Record/';
    delete params.call_uuid;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.record_stop = function (params, callback) {
    var action = 'Call/' + params['call_uuid'] + '/Record/';
    delete params.call_uuid;
    var method = 'DELETE';

    request(action, method, params, callback);
};

plivo.play = function (params, callback) {
    var action = 'Call/' + params['call_uuid'] + '/Play/';
    delete params.call_uuid;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.play_stop = function (params, callback) {
    var action = 'Call/' + params['call_uuid'] + '/Play/';
    delete params.call_uuid;
    var method = 'DELETE';

    request(action, method, params, callback);
};

plivo.speak = function (params, callback) {
    var action = 'Call/' + params['call_uuid'] + '/Speak/';
    delete params.call_uuid;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.speak_stop = function (params, callback) {
    var action = 'Call/' + params['call_uuid'] + '/Speak/';
    delete params.call_uuid;
    var method = 'DELETE';

    request(action, method, params, callback);
};

plivo.send_digits = function (params, callback) {
    var action = 'Call/' + params['call_uuid'] + '/DTMF/';
    delete params.call_uuid;
    var method = 'POST';

    request(action, method, params, callback);
};

// Request

plivo.hangup_request = function (params, callback) {
    var action = 'Request/' + params['request_uuid'] + '/';
    delete params.request_uuid;
    var method = 'DELETE';

    request(action, method, params, callback);
};

// Conferences

plivo.get_live_conferences = function (params, callback) {
    var action = 'Conference/';
    var method = 'GET';

    request(action, method, params, callback, true);
};

plivo.get_live_conference = function (params, callback) {
    var action = 'Conference/' + params['conference_id'] + '/';
    delete params.conference_id;
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.hangup_all_conferences = function (callback) {
    var action = 'Conference/';
    var method = 'DELETE';

    request(action, method, params, callback);
};

plivo.hangup_conference = function (params, callback) {
    var action = 'Conference/' + params['conference_id'] + '/';
    delete params.conference_id;
    var method = 'DELETE';

    request(action, method, params, callback);
};

plivo.hangup_conference_member = function (params, callback) {
    var action = 'Conference/' + params['conference_id'] + '/Member/' + params['member_id'] + '/';
    delete params.conference_id;
    delete params.member_id;
    var method = 'DELETE';

    request(action, method, params, callback);
};

plivo.play_conference_member = function (params, callback) {
    var action = 'Conference/' + params['conference_id'] + '/Member/' + params['member_id'] + '/Play/';
    delete params.conference_id;
    delete params.member_id;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.stop_play_conference_member = function (params, callback) {
    var action = 'Conference/' + params['conference_id'] + '/Member/' + params['member_id'] + '/Play/';
    delete params.conference_id;
    delete params.member_id;
    var method = 'DELETE';

    request(action, method, params, callback);
};

plivo.speak_conference_member = function (params, callback) {
    var action = 'Conference/' + params['conference_id'] + '/Member/' + params['member_id'] + '/Speak/';
    console.log(action);
    delete params.conference_id;
    delete params.member_id;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.stop_speak_conference_member = function (params, callback) {
    var action = 'Conference/' + params['conference_id'] + '/Member/' + params['member_id'] + '/Speak/';
    delete params.conference_id;
    delete params.member_id;
    var method = 'DELETE';

    request(action, method, params, callback);
};

plivo.deaf_conference_member = function (params, callback) {
    var action = 'Conference/' + params['conference_id'] + '/Member/' + params['member_id'] + '/Deaf/';
    delete params.conference_id;
    delete params.member_id;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.undeaf_conference_member = function (params, callback) {
    var action = 'Conference/' + params['conference_id'] + '/Member/' + params['member_id'] + '/Deaf/';
    delete params.conference_id;
    delete params.member_id;
    var method = 'DELETE';

    request(action, method, params, callback);
};

plivo.mute_conference_member = function (params, callback) {
    var action = 'Conference/' + params['conference_id'] + '/Member/' + params['member_id'] + '/Mute/';
    delete params.conference_id;
    delete params.member_id;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.unmute_conference_member = function (params, callback) {
    var action = 'Conference/' + params['conference_id'] + '/Member/' + params['member_id'] + '/Mute/';
    delete params.conference_id;
    delete params.member_id;
    var method = 'DELETE';

    request(action, method, params, callback);
};

plivo.kick_conference_member = function (params, callback) {
    var action = 'Conference/' + params['conference_id'] + '/Member/' + params['member_id'] + '/Kick/';
    delete params.conference_id;
    delete params.member_id;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.record_conference = function (params, callback) {
    var action = 'Conference/' + params['conference_id'] + '/Record/';
    delete params.conference_id;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.stop_record_conference = function (params, callback) {
    var action = 'Conference/' + params['conference_id'] + '/Record/';
    delete params.conference_id;
    var method = 'DELETE';

    request(action, method, params, callback);
};


// Accounts

plivo.get_account = function (params, callback) {
    var action = '';
    var method = 'GET';

    request(action, method, params, callback, true);
};

plivo.modify_account = function (params, callback) {
    var action = '';
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.get_subaccounts = function (params, callback) {
    var action = 'Subaccount/';
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.get_subaccount = function (params, callback) {
    var action = 'Subaccount/' + params['subauth_id'] + '/';
    delete params.subauth_id;
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.create_subaccount = function (params, callback) {
    var action = 'Subaccount/';
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.modify_subaccount = function (params, callback) {
    var action = 'Subaccount/' + params['subauth_id'] + '/';
    delete params.subauth_id;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.delete_subaccount = function (params, callback) {
    var action = 'Subaccount/' + params['subauth_id'] + '/';
    delete params.subauth_id;
    var method = 'DELETE';

    request(action, method, params, callback);
};

// Applications

plivo.get_applications = function (params, callback) {
    var action = 'Application/';
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.get_application = function (params, callback) {
    var action = 'Application/' + params['app_id'] + '/';
    delete params.app_id;
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.create_application = function (params, callback) {
    var action = 'Application/';
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.modify_application = function (params, callback) {
    var action = 'Application/' + params['app_id'] + '/';
    delete params.app_id;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.delete_application = function (params, callback) {
    var action = 'Application/' + params['app_id'] + '/';
    delete params.app_id;
    var method = 'DELETE';

    request(action, method, params, callback);
};

// Recordings
plivo.get_recordings = function (params, callback) {
    var action = 'Recording/';
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.get_recording = function (params, callback) {
    var action = 'Recording/' + params['recording_id'] + '/';
    delete params.recording_id;
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.delete_recording = function (params, callback) {
    var action = 'Recording/' + params['recording_id'] + '/';
    delete params.recording_id;
    var method = 'DELETE';

    request(action, method, params, callback);
};

// Endpoints

plivo.get_endpoints = function (params, callback) {
    var action = 'Endpoint/';
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.get_endpoint = function (params, callback) {
    var action = 'Endpoint/' + params['endpoint_id'] + '/';
    delete params.endpoint_id;
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.create_endpoint = function (params, callback) {
    var action = 'Endpoint/';
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.modify_endpoint = function (params, callback) {
    var action = 'Endpoint/' + params['endpoint_id'] + '/';
    delete params.endpoint_id;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.delete_endpoint = function (params, callback) {
    var action = 'Endpoint/' + params['endpoint_id'] + '/';
    delete params.endpoint_id;
    var method = 'DELETE';

    request(action, method, params, callback);
};

// Numbers
plivo.get_numbers = function (params, callback) {
    var action = 'Number/';
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.get_number_details = function (params, callback) {
    var action = 'Number/' + params['number'] + '/';
    delete params.number;
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.unrent_number = function (params, callback) {
    var action = 'Number/' + params['number'] + '/';
    delete params.number;
    var method = 'DELETE';

    request(action, method, params, callback);
};

plivo.get_number_group = function (params, callback) {
    var action = 'AvailableNumberGroup/';
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.get_number_group_details = function (params, callback) {
    var action = 'AvailableNumberGroup/' + params['group_id'] + '/';
    delete params.group_id;
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.rent_from_number_group = function (params, callback) {
    var action = 'AvailableNumberGroup/' + params['group_id'] + '/';
    delete params.group_id;
    var method = 'POST';

    request(action, method, params, callback, true);
};

plivo.edit_number = function (params, callback) {
    var action = 'Number/' + params['number'] + '/';
    delete params.number;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.link_application_number = function (params, callback) {
    this.edit_number(params, callback);
};

plivo.unlink_application_number = function (params, callback) {
    params.app_id = null;
    this.edit_number(params, callback);
};

plivo.search_phone_numbers = function (params, callback) {
    var action = 'PhoneNumber/';
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.buy_phone_number = function (params, callback) {
    var action = 'PhoneNumber/' + params['number'] + '/';
    delete params.number;
    var method = 'POST';

    request(action, method, params, callback, true);
};

// Message
plivo.send_message = function (params, callback) {
    var action = 'Message/';
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.get_messages = function (params, callback) {
    var action = 'Message/';
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.get_message = function (params, callback) {
    var action = 'Message/' + params['record_id'] + '/';
    delete params.record_id;
    var method = 'GET';

    request(action, method, params, callback);
};

// Incoming Carriers
plivo.get_incoming_carriers = function (params, callback) {
    var action = 'IncomingCarrier/';
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.get_incoming_carrier = function (params, callback) {
    var action = 'IncomingCarrier/' + params['carrier_id'] + '/';
    delete params.carrier_id;
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.create_incoming_carrier = function (params, callback) {
    var action = 'IncomingCarrier/';
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.modify_incoming_carrier = function (params, callback) {
    var action = 'IncomingCarrier/' + params['carrier_id'] + '/';
    delete params.carrier_id;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.delete_incoming_carrier = function (params, callback) {
    var action = 'IncomingCarrier/' + params['carrier_id'] + '/';
    delete params.carrier_id;
    var method = 'DELETE';

    request(action, method, params, callback);
};


// Outgoing Carriers
plivo.get_outgoing_carriers = function (params, callback) {
    var action = 'OutgoingCarrier/';
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.get_outgoing_carrier = function (params, callback) {
    var action = 'OutgoingCarrier/' + params['carrier_id'] + '/';
    delete params.carrier_id;
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.create_outgoing_carrier = function (params, callback) {
    var action = 'OutgoingCarrier/';
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.modify_outgoing_carrier = function (params, callback) {
    var action = 'OutgoingCarrier/' + params['carrier_id'] + '/';
    delete params.carrier_id;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.delete_outgoing_carrier = function (params, callback) {
    var action = 'OutgoingCarrier/' + params['carrier_id'] + '/';
    delete params.carrier_id;
    var method = 'DELETE';

    request(action, method, params, callback);
};


// Outgoing Carrier Routings
plivo.get_outgoing_carrier_routings = function (params, callback) {
    var action = 'OutgoingCarrierRouting/';
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.get_outgoing_carrier_routing = function (params, callback) {
    var action = 'OutgoingCarrierRouting/' + params['routing_id'] + '/';
    delete params.routing_id;
    var method = 'GET';

    request(action, method, params, callback);
};

plivo.create_outgoing_carrier_routing = function (params, callback) {
    var action = 'OutgoingCarrierRouting/';
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.modify_outgoing_carrier_routing = function (params, callback) {
    var action = 'OutgoingCarrierRouting/' + params['routing_id'] + '/';
    delete params.routing_id;
    var method = 'POST';

    request(action, method, params, callback);
};

plivo.delete_outgoing_carrier_routing = function (params, callback) {
    var action = 'OutgoingCarrierRouting/' + params['routing_id'] + '/';
    delete params.routing_id;
    var method = 'DELETE';

    request(action, method, params, callback);
};


// Pricing
plivo.get_pricing = function (params, callback) {
    var action = 'Pricing/';
    var method = 'GET';

    request(action, method, params, callback);
};


/**
 * XML Response Generation
 */

// Decalaring a class Response
function Response() {
    this.element = 'Response';
    this.nestables = ['Speak', 'Play', 'GetDigits', 'Record', 'Dial', 'Message',
                     'Redirect', 'Wait', 'Hangup', 'PreAnswer', 'Conference', 'DTMF'];
    this.valid_attributes = [];
    this.elem = doc.begin(this.element);
};

Response.prototype = {
    init: function (name, body, attributes, parent) {
        this.name = name;
        this.body = body;
        this.elem = '';

        if (this.element != 'Response') {
            this.elem.parent = parent;
            this.elem = parent.ele(this.name);
        } else {
            this.elem = this.elem.ele(this.name);
        }

        if (!attributes) {
            var attributes = {};
        }
        var keys = Object.keys(attributes);

        for (var i = 0; i < keys.length; i++) {
            if (this.valid_attributes.indexOf(keys[i]) == -1) {
                throw new PlivoError('Not a valid attribute : "' + keys[i] + '" for "' + this.name + '" Element');
            }
            this.elem.att(keys[i], attributes[keys[i]])
        }

        if (body) {
            this.elem.text(body)
        }
    },

    add: function (new_element, body, attributes) {
        if (body === undefined) {
            throw new PlivoError('No text set for ' + new_element.element + '.');
        }

        if (this.nestables.indexOf(new_element.element) > -1) {
            var parent = this.elem;
        } else {
            throw new PlivoError(new_element.element + ' cannot be nested in ' + this.element + '.');
        }
        new_element.init(new_element.element, body, attributes, parent);
        return new_element;
    },

    addConference: function (body, attributes) {
        return this.add(new Conference(Response), body, attributes);
    },

    addNumber: function (body, attributes) {
        return this.add(new Number(Response), body, attributes);
    },

    addUser: function (body) {
        return this.add(new User(Response), body, {});
    },

    addDial: function (attributes) {
        return this.add(new Dial(Response), '', attributes);
    },

    addGetDigits: function (attributes) {
        return this.add(new GetDigits(Response), '', attributes);
    },

    addHangup: function (attributes) {
        return this.add(new Hangup(Response), '', attributes);
    },

    addMessage: function (body, attributes) {
        return this.add(new Message(Response), body, attributes);
    },

    addPlay: function (body, attributes) {
        return this.add(new Play(Response), body, attributes);
    },

    addPreAnswer: function () {
        return this.add(new PreAnswer(Response), '', {});
    },

    addRecord: function (attributes) {
        return this.add(new Record(Response),'', attributes);
    },

    addRedirect: function (body, attributes) {
        return this.add(new Redirect(Response), body, attributes);
    },

    addSpeak: function (body, attributes) {
        return this.add(new Speak(Response), body, attributes);
    },

    addWait: function (attributes) {
        return this.add(new Wait(Response), '', attributes);
    },

    addDTMF: function (body, attributes) {
        return this.add(new DTMF(Response), body, attributes);
    },

    toXML: function () {
        return this.elem.toString();
    }
}

function Conference(Response) {
    this.element = 'Conference';
    this.valid_attributes = ['muted', 'beep', 'startConferenceOnEnter',
                'endConferenceOnExit', 'waitSound', 'enterSound', 'exitSound',
                'timeLimit', 'hangupOnStar', 'maxMembers', 'record','recordWhenAlone',
                'recordFileFormat', 'action', 'method', 'redirect',
                'digitsMatch', 'callbackUrl', 'callbackMethod', 'stayAlone',
                'floorEvent', 'transcriptionType', 'transcriptionUrl',
                'transcriptionMethod', 'relayDTMF'];
    this.nestables = [];
}
util.inherits(Conference, Response);

function Number(Response) {
    this.element = 'Number';
    this.valid_attributes = ['sendDigits', 'sendOnPreanswer', 'sendDigitsMode'];
    this.nestables = [];
}
util.inherits(Number, Response);

function User(Response) {
    this.element = 'User';
    this.nestables = [];
    this.valid_attributes = ['sendDigits', 'sendOnPreanswer', 'sipHeaders'];
}
util.inherits(User, Response);

function Dial(Response) {
    this.element = 'Dial';
    this.valid_attributes = ['action', 'method', 'timeout', 'hangupOnStar',
                'timeLimit', 'callerId', 'callerName', 'confirmSound',
                'dialMusic', 'confirmKey', 'redirect', 'callbackUrl',
                'callbackMethod', 'digitsMatch', 'digitsMatchBLeg', 'sipHeaders'];
    this.nestables = ['Number', 'User'];
}
util.inherits(Dial, Response);

function GetDigits(Response) {
    this.element = 'GetDigits';
    this.valid_attributes = ['action', 'method', 'timeout', 'digitTimeout',
                'finishOnKey', 'numDigits', 'retries', 'invalidDigitsSound',
                'validDigits', 'playBeep', 'redirect', 'log'];
    this.nestables = ['Speak', 'Play', 'Wait'];
}
util.inherits(GetDigits, Response);

function Hangup(Response) {
    this.element = 'Hangup';
    this.valid_attributes = ['schedule', 'reason'];
    this.nestables = [];
}
util.inherits(Hangup, Response);

function Message(Response) {
    this.element = 'Message';
    this.nestables = [];
    this.valid_attributes = ['src', 'dst', 'type', 'callbackUrl',
                'callbackMethod'];
}
util.inherits(Message, Response);

function Play(Response) {
    this.element = 'Play';
    this.valid_attributes = ['loop'];
    this.nestables = [];
}
util.inherits(Play, Response);

function PreAnswer(Response) {
    this.element = 'PreAnswer';
    this.valid_attributes = [];
    this.nestables = ['Play', 'Speak', 'GetDigits', 'Wait', 'Redirect',
                'Message', 'DTMF'];
}
util.inherits(PreAnswer, Response);

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

function Redirect(Response) {
    this.element = 'Redirect';
    this.valid_attributes = ['method'];
    this.nestables = [];
}
util.inherits(Redirect, Response);

function Speak(Response) {
    this.element = 'Speak';
    this.valid_attributes = ['voice', 'language', 'loop'];
    this.nestables = [];
}
util.inherits(Speak, Response);

function Wait(Response) {
    this.element = 'Wait';
    this.valid_attributes = ['length', 'silence', 'min_silence', 'minSilence', 'beep'];
    this.nestables = [];
}
util.inherits(Wait, Response);

function DTMF(Response) {
    this.element = 'DTMF';
    this.nestables = [];
    this.valid_attributes = ['digits', 'async'];
}

util.inherits(DTMF, Response);

/**
 * Module Exports
 */

exports.Response = function () {
    return new Response();
}

exports.RestAPI = function (config) {
    if (!config) {
        throw new PlivoError('Auth ID and Auth Token must be provided.');
    }

    if (typeof config != 'object') {
        throw new PlivoError('Config for RestAPI must be provided as an object.');
    }

    if (!config.authId || !config.authToken) {
        throw new PlivoError('Auth ID and Auth Token must be provided.');
    }

    // override default config according to the config provided.
    for (key in config) {
        plivo.options[key] = config[key];
    }

    return plivo;
}
