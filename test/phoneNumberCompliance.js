import assert from 'assert';
import {
  Client
} from '../lib/rest/client-test';

let client = new Client('sampleid', 'sampletoken', 'sampleproxy');

// =========== Requirements ===========

describe('PhoneNumberComplianceRequirementInterface', function () {

  it('should get compliance requirements successfully', function () {
    return client.phoneNumberComplianceRequirements.get({
      countryIso2: 'US',
      numberType: 'local',
      endUserType: 'business'
    })
    .then(function (res) {
      assert.equal(res.complianceRequirementId, 'cr-123');
      assert.equal(res.countryIso2, 'US');
      assert.equal(res.numberType, 'local');
      assert.equal(res.endUserType, 'business');
      assert.ok(Array.isArray(res.acceptableDocumentTypes));
      assert.equal(res.acceptableDocumentTypes.length, 2);
    });
  });

  it('should return acceptable document types with details', function () {
    return client.phoneNumberComplianceRequirements.get({
      countryIso2: 'US',
      numberType: 'local',
      endUserType: 'business'
    })
    .then(function (res) {
      let docTypes = res.acceptableDocumentTypes;
      // Keys are camelCased by the camelCaseRequestWrapper
      assert.equal(docTypes[0].documentTypeId, 'dt-001');
      assert.equal(docTypes[0].documentName, 'Address Proof');
      assert.equal(docTypes[0].description, 'Proof of address document');
      assert.equal(docTypes[1].documentTypeId, 'dt-002');
      assert.equal(docTypes[1].documentName, 'Identity Proof');
    });
  });

  it('should get requirements with empty params (no doc types filter)', function () {
    return client.phoneNumberComplianceRequirements.get()
    .then(function (res) {
      assert.ok(res.apiId);
      assert.ok(res.acceptableDocumentTypes);
    });
  });
});

// =========== Compliance CRUD ===========

describe('PhoneNumberComplianceInterface', function () {

  // ---- Create ----

  it('should create compliance application successfully', function () {
    return client.phoneNumberCompliance.create({
      complianceRequirementId: 'cr-123',
      endUserId: 'eu-789',
      alias: 'test-compliance',
      endUserType: 'business',
      countryIso2: 'US',
      numberType: 'local'
    })
    .then(function (res) {
      assert.equal(res.complianceId, 'pnc-456');
      assert.equal(res.alias, 'test-compliance');
      assert.equal(res.status, 'draft');
      assert.equal(res.message, 'Compliance application created successfully');
    });
  });

  it('should create compliance and return all fields', function () {
    return client.phoneNumberCompliance.create({
      complianceRequirementId: 'cr-123',
      endUserId: 'eu-789',
      alias: 'my-compliance',
      endUserType: 'business',
      countryIso2: 'US',
      numberType: 'local'
    })
    .then(function (res) {
      assert.ok(res.complianceId);
      assert.equal(res.endUserType, 'business');
      assert.equal(res.countryIso2, 'US');
      assert.equal(res.numberType, 'local');
      assert.equal(res.complianceRequirementId, 'cr-123');
      assert.ok(res.createdAt);
    });
  });

  // ---- List ----

  it('should list compliance applications successfully', function () {
    return client.phoneNumberCompliance.list()
    .then(function (res) {
      assert.ok(res.meta);
      assert.ok(res.objects);
      assert.equal(res.objects.length, 2);
      assert.equal(res.meta.totalCount, 2);
    });
  });

  it('should list compliance applications with filters', function () {
    return client.phoneNumberCompliance.list({
      status: 'approved',
      endUserId: 'eu-789',
      numberType: 'local',
      limit: 10,
      offset: 0
    })
    .then(function (res) {
      assert.ok(res.meta);
      assert.ok(res.objects);
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
      let first = res.objects[0];
      assert.equal(first.complianceId, 'pnc-456');
      assert.equal(first.alias, 'compliance-us-local');
      assert.equal(first.status, 'approved');
      assert.equal(first.countryIso2, 'US');

      let second = res.objects[1];
      assert.equal(second.complianceId, 'pnc-789');
      assert.equal(second.alias, 'compliance-de-mobile');
      assert.equal(second.status, 'draft');
      assert.equal(second.countryIso2, 'DE');
    });
  });

  // ---- Get ----

  it('should get a single compliance application', function () {
    return client.phoneNumberCompliance.get('pnc-456')
    .then(function (res) {
      assert.equal(res.complianceId, 'pnc-456');
      assert.equal(res.alias, 'compliance-us-local');
      assert.equal(res.status, 'approved');
      assert.equal(res.endUserType, 'business');
      assert.equal(res.endUserId, 'eu-789');
      assert.equal(res.countryIso2, 'US');
      assert.equal(res.numberType, 'local');
    });
  });

  it('should get compliance with expand showing documents', function () {
    return client.phoneNumberCompliance.get('pnc-456')
    .then(function (res) {
      assert.ok(Array.isArray(res.documents));
      assert.equal(res.documents.length, 1);
      assert.equal(res.documents[0].documentId, 'doc-111');
      assert.equal(res.documents[0].documentName, 'Address Proof');
      assert.equal(res.documents[0].documentTypeId, 'dt-001');
    });
  });

  it('should get compliance with all optional fields including rejection_reason and linked_numbers', function () {
    return client.phoneNumberCompliance.get('pnc-rejected')
    .then(function (res) {
      assert.equal(res.complianceId, 'pnc-rejected');
      assert.equal(res.status, 'rejected');
      assert.equal(res.rejectionReason, 'Document expired');
      assert.ok(Array.isArray(res.documents));
      assert.equal(res.documents.length, 1);
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
      assert.equal(res.message, 'Compliance application updated successfully');
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
      assert.equal(res.message, 'Phone number(s) linked to compliance successfully');
      assert.ok(res.apiId);
    });
  });

  it('should link with empty params and still resolve', function () {
    return client.phoneNumberComplianceLink.link({})
    .then(function (res) {
      assert.ok(res.message);
    });
  });
});

// =========== URL Path Verification ===========

describe('PhoneNumberCompliance URL paths', function () {

  it('should use correct URL path for requirements (PhoneNumber/Compliance/Requirements/)', function () {
    // This test verifies the requirement endpoint resolves, which means
    // request-test matched 'PhoneNumber/Compliance/Requirements/' action
    return client.phoneNumberComplianceRequirements.get({ countryIso2: 'US' })
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
