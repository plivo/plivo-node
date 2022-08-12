//unittesting for token creation
import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('Token', function () {
  it('should create token via interface', function () {
    return client.token.create("sampleid").then(function (token) {
      assert.equal(response.apiid, '5cbad7b4-19f4-11ed-8b03-0242ac110005');
    })
  });
  // it('should create endpoint via interface', function () {
  //   return client.endpoints.create('username', 'password', 'alias')
  //     .then(function(endpoint){
  //       assert.equal(endpoint.message, 'created')
  //     })
  // });
});

// {'api_id': '5cbad7b4-19f4-11ed-8b03-0242ac110005',
//   'token': 'eyJhbGciOiJIUzI1NiIsImN0eSI6InBsaXZvO3Y9MSIsInR5cCI6IkpXVCJ9.eyJhcHAiOiIiLCJleHAiOjE2NjAzNjM2ODMsImlzcyI6Ik1BTURWTFpKWTJaR1k1TVdVMVpKIiwibmJmIjoxNjYwMjc3MjgzLCJwZXIiOnsidm9pY2UiOnsiaW5jb21pbmdfYWxsb3ciOmZhbHNlLCJvdXRnb2luZ19hbGxvdyI6dHJ1ZX19LCJzdWIiOiIifQ.LAwFEuotTmbZeGWBhfNT4X2KbRapYF23BrkwVfmr5A4'}
