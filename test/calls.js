import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('client', function () {
  let authId, authToken

  it('should have config object!', function () {
    assert('object', typeof new Client('sampleid', 'sammpletoken'));
  });

  it('throw error if authid is not provied!', function () {
    try {
      new Client(authId, 'sammpletoken')
    } catch (err) {
      assert.equal(err, 'Please provide authId')
    }
  });

  it('throw error if authToken is not provied!', function () {
    try {
      new Client('sampleauthid', authToken)
    } catch (err) {
      assert.equal(err, 'Please provide authToken')
    }
  });


})
describe('calls', function () {

  it('should have calls object!', function () {
    assert('object', typeof client.calls);
  });

  it('should have create method!', function () {
    assert('function', typeof client.calls.create);
  });

  it('should make call!', function () {
    return client.calls.create('+9100000000', '+920000000', 'http://google.com')
      .then(function(call) {
        assert.equal(call.message, 'call fired')
      })
  });
  it('should get list of calls!', function (done) {
    client.calls.list()
      .then(function(calls){
        assert.equal(calls.length, 0)
        done()
      })
      .catch(function(e) {
        assert.equal(0, 0)
      })
  });
  it('should get call by id!', function (done) {
    client.calls.get(1)
      .then(function(call){
        assert.equal(call.id, 1)
        done()
      })
  });
  describe('transfer', function () {
    it('should transfer call!', function (done) {
      client.calls.get(1)
        .then(function(call){
          return call.transfer()
        })
        .then(function(call) {
          assert.equal(call.id, 5)
          done()
        })
    });
  });

  it('should transfer call via plivo interface!', function (done) {
    client.calls.transfer(1, {})
      .then(function(call) {
          assert.equal(call.id, 5)
        done()
      })
  });

  describe('Hangup', function () {
    it('should hangup call!', function (done) {
      client.calls.get(1)
        .then(function(call){
          return call.hangup()
        })
        .then(function(call) {
          assert(call)
          done()
        })
    });
    it('should cancel call!', function () {
      return client.calls.get(1)
        .then(function(call){
          return call.cancel();
        })
        .then(function(call) {
          assert(call);
        })
    });
    it('should hangup call via plivo interface!', function (done) {
      client.calls.hangup(1)
        .then(function(call) {
          assert(call)
          done()
        })
    });
  });
  describe('Record', function () {
    it('should record call!', function (done) {
      client.calls.get(1)
        .then(function(call){
          return call.record({})
        })
        .then(function(recordDetail) {
          assert.equal(recordDetail.message, 'call recording started')
          done()
        })
    });
    it('should record call via plivo interface!', function (done) {
      client.calls.record(1, {})
        .then(function(recordDetail) {
          assert.equal(recordDetail.message, 'call recording started')
          done()
        })
    });

    it('should stop recording call!', function (done) {
      client.calls.get(1)
        .then(function(call){
          return call.stopRecording({})
        })
        .then(function(recordDetail) {
          assert(recordDetail instanceof PlivoGenericResponse)
          done()
        })
    });

    it('should stop recording call via plivo interface!', function (done) {
      client.calls.stopRecording(1, {})
        .then(function(recordDetail) {
          assert(recordDetail instanceof PlivoGenericResponse)
          done()
        })
    });
  });

  describe('DTMF', function () {
    it('should send digits', function () {
      return client.calls.sendDigits('1', '123');
    });
  });

  describe('Play', function () {
    it('should throw error for url!', function (done) {
      client.calls.get(1)
        .then(function(call) {
          return call.playMusic()
        })
        .catch(function(err){
          assert.equal(err.message, 'Missing mandatory field: urls, urls should be string.')
          done()
        })
    });

    it('should throw error for url via plivo interface!', function (done) {
      client.calls.playMusic(1)
        .catch(function(err){
          assert.equal(err.message, 'Missing mandatory field: urls, urls should be string.')
          done()
        })
    });

    it('play audio file for call', function (done) {
      client.calls.get(1)
        .then(function(call) {
          return call.playMusic('http://localhost')
        })
        .then(function(resp){
          assert.equal(resp.message, 'play started')
          done()
        })
    });

    it('play audio file for call via plivo interface!', function (done) {
      client.calls.playMusic(1, 'http://localhost')
        .then(function(resp){
          assert.equal(resp.message, 'play started')
          done()
        })
    });
    it('stop playing audio file for call', function (done) {
      client.calls.get(1)
        .then(function(call) {
          return call.stopPlayingMusic()
        })
        .then(function(resp){
          assert(resp instanceof PlivoGenericResponse)
          done()
        })
    });

    it('stop playing audio file for call via plivo interface!', function (done) {
      client.calls.stopPlayingMusic(1)
        .then(function(resp){
          assert(resp instanceof PlivoGenericResponse)
          done()
        })
    });
  });

  describe('Speak', function () {
    it('should throw error for text!', function (done) {
      client.calls.get(1)
        .then(function(call) {
          return call.speakText()
        })
        .catch(function(err){
          assert.equal(err.message, 'Missing mandatory field: text, text should be string.')
          done()
        })
    });

    it('play text for call', function (done) {
      client.calls.get(1)
        .then(function(call) {
          return call.speakText('this is test')
        })
        .then(function(resp){
          assert.equal(resp.message, 'speak started')
          done()
        })
    });

    it('play text for call via plivo interface!', function (done) {
      client.calls.speakText(1, 'this is test')
        .then(function(resp){
          assert.equal(resp.message, 'speak started')
          done()
        })
    });
    it('stop playing text for call', function (done) {
      client.calls.get(1)
        .then(function(call) {
          return call.stopSpeakingText()
        })
        .then(function(resp){
          assert(resp instanceof PlivoGenericResponse)
          assert.equal(resp.message, 'speak stopped')
          done()
        })
    });

    it('stop playing text for call via plivo interface!', function (done) {
      client.calls.stopSpeakingText(1)
        .then(function(resp){
          assert.equal(resp.message, 'speak stopped')
          done()
        })
    });
  });

  // it('should make call!', function () {
  //   client.calls.make('', '', 'http://localhost:8000')
  //     .then(function(call) {
  //       assert('string', typeof call.message)
  //       return call.hangup(call.request_uuid)
  //     })
  //     .then(function(status) {
  //       assert(true, status)
  //     })
  // });
  describe('LiveCall', function () {
    it('should get a livecall', function () {
      return client.calls.getLiveCall('6653422-91b6-4716-9fad-9463daaeeec2')
        .then(function (resp) {
          console.log(resp);
          assert.equal(resp.callUuid, '6653422-91b6-4716-9fad-9463daaeeec2');
        });
    });

    it('should list livecalls', function () {
      return client.calls.listLiveCalls();
    });
  })
});
