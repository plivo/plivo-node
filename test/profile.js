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
            assert.equal(response.api_id, "eb1e71ae-b01e-11ec-88b1-0242ac110002")
          })
      });

    it('create profile', function () {
        var authorized_contact = {"first_name":"Hello", "last_name":"Test", "email":"vishnu@plivo.com", "title":"bro", "seniority":"admin"}
        var address = {"street":"123", "city":"Band", "state":"NY", "postal_code":"10001", "country":"US"}
      return client.profile.create("vishnu104", "SECONDARY", "RESELLER","PRIVATE_PROFIT","ABC Inc", "111111111", "PROFESSIONAL", "US", "ABC","NASDAQ","NONE", "google.com", address,authorized_contact)
        .then(function (profile) {
          assert.equal(profile.profileUuid, '43d0616e-d50a-445a-a84e-310a089f0618')
        })
    });
  });