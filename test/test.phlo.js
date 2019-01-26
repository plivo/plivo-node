'use strict';

import {
  PhloClient
} from '../lib/rest/client-test';
// } from '../lib/rest/client';
import { doesNotReject } from 'assert';

let authId = 'MAZJJKMWNLZJNIYJKYYT';
let authToken = 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw';
let phloId = 'b30083e9-73c9-42a2-acfa-c08e6e66cd83';
let mpcId = '85169eaf-d8b9-4e3d-9baf-13eb6b231bb0';

describe('PhloInterface', function () {

  it('Should initialize phlo via phloClient.phlo.get(phloId)', async function () {
    let phloClient = new PhloClient(authId, authToken);
    await phloClient.phlo.get(phloId);
  });

  it('Should initialize phlo via phloClient.phlo(phloId)', async function () {
    let phloClient = new PhloClient(authId, authToken);
    await phloClient.phlo(phloId);
  });

  it('Run phlo via phloClient.phlo(phloId).run()', async function () {
    let phloClient = new PhloClient(authId, authToken);
    await phloClient.phlo(phloId).run();
  });
});


/******************** Multiparty call test cases *********************/

describe('PhloMultiPartyCallInterface', function () {

  it('Get multiparty call details', async function () {
    let phloClient = new PhloClient(authId, authToken);
    await phloClient.phlo(phloId).multiPartyCall.get(mpcId);
  });

  it('Add member to multi party call', async function () {

    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    await phlo.multiPartyCall(mpcId).call('919920700964', '919898967510');
  });

  it('Warm Transfer - multi party call', async function () {
    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    await phlo.multiPartyCall(mpcId).warmTransfer('919920700964', '919898967510');
  });

  it('Cold Transfer - multi party call', async function () {
    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    await phlo.multiPartyCall(mpcId).coldTransfer('919920700964', '919898967510');
  });

  it('Abort Transfer - multi party call', async function () {
    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    await phlo.multiPartyCall(mpcId).abortTransfer('919920700964');
  });
});