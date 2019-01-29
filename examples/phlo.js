var plivo = require('../dist/rest/client-test.js');
var PhloClient = plivo.PhloClient;


let authId = 'auth-id';
let authToken = 'auth-token';
let phloId = 'sample-phlo-id';
let mpcId = 'sample-mpc-id';

let mpcSourceNo = '919920700964';
let mpcTargetNo = '919620074923';
let role = 'agent';
let phloClient = phlo = null;

//Get Phlo details by phlo id
phloClient = new PhloClient(authId, authToken);
phloClient.phlo.get(phloId).then(function (result) {
    console.log('phlo details =>', result);
}).catch(function (err) {
    console.log('Failed to fetch phlo details', err);
});;


// Run phlo
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).run().then(function (result) {
    console.log('Phlo run result', result);
}).catch(function (err) {
    console.error('Phlo run failed', err);
});


/**************************** Multiparty call examples **************************/

// Get multi-party call details
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall.get(mpcId).then(function (result) {
    console.log('multi party call details api result', result);
}).catch(function (err) {
    console.log('multi party call details api failed', err);
})


// Add member to multi party call
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall(mpcId).call(mpcSourceNo, mpcTargetNo, role).then(function (result) {
    console.log('Multiparty call result', result);
}).catch(function (err) {
    console.log('Multiparty call failed', err);
});


// Warm Transfer - multi party call
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall(mpcId).warmTransfer(mpcSourceNo, mpcTargetNo, role).then(function (result) {
    console.log('Warm transfer result', result);
}).catch(function (err) {
    console.log('Warm transfer failed', err);
});


// Cold Transfer - multi party call
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall(mpcId).coldTransfer(mpcSourceNo, mpcTargetNo, role).then(function (result) {
    console.log('Cold transfer result', result);
}).catch(function (err) {
    console.log('Cold transfer failed', err);
});


// Abort Transfer - multi party call
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall(mpcId).abortTransfer(mpcSourceNo).then(function (result) {
    console.log('abort transfer result', result);
}).catch(function (err) {
    console.log('abort transfer failed', err);
});

/**************************** Multiparty call member examples **************************/


/******************** Phlo resource test cases *********************/

// Resume Call - Phlo Member
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall(mpcId).member(mpcSourceNo).resumeCall().then(function (result) {
    console.log('resume call result', result);
}).catch(function (err) {
    console.log('resume call failed', err);
});


// Voice mail drop - Phlo Member
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall(mpcId).member(mpcSourceNo).voicemailDrop().then(function (result) {
    console.log('voicemail Drop call result -', result);
}).catch(function (err) {
    console.log('voicemail Drop call failed', err);
});


// Hangup - Phlo Member
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall(mpcId).member(mpcSourceNo).hangup().then(function (result) {
    console.log('hangup result - ', result);
}).catch(function (err) {
    console.log('hangup failed', err);
});


// Hold - Phlo Member
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall(mpcId).member(mpcSourceNo).hold().then(function (result) {
    console.log('hold result -', result);
}).catch(function (err) {
    console.log('hold failed', err);
});


// Unhold - Phlo Member
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall(mpcId).member(mpcSourceNo).unhold().then(function (result) {
    console.log('unhold result -', result);
}).catch(function (err) {
    console.log('unhold failed', err);
});

