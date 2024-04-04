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
    
    it('list campaign with param', function () {
        return client.campaign.list({campaign_source:'plivo'})
          .then(function (response) {
            assert.equal(response.campaigns.length, 2)
          })
      });
    it('create campaign', function () {
      return client.campaign.create("B8OD95Z","campaign name sssample","INSURANCE","MIXED",[
        "CUSTOMER_CARE",
        "2FA"
    ],"sample description text should 40 character",false,false,false,false,true,true,true,"sample1 should be 20 minimum character","sample2 should be 20 minimum character", "message_flow should be 40 minimum character", "help_message should be 20 minimum character", "optout_message should be 20 minimum character")
        .then(function (campaign) {
          assert.equal(campaign.campaignId, 'CFSOBZQ')
        })
    });
    if('import campaign', function (){
      return client.campaign.import_campaign('CNTQ0OD','New Contact by vinay for ct')
        .then(function(campaign){
          assert.equal(campaign.campaignId, 'CNTQ0OD')
        })
    })

    it('should delete campaign', function() {
      return client.campaign.deleteCampaign("CMPT4EP")
        .then(function(response) {
          assert.equal(response.campaignId, "CMPT4EP")
        })
    });

    it('update campaign', function () {
      return client.campaign.update("CMPT4EP","","","","sample1 should be 20 minimum character","","","","","","","")
        .then(function (response) {
          assert.equal(response.campaign.campaignId, "CMPT4EP")
        })
    });
  });
