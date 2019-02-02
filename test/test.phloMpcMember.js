'use strict';

import {
  PhloClient
} from '../lib/rest/client-test';
// } from '../lib/rest/client';

describe('Phlo Member Interface', function () {

  let authId = 'auth-id';
  let authToken = 'auth-token';
  let phloId = 'sample-phlo-id';
  let nodeId = 'sample-mpc-id';

  let memberAddress = '919920700964';

  /******************** Phlo resource test cases *********************/

  it('resumeCall - Phlo Member', function () {
    let phloClient = new PhloClient(authId, authToken);
    phloClient.phlo(phloId).multiPartyCall(nodeId).member(memberAddress).resumeCall().then(function (result) {
      // console.log('result', result);
    });
  });

  it('voicemail drop - Phlo Member', function () {
    let phloClient = new PhloClient(authId, authToken);
    phloClient.phlo(phloId).multiPartyCall(nodeId).member(memberAddress).voicemailDrop().then(function (result) {
      // console.log('result', result);
    });
  });

  it('hangup - Phlo Member', function () {
    let phloClient = new PhloClient(authId, authToken);
    phloClient.phlo(phloId).multiPartyCall(nodeId).member(memberAddress).hangup().then(function (result) {
      // console.log('result', result);
    });
  });

  it('hold - Phlo Member', function () {
    let phloClient = new PhloClient(authId, authToken);
    phloClient.phlo(phloId).multiPartyCall(nodeId).member(memberAddress).hold().then(function (result) {
      // console.log('result', result);
    });
  });

  it('unhold - Phlo Member', function () {
    let phloClient = new PhloClient(authId, authToken);
    phloClient.phlo(phloId).multiPartyCall(nodeId).member(memberAddress).unhold().then(function (result) {
      // console.log('result', result);
    });
  });

  /******************** Phlo resource test cases using member.get *********************/

  it('resumeCall using member.get() - Phlo Member', function () {
    let phloClient = new PhloClient(authId, authToken);
    phloClient.phlo(phloId).multiPartyCall(nodeId).member.get(memberAddress).resumeCall().then(function (result) {
      // console.log('result', result);
    });
  });

  it('voicemail drop using member.get() - Phlo Member', function () {
    let phloClient = new PhloClient(authId, authToken);
    phloClient.phlo(phloId).multiPartyCall(nodeId).member.get(memberAddress).voicemailDrop().then(function (result) {
      // console.log('result', result);
    })
  });

  it('hangup using member.get() - Phlo Member', function () {
    let phloClient = new PhloClient(authId, authToken);
    phloClient.phlo(phloId).multiPartyCall(nodeId).member.get(memberAddress).hangup().then(function (result) {
      // console.log('result', result);
    });
  });

  it('hold using member.get() - Phlo Member', function () {
    let phloClient = new PhloClient(authId, authToken);
    phloClient.phlo(phloId).multiPartyCall(nodeId).member.get(memberAddress).hold().then(function (result) {
      // console.log('result', result);
    });
  });

  it('unhold using member.get() - Phlo Member', function () {
    let phloClient = new PhloClient(authId, authToken);
    phloClient.phlo(phloId).multiPartyCall(nodeId).member.get(memberAddress).unhold().then(function (result) {
      // console.log('result', result);
    });
  });

});
