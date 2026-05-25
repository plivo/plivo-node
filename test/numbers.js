import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';
import assert from 'assert';
import sinon from 'sinon';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('NumberInterface', function () {
  it('Get Details of a Rented Number', function () {
    return client.numbers.get('+919999999990')
      .then(function(number) {
        assert.equal(number.id, '+919999999990')
        assert.equal(number.subAccount, 'SAXXXXXXXXXXXXXXXXXX')
        assert.equal(number.subAccountName, 'Marketing')
      })
  });

  it('List All Rented Numbers', function () {
    return client.numbers.list()
      .then(function(numbers) {
        assert.equal(numbers.length, 1)
        assert.equal(numbers[0].subAccount, 'SAXXXXXXXXXXXXXXXXXX')
        assert.equal(numbers[0].subAccountName, 'Marketing')
      })
  });

  // it('add own number', function () {
  //   return client.numbers.addOwnNumber('+919999999990', 'carrier', 'region')
  //     .then(function(numbers) {
  //       assert.equal(numbers.message, 'changed')
  //     })
  // });

  it('should throw error for number', function () {
    return client.numbers.addOwnNumber(null, 'carrier', 'region')
      .catch(function(err) {
        assert.equal(err.message, 'Missing mandatory field: numbers')
      })
  });

  it('edit a number', function () {
    return client.numbers.update('+919999999990', { appId: 'appid', subAccount: 'SA1234567890ABCDEFGH', alias: 'alias' })
      .then(function(numbers) {
        assert.equal(numbers.message, 'changed')
      })
  });

  it('edit a number with full param surface', function () {
    return client.numbers.update('+919999999990', {
      appId: '12345',
      subAccount: 'SA1234567890ABCDEFGH',
      alias: 'support-line',
      complianceApplicationId: 'comp-app-uuid',
      cnamLookup: 'enabled',
      cnam: 'Plivo Inc',
      cnamCallbackUrl: 'https://example.com/cnam',
      cnamCallbackMethod: 'POST',
      callerReputation: 'enabled',
      profileUuid: 'profile-uuid',
      callerReputationCallbackUrl: 'https://example.com/reputation',
      callerReputationCallbackMethod: 'POST'
    }).then(function(numbers) {
      assert.equal(numbers.message, 'changed')
    })
  });

  it('edit a number with no params does not throw', function () {
    return client.numbers.update('+919999999990')
      .then(function(numbers) {
        assert.equal(numbers.message, 'changed')
      })
  });

  it('list rented numbers with full filter surface', function () {
    return client.numbers.list({
      type: 'local',
      numberStartswith: '1408',
      subAccount: 'SA1234567890ABCDEFGH',
      alias: 'support-line',
      services: 'voice,sms',
      cnamLookup: 'enabled',
      tendlcRegistrationStatus: 'COMPLETED',
      tendlcCampaignId: 'CXXXX',
      tollFreeSmsVerification: 'VERIFIED',
      renewal_date__gte: '2026-01-01',
      limit: 10,
      offset: 0
    }).then(function(numbers) {
      assert.equal(numbers.length, 1)
    })
  });

  it('should throw error for number', function () {
    return client.numbers.update(null, 'appid', 'subaccount', 'alias')
      .catch(function(err) {
        assert.equal(err.message, 'Missing mandatory field: number')
      })
  });

  it('unrent a number', function () {
    return client.numbers.unrent('+919999999990')
      .then(function(numbers) {
        assert.equal(numbers, true)
      })
  });

  it('should throw error for number for unrent', function () {
    return client.numbers.unrent()
      .catch(function(err) {
        assert.equal(err.message, 'Missing mandatory field: number')
      })
  });

  it('Search for New Numbers', function () {
    return client.numbers.search('US')
      .then(function(numbers) {
        assert.equal(numbers.length, 2)
      })
  });

  it('should throw error country_iso', function () {
    return client.numbers.search()
      .catch(function(err) {
        assert.equal(err.message, 'Missing mandatory field: country_iso')
      })
  });

  it('Buy Number', function () {
    return client.numbers.buy('+919999999990', 'appId')
      .then(function(numbers) {
        assert.equal(numbers.status, 'fulfilled')
      })
  });

  it('should throw error for number in buy', function () {
    return client.numbers.buy()
      .catch(function(err) {
        assert.equal(err.message, 'Missing mandatory field: number')
      })
  });

});
