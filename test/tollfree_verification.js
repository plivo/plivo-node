import assert from 'assert';
import {Client} from '../lib/rest/client-test';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('TollfreeVerification', function () {
    it('get a TollfreeVerification request', function () {
      return client.tollfreeVerification.get(1)
        .then(function(response) {
          assert.equal(response.uuid, "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX")
        })
    });
    it('list TollfreeVerification', function () {
        return client.tollfreeVerification.list({"limit":3})
          .then(function(response) {
            assert.equal(response.length, 2)
          })
      });

      it('create TollfreeVerification via interface', function () {
        return client.tollfreeVerification.create({})
          .then(function(response){
                assert.equal(response.message, 'created')
          })
      }); 
      it('update response', function () {
        return client.tollfreeVerification.update(1, {extra_data: 'extra_data'})
          .then(function(response) {
            assert.equal(response.message, 'Tollfree verification request for 18XXXXXXXXX updated succesfully')
          })
      });
    
      it('delete response', function () {
        return client.tollfreeVerification.delete(1)
          .then(function(status) {
            assert.equal(status, true)
          })
      });
});
