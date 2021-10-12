import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('Account', function () {
  it('should getAccount', function () {
    return client.accounts.get()
      .then(function(account) {
        assert.equal(account.resourceUri, '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/')
        assert.equal(account.accountType, 'standard')
      })
  });

  it('should update Account via interface', function () {
      return client.accounts.update({
         name: 'name',
         city: 'city',
         address: 'address'
      }) 
      .then(function(account) {
            assert.equal(account.message, 'changed')
      })
  });

  it('should update Account', function () {
    return client.accounts.update({
      name: 'name',
      city: 'city',
      address: 'address'
    })
      .then(function(account) {
        assert.equal(account.message, 'changed')
      })
  });

  it('should not create subAccount without subAccount name and throw error', function() {
    return client.subAccounts.create()
    .catch(function(errorResponse) {
      assert.equal(errorResponse, 'Error: Missing mandatory field: name')
    })
  })

  it('should create enabled subAccount via interface', function() {
    return client.subAccounts.create('Test Subaccount', true)
    .then(function(genericResponse) {
      assert.equal(genericResponse.message, 'created')
      assert.equal(genericResponse.authId, 'SANDLHYZBIZMU4ZDEXNM')
    })
  })

  it('should create disabled subAccount via interface', function() {
    return client.subAccounts.create('Test Subaccount', false)
    .then(function(genericResponse) {
      assert.equal(genericResponse.message, 'created')
      assert.equal(genericResponse.authId, 'SANDLHYZBIZMU4ZDEXNM')
    })
  })

  it('should create disabled subAccount via interface', function() {
    return client.subAccounts.create('Test Subaccount')
    .then(function(genericResponse) {
      assert.equal(genericResponse.message, 'created')
      assert.equal(genericResponse.authId, 'SANDLHYZBIZMU4ZDEXNM')
    })
  })

  it('should get subAccount by id via interface', function () {
    return client.subAccounts.get(1)
      .then(function(subaccount) {
        assert.equal(subaccount.authId, 1)
      })
  });

  it('should update subAccount via interface', function () {
    return client.subAccounts.update(1, 'name', true)
      .then(function(account) {
        assert.equal(account.message, 'changed')
      })
  });

  it('list subAccounts', function () {
    return client.subAccounts.list()
      .then(function(accounts) {
        assert.equal(accounts.length, 2)
      })
  });

  it('delete subAccounts via interface', function () {
    return client.subAccounts.delete(1)
      .then(function(accounts) {
        assert.equal(accounts, true)
      })
  });
});
