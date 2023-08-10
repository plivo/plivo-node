import {
  Client
} from '../lib/rest/client-test';
import {
  PlivoGenericResponse
} from '../lib/base.js';
import assert from 'assert';
import sinon from 'sinon';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('session', function () {

  it('should create session via interface', function () {
    return client.verify_session.create({
      recipient: '+14156667778',
    })
      .then(function (session) {
        assert.equal(session.message, 'Session initiated')
      })
  });

  it('should get session', function () {
    return client.verify_session.get(1)
      .then(function (session) {
        assert.equal(session.alias, 'new_voice45')
      })
  });

  it('list sessions', function () {
    return client.verify_session.list()
      .then(function (session) {
        assert.equal(session.sessions[0].count, 1)
      })
  });

  it('should validate session via interface', function () {
    return client.verify_session.validate({
      id: 1,
      otp: 123456
    })
      .then(function (session) {
        assert.equal(session.message, 'session validated successfully.')
      })
  });

});
