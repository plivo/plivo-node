import {
  Client
} from '../lib/rest/client-test';
import assert from 'assert';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('Account', function() {
  it('should getAccount', function() {
      return client.accounts.get()
          .then(function(account) {
              assert.equal(account.authId, 'MANWVLYTK4ZWU1YTY4ZT', typeof(account.authId), 'string')
              assert.equal(account.accountType, 'standard', typeof(account.accountType), 'string')
              assert.equal(account.address, '340 Pine St, San Francisco, CA - 94104', typeof(account.address), 'string')
              assert.equal(account.apiId, 'c31b36be-0da2-11e4-bd8a-12313f016a39', typeof(account.apiId), 'string')
              assert.equal(account.autoRecharge, true, typeof(account.autoRecharge), 'boolean')
              assert.equal(account.billingMode, 'prepaid', typeof(account.billingMode), 'string')
              assert.equal(account.cashCredits, '23.79822', typeof(account.cashCredits), 'string')
              assert.equal(account.city, 'San Francisco', typeof(account.city), 'string')
              assert.equal(account.name, 'Han Solo', typeof(account.name), 'string')
              assert.equal(account.resourceUri, '/v1/Account/MANWVLYTK4ZWU1YTY4ZT/', typeof(account.resourceUri), 'string')
              assert.equal(account.state, 'California', typeof(account.state), 'string')
              assert.equal(account.timezone, 'America/Los_Angeles', typeof(account.timezone), 'string')
          })
  });

  it('should update Account via interface', function() {
      return client.accounts.get()
          .then(function() {
              return client.accounts.update({
                      name: 'name',
                      city: 'city',
                      address: 'address'
                  })
                  .then(function(account) {
                      assert.equal(account.message, 'changed')
                  })
          })
  });

  it('should update Account', function() {
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

  it('should get subAccount by id via interface', function() {
      client.subAccounts.get(1)
          .then(function(subaccount) {
              assert.equal(subaccount.authId, 1)
          })
  });

  it('should update subAccount via interface', function() {
      return client.subAccounts.update(1, 'name', true)
          .then(function(account) {
              assert.equal(account.message, 'changed')
              assert.equal(account.apiId, '5a9fcb68-523d-11e1-86da-6ff39efcb949')
          })
  });

  it('should update subAccount', function() {
      return client.subAccounts.get(1)
          .then(function() {
              return client.subAccounts.update(1, 'name')
          })
          .then(function(account) {
              assert.equal(account.message, 'changed')
              assert.equal(account.apiId, '5a9fcb68-523d-11e1-86da-6ff39efcb949')
          })
  });

  it('list subAccounts', function() {
      return client.subAccounts.list()
          .then(function(accounts) {
              assert.equal(accounts.length, 2)
          })
  });

  it('delete subAccounts', function() {
      return client.subAccounts.get(1)
          .then(function() {
              return client.subAccounts.delete(1)
          })
          .then(function(account) {
              assert.equal(account, true)
          })
  });
  
  it('delete subAccounts via interface', function() {
      return client.subAccounts.delete(1)
          .then(function(accounts) {
              assert.equal(accounts, true)
          })
  });
});