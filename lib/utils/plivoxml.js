var qs = require('querystring');
var xmlBuilder = require('xmlbuilder');
var util = require('util');

export class PlivoXMLError extends Error {}

/**
 * Response element
 * @constructor
 */
export function Response() {
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

    if (this.element !== 'Response') {
      this.elem = parent.ele(this.name);
      this.elem.parent = parent;
    } else {
      this.elem = this.elem.ele(this.name);
    }

    if (!attributes) {
      var attributes = {};
    }
    var keys = Object.keys(attributes);

    for (var i = 0; i < keys.length; i++) {
      if (this.valid_attributes.indexOf(keys[i]) === -1) {
        throw new PlivoXMLError('Not a valid attribute : "' + keys[i] + '" for "' + this.name + '" Element');
      }
      this.elem.att(keys[i], attributes[keys[i]])
    }

    if (body) {
      this.elem.text(body)
    }
  },

  add: function (new_element, body, attributes) {
    if (body == null) {
      throw new PlivoXMLError('No text set for ' + new_element.element + '.');
    }

    if (this.nestables.indexOf(new_element.element) > -1) {
      var parent = this.elem;
    } else {
      throw new PlivoXMLError(new_element.element + ' cannot be nested in ' + this.element + '.');
    }
    new_element.init(new_element.element, body, attributes, parent);
    return new_element;
  },

  /**
   * Add a Conference element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {boolean} [attributes.muted]
   * @param {string} [attributes.enterSound]
   * @param {string} [attributes.exitSound]
   * @param {boolean} [attributes.startConferenceOnEnter]
   * @param {boolean} [attributes.endConferenceOnExit]
   * @param {boolean} [attributes.stayAlone]
   * @param {string} [attributes.waitSound]
   * @param {number} [attributes.maxMembers]
   * @param {boolean} [attributes.record]
   * @param {string} [attributes.recordFileFormat]
   * @param {number} [attributes.timeLimit]
   * @param {boolean} [attributes.hangupOnStar]
   * @param {string} [attributes.action]
   * @param {string} [attributes.method]
   * @param {string} [attributes.callbackUrl]
   * @param {string} [attributes.callbackMethod]
   * @param {string} [attributes.digitsMatch]
   * @param {boolean} [attributes.floorEvent]
   * @param {boolean} [attributes.redirect]
   * @param {boolean} [attributes.relayDTMF]
   */
  addConference: function (body, attributes) {
    return this.add(new Conference(Response), body, attributes);
  },

  /**
   * Add a Number element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.sendDigits]
   * @param {boolean} [attributes.sendOnPreanswer]
   */
  addNumber: function (body, attributes) {
    return this.add(new Number(Response), body, attributes);
  },

  /**
   * Add a User element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.sendDigits]
   * @param {boolean} [attributes.sendOnPreanswer]
   * @param {string} [attributes.sipHeaders]
   */
  addUser: function (body, attributes) {
    return this.add(new User(Response), body, attributes);
  },

  /**
   * Add a Dial element
   * @method
   * @param {object} attributes
   * @param {string} [attributes.action]
   * @param {string} [attributes.method]
   * @param {boolean} [attributes.hangupOnStar]
   * @param {number} [attributes.timeLimit]
   * @param {number} [attributes.timeout]
   * @param {string} [attributes.callerID]
   * @param {string} [attributes.callerName]
   * @param {string} [attributes.confirmSound]
   * @param {string} [attributes.confirmKey]
   * @param {string} [attributes.dialMusic]
   * @param {string} [attributes.callbackUrl]
   * @param {string} [attributes.callbackMethod]
   * @param {boolean} [attributes.redirect]
   * @param {string} [attributes.digitsMatch]
   * @param {string} [attributes.digitsMatchBLeg]
   * @param {string} [attributes.sipHeaders]
   */
  addDial: function (attributes) {
    return this.add(new Dial(Response), '', attributes);
  },

  /**
   * Add a GetDigits element
   * @method
   * @param {object} attributes
   * @param {string} [attributes.action]
   * @param {string} [attributes.method]
   * @param {number} [attributes.timeout]
   * @param {number} [attributes.digitTimeout]
   * @param {string} [attributes.finishOnKey]
   * @param {number} [attributes.numDigits]
   * @param {number} [attributes.retries]
   * @param {boolean} [attributes.redirect]
   * @param {boolean} [attributes.playBeep]
   * @param {string} [attributes.validDigits]
   * @param {string} [attributes.invalidDigitsSound]
   * @param {boolean} [attributes.log]
   */
  addGetDigits: function (attributes) {
    return this.add(new GetDigits(Response), '', attributes);
  },

  /**
   * Add a Hangup element
   * @method
   * @param {object} attributes
   * @param {string} [attributes.reason]
   * @param {number} [attributes.schedule]
   */
  addHangup: function (attributes) {
    return this.add(new Hangup(Response), '', attributes);
  },

  /**
   * Add a Message element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.src]
   * @param {string} [attributes.dst]
   * @param {string} [attributes.type]
   * @param {string} [attributes.callbackUrl]
   * @param {string} [attributes.callbackMethod]
   */
  addMessage: function (body, attributes) {
    return this.add(new Message(Response), body, attributes);
  },

  /**
   * Add a Play element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {number} [attributes.loop]
   */
  addPlay: function (body, attributes) {
    return this.add(new Play(Response), body, attributes);
  },

  /**
   * Add a PreAnswer element
   * @method
   */
  addPreAnswer: function () {
    return this.add(new PreAnswer(Response), '', {});
  },

  /**
   * Add a Record element
   * @method
   * @param {object} attributes
   * @param {string} [attributes.action]
   * @param {string} [attributes.method]
   * @param {string} [attributes.fileFormat]
   * @param {boolean} [attributes.redirect]
   * @param {number} [attributes.timeout]
   * @param {number} [attributes.maxLength]
   * @param {boolean} [attributes.playBeep]
   * @param {string} [attributes.finishOnKey]
   * @param {boolean} [attributes.recordSession]
   * @param {boolean} [attributes.startOnDialAnswer]
   * @param {string} [attributes.transcriptionType]
   * @param {string} [attributes.transcriptionUrl]
   * @param {string} [attributes.transcriptionMethod]
   * @param {string} [attributes.callbackUrl]
   * @param {string} [attributes.callbackMethod]
   */
  addRecord: function (attributes) {
    return this.add(new Record(Response),'', attributes);
  },

  /**
   * Add a Redirect element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.method]
   */
  addRedirect: function (body, attributes) {
    return this.add(new Redirect(Response), body, attributes);
  },

  /**
   * Add a Speak element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {string} [attributes.voice]
   * @param {string} [attributes.language]
   * @param {number} [attributes.loop]
   */
  addSpeak: function (body, attributes) {
    return this.add(new Speak(Response), body, attributes);
  },

  /**
   * Add a Wait element
   * @method
   * @param {object} attributes
   * @param {number} [attributes.length]
   * @param {boolean} [attributes.silence]
   * @param {number} [attributes.minSilence]
   * @param {boolean} [attributes.beep]
   */
  addWait: function (attributes) {
    return this.add(new Wait(Response), '', attributes);
  },

  /**
   * Add a DTMF element
   * @method
   * @param {string} body
   * @param {object} attributes
   * @param {boolean} [attributes.async]
   */
  addDTMF: function (body, attributes) {
    return this.add(new DTMF(Response), body, attributes);
  },

  toXML: function () {
    return this.elem.toString();
  }
};

