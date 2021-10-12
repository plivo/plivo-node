import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('Application', function () {
  it('should get Application', function () {
    return client.applications.get(1)
      .then(function(application) {
        assert.equal(application.appId, 1)
      })
  });

  it('list Applications', function () {
    return client.applications.list()
      .then(function(applications) {
        assert.equal(applications.length, 2)
      })
  });

  it('has meta information', function () {
    return client.applications.list()
      .then(function(applications) {
        assert.equal(applications.meta.totalCount, 19)
      })
  });

  it('should create application via interface', function () {
    return client.applications.create('appName')
      .then(function(application){
            assert.equal(application.message, 'created')
      })
  });

  it('should update Application via interface', function () {
    return client.applications.update(1, {answer_url: 'answerUrl'})
      .then(function(application) {
        assert.equal(application.message, 'changed')
      })
  });

  it('should throw error - id is required via interface', function () {
    return client.applications.update(null, {answer_url: 'answerUrl'})
      .catch(function(err){
        assert.equal(err.message, 'Missing mandatory field: id')
      })
  });

  it('should update Application', function () {
    return client.applications.get(1)
      .then(function(application) {
        assert.equal(application.appId, 1)
        return client.applications.update(application.appId,{answer_url: 'answerUrl'})
          .then(function(application){
            assert.equal(application.message, 'changed')
          });
      });
  });

  it('delete application', function () {
    return client.applications.get(1)
      .then(function(application){
        assert.equal(application.appId, 1)
        return client.applications.delete(application.appId,{answer_url: 'answerUrl'})
          .then(function(status){
            assert.equal(status, true)
          });
      });
  });
  it('delete application via interface', function () {
    return client.applications.delete(1)
      .then(function(status) {
        assert.equal(status, true)
      })
  });
});
