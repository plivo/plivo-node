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

  it('should expose INR charges camelCased when getting an INR session', function () {
    return client.verify_session.get('inr-session-1')
      .then(function (session) {
        assert.equal(session.charges.totalCharge, '0.07100')
        assert.equal(session.charges.totalChargeInr, '5.89300')
        assert.equal(session.charges.attemptCharges[0].charge, '0.02100')
        assert.equal(session.charges.attemptCharges[0].chargeInr, '1.74300')
        assert.strictEqual(session.attemptDetails[0].amount, 0.021)
        assert.strictEqual(session.attemptDetails[0].amountInr, 1.743)
      })
  });

  it('should leave INR charges undefined when getting a USD session', function () {
    return client.verify_session.get(1)
      .then(function (session) {
        assert.equal(session.charges.totalCharge, '0.07100')
        assert.strictEqual(session.charges.totalChargeInr, undefined)
        assert.strictEqual(session.charges.attemptCharges[0].chargeInr, undefined)
        assert.strictEqual(session.attemptDetails[0].amountInr, undefined)
      })
  });

  it('should expose INR charges camelCased when listing INR sessions', function () {
    return client.verify_session.list({subaccount: 'SAINRACCOUNT00000000'})
      .then(function (result) {
        let session = result.sessions[0]
        assert.equal(session.charges.totalChargeInr, '5.89300')
        assert.equal(session.charges.attemptCharges[0].charge, '0.02100')
        assert.equal(session.charges.attemptCharges[0].chargeInr, '1.74300')
        assert.strictEqual(session.attemptDetails[0].amount, 0.021)
        assert.strictEqual(session.attemptDetails[0].amountInr, 1.743)
      })
  });

  it('should leave INR charges undefined when listing USD sessions', function () {
    return client.verify_session.list()
      .then(function (result) {
        let session = result.sessions[0]
        assert.equal(session.charges.totalCharge, '0.07100')
        assert.strictEqual(session.charges.totalChargeInr, undefined)
        assert.strictEqual(session.charges.attemptCharges[0].chargeInr, undefined)
        assert.strictEqual(session.attemptDetails[0].amountInr, undefined)
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
