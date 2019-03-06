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

    // ........Get Conferencr Bridge With Valid Id..........
    it('Get conference bridge details with Valid id', function (done) {
        phloClient.phlo(phloId).conferenceBridge.get(cbId).then(function (result) {
            // console.log('get conference bridge result', result);
            done();
        }).catch(function (err) {
            throw new Error("Test Failed. - wrong Conference Bridge Id ")
        })
    });

    // ........Get Conferencr Bridge With Invalid Id..........
    it('Get conference bridge details with Invvalid id', function (done) {
        phloClient.phlo(phloId).conferenceBridge.get(cbId).then(function (result) {
            // console.log('get conference bridge result', result);
            throw new Error("Test Failed. -Invalid Conference Bridge Id")
        }).catch(function (err) {
            done();
        })
    });



    // //************** Mute function ***************/

    // ......Mute Function with Valid Number............
    it('Mute a Member with Valid Number - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member('919920700964').mute().then(function (result) {
            // console.log('Mute a member result => ', result);
            done();
        }).catch(function (err) {
            throw new Error("Test Failed. - Enter Valid Phone Number")
        })
    });

    // ......Mute Function with Invalid Number............
    it('Mute a Member with Invalid Number - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member("9199207009645").mute().then(function (result) {
            // console.log('Mute a member with Invalid Number => ', result);
            throw new Error("Test Failed. - Invalid Phone Number")

        }).catch(function (err) {
            done();
        })
    });


    // ......Mute Function with Valid Number Get method.............
    it('Mute a Member with Valid Number using member.get()  - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member.get('919920700964').mute().then(function (result) {
            // console.log('Mute a member result => ', result);
            done();
        }).catch(function (err) {
            throw new Error("Test Failed. - Enter Valid Phone Number")
        })
    });

    // ......Mute Function with Invalid Number using Get method............
    it('Mute a Member with Invalid number using member.get() - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member.get("9199207009645").mute().then(function (result) {
            // console.log('Mute a member with Invalid Number => ', result);
            throw new Error("Test Failed. - Invalid Phone Number")
        }).catch(function (err) {
            done();
        })
    });


    // // ************** Unmute function ***************/
    // ......Unmute Function with Valid Number............
    it('Unmute a Member with Valid Number - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member('919920700964').unmute().then(function (result) {
            // console.log('Mute a member result => ', result);
            done();
        }).catch(function (err) {
            throw new Error("Test Failed. - Enter Valid Phone Number")
        })
    });
     // ......Unmute Function with Invalid Number............
     it('Unmute a Member with Invalid Number - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member("9199207009645").unmute().then(function (result) {
            // console.log('Mute a member with Invalid Number => ', result);
            throw new Error("Test Failed. - Invalid Phone Number")

        }).catch(function (err) {
            done();
        })
    });


     // ......Unmute Function with Valid Number Get method.............
     it('Unmute a Member with Valid Number using member.get()  - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member.get('919920700964').unmute().then(function (result) {
            // console.log('Mute a member result => ', result);
            done();
        }).catch(function (err) {
            throw new Error("Test Failed. - Enter Valid Phone Number")
        })
    });

    // ......Unmute Function with Invalid Number using Get method............
    it('Unmute a Member with Invalid number using member.get() - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member.get("9199207009645").unmute().then(function (result) {
            // console.log('Mute a member with Invalid Number => ', result);
            throw new Error("Test Failed. - Invalid Phone Number")
        }).catch(function (err) {
            done();
        })
    });

   

    // it('Unmute a Member - Conference Bridge', function (done) {
    //     phlo.conferenceBridge(cbId).member('919920700964').unmute().then(function (result) {
    //         // console.log('Unmute a member result => ', result);
    //         done();
    //     }).catch(function (err) {
    //         done(new Error("Test Failed. - Enter Correct Phone Number"))
    //     })
    // });

    // it('Unmute a Member using member.get() - Conference Bridge', function (done) {
    //     phlo.conferenceBridge(cbId).member.get('919920700964').unmute().then(function (result) {
    //         // console.log('Unmute a member result => ', result);
    //         done();
    //     }).catch(function (err) {
    //         done(new Error("Test Failed. - Enter Correct Phone Number"))
    //     })
    // });


    // //************** Leave function ***************/
    // ......Leave Function with Valid Number............
    it('Leave a Member with Valid Number - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member('919920700964').leave().then(function (result) {
            // console.log('Mute a member result => ', result);
            done();
        }).catch(function (err) {
            throw new Error("Test Failed. - Enter Valid Phone Number")
        })
    });
     // ......Leave Function with Invalid Number............
     it('Leave a Member with Invalid Number - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member("9199207009645").leave().then(function (result) {
            // console.log('Mute a member with Invalid Number => ', result);
            throw new Error("Test Failed. - Invalid Phone Number")

        }).catch(function (err) {
            done();
        })
    });


     // ......Leave Function with Valid Number Get method.............
     it('Leave a Member with Valid Number using member.get()  - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member.get('919920700964').leave().then(function (result) {
            // console.log('Mute a member result => ', result);
            done();
        }).catch(function (err) {
            throw new Error("Test Failed. - Enter Valid Phone Number")
        })
    });

    // ......Leave Function with Invalid Number using Get method............
    it('Leave a Member with Invalid number using member.get() - Conference Bridge', function (done) {
        phlo.conferenceBridge(cbId).member.get("9199207009645").leave().then(function (result) {
            // console.log('Mute a member with Invalid Number => ', result);
            throw new Error("Test Failed. - Invalid Phone Number")
        }).catch(function (err) {
            done();
        })
    });
    // it('Leave a Member - Conference Bridge', function (done) {
    //     phlo.conferenceBridge(cbId).member('919920700964').leave().then(function (result) {
    //         // console.log('leave member result => ', result);
    //         done();
    //     }).catch(function (err) {
    //         done(new Error("Test Failed. - Enter Correct Phone Number"))
    //     })
    // });

    // it('Leave a Member using member.get() - Conference Bridge', function (done) {
    //     phlo.conferenceBridge(cbId).member.get('919920700964').leave().then(function (result) {
    //         // console.log('leave member result => ', result);
    //         done();
    //     }).catch(function (err) {
    //         done(new Error("Test Failed. - Enter Correct Phone Number"))
    //     })
    // });

});

