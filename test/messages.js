import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('message', function () {
  it('should get message', function () {
    return client.messages.get(1)
      .then(function(message) {
        assert.equal(message.id, 1)
      })
  });

  it('list messages', function () {
    return client.messages.list()
      .then(function(messages) {
        assert.equal(messages.length, 2)
      })
  });

  it('should create message via interface', function () {
    return client.messages.create('src', 'dst', 'text')
      .then(function(message){
            assert.equal(message.message, 'message(s) queued')
      })
  });

  it('should send message via interface', function () {
    return client.messages.send('src', 'dst', 'text')
      .then(function(message){
            assert.equal(message.message, 'message(s) queued')
      })
  });


  it('should throw error - id is required via interface', function () {
    return client.messages.get()
      .catch(function(err){
        assert.equal(err.message, 'Missing mandatory field: id')
      })
  });

  it('should throw error - src is required via interface', function () {
    return client.messages.send(null, 'dst', 'text')
      .catch(function(err){
        assert.equal(err.message, 'Missing mandatory field: src')
      })
  });

});
