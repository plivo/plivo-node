import assert from 'assert';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { Readable } from 'stream';
import { camelCaseRequestWrapper } from '../lib/rest/utils';

// Create a real temp file for testing
const tmpFile = path.join(os.tmpdir(), 'plivo-test-upload.txt');
fs.writeFileSync(tmpFile, 'test file content');

describe('Multipart File Upload - recursivelyRenameObject', function () {

  it('should preserve ReadStream objects through camelCaseRequestWrapper', function () {
    let capturedParams = null;

    // Mock request function that captures the transformed params
    const mockRequest = (method, action, params) => {
      capturedParams = params;
      return Promise.resolve({ body: {} });
    };

    const wrapped = camelCaseRequestWrapper(mockRequest);
    const stream = fs.createReadStream(tmpFile);

    return wrapped('POST', 'ComplianceDocument/', {
      end_user_id: 'user-123',
      document_type_id: 'doc-type-456',
      alias: 'test',
      file: stream,
      multipart: true
    }).then(function () {
      // The stream should be preserved, not mangled into a plain object
      assert.ok(capturedParams.file instanceof fs.ReadStream,
        'file should still be a ReadStream after camelCaseRequestWrapper, got: ' + typeof capturedParams.file);
      assert.equal(typeof capturedParams.file.pipe, 'function',
        'stream.pipe should still be a function');
      assert.equal(typeof capturedParams.file.on, 'function',
        'stream.on should still be a function');
      stream.destroy();
    });
  });

  it('should preserve string file paths through camelCaseRequestWrapper', function () {
    let capturedParams = null;

    const mockRequest = (method, action, params) => {
      capturedParams = params;
      return Promise.resolve({ body: {} });
    };

    const wrapped = camelCaseRequestWrapper(mockRequest);

    return wrapped('POST', 'ComplianceDocument/', {
      end_user_id: 'user-123',
      document_type_id: 'doc-type-456',
      alias: 'test',
      file: tmpFile,
      multipart: true
    }).then(function () {
      assert.equal(typeof capturedParams.file, 'string',
        'file should remain a string');
      assert.equal(capturedParams.file, tmpFile);
    });
  });

  it('should preserve Buffer objects through camelCaseRequestWrapper', function () {
    let capturedParams = null;

    const mockRequest = (method, action, params) => {
      capturedParams = params;
      return Promise.resolve({ body: {} });
    };

    const wrapped = camelCaseRequestWrapper(mockRequest);
    const buf = Buffer.from('test content');

    return wrapped('POST', 'ComplianceDocument/', {
      end_user_id: 'user-123',
      document_type_id: 'doc-type-456',
      alias: 'test',
      file: buf,
      multipart: true
    }).then(function () {
      assert.ok(Buffer.isBuffer(capturedParams.file),
        'file should still be a Buffer, got: ' + typeof capturedParams.file);
    });
  });

  it('should still rename camelCase keys to snake_case', function () {
    let capturedParams = null;

    const mockRequest = (method, action, params) => {
      capturedParams = params;
      return Promise.resolve({ body: {} });
    };

    const wrapped = camelCaseRequestWrapper(mockRequest);

    return wrapped('POST', 'ComplianceDocument/', {
      endUserId: 'user-123',
      documentTypeId: 'doc-type-456',
      alias: 'test',
      file: tmpFile
    }).then(function () {
      assert.equal(capturedParams.end_user_id, 'user-123',
        'endUserId should be renamed to end_user_id');
      assert.equal(capturedParams.document_type_id, 'doc-type-456',
        'documentTypeId should be renamed to document_type_id');
      assert.equal(capturedParams.file, tmpFile,
        'file key and value should be preserved');
    });
  });

  it('should preserve array of ReadStreams through camelCaseRequestWrapper', function () {
    let capturedParams = null;

    const mockRequest = (method, action, params) => {
      capturedParams = params;
      return Promise.resolve({ body: {} });
    };

    const wrapped = camelCaseRequestWrapper(mockRequest);
    const stream1 = fs.createReadStream(tmpFile);
    const stream2 = fs.createReadStream(tmpFile);

    return wrapped('POST', 'ComplianceDocument/', {
      end_user_id: 'user-123',
      document_type_id: 'doc-type-456',
      alias: 'test',
      file: [stream1, stream2]
    }).then(function () {
      assert.ok(Array.isArray(capturedParams.file),
        'file should still be an array');
      assert.equal(capturedParams.file.length, 2);
      assert.ok(capturedParams.file[0] instanceof fs.ReadStream,
        'first element should still be a ReadStream');
      assert.ok(capturedParams.file[1] instanceof fs.ReadStream,
        'second element should still be a ReadStream');
      stream1.destroy();
      stream2.destroy();
    });
  });
});

// Clean up temp file after all tests
after(function () {
  try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
});
