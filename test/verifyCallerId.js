import assert from 'assert';
import {Client} from '../lib/rest/client-test';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('client', function () {
  let authId, authToken

    describe('VerifyCallerId', function () {
        it('should initiate verify caller id  request!', function () {
        client.verify.initiate('+919768368718',
                {
                    Alias:       "test",
                    Channel:     "call"
                },
            ).then(function (response) {
                assert.equal(response.message, 'Verification code is sent to number +919768368718 which is valid for 15 minutes')
            })
        });
        it('should verify the caller id  request!', function () {
            client.verify.verify("2e68eb73-4d54-4391-bc98-71cd380911a4", "610534"
                ).then(function (response) {
                    assert.equal(response.verification_uuid, '2e68eb73-4d54-4391-bc98-71cd380911a4')
                })
            });
        it('should delete a verified caller Id!', function () {
        client.verify.deleteVerifiedCallerId("919768368718")
            .then(function (response) {
                
            })
        });
        it('should get verified caller Idd!', function () {
        client.verify.getVerifiedCallerId("919768368718")
            .then(function (response) {
                assert.equal(response.verification_uuid, "0f978b20-9e2b-4cfe-99fe-f7087c03b8e1")
            })
        });
        it('should update verified caller Id!', function () {
        client.verify.updateVerifiedCallerId("919768368718")
            .then(function (response) {
                assert.equal(response.verification_uuid, '0f978b20-9e2b-4cfe-99fe-f7087c03b8e1')
            })
        });
        it('should list verified caller Ids', function () {
        client.verify.listVerifiedCallerId()
            .then(function (response) {
                assert.equal(response.length, 4)
            })
        });
    });
})