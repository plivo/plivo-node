import assert from 'assert';
import {Client} from '../lib/rest/client-test';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('client', function () {
  let authId, authToken

    describe('MaskingSession', function () {
        it('should create masking session!', function () {
        client.maskingSession.createMaskingSession("917708772011", "918220568648", 
                {
                    callTimeLimit: 14600,
                },
            ).then(function (response) {
                assert.equal(response.message, 'Session created')
            })
        });
        it('should delete a masking session!', function () {
        client.maskingSession.deleteMaskingSession("197aa6e0-1abe-4d1c-b887-2b2406764360")
            .then(function (response) {
                assert.equal(response.message, 'Session expired')
            })
        });
        it('should get masking session by session uuid!', function () {
        client.maskingSession.getMaskingSession("197aa6e0-1abe-4d1c-b887-2b2406764360")
            .then(function (response) {
                assert.equal(response.response.sessionUuid, "197aa6e0-1abe-4d1c-b887-2b2406764360")
            })
        });
        it('should update masking session using session uuid!', function () {
        client.maskingSession.updateMaskingSession("63690013-52bb-43fa-9b0b-bf81c9f4d766")
            .then(function (response) {
                assert.equal(response.message, 'Session updated')
            })
        });
        it('should list masking session!', function () {
        client.maskingSession.listMaskingSession()
            .then(function (response) {
                assert.equal(response.length, 2)
            })
        });
    });
})