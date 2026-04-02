import assert from 'assert';
import {
  Client
} from '../lib/rest/client-test';

let client = new Client('sampleid', 'sampletoken', 'sampleproxy');

describe('ComplianceDocumentInterface', function () {

  it('should create a compliance document with file path string', function () {
    return client.complianceDocuments.create({
      endUserId: 'end-user-789',
      documentTypeId: 'doc-type-123',
      alias: 'test-doc',
      file: '/tmp/dummy.pdf'
    })
    .then(function (res) {
      assert.equal(res.documentId, 'doc-456');
      assert.equal(res.alias, 'test-doc');
      assert.equal(res.message, 'Document uploaded successfully');
    });
  });

  it('should reject when endUserId is missing', function () {
    return client.complianceDocuments.create({
      documentTypeId: 'doc-type-123',
      alias: 'test-doc',
      file: '/tmp/dummy.pdf'
    })
    .then(function () {
      throw new Error('should have rejected');
    })
    .catch(function (err) {
      assert.ok(err);
    });
  });

  it('should reject when documentTypeId is missing', function () {
    return client.complianceDocuments.create({
      endUserId: 'end-user-789',
      alias: 'test-doc',
      file: '/tmp/dummy.pdf'
    })
    .then(function () {
      throw new Error('should have rejected');
    })
    .catch(function (err) {
      assert.ok(err);
    });
  });

  it('should reject when alias is missing', function () {
    return client.complianceDocuments.create({
      endUserId: 'end-user-789',
      documentTypeId: 'doc-type-123',
      file: '/tmp/dummy.pdf'
    })
    .then(function () {
      throw new Error('should have rejected');
    })
    .catch(function (err) {
      assert.ok(err);
    });
  });
});
