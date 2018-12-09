'use strict';

import {
  PhloClient
} from '../lib/rest/client';

describe('phlo client init', function () {

  let authId = 'MAZJJKMWNLZJNIYJKYYT';
  let authToken = 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw';
  let phloId = 'b30083e9-73c9-42a2-acfa-c08e6e66cd83';

  /******************** Phlo resource test cases *********************/

  it('Should initialize phlo via phloClient.phlo.get()', async function () {

    try {

      let phloClient = new PhloClient('MAZJJKMWNLZJNIYJKYYT', 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw');
      let phlo = await phloClient.phlo.get('b30083e9-73c9-42a2-acfa-c08e6e66cd83');
      return true;
    } catch (err) {
      return err;
    }
  });

  it('Should initialize phlo via phloClient.phlo()', async function () {

    let phloClient = new PhloClient('MAZJJKMWNLZJNIYJKYYT', 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw');
    let phlo = await phloClient.phlo('b30083e9-73c9-42a2-acfa-c08e6e66cd83');
    return true;
  });

  it('Run phlo via phloClient.phlo()', async function () {

    let phloClient = new PhloClient('MAZJJKMWNLZJNIYJKYYT', 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw');
    let phlo = await phloClient.phlo('b30083e9-73c9-42a2-acfa-c08e6e66cd83').run();
    return true;
  });

  /******************** Multiparty call test cases *********************/

  let mpcId = '85169eaf-d8b9-4e3d-9baf-13eb6b231bb0';

  it('Get multiparty call details', async function () {
    let phloClient = new PhloClient('MAZJJKMWNLZJNIYJKYYT', 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw');
    let result = await phloClient.phlo('b30083e9-73c9-42a2-acfa-c08e6e66cd83').multiPartyCall.get('85169eaf-d8b9-4e3d-9baf-13eb6b231bb0');
    // console.log('get multiparty call result', result);
    return true;
  });

  it('Add member to multi party call', async function () {

    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    let result = await phlo.multiPartyCall(mpcId).call('919920700964', '919898967510');
    return true;

  });

  it('Warm Transfer - multi party call', async function () {
    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    let result = await phlo.multiPartyCall(mpcId).warmTransfer('919920700964', '919898967510');
    return true;
  });

  it('Cold Transfer - multi party call', async function () {
    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    let result = await phlo.multiPartyCall(mpcId).coldTransfer('919920700964', '919898967510');
    return true;
  });

  it('Abort Transfer - multi party call', async function () {
    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    let result = await phlo.multiPartyCall(mpcId).abortTransfer('919920700964', '919898967510');
    return true;
  });

});
