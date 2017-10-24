import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('Account', function () {
  it('should getAccount', function () {
    return client.accounts.get()
      .then(function(account) {
        assert.equal(account.authId, 'MANWVLYTK4ZWU1YTY4ZT')
        assert.equal(account.id, 'MANWVLYTK4ZWU1YTY4ZT')
      })
  });

  it('should update Account via interface', function () {
    return client.accounts.get()
      .then(function(account){
       return account.update({
         name: 'name',
         city: 'city',
         address: 'address'
       })
          .then(function(account) {
            assert.equal(account.name, 'name')
          })
      })
  });

  it('should update Account', function () {
    return client.accounts.update({
      name: 'name',
      city: 'city',
      address: 'address'
    })
      .then(function(account) {
        assert.equal(account.name, 'name')
      })
  });

  it('should create subAccount via interface', function() {
    return client.subAccounts.create('Test Subaccount', true);
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
        assert.equal(account.name, 'name')
      })
  });

  it('should update subAccount', function () {
    return client.subAccounts.get(1)
      .then(function(subaccount){
        return subaccount.update('name', true)
      })
      .then(function(account) {
        assert.equal(account.name, 'name')
      })
  });

  it('list subAccounts', function () {
    return client.subAccounts.list()
      .then(function(accounts) {
        assert.equal(accounts.length, 2)
      })
  });

  it('delete subAccounts', function () {
    return client.subAccounts.get(1)
      .then(function(subaccount){
        return subaccount.delete()
      })
      .then(function(account) {
        assert.equal(account, true)
      })
  });
  it('delete subAccounts via interface', function () {
    return client.subAccounts.delete(1)
      .then(function(accounts) {
        assert.equal(accounts, true)
      })
  });
});
