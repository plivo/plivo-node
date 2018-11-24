'use strict';

import { PhloClient } from '../lib/rest/client';

describe('phlo client init', function () {
    it('Should initialize phlo via phloClient.phlo.get()', function () {

        let phloClient = new PhloClient('Auth Id', 'Auth Token');
        console.log('===>', phloClient.phlo(12));
        // console.log('===>', phloClient.phlo.get(12));
        // phloClient.print('lksdjflkdsjfklsfj');
        // console.log(' ==>', phloClient.phlo);
        return true;
    });

    it('Should initialize phlo via phloClient.phlo()', function () {

        let phloClient = new PhloClient('Auth Id', 'Auth Token');
        console.log('===>', phloClient.phlo(12));
        return true;
    });
});