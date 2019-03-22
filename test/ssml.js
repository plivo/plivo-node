import assert from 'assert';
import sinon from 'sinon';
import { Response, Client } from '../lib/rest/client';
import { PlivoGenericResponse } from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

let response = new Response();
let speak_body = "Hello, world!";
response.addSpeak(speak_body, { voice: 'SRD' });
console.log(response.toXML());

