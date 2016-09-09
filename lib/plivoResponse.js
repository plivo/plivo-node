var qs = require('querystring');
var xmlBuilder = require('xmlbuilder');
var util = require('util');

// Decalaring a class Response
function Response() {
  this.element = 'Response';
  this.nestables = ['Speak', 'Play', 'GetDigits', 'Record', 'Dial', 'Message',
    'Redirect', 'Wait', 'Hangup', 'PreAnswer', 'Conference', 'DTMF'];
  this.valid_attributes = [];
  this.elem = xmlBuilder.begin().ele(this.element);
}

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
        throw new plivoError('Not a valid attribute : "' + keys[i] + '" for "' + this.name + '" Element');
      }
      this.elem.att(keys[i], attributes[keys[i]])
    }

    if (body) {
      this.elem.text(body)
    }
  },

  add: function (new_element, body, attributes) {
    if (body === undefined) {
      throw new plivoError('No text set for ' + new_element.element + '.');
    }

    if (this.nestables.indexOf(new_element.element) > -1) {
      var parent = this.elem;
    } else {
      throw new plivoError(new_element.element + ' cannot be nested in ' + this.element + '.');
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
};

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


module.exports = Response;
