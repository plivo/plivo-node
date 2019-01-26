'use strict';

import {
  PhloClient
} from '../lib/rest/client-test';
// } from '../lib/rest/client';

describe('Phlo Member Interface', function () {

  let authId = 'MAZJJKMWNLZJNIYJKYYT';
  let authToken = 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw';
  let phloId = 'b30083e9-73c9-42a2-acfa-c08e6e66cd83';
  let nodeId = '85169eaf-d8b9-4e3d-9baf-13eb6b231bb0';

  let memberAddress = '919920700964';

  /******************** Phlo resource test cases *********************/

  it('resumeCall - Phlo Member', async function () {
    let phloClient = new PhloClient(authId, authToken);
    await phloClient.phlo(phloId).multiPartyCall(nodeId).member(memberAddress).resumeCall();
  });

  it('voicemail drop - Phlo Member', async function () {
    let phloClient = new PhloClient(authId, authToken);
    await phloClient.phlo(phloId).multiPartyCall(nodeId).member(memberAddress).voicemailDrop();
  });

  it('hangup - Phlo Member', async function () {
    let phloClient = new PhloClient(authId, authToken);
    await phloClient.phlo(phloId).multiPartyCall(nodeId).member(memberAddress).hangup();
  });

  it('hold - Phlo Member', async function () {
    let phloClient = new PhloClient(authId, authToken);
    await phloClient.phlo(phloId).multiPartyCall(nodeId).member(memberAddress).hold();
  });

  it('unhold - Phlo Member', async function () {
    let phloClient = new PhloClient(authId, authToken);
    await phloClient.phlo(phloId).multiPartyCall(nodeId).member(memberAddress).unhold();
  });

  /******************** Phlo resource test cases using member.get *********************/

  it('resumeCall using member.get() - Phlo Member', async function () {
    let phloClient = new PhloClient(authId, authToken);
    await phloClient.phlo(phloId).multiPartyCall(nodeId).member.get(memberAddress).resumeCall();
  });

  it('voicemail drop using member.get() - Phlo Member', async function () {
    let phloClient = new PhloClient(authId, authToken);
    await phloClient.phlo(phloId).multiPartyCall(nodeId).member.get(memberAddress).voicemailDrop();
  });

  it('hangup using member.get() - Phlo Member', async function () {
    let phloClient = new PhloClient(authId, authToken);
    await phloClient.phlo(phloId).multiPartyCall(nodeId).member.get(memberAddress).hangup();
  });

  it('hold using member.get() - Phlo Member', async function () {
    let phloClient = new PhloClient(authId, authToken);
    await phloClient.phlo(phloId).multiPartyCall(nodeId).member.get(memberAddress).hold();
  });

  it('unhold using member.get() - Phlo Member', async function () {
    let phloClient = new PhloClient(authId, authToken);
    await phloClient.phlo(phloId).multiPartyCall(nodeId).member.get(memberAddress).unhold();
  });

});
