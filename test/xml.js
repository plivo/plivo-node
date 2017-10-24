import assert from 'assert';
import sinon from 'sinon';
import {Response} from '../lib/utils/plivoxml';

describe('PlivoXML', function () {
  it('should work', function () {
    const response = new Response();
    response.addPreAnswer();
    response.addRecord();
    response.addHangup();
    response.addSpeak('text');
    response.addWait();
    response.addDTMF('123');
    response.addConference('test');
    response.addRedirect('url');
    response.addGetDigits();
    response.addPlay('url');
    const dial = response.addDial();
    dial.addNumber('123');
    dial.addUser('sip:test@sip.plivo.com');
    response.addMessage('∫test', {
      src: '123',
      dst: '456',
    });
    assert.equal('<Response><PreAnswer/><Record/><Hangup/><Speak>text</Speak><Wait/><DTMF>123</DTMF><Conference>test</Conference><Redirect>url</Redirect><GetDigits/><Play>url</Play><Dial><Number>123</Number><User>sip:test@sip.plivo.com</User></Dial><Message src="123" dst="456">∫test</Message></Response>', response.toXML());
  });
});
