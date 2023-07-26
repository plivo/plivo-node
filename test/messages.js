import {
  Client
} from '../lib/rest/client-test';
import {
  PlivoGenericResponse
} from '../lib/base.js';
import assert from 'assert';
import sinon from 'sinon';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('message', function () {
  it('should get message', function () {
    return client.messages.get(1)
      .then(function (message) {
        assert.equal(message.units, 1)
      })
  });

  it('should get requester_ip', function () {
    return client.messages.get(1)
      .then(function (message) {
        assert.equal(message.requesterIP, "192.168.1.2")
      })
  });

  it('list messages', function () {
    return client.messages.list()
      .then(function (messages) {
        assert.equal(messages.length, 2)
      })
  });

  it('should have requester_ip in listed messages', function () {
    return client.messages.list()
      .then(function (messages) {
        assert.equal(messages[0].requesterIP, "192.168.1.1")
        assert.equal(messages[1].requesterIP, "192.168.1.2")
      })
  });

  it('should create message via interface', function () {
    return client.messages.create({src:'src', dst:'dst', text:'text',powerpackUUID: null})
      .then(function (message) {
        assert.equal(message.message, 'message(s) queued')
      })
  });

  it('should send message via interface', function () {
    return client.messages.create({src:'src', dst:'dst', text:'text',powerpackUUID: null})
      .then(function(message){
            assert.equal(message.message, 'message(s) queued')
      })
  });
  
  it('should send message via interface', function () {
    return client.messages.create({src:'src', dst:'dst', text:'text'})
      .then(function(message){
            assert.equal(message.message, 'message(s) queued')
      })
  });

  it('should send message via interface', function () {
    return client.messages.create({src:'src', dst:'dst', text:'text'})
      .then(function(message){
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
    return client.messages.create({src:null,dst:'dst',text:'text',powerpackUUID:null})
      .catch(function (err) {
        assert.equal(err.message, 'Neither of src or powerpack uuid present, either one is required')
      })
  });

  it('should throw error - src and powerpack both are present', function () {
    return client.messages.create({src:'91235456917375', dst:'dst', text:'text', powerpackUUID:'916386027476'})
      .catch(function (err) {
        assert.equal(err.message, 'Either of src or powerpack uuid, both of them are present')
      })
  });

  it('should throw error - src parameter not present', function () {
    return client.messages.create({src:null, dst:'dst', text:'text',type:'whatsapp', powerpackUUID:'916386027476'})
      .catch(function (err) {
        assert.equal(err.message, 'src parameter not present')
      })
  });

  it('should throw error - Template paramater is only applicable when message_type is whatsapp', function () {
    return client.messages.create({src:'91235456917375', dst:'dst', text:'text',type:'sms',template: {name: "plivo_verification", language: "en_US",}, powerpackUUID:null})
      .catch(function (err) {
        assert.equal(err.message, 'Template paramater is only applicable when message_type is whatsapp')
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
