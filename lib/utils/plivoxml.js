var qs = require('querystring');
var xmlBuilder = require('xmlbuilder');
var util = require('util');
var plivoUtils = require('./../rest/utils');
import * as Exceptions from './exceptions';

export class PlivoXMLError extends Error { }

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
    return this.add(new Record(Response), '', attributes);
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

    // Convert accented characters to numerical references first
    let accentedCharsList = {
      "Á": "A", "Ă": "A", "Ắ": "A", "Ặ": "A", "Ằ": "A", "Ẳ": "A", "Ẵ": "A", "Ǎ": "A", "Â": "A", "Ấ": "A", "Ậ": "A", "Ầ": "A", "Ẩ": "A", "Ẫ": "A", "Ä": "A", "Ǟ": "A", "Ȧ": "A", "Ǡ": "A", "Ạ": "A", "Ȁ": "A", "À": "A", "Ả": "A", "Ȃ": "A", "Ā": "A", "Ą": "A", "Å": "A", "Ǻ": "A", "Ḁ": "A", "Ⱥ": "A", "Ã": "A", "Ꜳ": "AA", "Æ": "AE", "Ǽ": "AE", "Ǣ": "AE", "Ꜵ": "AO", "Ꜷ": "AU", "Ꜹ": "AV", "Ꜻ": "AV", "Ꜽ": "AY", "Ḃ": "B", "Ḅ": "B", "Ɓ": "B", "Ḇ": "B", "Ƀ": "B", "Ƃ": "B", "Ć": "C", "Č": "C", "Ç": "C", "Ḉ": "C", "Ĉ": "C", "Ċ": "C", "Ƈ": "C", "Ȼ": "C", "Ď": "D", "Ḑ": "D", "Ḓ": "D", "Ḋ": "D", "Ḍ": "D", "Ɗ": "D", "Ḏ": "D", "ǲ": "D", "ǅ": "D", "Đ": "D", "Ƌ": "D", "Ǳ": "DZ", "Ǆ": "DZ", "É": "E", "Ĕ": "E", "Ě": "E", "Ȩ": "E", "Ḝ": "E", "Ê": "E", "Ế": "E", "Ệ": "E", "Ề": "E", "Ể": "E", "Ễ": "E", "Ḙ": "E", "Ë": "E", "Ė": "E", "Ẹ": "E", "Ȅ": "E", "È": "E", "Ẻ": "E", "Ȇ": "E", "Ē": "E", "Ḗ": "E", "Ḕ": "E", "Ę": "E", "Ɇ": "E", "Ẽ": "E", "Ḛ": "E", "Ꝫ": "ET", "Ḟ": "F", "Ƒ": "F", "Ǵ": "G", "Ğ": "G", "Ǧ": "G", "Ģ": "G", "Ĝ": "G", "Ġ": "G", "Ɠ": "G", "Ḡ": "G", "Ǥ": "G", "Ḫ": "H", "Ȟ": "H", "Ḩ": "H", "Ĥ": "H", "Ⱨ": "H", "Ḧ": "H", "Ḣ": "H", "Ḥ": "H", "Ħ": "H", "Í": "I", "Ĭ": "I", "Ǐ": "I", "Î": "I", "Ï": "I", "Ḯ": "I", "İ": "I", "Ị": "I", "Ȉ": "I", "Ì": "I", "Ỉ": "I", "Ȋ": "I", "Ī": "I", "Į": "I", "Ɨ": "I", "Ĩ": "I", "Ḭ": "I", "Ꝺ": "D", "Ꝼ": "F", "Ᵹ": "G", "Ꞃ": "R", "Ꞅ": "S", "Ꞇ": "T", "Ꝭ": "IS", "Ĵ": "J", "Ɉ": "J", "Ḱ": "K", "Ǩ": "K", "Ķ": "K", "Ⱪ": "K", "Ꝃ": "K", "Ḳ": "K", "Ƙ": "K", "Ḵ": "K", "Ꝁ": "K", "Ꝅ": "K", "Ĺ": "L", "Ƚ": "L", "Ľ": "L", "Ļ": "L", "Ḽ": "L", "Ḷ": "L", "Ḹ": "L", "Ⱡ": "L", "Ꝉ": "L", "Ḻ": "L", "Ŀ": "L", "Ɫ": "L", "ǈ": "L", "Ł": "L", "Ǉ": "LJ", "Ḿ": "M", "Ṁ": "M", "Ṃ": "M", "Ɱ": "M", "Ń": "N", "Ň": "N", "Ņ": "N", "Ṋ": "N", "Ṅ": "N", "Ṇ": "N", "Ǹ": "N", "Ɲ": "N", "Ṉ": "N", "Ƞ": "N", "ǋ": "N", "Ñ": "N", "Ǌ": "NJ", "Ó": "O", "Ŏ": "O", "Ǒ": "O", "Ô": "O", "Ố": "O", "Ộ": "O", "Ồ": "O", "Ổ": "O", "Ỗ": "O", "Ö": "O", "Ȫ": "O", "Ȯ": "O", "Ȱ": "O", "Ọ": "O", "Ő": "O", "Ȍ": "O", "Ò": "O", "Ỏ": "O", "Ơ": "O", "Ớ": "O", "Ợ": "O", "Ờ": "O", "Ở": "O", "Ỡ": "O", "Ȏ": "O", "Ꝋ": "O", "Ꝍ": "O", "Ō": "O", "Ṓ": "O", "Ṑ": "O", "Ɵ": "O", "Ǫ": "O", "Ǭ": "O", "Ø": "O", "Ǿ": "O", "Õ": "O", "Ṍ": "O", "Ṏ": "O", "Ȭ": "O", "Ƣ": "OI", "Ꝏ": "OO", "Ɛ": "E", "Ɔ": "O", "Ȣ": "OU", "Ṕ": "P", "Ṗ": "P", "Ꝓ": "P", "Ƥ": "P", "Ꝕ": "P", "Ᵽ": "P", "Ꝑ": "P", "Ꝙ": "Q", "Ꝗ": "Q", "Ŕ": "R", "Ř": "R", "Ŗ": "R", "Ṙ": "R", "Ṛ": "R", "Ṝ": "R", "Ȑ": "R", "Ȓ": "R", "Ṟ": "R", "Ɍ": "R", "Ɽ": "R", "Ꜿ": "C", "Ǝ": "E", "Ś": "S", "Ṥ": "S", "Š": "S", "Ṧ": "S", "Ş": "S", "Ŝ": "S", "Ș": "S", "Ṡ": "S", "Ṣ": "S", "Ṩ": "S", "Ť": "T", "Ţ": "T", "Ṱ": "T", "Ț": "T", "Ⱦ": "T", "Ṫ": "T", "Ṭ": "T", "Ƭ": "T", "Ṯ": "T", "Ʈ": "T", "Ŧ": "T", "Ɐ": "A", "Ꞁ": "L", "Ɯ": "M", "Ʌ": "V", "Ꜩ": "TZ", "Ú": "U", "Ŭ": "U", "Ǔ": "U", "Û": "U", "Ṷ": "U", "Ü": "U", "Ǘ": "U", "Ǚ": "U", "Ǜ": "U", "Ǖ": "U", "Ṳ": "U", "Ụ": "U", "Ű": "U", "Ȕ": "U", "Ù": "U", "Ủ": "U", "Ư": "U", "Ứ": "U", "Ự": "U", "Ừ": "U", "Ử": "U", "Ữ": "U", "Ȗ": "U", "Ū": "U", "Ṻ": "U", "Ų": "U", "Ů": "U", "Ũ": "U", "Ṹ": "U", "Ṵ": "U", "Ꝟ": "V", "Ṿ": "V", "Ʋ": "V", "Ṽ": "V", "Ꝡ": "VY", "Ẃ": "W", "Ŵ": "W", "Ẅ": "W", "Ẇ": "W", "Ẉ": "W", "Ẁ": "W", "Ⱳ": "W", "Ẍ": "X", "Ẋ": "X", "Ý": "Y", "Ŷ": "Y", "Ÿ": "Y", "Ẏ": "Y", "Ỵ": "Y", "Ỳ": "Y", "Ƴ": "Y", "Ỷ": "Y", "Ỿ": "Y", "Ȳ": "Y", "Ɏ": "Y", "Ỹ": "Y", "Ź": "Z", "Ž": "Z", "Ẑ": "Z", "Ⱬ": "Z", "Ż": "Z", "Ẓ": "Z", "Ȥ": "Z", "Ẕ": "Z", "Ƶ": "Z", "Ĳ": "IJ", "Œ": "OE", "ᴀ": "A", "ᴁ": "AE", "ʙ": "B", "ᴃ": "B", "ᴄ": "C", "ᴅ": "D", "ᴇ": "E", "ꜰ": "F", "ɢ": "G", "ʛ": "G", "ʜ": "H", "ɪ": "I", "ʁ": "R", "ᴊ": "J", "ᴋ": "K", "ʟ": "L", "ᴌ": "L", "ᴍ": "M", "ɴ": "N", "ᴏ": "O", "ɶ": "OE", "ᴐ": "O", "ᴕ": "OU", "ᴘ": "P", "ʀ": "R", "ᴎ": "N", "ᴙ": "R", "ꜱ": "S", "ᴛ": "T", "ⱻ": "E", "ᴚ": "R", "ᴜ": "U", "ᴠ": "V", "ᴡ": "W", "ʏ": "Y", "ᴢ": "Z", "á": "a", "ă": "a", "ắ": "a", "ặ": "a", "ằ": "a", "ẳ": "a", "ẵ": "a", "ǎ": "a", "â": "a", "ấ": "a", "ậ": "a", "ầ": "a", "ẩ": "a", "ẫ": "a", "ä": "a", "ǟ": "a", "ȧ": "a", "ǡ": "a", "ạ": "a", "ȁ": "a", "à": "a", "ả": "a", "ȃ": "a", "ā": "a", "ą": "a", "ᶏ": "a", "ẚ": "a", "å": "a", "ǻ": "a", "ḁ": "a", "ⱥ": "a", "ã": "a", "ꜳ": "aa", "æ": "ae", "ǽ": "ae", "ǣ": "ae", "ꜵ": "ao", "ꜷ": "au", "ꜹ": "av", "ꜻ": "av", "ꜽ": "ay", "ḃ": "b", "ḅ": "b", "ɓ": "b", "ḇ": "b", "ᵬ": "b", "ᶀ": "b", "ƀ": "b", "ƃ": "b", "ɵ": "o", "ć": "c", "č": "c", "ç": "c", "ḉ": "c", "ĉ": "c", "ɕ": "c", "ċ": "c", "ƈ": "c", "ȼ": "c", "ď": "d", "ḑ": "d", "ḓ": "d", "ȡ": "d", "ḋ": "d", "ḍ": "d", "ɗ": "d", "ᶑ": "d", "ḏ": "d", "ᵭ": "d", "ᶁ": "d", "đ": "d", "ɖ": "d", "ƌ": "d", "ı": "i", "ȷ": "j", "ɟ": "j", "ʄ": "j", "ǳ": "dz", "ǆ": "dz", "é": "e", "ĕ": "e", "ě": "e", "ȩ": "e", "ḝ": "e", "ê": "e", "ế": "e", "ệ": "e", "ề": "e", "ể": "e", "ễ": "e", "ḙ": "e", "ë": "e", "ė": "e", "ẹ": "e", "ȅ": "e", "è": "e", "ẻ": "e", "ȇ": "e", "ē": "e", "ḗ": "e", "ḕ": "e", "ⱸ": "e", "ę": "e", "ᶒ": "e", "ɇ": "e", "ẽ": "e", "ḛ": "e", "ꝫ": "et", "ḟ": "f", "ƒ": "f", "ᵮ": "f", "ᶂ": "f", "ǵ": "g", "ğ": "g", "ǧ": "g", "ģ": "g", "ĝ": "g", "ġ": "g", "ɠ": "g", "ḡ": "g", "ᶃ": "g", "ǥ": "g", "ḫ": "h", "ȟ": "h", "ḩ": "h", "ĥ": "h", "ⱨ": "h", "ḧ": "h", "ḣ": "h", "ḥ": "h", "ɦ": "h", "ẖ": "h", "ħ": "h", "ƕ": "hv", "í": "i", "ĭ": "i", "ǐ": "i", "î": "i", "ï": "i", "ḯ": "i", "ị": "i", "ȉ": "i", "ì": "i", "ỉ": "i", "ȋ": "i", "ī": "i", "į": "i", "ᶖ": "i", "ɨ": "i", "ĩ": "i", "ḭ": "i", "ꝺ": "d", "ꝼ": "f", "ᵹ": "g", "ꞃ": "r", "ꞅ": "s", "ꞇ": "t", "ꝭ": "is", "ǰ": "j", "ĵ": "j", "ʝ": "j", "ɉ": "j", "ḱ": "k", "ǩ": "k", "ķ": "k", "ⱪ": "k", "ꝃ": "k", "ḳ": "k", "ƙ": "k", "ḵ": "k", "ᶄ": "k", "ꝁ": "k", "ꝅ": "k", "ĺ": "l", "ƚ": "l", "ɬ": "l", "ľ": "l", "ļ": "l", "ḽ": "l", "ȴ": "l", "ḷ": "l", "ḹ": "l", "ⱡ": "l", "ꝉ": "l", "ḻ": "l", "ŀ": "l", "ɫ": "l", "ᶅ": "l", "ɭ": "l", "ł": "l", "ǉ": "lj", "ſ": "s", "ẜ": "s", "ẛ": "s", "ẝ": "s", "ḿ": "m", "ṁ": "m", "ṃ": "m", "ɱ": "m", "ᵯ": "m", "ᶆ": "m", "ń": "n", "ň": "n", "ņ": "n", "ṋ": "n", "ȵ": "n", "ṅ": "n", "ṇ": "n", "ǹ": "n", "ɲ": "n", "ṉ": "n", "ƞ": "n", "ᵰ": "n", "ᶇ": "n", "ɳ": "n", "ñ": "n", "ǌ": "nj", "ó": "o", "ŏ": "o", "ǒ": "o", "ô": "o", "ố": "o", "ộ": "o", "ồ": "o", "ổ": "o", "ỗ": "o", "ö": "o", "ȫ": "o", "ȯ": "o", "ȱ": "o", "ọ": "o", "ő": "o", "ȍ": "o", "ò": "o", "ỏ": "o", "ơ": "o", "ớ": "o", "ợ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ȏ": "o", "ꝋ": "o", "ꝍ": "o", "ⱺ": "o", "ō": "o", "ṓ": "o", "ṑ": "o", "ǫ": "o", "ǭ": "o", "ø": "o", "ǿ": "o", "õ": "o", "ṍ": "o", "ṏ": "o", "ȭ": "o", "ƣ": "oi", "ꝏ": "oo", "ɛ": "e", "ᶓ": "e", "ɔ": "o", "ᶗ": "o", "ȣ": "ou", "ṕ": "p", "ṗ": "p", "ꝓ": "p", "ƥ": "p", "ᵱ": "p", "ᶈ": "p", "ꝕ": "p", "ᵽ": "p", "ꝑ": "p", "ꝙ": "q", "ʠ": "q", "ɋ": "q", "ꝗ": "q", "ŕ": "r", "ř": "r", "ŗ": "r", "ṙ": "r", "ṛ": "r", "ṝ": "r", "ȑ": "r", "ɾ": "r", "ᵳ": "r", "ȓ": "r", "ṟ": "r", "ɼ": "r", "ᵲ": "r", "ᶉ": "r", "ɍ": "r", "ɽ": "r", "ↄ": "c", "ꜿ": "c", "ɘ": "e", "ɿ": "r", "ś": "s", "ṥ": "s", "š": "s", "ṧ": "s", "ş": "s", "ŝ": "s", "ș": "s", "ṡ": "s", "ṣ": "s", "ṩ": "s", "ʂ": "s", "ᵴ": "s", "ᶊ": "s", "ȿ": "s", "ɡ": "g", "ᴑ": "o", "ᴓ": "o", "ᴝ": "u", "ť": "t", "ţ": "t", "ṱ": "t", "ț": "t", "ȶ": "t", "ẗ": "t", "ⱦ": "t", "ṫ": "t", "ṭ": "t", "ƭ": "t", "ṯ": "t", "ᵵ": "t", "ƫ": "t", "ʈ": "t", "ŧ": "t", "ᵺ": "th", "ɐ": "a", "ᴂ": "ae", "ǝ": "e", "ᵷ": "g", "ɥ": "h", "ʮ": "h", "ʯ": "h", "ᴉ": "i", "ʞ": "k", "ꞁ": "l", "ɯ": "m", "ɰ": "m", "ᴔ": "oe", "ɹ": "r", "ɻ": "r", "ɺ": "r", "ⱹ": "r", "ʇ": "t", "ʌ": "v", "ʍ": "w", "ʎ": "y", "ꜩ": "tz", "ú": "u", "ŭ": "u", "ǔ": "u", "û": "u", "ṷ": "u", "ü": "u", "ǘ": "u", "ǚ": "u", "ǜ": "u", "ǖ": "u", "ṳ": "u", "ụ": "u", "ű": "u", "ȕ": "u", "ù": "u", "ủ": "u", "ư": "u", "ứ": "u", "ự": "u", "ừ": "u", "ử": "u", "ữ": "u", "ȗ": "u", "ū": "u", "ṻ": "u", "ų": "u", "ᶙ": "u", "ů": "u", "ũ": "u", "ṹ": "u", "ṵ": "u", "ᵫ": "ue", "ꝸ": "um", "ⱴ": "v", "ꝟ": "v", "ṿ": "v", "ʋ": "v", "ᶌ": "v", "ⱱ": "v", "ṽ": "v", "ꝡ": "vy", "ẃ": "w", "ŵ": "w", "ẅ": "w", "ẇ": "w", "ẉ": "w", "ẁ": "w", "ⱳ": "w", "ẘ": "w", "ẍ": "x", "ẋ": "x", "ᶍ": "x", "ý": "y", "ŷ": "y", "ÿ": "y", "ẏ": "y", "ỵ": "y", "ỳ": "y", "ƴ": "y", "ỷ": "y", "ỿ": "y", "ȳ": "y", "ẙ": "y", "ɏ": "y", "ỹ": "y", "ź": "z", "ž": "z", "ẑ": "z", "ʑ": "z", "ⱬ": "z", "ż": "z", "ẓ": "z", "ȥ": "z", "ẕ": "z", "ᵶ": "z", "ᶎ": "z", "ʐ": "z", "ƶ": "z", "ɀ": "z", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl", "ﬁ": "fi", "ﬂ": "fl", "ĳ": "ij", "œ": "oe", "ﬆ": "st", "ₐ": "a", "ₑ": "e", "ᵢ": "i", "ⱼ": "j", "ₒ": "o", "ᵣ": "r", "ᵤ": "u", "ᵥ": "v", "ₓ": "x"

    };
    let newBody = '';
    for (var i = 0; i < body.length; i++) {
      if (accentedCharsList[body[i]]) {
        newBody += '&#' + body.charCodeAt(i) + ';';
      } else {
        newBody += body[i];
      }
    }
    body = newBody;

    // If attributes not provided, use empty dictionary
    if (!attributes) {
      attributes = {};
    }

    // Validate voice first.
    if (!attributes.voice) {
      attributes.voice = 'WOMAN';
    }
    if (!attributes.language) {
      attributes.language = 'English';
    }

    var item = this;
    return new Promise(function (resolve, reject) {
      plivoUtils.validateVoiceForSsml(body, attributes.voice, attributes.language).then(function (ssmlValidationResult) {
        // console.log('result...', ssmlValidationResult);
        if (ssmlValidationResult.success == true) {
          var result = item.add(new Speak(Response), body, attributes);
          resolve(result);
        } else {
          reject(new Exceptions.PlivoXMLValidationError(ssmlValidationResult.msg));
        }
      }).catch(function (err) {
        // console.log('validation error result...', err);
        reject(err);
      });
    });



    // plivoUtils.validateVoiceForSsml(body, attributes.voice, attributes.language).then(function (validationResult) {
    //   console.log('===> validation result', validationResult);
    //   if (!validationResult.success) {
    //     throw new Exceptions.PlivoXMLValidationError(validationResult.msg);
    //     return;
    //   }
    //   console.log('body is ', body);
    //   return item.add(new Speak(Response), body, attributes);
    // });
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
    'timeLimit', 'hangupOnStar', 'maxMembers', 'record', 'recordWhenAlone',
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

