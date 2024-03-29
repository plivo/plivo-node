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
    .then(function (res) {
      assert.notEqual(res.length, 0)
      })
  });
  it('should get media', function () {
    return client.media.get('0178eb8a-461a-4fd1-bc37-13eebfdc0676')
      .then(function (res) {
        assert.equal(res.mediaId, '0178eb8a-461a-4fd1-bc37-13eebfdc0676')
      })
  });
});
