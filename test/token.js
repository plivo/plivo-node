import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('Token', function () {
  it('should create token via interface', function () {
    return client.token.create('sampleid')
      .then(function (token) {
        assert.equal(token.token, 'eyJhbGciOiJIUzI1NiIsImN0eSI6InBsaXZvO3Y9MSIsInR5cCI6IkpXVCJ9.eyJhcHAiOiIiLCJleHAiOjE2NTk0Nzk0NzksImlzcyI6Ik1BTURWTFpKWTJaR1k1TVdVMVpKIiwibmJmIjoxNjU5MzkzMDc5LCJwZXIiOnsidm9pY2UiOnsiaW5jb21pbmdfYWxsb3ciOmZhbHNlLCJvdXRnb2luZ19hbGxvdyI6ZmFsc2V9fSwic3ViIjoia293c2hpayJ9.dzmLy1JZb6Z9i7MzomCCh3cxaqyA_78O87E8ASkjk6M');
      })
  });
});

