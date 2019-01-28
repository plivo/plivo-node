var Plivo = require('../dist/rest/client.js');
import { PhloClient } from '../lib/rest/client';

let authId = 'MAZJJKMWNLZJNIYJKYYT';
let authToken = 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw';
let phloId = 'b30083e9-73c9-42a2-acfa-c08e6e66cd83';
let multipartyNodeId = '85169eaf-d8b9-4e3d-9baf-13eb6b231bb0';

let mpcSourceNo = '919920700964';
let mpcTargetNo = '919620074923';
let role = 'agent';
let phloClient = phlo = null;

//Get Phlo details by phlo id
phloClient = new PhloClient(authId, authToken);
phloClient.phlo.get(phloId).then(function (result) {
    console.log('phlo details', phlo);
}).catch(function (err) {
    console.log('Failed to fetch phlo details', err);
});;


// Run phlo
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).run().then(function (result) {
    console.log('Multiparty call result', mpCallResult);
}).catch(function (err) {
    console.log('Multiparty call failed', err);
});


/**************************** Multiparty call examples **************************/

// Get multi-party call details
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall.get(multipartyNodeId).then(function (result) {
    console.log('Phlo run result', result);
}).catch(function (err) {
    console.log('Phlo run failed', err);
})


// Add member to multi party call
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall(mpcId).call(mpcSourceNo, mpcTargetNo, role).then(function (result) {
    console.log('Add member to Multiparty call result', result);
}).catch(function (err) {
    console.log('Add member to Multiparty call failed', err);
})


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
phloClient.phlo(phloId).multiPartyCall(mpcId).abortTransfer(mpcTargetNo).then(function (result) {
    console.log('abort transfer result', result);
}).catch(function (err) {
    console.log('abort transfer failed', err);
});

/**************************** Multiparty call member examples **************************/


/******************** Phlo resource test cases *********************/

// Resume Call - Phlo Member
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall(nodeId).member(mpcTargetNo).resumeCall().then(function (result) {
    console.log('resume call result', result);
}).catch(function (err) {
    console.log('resume call failed', err);
});


// Voice mail drop - Phlo Member
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall(nodeId).member(mpcTargetNo).voicemailDrop().then(function (result) {
    console.log('voicemail Drop call result -', result);
}).catch(function (err) {
    console.log('voicemail Drop call failed', err);
});


// Hangup - Phlo Member
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall(nodeId).member(mpcTargetNo).hangup().then(function (result) {
    console.log('hangup result - ', result);
}).catch(function (err) {
    console.log('hangup failed', err);
});


// Hold - Phlo Member
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall(nodeId).member(mpcTargetNo).hold().then(function (result) {
    console.log('hold result -', result);
}).catch(function (err) {
    console.log('hold failed', err);
});


// Unhold - Phlo Member
phloClient = new PhloClient(authId, authToken);
phloClient.phlo(phloId).multiPartyCall(nodeId).member(mpcTargetNo).unhold().then(function (result) {
    console.log('unhold result -', unholdResult);
}).catch(function (err) {
    console.log('unhold failed', err);
});

