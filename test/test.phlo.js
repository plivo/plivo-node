'use strict';

import {
  PhloClient
} from '../lib/rest/client-test';
// } from '../lib/rest/client';
import { doesNotReject } from 'assert';

let authId = 'auth-id';
let authToken = 'auth-token';
let phloId = 'sample-phlo-id';
let mpcId = 'sample-mpc-id';

describe('PhloInterface', function () {

  it('Should initialize phlo via phloClient.phlo.get(phloId)', function () {
    let phloClient = new PhloClient(authId, authToken);
    phloClient.phlo.get(phloId).then(function (phloResult) {
      // console.log('phlo result is ', phloResult);
    });
  });

  it('Run phlo via phloClient.phlo(phloId).run()', function () {

    let phloClient = new PhloClient(authId, authToken);
    phloClient.phlo(phloId).run().then(function (phlo) {
      // console.log('phlo run result', phlo);
    });
  });

  it('Run phlo via phloClient.phlo.get(phloId).run()', function () {

    let phloClient = new PhloClient(authId, authToken);
    phloClient.phlo.get(phloId).then(function (phlo) {
      // console.log('phlo result', phlo);
      phlo.run().then(function (phlo) {
        // console.log('phlo run result', phlo);
      });
    });
  });

});

/******************** Multiparty call test cases *********************/

describe('PhloMultiPartyCallInterface', function () {

  it('Get multiparty call details', function () {
    let phloClient = new PhloClient(authId, authToken);
    phloClient.phlo(phloId).multiPartyCall.get(mpcId).then(function (result) {
      // console.log('get multiparty call result', result);
    });
  });

  it('Add member to multi party call', function () {

    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    phlo.multiPartyCall(mpcId).call('919920700964', '919898967510').then(function (result) {
      // console.log('Add member to call', result);
    });
  });

  it('Add member to multi party call - using multiPartyCall.get()', function () {

    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    phlo.multiPartyCall.get(mpcId).then(function (result) {
      result.call('919920700964', '919898967510').then(function (callResult) {
        // console.log('call result', callResult);
      });
    })
  });

  it('Warm Transfer - multi party call', function () {
    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    phlo.multiPartyCall(mpcId).warmTransfer('919920700964', '919898967510').then(function (callResult) {
      // console.log('Warm Transfer result', callResult);
    });
  });

  it('Warm Transfer - multi party call - using multiPartyCall.get()', function () {

    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    phlo.multiPartyCall.get(mpcId).then(function (result) {

      result.warmTransfer('919920700964', '919898967510').then(function (callResult) {
        // console.log('Warm Transfer result', callResult);
      });
    });

  });

  it('Cold Transfer - multi party call', function () {
    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    phlo.multiPartyCall(mpcId).coldTransfer('919920700964', '919898967510').then(function (callResult) {
      // console.log('Warm Transfer result', callResult);
    });

  });

  it('Cold Transfer - multi party call- using multiPartyCall.get()', function () {
    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    phlo.multiPartyCall(mpcId).coldTransfer('919920700964', '919898967510').then(function (callResult) {
      // console.log('cold Transfer result', callResult);
    });
  });

  it('Abort Transfer - multi party call ', function () {
    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    phlo.multiPartyCall(mpcId).abortTransfer('919920700964').then(function (callResult) {
      // console.log('cold Transfer result', callResult);
    });
  });

  it('Abort Transfer - multi party call- using multiPartyCall.get()', function () {
    let phloClient = new PhloClient(authId, authToken);
    let phlo = phloClient.phlo(phloId);
    phlo.multiPartyCall(mpcId).abortTransfer('919920700964').then(function (abortTransferResult) {
      console.log('cold Transfer result', abortTransferResult);
    });

  });

});
