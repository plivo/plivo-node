import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('NumberInterface', function () {
  it('Get Details of a Rented Number', function () {
    return client.numbers.get('+919999999990')
      .then(function(number) {
        assert.equal(number.id, '+919999999990')
      })
  });

  it('List All Rented Numbers', function () {
    return client.numbers.list()
      .then(function(numbers) {
        assert.equal(numbers.length, 1)
      })
  });

  it('add own number', function () {
    return client.numbers.addOwnNumber('+919999999990', 'carrier', 'region')
      .then(function(numbers) {
        assert.equal(numbers.message, 'changed')
      })
  });

  it('should throw error for number', function () {
    return client.numbers.addOwnNumber(null, 'carrier', 'region')
      .catch(function(err) {
        assert.equal(err.message, 'Missing mandatory field: numbers')
      })
  });

  it('edit a number', function () {
    return client.numbers.update('+919999999990', 'appid', 'subaccount', 'alias')
      .then(function(numbers) {
        assert.equal(numbers.message, 'changed')
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
