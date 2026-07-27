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
      it('create TollfreeVerification with zipwhip fields', function () {
        return client.tollfreeVerification.create({
          terms_and_conditions_link: 'https://plivo.com/terms',
          privacy_policy_link: 'https://plivo.com/privacy',
          optin_message: 'You have opted in to receive messages from Plivo',
          help_message: 'Reply HELP for help, STOP to unsubscribe'
        })
          .then(function(response){
                assert.equal(response.message, 'created with zipwhip fields')
          })
      });
      it('update response', function () {
        return client.tollfreeVerification.update(1, {extra_data: 'extra_data'})
          .then(function(response) {
            assert.equal(response.message, 'Tollfree verification request for 18XXXXXXXXX updated succesfully')
          })
      });
      it('update TollfreeVerification with zipwhip fields', function () {
        return client.tollfreeVerification.update(1, {
          terms_and_conditions_link: 'https://plivo.com/terms',
          privacy_policy_link: 'https://plivo.com/privacy',
          optin_message: 'You have opted in to receive messages from Plivo',
          help_message: 'Reply HELP for help, STOP to unsubscribe'
        })
          .then(function(response) {
            assert.equal(response.message, 'Tollfree verification request for 18XXXXXXXXX updated succesfully with zipwhip fields')
          })
      });
    
      it('delete response', function () {
        return client.tollfreeVerification.delete(1)
          .then(function(status) {
            assert.equal(status, true)
          })
      });
});
