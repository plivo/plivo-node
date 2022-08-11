import assert from 'assert';
import {Client} from '../lib/rest/client-test';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('JWT/Token', function () {
  it('should create endpoint via interface', function () {
    return client.token.create('sampleid')
      .then(function(token){
        assert.equal(token.token, 'created')
      })
  });
});
