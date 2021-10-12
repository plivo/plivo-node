import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';
import {LiveCallResource} from "../dist/resources/call";
import {ListAllLiveCallResponse} from "../lib/resources/call";

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
    client.calls.get('aaa-deeiei3-dfddd')
      .then(function(call){
        assert.equal(call.callUuid, 'aaa-deeiei3-dfddd')
        done()
      })
  });
  describe('transfer', function () {
    it('should transfer call!', function () {
      client.calls.get('aaa-deeiei3-dfddd')
        .then(function(call){
          return client.calls.transfer(call.callUuid, {legs: "aleg", alegUrl: "http://aleg_url"})
        })
        .then(function(call) {
          assert.equal(call.message, "call transferred")
        })
    });
  });

  it('should transfer call via plivo interface!', function () {
    return client.calls.transfer('aaa-deeiei3-dfddd', {legs: 'aleg', alegUrl: 'http://aleg_url'})
      .then(function(call) {
        assert.equal(call.message, "call transferred")
      })
  });

  describe('Hangup', function () {
    it('should hangup call!', function (done) {
      client.calls.get('aaa-deeiei3-dfddd')
        .then(function(call){
          return client.calls.hangup(call.callUuid)
        })
        .then(function(call) {
          assert(call, true)
          done()
        })
    });
    it('should cancel call!', function () {
      return client.calls.get('aaa-deeiei3-dfddd')
        .then(function(call){
          return client.calls.cancel(call.callUuid);
        })
        .then(function(call) {
          assert(call, true);
        })
    });
    it('should hangup call via plivo interface!', function (done) {
      client.calls.hangup('aaa-deeiei3-dfddd')
        .then(function(call) {
          assert(call)
          done()
        })
    });
  });
  describe('Record', function () {
    it('should record call!', function () {
      client.calls.get('aaa-deeiei3-dfddd')
        .then(function(call){
          return client.calls.record(call.callUuid)
        })
        .then(function(recordDetail) {
          assert.equal(recordDetail.message, 'call recording started')
        })
    });
    it('should record call via plivo interface!', function () {
      client.calls.record('aaa-deeiei3-dfddd', {})
        .then(function(recordDetail) {
          assert.equal(recordDetail.message, 'call recording started')
        })
    });

    it('should stop recording call!', function () {
      client.calls.get('aaa-deeiei3-dfddd')
        .then(function(call){
          return client.calls.stopRecording(call.callUuid)
        })
        .then(function(recordDetail) {
          assert(recordDetail instanceof PlivoGenericResponse)
        })
    });

    it('should stop recording call via plivo interface!', function (done) {
      client.calls.stopRecording('aaa-deeiei3-dfddd', {})
        .then(function(recordDetail) {
          assert(recordDetail instanceof PlivoGenericResponse)
          done()
        })
    });
  });

  describe('DTMF', function () {
    it('should send digits', function () {
      return client.calls.sendDigits('aaa-deeiei3-dfddd', '123');
    });
  });

  describe('Play', function () {
    it('should throw error for url!', function () {
      client.calls.get('aaa-deeiei3-dfddd')
        .then(function(call) {
          return client.calls.playMusic(call.callUuid)
        })
        .catch(function(err){
          assert.equal(err.message, 'Missing mandatory field: urls, urls should be string.')
        })
    });

    it('should throw error for url via plivo interface!', function (done) {
      client.calls.playMusic('aaa-deeiei3-dfddd')
        .catch(function(err){
          assert.equal(err.message, 'Missing mandatory field: urls, urls should be string.')
          done()
        })
    });

    it('play audio file for call', function () {
      client.calls.get('aaa-deeiei3-dfddd')
        .then(function(call) {
          return client.calls.playMusic(call.callUuid, 'http://localhost')
        })
        .then(function(resp){
          assert.equal(resp.message, 'play started')
        })
    });

    it('play audio file for call via plivo interface!', function (done) {
      client.calls.playMusic('aaa-deeiei3-dfddd', 'http://localhost')
        .then(function(resp){
          assert.equal(resp.message, 'play started')
          done()
        })
    });
    it('stop playing audio file for call', function () {
      client.calls.get('aaa-deeiei3-dfddd')
        .then(function(call) {
          return client.calls.stopPlayingMusic(call.callUuid)
        })
        .then(function(resp){
          assert(resp instanceof PlivoGenericResponse)
        })
    });

    it('stop playing audio file for call via plivo interface!', function (done) {
      client.calls.stopPlayingMusic('aaa-deeiei3-dfddd')
        .then(function(resp){
          assert(resp instanceof PlivoGenericResponse)
          done()
        })
    });
  });

  describe('Speak', function () {
    it('should throw error for text!', function () {
      client.calls.get('aaa-deeiei3-dfddd')
        .then(function(call) {
          return client.calls.speakText(call.callUuid)
        })
        .catch(function(err){
          assert.equal(err.message, 'Missing mandatory field: text, text should be string.')
        })
    });

    it('play text for call', function () {
      client.calls.get('aaa-deeiei3-dfddd')
        .then(function(call) {
          return client.calls.speakText(call.callUuid, 'this is test')
        })
        .then(function(resp){
          assert.equal(resp.message, 'speak started')
        })
    });

    it('play text for call via plivo interface!', function (done) {
      client.calls.speakText('aaa-deeiei3-dfddd', 'this is test')
        .then(function(resp){
          assert.equal(resp.message, 'speak started')
          done()
        })
    });
    it('stop playing text for call', function () {
      client.calls.get('aaa-deeiei3-dfddd')
        .then(function(call) {
          return client.calls.stopSpeakingText(call.callUuid)
        })
        .then(function(resp){
          assert(resp instanceof PlivoGenericResponse)
          assert.equal(resp.message, 'speak stopped')
        })
    });

    it('stop playing text for call via plivo interface!', function (done) {
      client.calls.stopSpeakingText('aaa-deeiei3-dfddd')
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
          assert.equal(resp.callUuid, '6653422-91b6-4716-9fad-9463daaeeec2');
        });
    });

    it('should list livecalls', function () {
      return client.calls.listLiveCalls().
      then(function (resp){
        assert.equal(resp.length, 2)
      });
    });
  })
});
