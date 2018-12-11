'use strict';

import {
  PhloClient
} from '../lib/rest/client';

describe('Phlo Member test cases', function () {

  let authId = 'MAZJJKMWNLZJNIYJKYYT';
  let authToken = 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw';
  let phloId = 'b30083e9-73c9-42a2-acfa-c08e6e66cd83';
  let nodeId = '85169eaf-d8b9-4e3d-9baf-13eb6b231bb0';

  /******************** Phlo resource test cases *********************/

  it('resumeCall - Phlo Member', async function () {
    try {
      let phloClient = new PhloClient('MAZJJKMWNLZJNIYJKYYT', 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw');
      let result = await phloClient.phlo(phloId).multiPartyCall(nodeId).member('919920700964').resumeCall();
      console.log('resume call result -', result);
      return true;
    } catch (err) {
      throw err;
    }
  });

});
