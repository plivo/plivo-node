//unittesting for token creation
import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('Token', function () {
  it('should create token via interface', function () {
    return client.token.create("sampleid").then(function(token){
      assert.equal(response.apiid, '5cbad7b4-19f4-11ed-8b03-0242ac110005');
    })
  });

});
