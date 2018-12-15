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
phlo = await phloClient.phlo.get(phloId);
console.log('phlo details', phlo);

// Run phlo
phloClient = new PhloClient(authId, authToken);
let phloRunResult = await phloClient.phlo(phloId).run();
console.log('Phlo run result', phloRunResult);

/**************************** Multiparty call examples **************************/

// Get multi-party call details
phloClient = new PhloClient(authId, authToken);
mpCallResult = await phloClient.phlo(phloId).multiPartyCall.get(multipartyNodeId);
console.log('Multiparty call result', mpCallResult);

// Add member to multi party call
phloClient = new PhloClient(authId, authToken);
let addMemberResult = await phloClient.phlo(phloId).multiPartyCall(mpcId).call(mpcSourceNo, mpcTargetNo, role);
console.log('Add member to Multiparty call result', addMemberResult);

// Warm Transfer - multi party call
phloClient = new PhloClient(authId, authToken);
warmTransferResult = await phloClient.phlo(phloId).multiPartyCall(mpcId).warmTransfer(mpcSourceNo, mpcTargetNo, role);
console.log('Warm transfer result', warmTransferResult);

// Cold Transfer - multi party call
phloClient = new PhloClient(authId, authToken);
let coldTransferResult = await phloClient.phlo(phloId).multiPartyCall(mpcId).coldTransfer(mpcSourceNo, mpcTargetNo, role);
console.log('Cold transfer result', coldTransferResult);

// Abort Transfer - multi party call
phloClient = new PhloClient(authId, authToken);
let abortResult = await phloClient.phlo(phloId).multiPartyCall(mpcId).abortTransfer(mpcTargetNo);
console.log('Abort transfer result', abortResult);

/**************************** Multiparty call member examples **************************/


/******************** Phlo resource test cases *********************/

// Resume Call - Phlo Member
phloClient = new PhloClient(authId, authToken);
let resultCallResult = await phloClient.phlo(phloId).multiPartyCall(nodeId).member(mpcTargetNo).resumeCall();
console.log('resume call result -', resultCallResult);

// Voice mail drop - Phlo Member
phloClient = new PhloClient(authId, authToken);
let voiceMailDropResult = await phloClient.phlo(phloId).multiPartyCall(nodeId).member(mpcTargetNo).voicemailDrop();
console.log('voicemail Drop call result -', voiceMailDropResult);

// Hangup - Phlo Member
phloClient = new PhloClient(authId, authToken);
let hangupResult = await phloClient.phlo(phloId).multiPartyCall(nodeId).member(mpcTargetNo).hangup();
console.log('hangup result - ', hangupResult);

// Hold - Phlo Member
phloClient = new PhloClient(authId, authToken);
let holdResult = await phloClient.phlo(phloId).multiPartyCall(nodeId).member(mpcTargetNo).hold();
console.log('hold result -', holdResult);

// Unhold - Phlo Member
phloClient = new PhloClient(authId, authToken);
let unholdResult = await phloClient.phlo(phloId).multiPartyCall(nodeId).member(mpcTargetNo).unhold();
console.log('unhold result -', unholdResult);
