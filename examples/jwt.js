var Plivo =  require('../dist/rest/client.js');

// token generation using from epoch and length in seconds
var acctkn = new Plivo.AccessToken('{authId}', '{authToken}', 'endpointUsername', {validFrom: (new Date()).getTime()/1000, lifetime: 300}, 'username-12345');
console.log(acctkn.toJwt());


// token with validity of 24 hours starting now
acctkn = new Plivo.AccessToken('{authId}', '{authToken}', 'endpointUsername', {}, 'uid');

// voice (incoming, outgoing) grants
acctkn.addVoiceGrants(true, true);
console.log(acctkn.toJwt());
