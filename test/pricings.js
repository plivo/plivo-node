import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('PricingInterface', function () {
  it('should get pricings via interface', function () {
    return client.pricings.get('US')
      .then(function(pricings) {
        assert.equal(pricings.countryIso, 'US');
      })
  });

  it('throw error for country iso', function () {
    return client.pricings.get()
      .catch(function(err) {
        assert.equal(err.message, 'Missing mandatory field: country_iso')
      })
  });

});
