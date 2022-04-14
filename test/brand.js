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
          assert.equal(brand.brand.brandId, 'B1QSGGS')
        })
    });
  
    it('list brand', function () {
      return client.brand.list()
        .then(function (brand) {
          assert.equal(brand.brands.length, 2)
        })
    });

    it('create brand', function () {
        return client.brand.create("vishnu128", "3cf3e991-2f94-4910-9712-61442987a2d0","starter", false)
          .then(function (brand) {
            assert.equal(brand.brandId, 'B1QSGGS')
          })
      });

  
  });