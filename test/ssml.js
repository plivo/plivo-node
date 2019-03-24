import assert from 'assert';
import sinon from 'sinon';
import { Response, Client } from '../lib/rest/client';
import { PlivoGenericResponse } from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('SsmlInterface', function () {
    it('test', function () {

        let response = new Response();
        let speak_body = ' Here is a number <w role="amazon: VBD">read</w> \
        as a cardinal number: \
        <say-ass interpret-as="cardinal">12345</say-ass>. \
        Here is a word spelled out: \
        <say-as interpret-as="spell-out">hello</say-as>.';

        // response.addSpeak(speak_body, { language: 'Spanish-Castilian', voice: 'Polly.Conchita' });
        response.addSpeak(speak_body, { language: 'Spanish-Castilian', voice: 'Polly.Conchita' });
        console.log(response.toXML());



    });
});
