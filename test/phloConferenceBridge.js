'use strict';

import {
    PhloClient
} from '../lib/rest/client';

let authId = 'MAZJJKMWNLZJNIYJKYYT';
let authToken = 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw';

// Conference Bridge test cases
describe('phlo - conference bridge test cases', function () {

    let phloId = '2a38dc9b-b48e-4e4e-b49b-0677c556989c';
    let cbId = 'f501faf1-0703-4619-86fa-d537b689e331';

    // it('Get conference bridge details', async function () {
    //     let phloClient = new PhloClient(authId, authToken);
    //     let result = await phloClient.phlo(phloId).conferenceBridge.get(cbId);
    //     console.log('get conference bridge result', result);
    //     return true;
    // });

    // it('Make a Call - Conference Bridge', async function () {
    //     let phloClient = new PhloClient(authId, authToken);
    //     let phlo = phloClient.phlo(phloId);
    //     let result = await phlo.conferenceBridge(cbId).call('919898967510', '919920700964');
    //     return true;
    // });

    // it('Warm Transfer - Conference Bridge', async function () {
    //     let phloClient = new PhloClient(authId, authToken);
    //     let phlo = phloClient.phlo(phloId);
    //     let result = await phlo.conferenceBridge(cbId).warmTransfer('919920700964', '919620074923');
    //     return true;
    // });

    // it('Cold Transfer - Conference Bridge', async function () {
    //     let phloClient = new PhloClient(authId, authToken);
    //     let phlo = phloClient.phlo(phloId);
    //     let result = await phlo.conferenceBridge(cbId).coldTransfer('919920700964', '919898967510');
    //     return true;
    // });

    // it('Abort Transfer - Conference Bridge', async function () {
    //     setTimeout(async () => {
    //         let phloClient = new PhloClient(authId, authToken);
    //         let phlo = phloClient.phlo(phloId);
    //         let result = await phlo.conferenceBridge(cbId).abortTransfer('919920700964');
    //     }, 2000);
    //     return true;
    // });

    // // =========== Member test cases =========== //

    // it('member resumeCall - Conference Bridge', async function () {
    //     try {
    //         let phloClient = new PhloClient(authId, authToken);
    //         let result = await phloClient.phlo(phloId).conferenceBridge(cbId).member(memberAddress).resumeCall();
    //         console.log('resume call result -', result);
    //         return true;
    //     } catch (err) {
    //         throw err;
    //     }
    // });

    // it('member voicemail drop - Conference Bridge', async function () {
    //     try {
    //         let phloClient = new PhloClient(authId, authToken);
    //         let result = await phloClient.phlo(phloId).conferenceBridge(cbId).member(nixonAddress).voicemailDrop();
    //         console.log('voicemail Drop call result -', result);
    //         return true;
    //     } catch (err) {
    //         throw err;
    //     }
    // });

    // it('member hangup - Conference Bridge', async function () {
    //     try {
    //         let phloClient = new PhloClient(authId, authToken);
    //         let result = await phloClient.phlo(phloId).conferenceBridge(cbId).member(memberAddress2).hangup();
    //         console.log('hangup result -', result);
    //         return true;
    //     } catch (err) {
    //         throw err;
    //     }
    // });

    // it('member hold - Conference Bridge', async function () {
    //     try {
    //         let phloClient = new PhloClient(authId, authToken);
    //         let result = await phloClient.phlo(phloId).conferenceBridge(cbId).member(nixonAddress).hold();
    //         console.log('hold result -', result);
    //         return true;
    //     } catch (err) {
    //         throw err;
    //     }
    // });

    // it('member unhold - Conference Bridge', async function () {
    //     try {
    //         let phloClient = new PhloClient(authId, authToken);
    //         let result = await phloClient.phlo(phloId).conferenceBridge(cbId).member(memberAddress).unhold();
    //         console.log('hold result -', result);
    //         return true;
    //     } catch (err) {
    //         throw err;
    //     }
    // });

});

