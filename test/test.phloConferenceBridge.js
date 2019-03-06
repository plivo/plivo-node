'use strict';

import {
    PhloClient
} from '../lib/rest/client-test';

let authId = 'auth_id';
let authToken = 'auth_token';
let phloId = '2a38dc9b-b48e-4e4e-b49b-0677c556989c';
let cbId = 'f501faf1-0703-4619-86fa-d537b689e331';

// Conference Bridge test cases
describe('phlo - conference bridge test cases', function () {

    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);

    //************** Get Conf Details function ***************/
    it('Get conference bridge details', function (done) {
        phloClient.phlo(phloId).conferenceBridge.get(cbId).then(function (result) {
            console.log('get conference bridge result', result);
             done();
            }).catch(function (err) {
                done(new Error("Test Failed. - Enter Valid Conference Bridge Id"))
            })
       
    });

    // //************** Mute function ***************/
    it('Mute a Member - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member('919920700964').mute().then(function (result) {
    console.log('Mute a member result => ', result);
    done();
}).catch(function (err) {
    done(new Error("Test Failed. - Enter Correct Phone Number"))
})
    });

    it('Mute a Member using member.get() - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member.get('919920700964').mute().then(function (result) {
            console.log('Mute a member result => ', result);
            done();
        }).catch(function (err) {
            done(new Error("Test Failed. - Enter Correct Phone Number"))
        })
    });

    // ************** Unmute function ***************/
    it('Unmute a Member - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member('919920700964').unmute().then(function (result) {
            console.log('Unmute a member result => ', result);
            done();
        }).catch(function (err) {
            done(new Error("Test Failed. - Enter Correct Phone Number"))
        })
    });

    it('Unmute a Member using member.get() - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member.get('919920700964').unmute().then(function (result) {
            console.log('Unmute a member result => ', result);
            done();
        }).catch(function (err) {
            done(new Error("Test Failed. - Enter Correct Phone Number"))
        })
    });


    //************** Leave function ***************/
    it('Leave a Member - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member('919920700964').leave().then(function (result) {
            console.log('leave member result => ', result);
            done();
        }).catch(function (err) {
            done(new Error("Test Failed. - Enter Correct Phone Number"))
        })
    });

    it('Leave a Member using member.get() - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member.get('919920700964').leave().then(function (result) {
            console.log('leave member result => ', result);
            done();
        }).catch(function (err) {
            done(new Error("Test Failed. - Enter Correct Phone Number"))
        })
    });

});

