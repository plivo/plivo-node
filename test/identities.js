import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('Address', function () {
  it('should get Address', function () {
    return client.addresses.get(1)
      .then(function(address) {
        assert.equal(address.id, 1)
      })
  });

  it('list addresses', function () {
    return client.addresses.list()
      .then(function(addresses) {
        assert.equal(addresses.length, 1)
      })
  });

  it('has meta information', function () {
    return client.addresses.list()
      .then(function(addresses) {
        assert.equal(addresses.meta.totalCount, 19)
      })
  });

  it('should throw error - country_iso is required via interface', function () {
    return client.addresses.create(null, "Mr", "first_name", "last_name", "address_line1", "address_line2", "New York", "Region", "Postal Code", "nation_id")
      .catch(function(error){
        assert.equal(error.message, 'Missing mandatory field: country_iso, country_iso should be string.')
      })
  });

  it('should create address via interface', function () {
    return client.addresses.create("en-US", "Mr", "first_name", "last_name", "address_line1", "address_line2", "New York", "Region", "Postal Code", "nation_id")
      .then(function(address){
        assert.equal(address.message, 'Your request has been accepted.')
      })
  });

  it('should update Address via interface', function () {
    return client.addresses.update(1)
      .then(function(address) {
        assert.equal(address.message, 'Your request has been accepted.')
      })
  });

  it('should throw error - id is required via interface', function () {
    return client.addresses.update(null, {})
      .catch(function(err){
        assert.equal(err.message, 'Missing mandatory field: id')
      })
  });

  it('should update Address', function () {
    return client.addresses.get(1)
      .then(function(address) {
        return address.update({answer_url: 'answerUrl'})
      })
      .then(function(address){
        assert.equal(address.answer_url, 'answerUrl')
      })
  });

  it('delete address', function () {
    return client.addresses.get(1)
      .then(function(address){
        return address.delete()
      })
      .then(function(status) {
        assert.equal(status, true)
      })
  });
  it('delete address via interface', function () {
    return client.addresses.delete(1)
      .then(function(status) {
        assert.equal(status, true)
      })
  });
});
