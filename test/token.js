import assert from 'assert';
import {Client} from '../lib/rest/client-test';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('Token', function () {
  it('should get Token', function () {
    return client.token.get(1)
      .then(function(token) {
        assert.equal(token.app_id, 1)
      })
  });
  it('should create endpoint via interface', function () {
    return client.token.create('sampleid')
      .then(function(token){
        assert.equal(token.token, 'created')
      })
  });
});
