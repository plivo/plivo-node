import {
    Client
  } from '../lib/rest/client-test';
  import {
    PlivoGenericResponse
  } from '../lib/base.js';
  import assert from 'assert';
  import sinon from 'sinon';
  
  let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');
  
  describe('brand', function () {
    it('should get brand', function () {
      return client.brand.get('BRPXS6E')
        .then(function (brand) {
          assert.equal(brand.brand.brandId, 'BRPXS6E')
        })
    });
  
    it('list brand', function () {
      return client.brand.list()
        .then(function (brand) {
          assert.equal(brand.brands.length, 2)
        })
    });

    it('create brand', function () {
        return client.brand.create("New York","ABC Inc.", "US", "111111111","US","johndoe@abc.com","PRIVATE_PROFIT","+11234567890","10001","PENDING",
        "NY", "NASDAQ","ABC","123", "RETAIL")
          .then(function (brand) {
            assert.equal(brand.brand.brandId, 'BVI0UQA')
          })
      });

  
  });