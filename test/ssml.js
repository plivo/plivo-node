import assert from 'assert';
import { Response, Client } from '../lib/rest/client';
import { PlivoGenericResponse } from '../lib/base.js';
let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('SsmlInterface', function () {

    it('Ssml - Invalid SSML XML Structure', function (done) {

        let response = new Response();

        // Invalid speak body
        let speak_body = ' Here is a number <w role="amazon: VBD">read</w> \
        as a cardinal number: \
        <say-as interpret-as="cardinal"><wa role="amazon: VBD"><cr>read</wa></say-as>. \
        Here is a word spelled out: \
        <say-as interpret-as="spell-out">hello</say-as>.';

        // response.addSpeak(speak_body, { language: 'Spanish-Castilian', voice: 'Polly.*' });
        response.addSpeak(speak_body, { language: 'Spanish-Castilian', voice: 'Polly.Conchita' });
        done()
    });

    it('Ssml - Invalid SSML Tags', function (done) {

        let response = new Response();

        // Invalid speak body
        let speak_body = ' Here is a number <w role="amazon: VBD">read</w> \
        as a cardinal number: \
        <say-as interpret-as="cardinal"><wa role="amazon: VBD"><cr>read</cr></wa></say-as>. \
        Here is a word spelled out: \
        <say-as interpret-as="spell-out">hello</say-as>.';

        // response.addSpeak(speak_body, { language: 'Spanish-Castilian', voice: 'Polly.*' });
        response.addSpeak(speak_body, { language: 'Spanish-Castilian', voice: 'Polly.Conchita' });
        done()
    });

    it('Ssml - Invalid Language Validation', function (done) {

        let response = new Response();

        // Invalid speak body
        let speak_body = ' Here is a number';

        response.addSpeak(speak_body, { language: 'Spanish-Castilian1', voice: 'Polly.Conchita' });
        done()
    });

    it('Ssml - Invalid Language-Voice Combination', function (done) {

        let response = new Response();

        // Invalid speak body
        let speak_body = '<w>Here is a number</w>';

        response.addSpeak(speak_body, { language: 'Spanish-Castilian', voice: 'Polly.Maxim' });
        done()
    });

    it('Ssml - Valid Language-Voice Combination', function (done) {

        let response = new Response();

        // Invalid speak body
        let speak_body = '<w>Here is a number</w>';

        response.addSpeak(speak_body, { language: 'Spanish-Castilian', voice: 'Polly.Conchita' });
        done()

    });
});
