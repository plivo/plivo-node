import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('RecordingInterface', function () {
  it('should get recording via interface', function () {
    return client.recordings.get(1)
      .then(function(recording) {
        assert.equal(recording.id, 1)
      })
  });

  it('should get all recording via interface', function () {
    return client.recordings.list()
      .then(function(recording) {
        assert.equal(recording.length, 2)
      })
  });

  it('should delete recording', function () {
    return client.recordings.delete(1)
      .then(function(status) {
        assert.equal(status, true)
      })
  });

  it('should delete recording via interface', function () {
    return client.recordings.get(1)
      .then(function(recording){
        return recording.delete()
      })
      .then(function(status) {
        assert.equal(status, true)
      })
  });

  it('throw error for id', function () {
    return client.recordings.get()
      .catch(function(err) {
        assert.equal(err.message, 'Missing mandatory field: id')
      })
  });

  it('throw error for id', function () {
    return client.recordings.delete()
      .catch(function(err) {
        assert.equal(err.message, 'Missing mandatory field: id')
      })
  });

});
