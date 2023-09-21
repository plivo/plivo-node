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

  it('should have dlt parameter in get message', function () {
    return client.messages.get(1)
      .then(function (message) {
        assert.equal(message.dltEntityID, "9876");
        assert.equal(message.dltTemplateID, "5432");
        assert.equal(message.dltTemplateCategory, "transactional");
      })
  });
  it('should have conversation parameter in get message', function () {
    return client.messages.get(1)
      .then(function (message) {
        assert.equal(message.conversationId, "1234");
        assert.equal(message.conversationOrigin, "service");
        assert.equal(message.conversationExpirationTimestamp, "2023-08-03 23:02:00+05:30");
      })
  });
  it('should have destination network parameter in get message', function () {
    return client.messages.get(1)
      .then(function (message) {
        assert.equal(message.destinationNetwork, "Verizon");
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

  it('should have dlt parameters in first listed message only', function () {
    return client.messages.list()
      .then(function (messages) {
        assert.equal(messages[0].dltEntityID, "2233")
        assert.equal(messages[0].dltTemplateID, "4455")
        assert.equal(messages[0].dltTemplateCategory, "service_implicit")

        assert.equal(messages[1].dltEntityID, null)
        assert.equal(messages[1].dltTemplateID, null)
        assert.equal(messages[1].dltTemplateCategory, null)
      })
  });

  it('should have conversation parameters in first listed message only', function () {
    return client.messages.list()
      .then(function (messages) {
        assert.equal(messages[0].conversationId, "9876")
        assert.equal(messages[0].conversationOrigin, "marketing")
        assert.equal(messages[0].conversationExpirationTimestamp, "2023-08-03 23:02:00+05:30")

        assert.equal(messages[1].conversationId, null)
        assert.equal(messages[1].conversationOrigin, null)
        assert.equal(messages[1].conversationExpirationTimestamp, null)
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
