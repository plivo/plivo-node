import assert from 'assert';
import sinon from 'sinon';
import {
  Client
} from '../lib/rest/client-test';
import {
  PlivoGenericResponse
} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('MediaInterface', function () {

  it('list media  via interface', function () {
    return client.media.list()
      .then(function (media) {
        assert.notEqual(media.length, 0)
      })
  });
  it('should get media', function () {
    return client.media.get(1)
      .then(function (media) {
        assert.equal(media.media_id, 1)
      })
  });
});
