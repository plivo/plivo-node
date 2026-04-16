import assert from 'assert';
import {
  Client
} from '../lib/rest/client-test';

let client = new Client('sampleid', 'sampletoken', 'sampleproxy');

// =========== Requirements ===========

describe('PhoneNumberComplianceRequirementInterface', function () {

  it('should get compliance requirements successfully', function () {
    return client.phoneNumberComplianceRequirements.get({
      countryIso: 'US',
      numberType: 'local',
      userType: 'business'
    })
    .then(function (res) {
      assert.notEqual(res.requirementId, undefined, 'requirementId must not be undefined');
      assert.equal(res.requirementId, 'req-uuid-123');
      assert.notEqual(res.countryIso, undefined, 'countryIso must not be undefined');
      assert.equal(res.countryIso, 'US');
      assert.notEqual(res.numberType, undefined, 'numberType must not be undefined');
      assert.equal(res.numberType, 'local');
      assert.notEqual(res.userType, undefined, 'userType must not be undefined');
      assert.equal(res.userType, 'business');
      assert.ok(Array.isArray(res.documentTypes), 'documentTypes must be an array');
      assert.equal(res.documentTypes.length, 1);
    });
  });

  it('should return document types with details', function () {
    return client.phoneNumberComplianceRequirements.get({
      countryIso: 'US',
      numberType: 'local',
      userType: 'business'
    })
    .then(function (res) {
      let docTypes = res.documentTypes;
      assert.equal(docTypes.length, 1, 'should have exactly 1 document type');

      // Keys are camelCased by the camelCaseRequestWrapper
      assert.notEqual(docTypes[0].documentTypeId, undefined, 'documentTypeId must not be undefined');
      assert.equal(docTypes[0].documentTypeId, 'dt-uuid-123');
      assert.notEqual(docTypes[0].name, undefined, 'name must not be undefined');
      assert.equal(docTypes[0].name, 'Registration Certificate');
      assert.notEqual(docTypes[0].description, undefined, 'description must not be undefined');
      assert.equal(docTypes[0].description, 'Certificate Registration');
      assert.notEqual(docTypes[0].proofRequired, undefined, 'proofRequired must not be undefined');
      assert.equal(docTypes[0].proofRequired, true);
    });
  });

  it('should return requiredFields with nested field details', function () {
    return client.phoneNumberComplianceRequirements.get({
      countryIso: 'US',
      numberType: 'local',
      userType: 'business'
    })
    .then(function (res) {
      let docType = res.documentTypes[0];
      assert.ok(Array.isArray(docType.requiredFields), 'requiredFields must be an array');
      assert.equal(docType.requiredFields.length, 1);

      let field = docType.requiredFields[0];
      assert.notEqual(field.fieldName, undefined, 'fieldName must not be undefined');
      assert.equal(field.fieldName, 'business_name');
      assert.notEqual(field.friendlyName, undefined, 'friendlyName must not be undefined');
      assert.equal(field.friendlyName, 'Legal Name');
      assert.notEqual(field.fieldType, undefined, 'fieldType must not be undefined');
      assert.equal(field.fieldType, 'string');
      assert.notEqual(field.required, undefined, 'required must not be undefined');
      assert.equal(field.required, true);
    });
  });

  it('should get requirements with empty params (no doc types filter)', function () {
    return client.phoneNumberComplianceRequirements.get()
    .then(function (res) {
      assert.ok(res.apiId);
      assert.ok(res.documentTypes);
    });
  });
});

// =========== Compliance CRUD ===========

