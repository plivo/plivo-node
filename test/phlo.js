'use strict';

import {
  PhloClient
} from '../lib/rest/client';

describe('phlo client init', function () {

  // it('Should initialize phlo via phloClient.phlo.get()', async function () {

  //   try {

  //     let phloClient = new PhloClient('MAZJJKMWNLZJNIYJKYYT', 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw');
  //     let phlo = await phloClient.phlo.get('b30083e9-73c9-42a2-acfa-c08e6e66cd83');
  //     return true;
  //   } catch (err) {
  //     return err;
  //   }
  // });

  // it('Should initialize phlo via phloClient.phlo()', async function () {

  //   let phloClient = new PhloClient('MAZJJKMWNLZJNIYJKYYT', 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw');
  //   let phlo = await phloClient.phlo('b30083e9-73c9-42a2-acfa-c08e6e66cd83');
  //   return true;
  // });

  it('Run phlo via phloClient.phlo()', async function () {

    let phloClient = new PhloClient('MAZJJKMWNLZJNIYJKYYT', 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw');
    let phlo = await phloClient.phlo('b30083e9-73c9-42a2-acfa-c08e6e66cd83').run();
    return true;
  });

  // it('Initiate multiparty call', function () {

  //   let phloClient = new PhloClient('MAZJJKMWNLZJNIYJKYYT', 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw');
  //   let phlo = phloClient.phlo('b30083e9-73c9-42a2-acfa-c08e6e66cd83');
  //   phlo.multiPartyCall(21).call('9920700964', '9920700964').then((result) => {
  //     return true;
  //   }).catch((err) => {
  //     return false;
  //   });

  //   return true;
  // });

  // it('Should initialize phlo via phloClient.phlo()', async function () {

  //   let phloClient = new PhloClient('MAZJJKMWNLZJNIYJKYYT', 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw');
  //   let phlo = await phloClient.phlo('b30083e9-73c9-42a2-acfa-c08e6e66cd83');
  //   return true;
  // });

  // it('Should multiparty warm transfer', async function () {

  //   try {

  //     let phloClient = new PhloClient('MAZJJKMWNLZJNIYJKYYT', 'ZTQyYjI5NjkyMWE2N2YzMmM3ZWZiYWQ1YWI1NzAw');
  //     let phlo = await phloClient.phlo.get('b30083e9-73c9-42a2-acfa-c08e6e66cd83');

  //     // Init multiparty call
  //     // let multipartyCall = await phlo.multiPartyCall('85169eaf-d8b9-4e3d-9baf-13eb6b231bb0');
  //     // console.log('multiparty call result =>', multipartyCall);

  //     // // Warm transfer
  //     // console.log('calling warm transfer..');
  //     // let result = await multipartyCall.warmTransfer('11111111111', '11111111113', 'agent');
  //     // console.log('warm transfer result', result);

  //     expect(true).to.equal(true);
  //     done();
  //   } catch (err) {
  //     expect(true).to.equal(true);
  //   }

  // });


});
