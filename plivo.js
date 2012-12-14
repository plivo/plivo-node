//Get required modules.....
var util = require('util');
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

//Define a new error object..... 
function PlivoError (msg) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.message = msg;
  this.name = 'PlivoError';
};

PlivoError.prototype.__proto__ = Error.prototype;


//Main request function.....
var request = function (action, method, params, callback) {
  var err = null;
  var path = 'https://' + plivo.options.host + '/' +				
			plivo.options.version + '/Account/' + 
			plivo.options.authId + '/' + action ;

  var auth = 'Basic ' + new Buffer(plivo.options.authId + ':' + 
					plivo.options.authToken).toString('base64');

  var headers = {'Authorization': auth, 'User-Agent': UserAgent, 'Content-Type':'application/json'};

  if (method == 'POST') {
	  var body = JSON.stringify(params)

	  Request.post({
		uri: path,
		body: body,
		headers: headers,
		json: true,
		}, function(error, response, body) {
		if(response.statusCode != 201) {
		  err = new PlivoError(error);
		}
		callback(response.statusCode, body);
	  });
  }

  else if (method == 'GET') {
	  query_string = qs.stringify(params);
	  Request.get({
		uri: path,
		qs: query_string,
		headers: headers,
		}, function(error, response, body) {
		callback(response.statusCode,body);
		});
  }

  else if (method == 'DELETE') {
	  Request.del({
		uri: path,
		headers: headers,
		}, function(error, response, body) {
		callback(response.statusCode,body);
		});
  }

  else if (method == 'PUT') {
	  var body = JSON.stringify(params)
	  Request.put({
		uri: path,
		body: body,
		headers: headers,
		json: true,
		}, function(error, response, body) {
		callback(response.statusCode,body);
		});
  }
};