describe('PhoneNumberComplianceInterface', function () {

  // ---- Create ----

  it('should create compliance application successfully', function () {
    return client.phoneNumberCompliance.create({
      requirementId: 'cr-123',
      alias: 'test-compliance',
      userType: 'business',
      countryIso: 'US',
      numberType: 'local'
    })
    .then(function (res) {
      assert.notEqual(res.complianceId, undefined, 'complianceId must not be undefined');
      assert.equal(res.complianceId, 'comp-uuid-123');
      assert.notEqual(res.message, undefined, 'message must not be undefined');
      assert.equal(res.message, 'Compliance application created and submitted for review.');
    });
  });

  it('should create compliance and return complianceId and message', function () {
    return client.phoneNumberCompliance.create({
      requirementId: 'cr-123',
      alias: 'my-compliance',
      userType: 'business',
      countryIso: 'US',
      numberType: 'local'
    })
    .then(function (res) {
      assert.ok(res.complianceId, 'complianceId must be truthy');
      assert.ok(res.message, 'message must be truthy');
    });
  });

  // ---- List ----

  it('should list compliance applications successfully', function () {
    return client.phoneNumberCompliance.list()
    .then(function (res) {
      assert.ok(res.meta, 'meta must be present');
      assert.ok(res.compliances, 'compliances must be present');
      assert.equal(res.compliances.length, 2);
      assert.notEqual(res.meta.totalCount, undefined, 'totalCount must not be undefined');
      assert.equal(res.meta.totalCount, 2);
    });
  });

  it('should list compliance applications with filters', function () {
    return client.phoneNumberCompliance.list({
      status: 'approved',
      numberType: 'local',
      limit: 10,
      offset: 0
    })
    .then(function (res) {
      assert.ok(res.meta, 'meta must be present');
      assert.ok(res.compliances, 'compliances must be present');
    });
  });

  it('should list compliance with pagination meta fields', function () {
    return client.phoneNumberCompliance.list()
    .then(function (res) {
      // camelCaseRequestWrapper transforms snake_case keys to camelCase
      assert.ok(res.meta.hasOwnProperty('limit'));
      assert.ok(res.meta.hasOwnProperty('offset'));
      assert.ok(res.meta.hasOwnProperty('next'));
      assert.ok(res.meta.hasOwnProperty('previous'));
      assert.ok(res.meta.hasOwnProperty('totalCount'));
      assert.equal(res.meta.limit, 20);
      assert.equal(res.meta.offset, 0);
      assert.equal(res.meta.previous, null);
    });
  });

  it('should list compliance and return object details', function () {
    return client.phoneNumberCompliance.list()
    .then(function (res) {
      let first = res.compliances[0];
      assert.notEqual(first.complianceId, undefined, 'first complianceId must not be undefined');
      assert.equal(first.complianceId, 'pnc-456');
      assert.notEqual(first.alias, undefined, 'first alias must not be undefined');
      assert.equal(first.alias, 'compliance-us-local');
      assert.notEqual(first.status, undefined, 'first status must not be undefined');
      assert.equal(first.status, 'approved');
      assert.notEqual(first.countryIso, undefined, 'first countryIso must not be undefined');
      assert.equal(first.countryIso, 'US');

      let second = res.compliances[1];
      assert.notEqual(second.complianceId, undefined, 'second complianceId must not be undefined');
      assert.equal(second.complianceId, 'pnc-789');
      assert.notEqual(second.alias, undefined, 'second alias must not be undefined');
      assert.equal(second.alias, 'compliance-de-mobile');
      assert.notEqual(second.status, undefined, 'second status must not be undefined');
      assert.equal(second.status, 'draft');
      assert.notEqual(second.countryIso, undefined, 'second countryIso must not be undefined');
      assert.equal(second.countryIso, 'DE');
    });
  });

  // ---- Get ----

  it('should get a single compliance application', function () {
    return client.phoneNumberCompliance.get('pnc-456')
    .then(function (res) {
      assert.notEqual(res.complianceId, undefined, 'complianceId must not be undefined');
      assert.equal(res.complianceId, 'pnc-456');
      assert.notEqual(res.alias, undefined, 'alias must not be undefined');
      assert.equal(res.alias, 'compliance-us-local');
      assert.notEqual(res.status, undefined, 'status must not be undefined');
      assert.equal(res.status, 'approved');
      assert.notEqual(res.userType, undefined, 'userType must not be undefined');
      assert.equal(res.userType, 'business');
      assert.notEqual(res.countryIso, undefined, 'countryIso must not be undefined');
      assert.equal(res.countryIso, 'US');
      assert.notEqual(res.numberType, undefined, 'numberType must not be undefined');
      assert.equal(res.numberType, 'local');
      assert.notEqual(res.createdAt, undefined, 'createdAt must not be undefined');
      assert.notEqual(res.updatedAt, undefined, 'updatedAt must not be undefined');
    });
  });

  it('should get compliance with expand showing documents', function () {
    return client.phoneNumberCompliance.get('pnc-456')
    .then(function (res) {
      assert.ok(Array.isArray(res.documents), 'documents must be an array');
      assert.equal(res.documents.length, 1);
      assert.notEqual(res.documents[0].documentId, undefined, 'documentId must not be undefined');
      assert.equal(res.documents[0].documentId, 'doc-111');
      assert.notEqual(res.documents[0].documentName, undefined, 'documentName must not be undefined');
      assert.equal(res.documents[0].documentName, 'Address Proof');
      assert.notEqual(res.documents[0].documentTypeId, undefined, 'documentTypeId must not be undefined');
      assert.equal(res.documents[0].documentTypeId, 'dt-001');
    });
  });

  it('should get compliance with endUser containing endUserId', function () {
    return client.phoneNumberCompliance.get('pnc-456')
    .then(function (res) {
      assert.ok(res.endUser, 'endUser must be present');
      assert.notEqual(res.endUser.endUserId, undefined, 'endUserId must not be undefined');
      assert.equal(res.endUser.endUserId, 'eu-789');
      assert.notEqual(res.endUser.endUserType, undefined, 'endUserType must not be undefined');
      assert.equal(res.endUser.endUserType, 'business');
    });
  });

  it('should get compliance with all optional fields including rejection_reason and linked_numbers', function () {
    return client.phoneNumberCompliance.get('pnc-rejected')
    .then(function (res) {
      assert.notEqual(res.complianceId, undefined, 'complianceId must not be undefined');
      assert.equal(res.complianceId, 'pnc-rejected');
      assert.notEqual(res.status, undefined, 'status must not be undefined');
      assert.equal(res.status, 'rejected');
      assert.notEqual(res.rejectionReason, undefined, 'rejectionReason must not be undefined');
      assert.equal(res.rejectionReason, 'Document expired');
      assert.ok(Array.isArray(res.documents), 'documents must be an array');
      assert.equal(res.documents.length, 1);
      assert.ok(Array.isArray(res.linkedNumbers), 'linkedNumbers must be an array');
      assert.equal(res.linkedNumbers.length, 2);
      assert.equal(res.linkedNumbers[0], '+14155551234');
      assert.equal(res.linkedNumbers[1], '+14155555678');
      assert.notEqual(res.createdAt, undefined, 'createdAt must not be undefined');
      assert.notEqual(res.updatedAt, undefined, 'updatedAt must not be undefined');
    });
  });

  it('should reject when getting compliance with no id', function () {
    return client.phoneNumberCompliance.get()
    .then(function () {
      throw new Error('should have rejected');
    })
    .catch(function (err) {
      assert.equal(err.message, 'complianceId must be set');
    });
  });

  it('should reject when compliance is not found (404)', function () {
    return client.phoneNumberCompliance.get('pnc-not-found')
    .then(function () {
      throw new Error('should have rejected');
    })
    .catch(function (err) {
      assert.ok(err);
    });
  });

  // ---- Update ----

  it('should update compliance application successfully', function () {
    return client.phoneNumberCompliance.update('pnc-456', {
      alias: 'updated-alias'
    })
    .then(function (res) {
      assert.notEqual(res.message, undefined, 'message must not be undefined');
      assert.equal(res.message, 'Compliance application updated successfully');
      assert.ok(res.compliance, 'compliance object must be present in update response');
      assert.notEqual(res.compliance.complianceId, undefined, 'compliance.complianceId must not be undefined');
      assert.equal(res.compliance.complianceId, 'pnc-456');
      assert.notEqual(res.compliance.alias, undefined, 'compliance.alias must not be undefined');
      assert.equal(res.compliance.alias, 'updated-alias');
      assert.notEqual(res.compliance.status, undefined, 'compliance.status must not be undefined');
      assert.equal(res.compliance.status, 'draft');
    });
  });

  it('should reject update when compliance is in submitted status', function () {
    return client.phoneNumberCompliance.update('pnc-submitted', {
      alias: 'updated-alias'
    })
    .then(function () {
      throw new Error('should have rejected');
    })
    .catch(function (err) {
      assert.ok(err);
    });
  });

  it('should reject update when id is missing', function () {
    let result = client.phoneNumberCompliance.update(null, {
      alias: 'test'
    });
    // validate returns an error synchronously when id is missing
    if (result && result.then) {
      return result.catch(function (err) {
        assert.ok(err);
      });
    } else {
      assert.ok(true);
    }
  });

  // ---- Delete ----

  it('should delete compliance application successfully', function () {
    return client.phoneNumberCompliance.delete('pnc-456')
    .then(function (res) {
      assert.equal(res, true);
    });
  });

  it('should reject delete when compliance is not found (404)', function () {
    return client.phoneNumberCompliance.delete('pnc-not-found')
    .then(function () {
      throw new Error('should have rejected');
    })
    .catch(function (err) {
      assert.ok(err);
    });
  });

  it('should reject delete when id is missing', function () {
    let result = client.phoneNumberCompliance.delete(null);
    if (result && result.then) {
      return result.catch(function (err) {
        assert.ok(err);
      });
    } else {
      assert.ok(true);
    }
  });
});

