import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('Identity', function () {
  it('should get Identity', function () {
    return client.identities.get(1)
      .then(function(identity) {
        assert.equal(identity.id, 1)
      })
  });

  it('list identities', function () {
    return client.identities.list()
      .then(function(identities) {
        assert.equal(identities.length, 1)
      })
  });

  it('has meta information', function () {
    return client.identities.list()
      .then(function(identities) {
        assert.equal(identities.meta.totalCount, 19)
      })
  });

  it('should throw error - country_iso is required via interface', function () {
    return client.identities.create(null, "Mr", "first_name", "last_name", "birth_place", "1984-12-12", "nationality", "id_nationality", "1999-12-12", "id_type", "id_number", "address_line1", "address_line2", "city", "Region", "Postal Code")
      .catch(function(error){
        assert.equal(error.message, 'Missing mandatory field: country_iso, country_iso should be string.')
      })
  });

  it('should create identity via interface', function () {
    return client.identities.create("US", "Mr", "first_name", "last_name", "birth_place", "1984-12-12", "nationality", "id_nationality", "1999-12-12", "id_type", "id_number", "address_line1", "address_line2", "city", "Region", "Postal Code")
      .then(function(identity){
        assert.equal(identity.message, 'Your request has been accepted.')
      })
  });

  it('should update Identity via interface', function () {
    return client.identities.update(1)
      .then(function(identity) {
        assert.equal(identity.message, 'Your request has been accepted.')
      })
  });

  it('should throw error - id is required via interface', function () {
    return client.identities.update(null, {})
      .catch(function(err){
        assert.equal(err.message, 'Missing mandatory field: id')
      })
  });

  it('should update Identity', function () {
    return client.identities.get(1)
      .then(function(identity) {
        return identity.update({answer_url: 'answerUrl'})
      })
      .then(function(identity){
        assert.equal(identity.answer_url, 'answerUrl')
      })
  });

  it('delete identity', function () {
    return client.identities.get(1)
      .then(function(identity){
        return identity.delete()
      })
      .then(function(status) {
        assert.equal(status, true)
      })
  });
  it('delete identity via interface', function () {
    return client.identities.delete(1)
      .then(function(status) {
        assert.equal(status, true)
      })
  });
});