//Calls.....
plivo.make_call = function (params, callback) {   
	var action = 'Call/';
	var method = 'POST';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.transfer_call = function (params, callback) {
	var action = 'Call/' + params['call_uuid'] + '/';
	delete params.call_uuid;
	var method = 'POST';

	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.hangup_all_calls = function (callback) {
	var action = 'Call/';
	var method = 'DELETE';

	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.hangup_call = function (params, callback) {
	var action = 'Call/' + params['call_uuid'] + '/';
	delete params.call_uuid;
	var method = 'DELETE';

	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.record = function (params, callback) {  
	var action = 'Call/' + params['call_uuid'] + '/Record/';
	delete params.call_uuid;
	var method = 'POST';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.record_stop = function (params, callback) {
	var action = 'Call/' + params['call_uuid'] + '/Record/';
	delete params.call_uuid;
	var method = 'DELETE';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.play = function (params, callback) {
	var action = 'Call/' + params['call_uuid'] + '/Play/';
	delete params.call_uuid;
	var method = 'POST';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.play_stop = function (params, callback) {
	var action = 'Call/' + params['call_uuid'] + '/Play/';
	delete params.call_uuid;
	var method = 'DELETE';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.speak = function (params, callback) {
	var action = 'Call/' + params['call_uuid'] + '/Speak/';
	delete params.call_uuid;
	var method = 'POST';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.send_digits = function (params, callback) {
	var action = 'Call/' + params['call_uuid'] + '/DTMF/';
	delete params.call_uuid;
	var method = 'POST';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

// Request.....

plivo.hangup_request = function (params, callback) {
	var action = 'Call/' + params['request_uuid'] + '/';
	delete params.call_uuid;
	var method = 'DELETE';
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

// Conferences......

plivo.get_live_conferences = function (params, callback) { 
	var action = 'Conference/';
	var method = 'GET';

	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.get_live_conference = function (params, callback) {		
	var action = 'Conference/' + params['conference_id'] + '/';
	delete params.conference_id;
	var method = 'GET';

	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.hangup_all_conferences = function (params, callback) { 
	var action = 'Conference/';
	var method = 'DELETE';

	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.hangup_conference = function (params, callback) {
	var action = 'Conference/' + params['conference_id'] + '/';
	delete params.conference_id;
	var method = 'DELETE';

	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.hangup_conference_member = function (params, callback) { 
	var action = 'Conference/' + params['conference_id'] + '/Member/' +
					params['member_id'] + '/';
	delete params.conference_id;
	delete params.member_id;
	var method = 'DELETE';

	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.play_conference_member = function (params, callback) {   
	var action = 'Conference/' + params['conference_id'] + '/Member/' +
					params['member_id'] + '/Play/';
	delete params.conference_id;
	delete params.member_id;
	var method = 'POST';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.stop_play_conference_member = function (params, callback) {	
	var action = 'Conference/' + params['conference_id'] + '/Member/' +
					params['member_id'] + '/Play';
	delete params.conference_id;
	delete params.member_id;
	var method = 'DELETE';

	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.speak_conference_member = function (params, callback) { 
	var action = 'Conference/' + params['conference_id'] + '/Member/' +
					params['member_id'] + '/Speak/';
	delete params.conference_id;
	delete params.member_id;
	var method = 'POST';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.deaf_conference_member = function (params, callback) {  
	var action = 'Conference/' + params['conference_id'] + '/Member/' +
					params['member_id'] + '/Deaf/';
	delete params.conference_id;
	delete params.member_id;
	var method = 'POST';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.undeaf_conference_member = function (params, callback) {	
	var action = 'Conference/' + params['conference_id'] + '/Member/' +
					params['member_id'] + '/Deaf/';
	delete params.conference_id;
	delete params.member_id;
	var method = 'DELETE';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.mute_conference_member = function (params, callback) {  
	var action = 'Conference/' + params['conference_id'] + '/Member/' +
					params['member_id'] + '/Mute/';
	delete params.conference_id;
	delete params.member_id;
	var method = 'POST';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.unmute_conference_member = function (params, callback) { 
	var action = 'Conference/' + params['conference_id'] + '/Member/' +
					params['member_id'] + '/Mute/';
	delete params.conference_id;
	delete params.member_id;
	var method = 'DELETE';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.kick_conference_member = function (params, callback) {  
	var action = 'Conference/' + params['conference_id'] + '/Member/' +
					params['member_id'] + '/Kick/';
	delete params.conference_id;
	delete params.member_id;
	var method = 'POST';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.record_conference = function (params, callback) {
	var action = 'Conference/' + params['conference_id'] + '/Record/';
	delete params.conference_id;
	var method = 'POST';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.stop_record_conference = function (params, callback) {
	var action = 'Conference/' + params['conference_id'] + '/Record/';
	delete params.conference_id;
	var method = 'DELETE';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};


// Accounts.....

plivo.get_account = function (params, callback) {  
	var action = '';
	var method = 'GET';

	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.modify_account = function (params, callback) {
	var action = '';
	var method = 'POST';
	
	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.get_subaccounts = function (params, callback) {  
	var action = 'Subaccount/';
	var method = 'GET';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.get_subaccount = function (params, callback) {  
	var action = 'Subaccount/' + params['subauth_id'] + '/';
	delete params.subauth_id;
	var method = 'GET';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.create_subaccount = function (params, callback) {  
	var action = 'Subaccount/';
	var method = 'POST';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.modify_subaccount = function (params, callback) {
	var action = 'Subaccount/' + params['subauth_id'] + '/';
	delete params.subauth_id;
	var method = 'GET';

	request(action, method, params, function(err, response) {
		callback(err, response);
	});
};

plivo.delete_subaccount = function (params, callback) {
	var action = 'Subaccount/' + params['subauth_id'] + '/';
	delete params.subauth_id;
	var method = 'DELETE';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

// Applications.....

plivo.get_applications = function (params, callback) { 
	var action = 'Application/';
	var method = 'GET';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.get_application = function (params, callback) {  
	var action = 'Application/' + params['app_id'] + '/';
	var method = 'GET';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.create_application = function (params, callback) {
	var action = 'Application/';
	var method = 'POST';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.modify_application = function (params, callback) {
	var action = 'Application/' + params['app_id'] + '/';
	var method = 'POST';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.delete_application = function (params, callback) {
	var action = 'Application/' + params['app_id'] + '/';
	var method = 'DELETE';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

// Recordings.....
plivo.get_recordings = function (params, callback) {
	var action = 'Recording/';
	var method = 'GET';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.get_recordings = function (params, callback) {
	var action = 'Recording/' + params['recording_id'] + '/';
	var method = 'GET';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

// Endpoints.....

plivo.get_endpoints = function (params, callback) {
	var action = 'Endpoint/';
	var method = 'GET';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.get_endpoint = function (params, callback) {
	var action = 'Endpoint/' + params['endpoint_id'] + '/';
	var method = 'GET';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.create_endpoint = function (params, callback) {
	var action = 'Endpoint/';
	var method = 'POST';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.modify_endpoint = function (params, callback) {
	var action = 'Endpoint/' + params['endpoint_id'] + '/';
	var method = 'POST';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.delete_endpoint = function (params, callback) {
	var action = 'Endpoint/' + params['endpoint_id'] + '/';
	var method = 'DELETE';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

// Numbers.....
plivo.get_numbers = function (params, callback) {
	var action = 'Number/';
	var method = 'GET';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.get_rented_number_details = function (params, callback) {
	var action = 'Number/' + params['number'] + '/';
	var method = 'GET';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.unrent_number = function (params, callback) {
	var action = 'Number/' + params['number'] + '/';
	var method = 'DELETE';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.get_number_group = function (params, callback) {
	var action = 'AvailableNumberGroup/';
	var method = 'GET';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.get_number_group_details = function (params, callback) {
	var action = 'AvailableNumberGroup/' + params['group_id'] + '/';
	var method = 'GET';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.rent_from_number_group = function (params, callback) {
	var action = 'AvailableNumberGroup/' + params['group_id'] + '/';
	var method = 'POST';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.edit_rented_number = function (params, callback) {
	var action = 'Number/' + params['number'] + '/';
	var method = 'POST';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

// Message.....
plivo.send_message = function (params, callback) {
	var action = 'Message/';
	var method = 'POST';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.get_messages = function (params, callback) {
	var action = 'Message/';
	var method = 'GET';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

plivo.get_message = function (params, callback) {
	var action = 'Message/' + params['record_id'] + '/';
	var method = 'GET';

	request(action, method, params, function (err, response) {
		callback(err, response);
	});
};

// XML Generation.....
GLOBAL.Docs = doc.begin('Response');

// Decalaring a class Response
function Response() {
	this.nestables = [];
	valid_attributes = [];
	elem = '';
	errmsg = '';
};

Response.prototype = {

	init : function(name, body, attributes, valid_attributes) {
		this.name = name;
		this.body = body;
		this.elem = '';

	   	if (nestables.indexOf(this.name)>-1) {
	   		this.elem.parent = elem;
    		this.elem = elem.ele(this.name)
     	}
     	else {
       		this.elem = Docs.ele(this.name)
       	}

     	var keys = Object.keys(attributes);
		 
		for (var i=0; i<keys.length; i++) {
			if (this.valid_attributes.indexOf(keys[i]) == -1) {
				errmsg = 'Not a valid attribute : "' +  keys[i] + '"  for "' + this.name + '" Element';
				return errmsg;
			}
     		this.elem.att(keys[i],attributes[keys[i]])
     	}	
     	this.elem.text(body)
	},

	addConference: function(body, attributes) {
		if(this.nestables.indexOf('Conference')>-1) {
			elem = this.elem;
    	}
		nestables = this.nestables;
		var conference = new Conference(Response);
		conference.init(conference.element,body, attributes);
		return conference;
	},
	addNumber : function(body) {
		if(this.nestables.indexOf('Number')>-1) {
			elem = this.elem;
			var attributes = [];
			nestables = this.nestables;
			var number = new Number(Response);
			number.init(number.element, body, attributes);
			return number;
    	}
    	else {
    		errmsg = 'Number Cannot be nested under Response';
    	}
	},
	addUser : function(body) {
		if(this.nestables.indexOf('User')>-1) {
			elem = this.elem;
			var attributes = [];
			nestables = this.nestables;
			var user = new User(Response);
			user.init(user.element, body, attributes);
			return user;
    	}
    	else {
    		errmsg = 'User Cannot be nested under Response';
    	}
	},
	addDial : function(attributes) {
		if(this.nestables.indexOf('Dial')>-1) {
			elem = this.elem;
    	}
		var body = '';
		nestables = this.nestables;
		var dial = new Dial(Response);
		dial.init(dial.element, body, attributes);
		return dial;
	},
	addGetDigits : function(attributes) {
		if(this.nestables.indexOf('GetDigits')>-1) {
			elem = this.elem;
		}
		var body = '';
		nestables = this.nestables;
		var getDigits = new GetDigits(Response);
		getDigits.init(getDigits.element, body, attributes);
		return getDigits;
	},
	addHangup : function(attributes) {
		if(this.nestables.indexOf('Hangup')>-1) {
			elem = this.elem;
    	}
		var body = '';
		nestables = this.nestables;
		var hangup = new Hangup(Response);
		hangup.init(hangup.element, body, attributes);
		return hangup;
	},
	addMessage: function(body, attributes) {
		if(this.nestables.indexOf('Message')>-1) {
			elem = this.elem;
    	}
		nestables = this.nestables;
		var message = new Message(Response);
		message.init(message.element,body, attributes);
		return message;
	},
	addPlay: function(body, attributes) {
		if(this.nestables.indexOf('Play')>-1) {
			elem = this.elem;
    	}
		nestables = this.nestables;
		var play = new Play(Response);
		play.init(play.element,body, attributes);
		return play;
	},
	addPreAnswer : function(body, attributes) {
		if(this.nestables.indexOf('PreAnswer')>-1) {
			elem = this.elem;
    	}
		var body = '';
		var attributes = [];
		nestables = this.nestables;
		var preAnswer = new PreAnswer(Response);
		preAnswer.init(preAnswer.element,body, attributes);
		return preAnswer;
	},
	addRecord : function(body, attributes) {
		if(this.nestables.indexOf('Record')>-1) {
			elem = this.elem;
    	}
		var body = '';
		nestables = this.nestables;
		var record = new Record(Response);
		record.init(record.element,body, attributes);
		return record;
	},
	addRedirect : function(body, attributes) {
		if(this.nestables.indexOf('Redirect')>-1) {
			elem = this.elem;
    	}
		nestables = this.nestables;
		var redirect = new Redirect(Response);
		redirect.init(redirect.element,body, attributes);
		return redirect;
	},
	addSpeak : function(body, attributes) {
		if(this.nestables.indexOf('Speak')>-1) {
			elem = this.elem;
    	}
		nestables = this.nestables;
		var speak = new Speak(Response);
		speak.init(speak.element,body, attributes);
		return speak;
	},
	addWait : function(attributes) {
		if(this.nestables.indexOf('Wait')>-1) {
			elem = this.elem;
    	}
		var body = '';
		nestables = this.nestables;
		var wait = new Wait(Response);
		wait.init(wait.element, body, attributes);
		return wait;
	},
	addDTMF : function(body) {
		if(this.nestables.indexOf('DTMF')>-1) {
			elem = this.elem;
    	}
		var attributes = [];
		nestables = this.nestables;
		var dtmf = new DTMF(Response);
		dtmf.init(dtmf.element, body, attributes);
		return dtmf;
	},
	toXML : function() {
		if (errmsg) {	return errmsg;
		}
		else {	return Docs.toString({ pretty: true });
		}
	}
}

function Conference(Response) {
	this.element = 'Conference';
	this.valid_attributes = ['muted','beep','startConferenceOnEnter', 'endConferenceOnExit',
				'waitSound','enterSound', 'exitSound', 'timeLimit', 'hangupOnStar', 
				'maxMembers', 'record', 'recordFileFormat', 'action', 'method', 
				'redirect', 'digitsMatch', 'callbackUrl', 'callbackMethod',
                       	        'stayAlone', 'floorEvent', 'transcriptionType', 'transcriptionUrl',
                      	        'transcriptionMethod'];
}

Message.prototype.init = function( body, attributes) {
	if (body == null) {
		PlivoError('No text set for %s', this.name);
	}
	Response.prototype.init(this.element, body, attributes, valid_attributes);
};

function Number(Response) {
	this.element = 'Number';
	this.valid_attributes = ['sendDigits', 'sendOnPreanswer'];
}

Number.prototype.init = function( body, attributes) {
	if (body == null) {
		PlivoError('No text set for %s', this.name);
	}
	Response.prototype.init(this.element, body, attributes, valid_attributes);
};
function User(Response) {
	this.element = 'User';
	this.valid_attributes = ['sendDigits', 'sendOnPreanswer', 'sipHeaders', 'webrtc'];
}

User.prototype.init = function( body, attributes) {
	if (body == null) {
		PlivoError('No text set for %s', this.name);
	}
	Response.prototype.init(this.element, body, attributes, valid_attributes);
};

function Dial(Response) {
	this.element = 'Dial';
	this.valid_attributes = ['action','method','timeout','hangupOnStar', 'timeLimit',
				'callerId', 'callerName', 'confirmSound', 'dialMusic', 
				'confirmKey', 'redirect', 'callbackUrl', 'callbackMethod', 
				'digitsMatch', 'sipHeaders'];
        this.nestables = ['Number', 'User'];
}

Dial.prototype.init = function(body, attributes) {
	Response.prototype.init(this.element, body, attributes, valid_attributes);
	
};

function GetDigits(Response) {
	this.element = 'GetDigits';
	this.valid_attributes = ['action', 'method', 'timeout', 'digitTimeout', 'finishOnKey',
        	                'numDigits', 'retries', 'invalidDigitsSound', 'validDigits', 
                	        'playBeep', 'redirect', 'digitTimeout'];
        this.nestables = ['Speak','Play','Wait'];
}

GetDigits.prototype.init = function(body, attributes) {
	Response.prototype.init(this.element, body, attributes, valid_attributes);
	
};

function Hangup(Response) {
	this.element = 'Hangup';
	this.valid_attributes = ['schedule', 'reason'];
}

Hangup.prototype.init = function( body, attributes) {
	Response.prototype.init(this.element, body, attributes, valid_attributes);
};

function Message(Response) {
	this.element = 'Message';
	this.valid_attributes = ['src', 'dst', 'type', 'callbackUrl', 'callbackMethod'];
}

Message.prototype.init = function( body, attributes) {
	if (body == null) {
		PlivoError('No text set for %s', this.name);
	}
	Response.prototype.init(this.element, body, attributes, valid_attributes);
};

function Play(Response) {
	this.element = 'Play';
	this.valid_attributes = ['loop'];
}

Play.prototype.init = function( body, attributes) {
	if (body == null) {
		PlivoError('No text set for %s', this.name);
	}
	Response.prototype.init(this.element, body, attributes, valid_attributes);
};

function PreAnswer(Response) {
	this.element = 'PreAnswer';
	this.valid_attributes = [];
        this.nestables = ['Play', 'Speak', 'GetDigits', 'Wait', 'Redirect', 'Message', 'DTMF'];
}

PreAnswer.prototype.init = function(body, attributes) {
	Response.prototype.init(this.element, body, attributes, valid_attributes);
	
};

function Record(Response) {
	this.element = 'Record';
	this.valid_attributes = ['action', 'method', 'timeout','finishOnKey',
    		                'maxLength', 'playBeep', 'recordSession',
                	        'startOnDialAnswer', 'redirect', 'fileFormat',
                       	        'callbackUrl', 'callbackMethod', 'transcriptionType', 
                                'transcriptionUrl', 'transcriptionMethod'];
}

Record.prototype.init = function( body, attributes) {
	Response.prototype.init(this.element, body, attributes, valid_attributes);
};

function Redirect(Response) {
	this.element = 'Redirect';
	this.valid_attributes = ['method'];
}

Redirect.prototype.init = function( body, attributes) {
	if (body == null) {
		PlivoError('No text set for %s', this.name);
	}
	Response.prototype.init(this.element, body, attributes, valid_attributes);
};

function Speak(Response) {
	this.element = 'Speak';
	this.valid_attributes = ['voice', 'language', 'loop'];
}

Speak.prototype.init = function( body, attributes) {
	if (body == null) {
		PlivoError('No text set for %s', this.name);
	}
	Response.prototype.init(this.element, body, attributes, valid_attributes);
};

function Wait(Response) {
	this.element = 'Wait';
	this.valid_attributes = ['length', 'silence'];
}

Wait.prototype.init = function( body, attributes) {
	Response.prototype.init(this.element, body, attributes, valid_attributes);
};

function DTMF(Response) {
	this.element = 'DTMF';
	this.valid_attributes = [];
}

DTMF.prototype.init = function( body, attributes) {
	if (body == null) {
		PlivoError('No text set for %s', this.name);
	}
	Response.prototype.init(this.element, body, attributes, valid_attributes);
};

util.inherits(Conference, Response);
util.inherits(Number, Response);
util.inherits(User, Response);
util.inherits(Dial, Response);
util.inherits(GetDigits, Response);
util.inherits(Hangup, Response);
util.inherits(Message, Response);
util.inherits(Play, Response);
util.inherits(PreAnswer, Response);
util.inherits(Record, Response);
util.inherits(Redirect, Response);
util.inherits(Speak, Response);
util.inherits(Wait, Response);
util.inherits(DTMF, Response);

exports.Response = function() {
	return new Response();
}
exports.Plivo = function() {
	return plivo;
}
