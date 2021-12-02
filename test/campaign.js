import {
    Client
  } from '../lib/rest/client-test';
  import {
    PlivoGenericResponse
  } from '../lib/base.js';
  import assert from 'assert';
  import sinon from 'sinon';
  
  let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');
  
  describe('campaign', function () {
    it('should get campaign', function () {
      return client.campaign.get("CMPT4EP")
        .then(function (response) {
          assert.equal(response.campaign.campaignId, "CMPT4EP")
        })
    });
    
    it('list campaign', function () {
        return client.campaign.list()
          .then(function (response) {
            assert.equal(response.campaigns.length, 2)
          })
      });

    it('create campaign', function () {
      return client.campaign.create("B8OD95Z","campaign name sssample","INSURANCE","MIXED",[
        "CUSTOMER_CARE",
        "2FA"
    ],"sample description text",false,false,false,false,true,true,true,"sample1","sample2")
        .then(function (campaign) {
          assert.equal(campaign.campaign.brandId, 'BHYYNCK')
        })
    });
  });