/**
 * Conference element
 * @constructor
 */
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

/**
 * Number element
 * @constructor
 */
function Number(Response) {
  this.element = 'Number';
  this.valid_attributes = ['sendDigits', 'sendOnPreanswer', 'sendDigitsMode'];
  this.nestables = [];
}
util.inherits(Number, Response);

/**
 * User element
 * @constructor
 */
function User(Response) {
  this.element = 'User';
  this.nestables = [];
  this.valid_attributes = ['sendDigits', 'sendOnPreanswer', 'sipHeaders'];
}
util.inherits(User, Response);

/**
 * Dial element
 * @constructor
 */
function Dial(Response) {
  this.element = 'Dial';
  this.valid_attributes = ['action', 'method', 'timeout', 'hangupOnStar',
    'timeLimit', 'callerId', 'callerName', 'confirmSound',
    'dialMusic', 'confirmKey', 'redirect', 'callbackUrl',
    'callbackMethod', 'digitsMatch', 'digitsMatchBLeg', 'sipHeaders'];
  this.nestables = ['Number', 'User'];
}
util.inherits(Dial, Response);

/**
 * GetDigits element
 * @constructor
 */
function GetDigits(Response) {
  this.element = 'GetDigits';
  this.valid_attributes = ['action', 'method', 'timeout', 'digitTimeout',
    'finishOnKey', 'numDigits', 'retries', 'invalidDigitsSound',
    'validDigits', 'playBeep', 'redirect', 'log'];
  this.nestables = ['Speak', 'Play', 'Wait'];
}
util.inherits(GetDigits, Response);

/**
 * Hangup element
 * @constructor
 */
function Hangup(Response) {
  this.element = 'Hangup';
  this.valid_attributes = ['schedule', 'reason'];
  this.nestables = [];
}
util.inherits(Hangup, Response);

/**
 * Message element
 * @constructor
 */
function Message(Response) {
  this.element = 'Message';
  this.nestables = [];
  this.valid_attributes = ['src', 'dst', 'type', 'callbackUrl',
    'callbackMethod'];
}
util.inherits(Message, Response);

/**
 * Play element
 * @constructor
 */
function Play(Response) {
  this.element = 'Play';
  this.valid_attributes = ['loop'];
  this.nestables = [];
}
util.inherits(Play, Response);

/**
 * PreAnswer element
 * @constructor
 */
function PreAnswer(Response) {
  this.element = 'PreAnswer';
  this.valid_attributes = [];
  this.nestables = ['Play', 'Speak', 'GetDigits', 'Wait', 'Redirect',
    'Message', 'DTMF'];
}
util.inherits(PreAnswer, Response);

/**
 * Record element
 * @constructor
 */
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

/**
 * Redirect element
 * @constructor
 */
function Redirect(Response) {
  this.element = 'Redirect';
  this.valid_attributes = ['method'];
  this.nestables = [];
}
util.inherits(Redirect, Response);

/**
 * Speak element
 * @constructor
 */
function Speak(Response) {
  this.element = 'Speak';
  this.valid_attributes = ['voice', 'language', 'loop'];
  this.nestables = [];
}
util.inherits(Speak, Response);

/**
 * Wait element
 * @constructor
 */
function Wait(Response) {
  this.element = 'Wait';
  this.valid_attributes = ['length', 'silence', 'min_silence', 'minSilence', 'beep'];
  this.nestables = [];
}
util.inherits(Wait, Response);

/**
 * DTMF element
 * @constructor
 */
function DTMF(Response) {
  this.element = 'DTMF';
  this.nestables = [];
  this.valid_attributes = ['digits', 'async'];
}

util.inherits(DTMF, Response);