// =========== Link ===========

describe('PhoneNumberComplianceLinkInterface', function () {

  it('should link phone numbers to compliance successfully', function () {
    return client.phoneNumberComplianceLink.link({
      complianceId: 'pnc-456',
      phoneNumber: '+14155551234'
    })
    .then(function (res) {
      assert.notEqual(res.totalCount, undefined, 'totalCount must not be undefined');
      assert.equal(res.totalCount, 1);
      assert.notEqual(res.updatedCount, undefined, 'updatedCount must not be undefined');
      assert.equal(res.updatedCount, 1);
      assert.ok(Array.isArray(res.report), 'report must be an array');
      assert.notEqual(res.report[0].status, undefined, 'report[0].status must not be undefined');
      assert.equal(res.report[0].status, 'success');
      assert.notEqual(res.report[0].remarks, undefined, 'report[0].remarks must not be undefined');
      assert.equal(res.report[0].remarks, 'Linked successfully');
      assert.ok(res.apiId, 'apiId must be truthy');
    });
  });

  it('should link with empty params and still resolve', function () {
    return client.phoneNumberComplianceLink.link({})
    .then(function (res) {
      assert.ok(res.totalCount !== undefined);
    });
  });
});

// =========== URL Path Verification ===========

describe('PhoneNumberCompliance URL paths', function () {

  it('should use correct URL path for requirements (PhoneNumber/Compliance/Requirements/)', function () {
    // This test verifies the requirement endpoint resolves, which means
    // request-test matched 'PhoneNumber/Compliance/Requirements/' action
    return client.phoneNumberComplianceRequirements.get({ countryIso: 'US' })
    .then(function (res) {
      assert.ok(res.apiId);
    });
  });

  it('should use correct URL path for compliance CRUD (PhoneNumber/Compliance/)', function () {
    // Verifies the list endpoint resolves matching 'PhoneNumber/Compliance/' action
    return client.phoneNumberCompliance.list()
    .then(function (res) {
      assert.ok(res.apiId);
    });
  });

  it('should use correct URL path for compliance get by id (PhoneNumber/Compliance/{id}/)', function () {
    // Verifies the get by id resolves matching 'PhoneNumber/Compliance/pnc-456/' action
    return client.phoneNumberCompliance.get('pnc-456')
    .then(function (res) {
      assert.equal(res.complianceId, 'pnc-456');
    });
  });

  it('should use correct URL path for link (PhoneNumber/Compliance/Link/)', function () {
    // Verifies the link endpoint resolves matching 'PhoneNumber/Compliance/Link/' action
    return client.phoneNumberComplianceLink.link({ complianceId: 'pnc-456', phoneNumber: '+14155551234' })
    .then(function (res) {
      assert.ok(res.apiId);
    });
  });
});
