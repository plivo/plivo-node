import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('PowerpackInterface', function () {
  it('Get Details of a Powerpack', function () {
    return client.powerpacks.get('5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46')
      .then(function(powerpack) {
        assert.equal(powerpack.uuid, '5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46')
      })
  });
  it('should create powerpack via interface', function () {
    return client.powerpacks.create(name='hello')
      .then(function(powerpack){
            assert.equal(powerpack.name, 'hello')
      })
  });
});
