import assert from 'assert';
import sinon from 'sinon';
import { Response } from '../lib/utils/plivoxml';

describe('PlivoXML', function () {
  it('should work', function (done) {
    const response = new Response();
    response.addPreAnswer();
    response.addRecord();
    response.addHangup();
    response.addSpeak('text').then(function (result) {
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
      done();
    }).catch(function (err) {
      done("Failed to test Plivo Xml due to unknown error");
    });
  });

  it('tests MultiPartyCall', function (done){
    const mpcResponse = new Response();
    mpcResponse.addMultiPartyCall('Nairobi',{
      role: 'Agent',
      maxDuration: 1000,
      statusCallbackEvents: 'participant-speak-events, participant-digit-input-events, add-participant-api-events, participant-state-changes, mpc-state-changes'
    });
    assert.equal('<Response><MultiPartyCall role="Agent" maxDuration="1000" statusCallbackEvents="participant-speak-events, participant-digit-input-events, add-participant-api-events, participant-state-changes, mpc-state-changes" maxParticipants="10" waitMusicMethod="GET" agentHoldMusicMethod="GET" customerHoldMusicMethod="GET" record="false" recordFileFormat="mp3" recordingCallbackMethod="GET" statusCallbackMethod="POST" stayAlone="false" coachMode="true" mute="false" hold="false" startMpcOnEnter="true" endMpcOnExit="false" enterSound="beep:1" enterSoundMethod="GET" exitSound="beep:2" exitSoundMethod="GET" onExitActionMethod="POST" relayDTMFInputs="false">Nairobi</MultiPartyCall></Response>',mpcResponse.toXML());
    done();
  })
});
