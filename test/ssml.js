import assert from 'assert';
import { Response, Client } from '../lib/rest/client';
import { PlivoGenericResponse } from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('SsmlInterface', function () {

    it('Ssml - Valid XML', function (done) {

        let response = new Response();

        // Valid speak body
        let speak_body = ' Here is a number <w role="amazon: VBD">read</w> \
        as a cardinal number: \
        <say-as interpret-as="cardinal">klsdjflksjfsldk</say-as>. \
        Here is a word spelled out: \
        <say-as interpret-as="spell-out">hello</say-as>.';

        // response.addSpeak(speak_body, { language: 'Spanish-Castilian', voice: 'Polly.*' });
        response.addSpeak(speak_body, { language: 'Spanish-Castilian', voice: 'Polly.Conchita' }).then((result) => {
            done();
        }).catch((err) => {
            done("Valid SSML xml should not be rejected.");
        });

    });

    it('Ssml - Invalid SSML XML Structure', function (done) {

        let response = new Response();

        // Invalid speak body
        let speak_body = ' Here is a number <w role="amazon: VBD">read</w> \
        as a cardinal number: \
        <say-as interpret-as="cardinal"><wa role="amazon: VBD"><cr>read</wa></say-as>. \
        Here is a word spelled out: \
        <say-as interpret-as="spell-out">hello</say-as>.';

        // response.addSpeak(speak_body, { language: 'Spanish-Castilian', voice: 'Polly.*' });
        response.addSpeak(speak_body, { language: 'Spanish-Castilian', voice: 'Polly.Conchita' }).then((result) => {
            done(new Error("Invalid xml should be rejected and should throw error."));
        }).catch((err) => {
            assert.equal('Invalid SSML xml structure. Content must be a valid xml.', err.message);
            done();
        });

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
        response.addSpeak(speak_body, { language: 'Spanish-Castilian', voice: 'Polly.Conchita' }).then((result) => {
            done(new Error("Invalid xml tags should be rejected and should throw error."));
        }).catch((err) => {
            assert.equal('Ssml tag <wa> is not supported.', err.message);
            done();
        });

    });

    it('Ssml - Invalid Language Validation', function (done) {

        let response = new Response();

        // Invalid speak body
        let speak_body = ' Here is a number';

        response.addSpeak(speak_body, { language: 'Spanish-Castilian1', voice: 'Polly.Conchita' }).then((result) => {
            done(new Error("Unsupported language `Spanish-Castilian1` should be rejected and should throw error."));
        }).catch((err) => {
            assert.equal('Invalid language. Language `Spanish-Castilian1` is not supported.', err.message);
            done();
        });

    });

    it('Ssml - Invalid Language-Voice Combination', function (done) {

        let response = new Response();

        // Invalid speak body
        let speak_body = '<w>Here is a number</w>';

        response.addSpeak(speak_body, { language: 'Spanish-Castilian', voice: 'Polly.Maxim' }).then((result) => {
            done(new Error("Invalid language voice combination should be rejected"));
        }).catch((err) => {
            assert.equal('<Speak> voice ‘Polly.Maxim’ is not valid. Refer <link> for list of supported voices.', err.message);
            done();
        });

    });

    it('Ssml - Valid Language-Voice Combination', function (done) {

        let response = new Response();

        // Invalid speak body
        let speak_body = '<w>Here is a number</w>';

        response.addSpeak(speak_body, { language: 'Spanish-Castilian', voice: 'Polly.Conchita' }).then((result) => {
            done();
        }).catch((err) => {
            done('Validate Language Voice combination should be accepted.');
        });


    });
});
