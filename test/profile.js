import {
    Client
  } from '../lib/rest/client-test';
  import {
    PlivoGenericResponse
  } from '../lib/base.js';
  import assert from 'assert';
  import sinon from 'sinon';
  
  let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');
  
  describe('profile', function () {
    it('should get profile', function () {
      return client.profile.get("06ecae31-4bf8-40b9-ac62-e902418e9935")
        .then(function (response) {
          assert.equal(response.profile.profileUuid, "06ecae31-4bf8-40b9-ac62-e902418e9935")
        })
    });
    
    it('list profile', function () {
        return client.profile.list({})
          .then(function (response) {
            assert.equal(response.profiles.length, 2)
          })
      });

      it('delete profile', function () {
        return client.profile.delete("06ecae31-4bf8-40b9-ac62-e902418e9935")
          .then(function (response) {
            assert.equal(response.apiId, "eb1e71ae-b01e-11ec-88b1-0242ac110002")
          })
      });

    it('create profile', function () {
        var authorized_contact = {
          "first_name": "John",
          "last_name": "Doe",
          "email": "test@example.com",
          "title": "CEO",
          "seniority": "C_LEVEL"
        }
        var address = {
          "street": "123 Main Street",
          "city": "San Francisco",
          "state": "CA",
          "postal_code": "94105",
          "country": "US"
        }
        var business_contact_email = "employee@company.com"
      return client.profile.create(
        "Test Profile",
        "",
        "DIRECT",
        "PUBLIC",
        "Test Company Inc",
        "12-3456789",
        "TECHNOLOGY",
        "US",
        "TEST",
        "NASDAQ",
        "NONE",
        "https://testcompany.com",
        address,
        authorized_contact,
        business_contact_email
      )
        .then(function (profile) {
          assert.equal(profile.profileUuid, '43d0616e-d50a-445a-a84e-310a089f0618')
        })
    });

  });