import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('Endpoint', function () {
  it('should get Endpoint', function () {
    return client.endpoints.get(1)
      .then(function(endpoint) {
        assert.equal(endpoint.id, 1)
      })
  });

  it('list Endpoints', function () {
    return client.endpoints.list()
      .then(function(endpoints) {
        assert.equal(endpoints.length, 2)
      })
  });

  it('should create endpoint via interface', function () {
    return client.endpoints.create('username', 'password', 'alias')
      .then(function(endpoint){
            assert.equal(endpoint.message, 'created')
      })
  });

  it('should update endpoint via interface', function () {
    return client.endpoints.update(1, {
      username: 'username'
    })
      .then(function(endpoint) {
        assert.equal(endpoint.username, 'username')
      })
  });

  it('should throw error - id is required via interface', function () {
    return client.endpoints.update(null, {
      username: 'username'
    })
      .catch(function(err){
        assert.equal(err.message, 'Missing mandatory field: id')
      })
  });

  it('should update endpoint', function () {
    return client.endpoints.get(1)
      .then(function(endpoint) {
        return endpoint.update({
          username: 'username'
        })
      })
      .then(function(endpoint){
        assert.equal(endpoint.username, 'username')
      })
  });

  it('delete endpoint', function () {
    return client.endpoints.get(1)
      .then(function(endpoint){
        return endpoint.delete()
      })
      .then(function(status) {
        assert.equal(status, true)
      })
  });
  it('delete endpoint via interface', function () {
    return client.endpoints.delete(1)
      .then(function(status) {
        assert.equal(status, true)
      })
  });
});
