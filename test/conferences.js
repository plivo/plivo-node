import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('Conference', function () {
  describe('Via interface', function () {
    it('should get conference', function () {
      return client.conferences.get('MyConf')
        .then(function(conference) {
          assert.equal(conference.conferenceName, 'MyConf')
        })
    });

    it('should get all conferences', function () {
      return client.conferences.list()
        .then(function(response) {
          assert.equal(response.conferences[0], 'My Conf Room' )
        })
    });

    it('should Hangup All Conferences', function () {
      return client.conferences.hangupAll()
        .then(function(response) {
          assert.equal(response.message,'all conferences hung up')
        })
    });

    it('should Hangup Conference', function () {
      return client.conferences.hangup('MyConf')
        .then(function(status) {
          assert.equal(status, true)
        })
    });

    it('should Hangup Member', function () {
      return client.conferences.hangupMember('MyConf', 1)
        .then(function(response) {
          assert.equal(response.message, 'hangup')
        })
    });

    it('should Kick Member', function () {
      return client.conferences.kickMember('MyConf', 1)
        .then(function(response) {
          assert.equal(response.message, 'kicked')
        })
    });

    it('should Mute Member', function () {
      return client.conferences.muteMember('MyConf', 1)
        .then(function(response) {
          assert.equal(response.message, 'muted')
        })
    });

    it('should Unmute Member', function () {
      return client.conferences.unmuteMember('MyConf', 1)
        .then(function(response) {
          assert.equal(response instanceof PlivoGenericResponse, true)
        })
    });

    it('should Deaf Member', function () {
      return client.conferences.deafMember('MyConf', 1)
        .then(function(response) {
          assert.equal(response.message, 'deaf')
        })
    });

    it('should undeaf Member', function () {
      return client.conferences.undeafMember('MyConf', 1)
        .then(function(response) {
          assert.equal(response instanceof PlivoGenericResponse, true)
        })
    });

    it('should play Audio to Member', function () {
      return client.conferences.playAudioToMember('MyConf', 1, 'http://localhost')
        .then(function(response) {
          assert.equal(response.message, 'play queued into conference')
        })
    });

    it('should stop playing Audio to Member', function () {
      return client.conferences.stopPlayingAudioToMember('MyConf', 1)
        .then(function(response) {
          assert.equal(response.message, 'playing in conference stopped')
        })
    });

    it('should play text to Member', function () {
      return client.conferences.speakTextToMember('MyConf', 1, 'text')
        .then(function(response) {
          assert.equal(response.message, 'speak queued into conference')
        })
    });

    it('should stop playing text to Member', function () {
      return client.conferences.stopSpeakingTextToMember('MyConf', 1)
        .then(function(response) {
          assert.equal(response.message, 'speak stopped')
        })
    });

    it('should stop record conference', function () {
      return client.conferences.stopRecording('MyConf')
        .then(function(response) {
          assert.equal(response instanceof PlivoGenericResponse, true)
        })
    });

    it('should record conference', function () {
      return client.conferences.record('MyConf')
        .then(function(response) {
          assert.equal(response.message, 'conference recording started')
        })
    });
  });

  describe('Via Conference Object', function () {

    it('should Hangup Conference', function () {
      return client.conferences.get('MyConf')
        .then(function(conference) {
          return client.conferences.hangup(conference.conferenceName)
        })
        .then(function(status) {
          assert.equal(status, true)
        })
    });

    it('should Hangup Member', function () {
      return client.conferences.get('MyConf')
        .then(function(conference) {
          return client.conferences.hangupMember(conference.conferenceName,1)
        })
        .then(function(response) {
          assert.equal(response.message, 'hangup')
        })
    });

    it('should Kick Member', function () {
      return client.conferences.get('MyConf')
        .then(function(conference) {
          return client.conferences.kickMember(conference.conferenceName,1)
        })
        .then(function(response) {
          assert.equal(response.message, 'kicked')
        })
    });

    it('should Mute Member', function () {
      return client.conferences.get('MyConf')
        .then(function(conference) {
          return client.conferences.muteMember(conference.conferenceName, 1)
        })
        .then(function(response) {
          assert.equal(response.message, 'muted')
        })
    });

    it('should Unmute Member', function () {
      return client.conferences.get('MyConf')
        .then(function(conference) {
          return client.conferences.unmuteMember(conference.conferenceName, 1)
        })
        .then(function(response) {
          assert.equal(response instanceof PlivoGenericResponse, true)
        })
    });

    it('should Deaf Member', function () {
      return client.conferences.get('MyConf')
        .then(function(conference) {
          return client.conferences.deafMember(conference.conferenceName, 1)
        })
        .then(function(response) {
          assert.equal(response.message, 'deaf')
        })
    });

    it('should undeaf Member', function () {
      return client.conferences.get('MyConf')
        .then(function(conference) {
          return client.conferences.undeafMember(conference.conferenceName, 1)
        })
        .then(function(response) {
          assert.equal(response instanceof PlivoGenericResponse, true)
        })
    });

    it('should play Audio to Member', function () {
      return client.conferences.get('MyConf')
        .then(function(conference) {
          return client.conferences.playAudioToMember(conference.conferenceName, 1, 'http://localhost')
        })
        .then(function(response) {
          assert.equal(response.message, 'play queued into conference')
        })
    });

    it('should stop playing Audio to Member', function () {
      client.conferences.get('MyConf')
        .then(function(conference) {
          return client.conferences.stopPlayingAudioToMember(conference.conferenceName, 1)
        })
        .then(function(response) {
          assert.equal(response.message, 'playing in conference stopped')
        })
    });

    it('should play text to Member', function () {
      return client.conferences.get('MyConf')
        .then(function(conference) {
          return client.conferences.speakTextToMember(conference.conferenceName, 1,'text')
        })
        .then(function(response) {
          assert.equal(response.message, 'speak queued into conference')
        })
    });

    it('should stop playing text to Member', function () {
      return client.conferences.get('MyConf')
        .then(function(conference) {
          return client.conferences.stopSpeakingTextToMember(conference.conferenceName, 1)
        })
        .then(function(response) {
          assert.equal(response.message, 'speak stopped')
        })
    });

    it('should stop record conference', function () {
      return client.conferences.get('MyConf')
        .then(function(conference) {
          return client.conferences.stopRecording(conference.conferenceName)
        })
        .then(function(response) {
          assert.equal(response instanceof PlivoGenericResponse, true)
        })
    });

    it('should record conference', function () {
      return client.conferences.get('MyConf')
        .then(function(conference) {
          return client.conferences.record(conference.conferenceName)
        })
        .then(function(response) {
          assert.equal(response.message, 'conference recording started')
        })
    });
  });



});
