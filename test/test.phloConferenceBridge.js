'use strict';

import {
    PhloClient
} from '../lib/rest/client-test';

let authId = 'MAZJJKMWNLZJNIYJKYYT';
let authToken = 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw';
let phloId = '2a38dc9b-b48e-4e4e-b49b-0677c556989c';
let cbId = 'f501faf1-0703-4619-86fa-d537b689e331';

// Conference Bridge test cases
describe('phlo - conference bridge test cases', function () {


    it('Get conference bridge details', async function () {
        let phloClient = new PhloClient(authId, authToken);
        let result = await phloClient.phlo(phloId).conferenceBridge.get(cbId);
        // console.log('get conference bridge result', result);
        return true;
    });

    it('Mute a Member - Conference Bridge', async function () {
        let phloClient = new PhloClient(authId, authToken);
        let phlo = phloClient.phlo(phloId);
        let result = await phlo.conferenceBridge(cbId).member('919920700964').mute();
        // console.log('Mute a member result => ', result);
        return true;
    });

    it('Unmute a Member - Conference Bridge', async function () {
        let phloClient = new PhloClient(authId, authToken);
        let phlo = phloClient.phlo(phloId);
        let result = await phlo.conferenceBridge(cbId).member('919920700964').unmute();
        // console.log('Unmute a member result => ', result);
        return true;
    });


    it('Leave a Member - Conference Bridge', async function () {
        let phloClient = new PhloClient(authId, authToken);
        let phlo = phloClient.phlo(phloId);
        let result = await phlo.conferenceBridge(cbId).member('919920700964').leave();
        // console.log('Mute a member result => ', result);
        return true;
    });

    it('Mute a Member using member.get() - Conference Bridge', async function () {
        let phloClient = new PhloClient(authId, authToken);
        let phlo = phloClient.phlo(phloId);
        let result = await phlo.conferenceBridge(cbId).member.get('919920700964').mute();
        // console.log('Mute a member result => ', result);
        return true;
    });

    it('Unmute a Member using member.get() - Conference Bridge', async function () {
        let phloClient = new PhloClient(authId, authToken);
        let phlo = phloClient.phlo(phloId);
        let result = await phlo.conferenceBridge(cbId).member.get('919920700964').unmute();
        // console.log('Unmute a member result => ', result);
        return true;
    });


    it('Leave a Member using member.get() - Conference Bridge', async function () {
        let phloClient = new PhloClient(authId, authToken);
        let phlo = phloClient.phlo(phloId);
        let result = await phlo.conferenceBridge(cbId).member.get('919920700964').leave();
        // console.log('Mute a member result => ', result);
        return true;
    });


});

