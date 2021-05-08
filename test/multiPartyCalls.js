import assert from 'assert';
import sinon from 'sinon';
import {Client} from '../lib/rest/client-test';
import {PlivoGenericResponse} from '../lib/base.js';
import {MultiPartyCall} from "../lib/resources/multiPartyCall";

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('multiPartyCalls', function (){
  it('should list all MultiPartyCalls', function (){
      return client.multiPartyCalls.list().then(function (response){
          for(let i=0; i< response.length;i++) {
            assert(response[i] instanceof MultiPartyCall)
          }
      })
  });

  it('should get details of a MultiPartyCall', function (){
    return client.multiPartyCalls.get('ca8e8a44-48e1-445d-afd5-1fcccdbccd9d').then(function (response){
        assert(response instanceof PlivoGenericResponse)
        assert.equal(response.id, 'ca8e8a44-48e1-445d-afd5-1fcccdbccd9d')
        assert.equal(response.resourceUri, '/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_ca8e8a44-48e1-445d-afd5-1fcccdbccd9d/')
    })
  });

  it('should add a Participant', function (){
    return client.multiPartyCalls.addParticipant('Agent', {'friendlyName' : 'Voice', 'from' : '+919090909090', 'to' : '+918309866821'}).then(function (response){
      assert(response instanceof PlivoGenericResponse)
      assert.equal(response.message, 'add participant action initiated')
    })
  });

  it('should start an MPC', function (){
    return client.multiPartyCalls.start(null, 'Voice').then(function (response){
      assert(response instanceof PlivoGenericResponse)
    })
  });

  it('should end an MPC', function (){
    return client.multiPartyCalls.stop(null, 'Voice').then(function (response){
      assert(response, true)
    })
  });

  it('should start MPC Recording', function (){
    return client.multiPartyCalls.startRecording(null, 'TestMPC').then(function (response){
      assert(response.message, "MPC: TestMPC record started")
    })
  });

  it('should stop MPC Recording', function (){
    return client.multiPartyCalls.stopRecording(null, 'TestMPC').then(function (response){
      assert(response instanceof PlivoGenericResponse)
    })
  });

  it('should pause MPC Recording', function (){
    return client.multiPartyCalls.pauseRecording(null, 'TestMPC').then(function (response){
      assert(response instanceof PlivoGenericResponse)
    })
  });

  it('should resume MPC Recording', function (){
    return client.multiPartyCalls.resumeRecording(null, 'TestMPC').then(function (response){
      assert(response instanceof PlivoGenericResponse)
    })
  });

  it('should list MPC Participants', function (){
    return client.multiPartyCalls.listParticipants('12345678-90123456', null).then(function (response){
      assert(response instanceof PlivoGenericResponse)
    })
  });

  it('should update MPC Participant', function (){
    return client.multiPartyCalls.updateParticipant(10, '12345678-90123456', null).then(function (response){
      assert(response instanceof PlivoGenericResponse)
      assert.equal(response.hold, 'MPC: TestMPC hold/unhold member(s) succeded')
      assert.equal(response.mute, 'MPC: TestMPC mute/unmute member(s) succeded')
    })
  });

  it('should kick MPC Participant', function (){
    return client.multiPartyCalls.kickParticipant(10, '12345678-90123456', null).then(function (response){
      assert(response instanceof PlivoGenericResponse)
    })
  });

  it('should get MPC Participant', function (){
    return client.multiPartyCalls.getParticipant(2132, '7503f05f-2d6e-4ab3-b9e6-3b0d81ae9087', null).then(function (response){
      assert(response instanceof PlivoGenericResponse)
      assert.equal(response.resourceUri, '/v1/Account/MAMDJMMTEZOWY0ZMQWM2/MultiPartyCall/uuid_7503f05f-2d6e-4ab3-b9e6-3b0d81ae9087/Participant/2132/')
    })
  });
})
