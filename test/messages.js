import assert from 'assert';
import sinon from 'sinon';
import {
  Client
} from '../lib/rest/client-test';
import {
  PlivoGenericResponse
} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('message', function () {
  it('should get message', function () {
    return client.messages.get(1)
      .then(function (message) {
        assert.equal(message.units, 1)
      })
  });

  it('list messages', function () {
    return client.messages.list()
      .then(function (messages) {
        assert.equal(messages.length, 2)
      })
  });

  it('should create message via interface', function () {
    return client.messages.create('src', 'dst', 'text')
      .then(function (message) {
        assert.equal(message.message, 'message(s) queued')
      })
  });

  it('should send message via interface', function () {
    return client.messages.send('src', 'dst', 'text')
      .then(function (message) {
        assert.equal(message.message, 'message(s) queued')
      })
  });


  it('should throw error - id is required via interface', function () {
    return client.messages.get()
      .catch(function (err) {
        assert.equal(err.message, 'Missing mandatory field: id')
      })
  });

  it('should throw error - src and powerpack both not present', function () {
    return client.messages.send(null, 'dst', 'text', {}, null)
      .catch(function (err) {
        assert.equal(err.message, 'Neither of src or powerpack uuid present, either one is required')
      })
  });

  it('should throw error - src and powerpack both are present', function () {
    return client.messages.send('91235456917375', 'dst', 'text', {}, '916386027476')
      .catch(function (err) {
        assert.equal(err.message, 'Either of src or powerpack uuid, both of them are present')
      })
  });

  it('should list media via plivo interface!', function (done) {
    client.messages.listMedia('xyz')
      .then(function (mmsMedia) {
        assert(mmsMedia)
        done()
      })
  });

});
