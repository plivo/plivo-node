import {extend, validate} from '../utils/common.js';
import {PlivoResource, PlivoResourceInterface, PlivoSecondaryResource} from '../base';
import {
  validSubAccount,
  validUrl,
  validParam,
  validDateFormat,
  validRange,
  validMultipleDestinationNos,
  validMultipleDestinationIntegers,
  isOneAmongStringUrl, multiValidParam, InvalidRequestError
} from '../rest/utils.js'

const clientKey = Symbol();
const action = 'MultiPartyCall/';
const idField = 'mpcUuid';
const secondaryAction = 'Participant/';
const secondaryMemberAction = 'Member/';
const secondaryIdField = 'participantUuid';

export class MPCError extends Error { }

export class MultiPartyCall extends PlivoResource{
  constructor(client, data = {}) {
    super(action, MultiPartyCall, idField, client);

    if (idField in data) {
      this.id = data[idField];
    }

    extend(this, data);
    this[clientKey] = client;
  }

  get(params = {}){
    params.isVoiceRequest = 'true';
    return super.executeAction(this.id, 'GET', params);
  }

  addParticipant(params){
    if((params.from && params.to) && (params.callUuid)){
      throw new MPCError('cannot specify callUuid when (from, to) is provided')
    }
    if((!params.from && !params.to) && !params.callUuid){
      throw new MPCError('specify either callUuid or (from, to)')
    }
    if((!params.callUuid) && (!params.from || !params.to)){
      throw new MPCError('specify (from, to) when not adding an existing callUuid to multi party participant')
    }

    validParam('role', params.role.toLowerCase(), [String], true, ['agent', 'supervisor', 'customer'])

    if(params.from){
      validParam('from', params.from, [String], false)
    }

    if(params.to){
      validParam('to', params.to, [String], false)
      validMultipleDestinationNos('to', params.to, {role: params.role, delimiter: '<', agentLimit: 20})
    }

    if(params.callUuid){
      validParam('callUuid', params.callUuid, [String], false)
    }

    if(params.callerName){
      validParam('callerName', params.callerName, [String], false)
      validRange('callerName', params.callerName.length, false, 1, 50)
    }

    if(params.callStatusCallbackUrl){
      validUrl('callStatusCallbackUrl', params.callStatusCallbackUrl, false)
    }

    if(params.callStatusCallbackMethod){
      validParam('callStatusCallbackMethod', params.callStatusCallbackMethod.toUpperCase(), [String], false, ['GET', 'POST'])
    }
    else{
      params.callStatusCallbackMethod = 'POST'
    }

    if(params.sipHeaders){
      validParam('sipHeaders', params.sipHeaders, [String], false)
    }

    if(params.confirmKey){
      validParam('confirmKey', params.confirmKey, [String], false, ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '#', '*'])
    }

    if(params.confirmKeySoundUrl){
      validUrl('confirmKeySoundUrl', params.confirmKeySoundUrl, false)
    }

    if(params.confirmKeySoundMethod){
      validParam('confirmKeySoundMethod)', params.confirmKeySoundMethod.toUpperCase(), [String], false, ['GET', 'POST'])
    }
    else{
      params.confirmKeySoundMethod = 'GET'
    }

    if(params.dialMusic){
      isOneAmongStringUrl('dialMusic', params.dialMusic, false, ['real', 'none'])
    }
    else {
      params.dialMusic = 'Real'
    }

    if(params.ringTimeout || params.ringTimeout === 0){
      validParam('ringTimeout', params.ringTimeout, [String, Number], false)
      if(typeof(params.ringTimeout) === 'string'){
        validMultipleDestinationIntegers('ringTimeout', params.ringTimeout)
      }
      else if (!Number.isInteger(params.ringTimeout) && typeof(params.ringTimeout) !== 'string'){
        throw new InvalidRequestError("RingTimeout must be of type int or string")
      }
    }
    else {
      params.ringTimeout = 45
    }
    if(params.delayDial){
      validParam('delayDial', params.delayDial, [String, Number], false)
      if(typeof(params.delayDial) === 'string'){
        validMultipleDestinationIntegers('delayDial', params.delayDial)
      }
      else if(!Number.isInteger(params.delayDial) && typeof(params.delayDial) !== 'string'){
        throw new InvalidRequestError("Dealydial must be of type int or string")
      }
    }
    else {
      params.delayDial = 0
    }

    if(params.maxDuration || params.maxDuration === 0){
      validRange('maxDuration', params.maxDuration, false, 300, 28800)
    }
    else {
      params.maxDuration = 14400
    }

    if(params.maxParticipants || params.maxParticipants === 0){
      validRange('maxParticipants', params.maxParticipants, false, 2, 10)
    }
    else {
      params.maxParticipants = 10
    }

    if(params.recordMinMemberCount || params.recordMinMemberCount === 0){
      validRange('recordMinMemberCount', params.recordMinMemberCount, false, 1, 2)
    }
    else {
      params.recordMinMemberCount = 1
    }

    if(params.waitMusicUrl){
      validUrl('waitMusicUrl', params.waitMusicUrl, false)
    }

    if(params.waitMusicMethod){
      validParam('waitMusicMethod', params.waitMusicMethod.toUpperCase(), [String], false, ['GET', 'POST'])
    }
    else {
      params.waitMusicMethod = 'GET'
    }

    if(params.agentHoldMusicUrl){
      validUrl('agentHoldMusicUrl', params.agentHoldMusicUrl, false)
    }

    if(params.agentHoldMusicMethod){
      validParam('agentHoldMusicMethod', params.agentHoldMusicMethod.toUpperCase(), [String], false, ['GET', 'POST'])
    }
    else {
      params.agentHoldMusicMethod = 'GET'
    }

    if(params.customerHoldMusicUrl){
      validUrl('customerHoldMusicUrl', params.customerHoldMusicUrl, false)
    }

    if(params.customerHoldMusicMethod){
      validParam('customerHoldMusicMethod', params.customerHoldMusicMethod.toUpperCase(), [String], false, ['GET', 'POST'])
    }
    else {
      params.customerHoldMusicMethod = 'GET'
    }

    if(params.recordingCallbackUrl){
      validUrl('recordingCallbackUrl', params.recordingCallbackUrl, false)
    }

    if(params.recordingCallbackMethod){
      validParam('recordingCallbackMethod', params.recordingCallbackMethod.toUpperCase(), [String], false, ['GET', 'POST'])
    }
    else {
      params.recordingCallbackMethod = 'GET'
    }

    if(params.statusCallbackUrl){
      validUrl('statusCallbackUrl', params.statusCallbackUrl, false)
    }

    if(params.statusCallbackMethod){
      validParam('statusCallbackMethod', params.statusCallbackMethod.toUpperCase(), [String], false, ['GET', 'POST'])
    }
    else {
      params.statusCallbackMethod = 'GET'
    }

    if(params.onExitActionUrl){
      validUrl('onExitActionUrl', params.onExitActionUrl, false)
    }

    if(params.onExitActionMethod){
      validParam('statusCallbackMethod', params.statusCallbackMethod.toUpperCase(), [String], false, ['GET', 'POST'])
    }
    else {
      params.onExitActionMethod = 'POST'
    }

    if(params.record){
      validParam('record', params.record, [Boolean, String], false)
    }
    else {
      params.record = 'false'
    }

    if(params.recordFileFormat){
      validParam('recordFileFormat', params.recordFileFormat.toLowerCase(), [String], false, ['mp3', 'wav'])
    }
    else {
      params.recordFileFormat = 'mp3'
    }

    if(params.statusCallbackEvents){
      multiValidParam('statusCallbackEvents', params.statusCallbackEvents.toLowerCase(), [String], false, ['mpc-state-changes', 'participant-state-changes', 'participant-speak-events', 'participant-digit-input-events', 'add-participant-api-events'], true,',')
    }
    else {
      params.statusCallbackEvents = 'mpc-state-changes,participant-state-changes'
    }

    if(params.stayAlone){
      validParam('stayAlone', params.stayAlone, [Boolean, String], false)
    }
    else {
      params.stayAlone = 'false'
    }

    if(params.coachMode){
      validParam('coachMode', params.coachMode, [Boolean, String], false)
    }
    else {
      params.coachMode = 'true'
    }

    if(params.mute){
      validParam('mute', params.mute, [Boolean, String], false)
    }
    else {
      params.mute = 'false'
    }

    if(params.hold){
      validParam('hold', params.hold, [Boolean, String], false)
    }
    else {
      params.hold = 'false'
    }

    if(params.startMpcOnEnter!=null){
      validParam('startMpcOnEnter', params.startMpcOnEnter, [Boolean, String], false)
    }
    else {
      params.startMpcOnEnter = 'true'
    }

    if(params.endMpcOnExit){
      validParam('endMpcOnExit', params.endMpcOnExit, [Boolean, String], false)
    }
    else {
      params.endMpcOnExit = 'false'
    }

    if(params.relayDTMFInputs){
      validParam('relayDTMFInputs', params.relayDTMFInputs, [Boolean, String], false)
    }
    else {
      params.relayDTMFInputs = 'false'
    }

    if(params.enterSound){
      isOneAmongStringUrl('enterSound', params.enterSound, false, ['beep:1', 'beep:2', 'none'])
    }
    else {
      params.enterSound = 'beep:1'
    }

    if(params.enterSoundMethod){
      validParam('enterSoundMethod', params.enterSoundMethod.toUpperCase(), [String], false, ['GET', 'POST'])
    }
    else {
      params.enterSoundMethod = 'GET'
    }

    if(params.exitSound){
      isOneAmongStringUrl('exitSound', params.exitSound, false, ['beep:1', 'beep:2', 'none'])
    }
    else {
      params.exitSound = 'beep:2'
    }

    if(params.exitSoundMethod){
      validParam('exitSoundMethod', params.exitSoundMethod.toUpperCase(), [String], false, ['GET', 'POST'])
    }
    else {
      params.exitSoundMethod = 'GET'
    }

    if(params.startRecordingAudio){
      validUrl('startRecordingAudio', params.startRecordingAudio, false)
    }

    if(params.startRecordingAudioMethod){
      validParam('startRecordingAudioMethod', params.startRecordingAudioMethod.toUpperCase(), [String], false, ['GET', 'POST'])
    }
    else {
      params.startRecordingAudioMethod = 'GET'
    }

    if(params.stopRecordingAudio){
      validUrl('stopRecordingAudio', params.stopRecordingAudio, false)
    }

    if(params.stopRecordingAudioMethod){
      validParam('stopRecordingAudioMethod', params.stopRecordingAudioMethod.toUpperCase(), [String], false, ['GET', 'POST'])
    }
    else {
      params.stopRecordingAudioMethod = 'GET'
    }

    if(params.to && (String(params.ringTimeout).split('<').length > params.to.split('<').length)){
      throw new MPCError("RingTimeout:number of ring_timeout(s) should be same as number of destination(s)")
    }
    if(params.to && (String(params.delayDial).split('<').length > params.to.split('<').length)){
      throw new MPCError("DelayDial:number of delay_dial(s) should be same as number of destination(s)")
    }

    if(params.recordParticipantTrack){
      validParam('recordParticipantTrack', params.recordParticipantTrack, [Boolean, String], false)
    }
    else {
      params.recordParticipantTrack = 'false'
    }
    
    params.isVoiceRequest = 'true';
    params.callerName = params.callerName || params.from;
    return super.executeAction(this.id + '/Participant/', 'POST', params)
  }

  start(params){
    if(params.status) {
      validParam('status', params.status.toLowerCase(), [String], true, 'active')
    }
    else{
      throw new InvalidRequestError("status is a mandatory parameter");
    }
    return super.executeAction(this.id + '/', 'POST', {'status' : params.status.toLowerCase(), 'isVoiceRequest' : 'true'})
  }

  stop(){
    return super.delete({'isVoiceRequest' : 'true'})
  }

    startRecording(params = {}){
    if(params.fileFormat){
      validParam('fileFormat', params.fileFormat, [String], false, ['mp3', 'wav'])
    }
    else {
      params.fileFormat = 'mp3'
    }

    if(params.recordingCallbackUrl){
      validUrl('recordingCallbackUrl', params.recordingCallbackUrl, false)
    }

    if(params.recordingCallbackMethod){
      validParam('recordingCallbackMethod', params.recordingCallbackMethod.toUpperCase(), [String], false, ['GET', 'POST'])
    }
    else {
      params.recordingCallbackMethod = 'POST'
    }
      params.isVoiceRequest = 'true';
    return super.executeAction(this.id + '/Record/', 'POST', params)
  }

  stopRecording(){
    return super.executeAction(this.id + '/Record/', 'DELETE',{'isVoiceRequest' : 'true'})
  }

  pauseRecording(){
    return super.executeAction(this.id + '/Record/Pause/', 'POST',{'isVoiceRequest' : 'true'})
  }

  resumeRecording(){
    return super.executeAction(this.id + '/Record/Resume/', 'POST',{'isVoiceRequest' : 'true'})
  }

  listParticipants(params = {}){
    if(params.callUuid){
      validParam('callUuid', params.callUuid, [String], false)
    }
    params.isVoiceRequest = 'true';
    return super.executeAction(this.id + '/Participant/', 'GET', params)
  }
}

export class MultiPartyCallParticipant extends PlivoSecondaryResource{
  constructor(client, data = {}) {
    super(action, MultiPartyCall, idField, secondaryAction, MultiPartyCallParticipant, secondaryIdField, client);

    if (idField in data) {
      this.id = data[idField];
    }

    if(secondaryIdField in data){
      this.secondaryId = data[secondaryIdField];
    }

    extend(this, data);
    this[clientKey] = client;
  }

  updateParticipant(params = {}){
    if(params.coachMode){
      validParam('coachMode', params.coachMode, [Boolean, String], false)
    }

    if(params.mute){
      validParam('mute', params.mute, [Boolean, String], false)
    }

    if(params.hold){
      validParam('hold', params.hold, [Boolean, String], false)
    }
    
    if(params.stateChangeSound){
      validParam('stateChangeSound', params.stateChangeSound, [Boolean, String], false)
    }

    params.isVoiceRequest = 'true';
    return super.executeAction(this.id, this.secondaryId, 'POST', params)
  }

  kickParticipant(){
    return super.executeAction(this.id, this.secondaryId, 'DELETE',{'isVoiceRequest' : 'true'})
  }

  getParticipant(){
    return super.executeAction(this.id, this.secondaryId, 'GET',{'isVoiceRequest' : 'true'})
  }
  startParticipantRecording(params = {}){
    if(params.fileFormat){
      validParam('fileFormat', params.fileFormat, [String], false, ['mp3', 'wav'])
    }
    else {
      params.fileFormat = 'mp3'
    }

    if(params.recordingCallbackUrl){
      validUrl('recordingCallbackUrl', params.recordingCallbackUrl, false)
    }

    if(params.recordingCallbackMethod){
      validParam('recordingCallbackMethod', params.recordingCallbackMethod.toUpperCase(), [String], false, ['GET', 'POST'])
    }
    else {
      params.recordingCallbackMethod = 'POST'
    }

    if(params.recordTrackType){
      validParam('recordTrackType', params.recordTrackType.toUpperCase(), [String], false, ['PARTICIPANT', 'BOTH', 'ALL'])
    }
    else {
      params.recordTrackType = 'all'
    }

    params.isVoiceRequest = 'true';
    return super.executeAction(this.id , this.secondaryId + '/Record', 'POST', params)
  }

  stopParticipantRecording(params = {}){
    if(params.recordTrackType){
      validParam('recordTrackType', params.recordTrackType.toUpperCase(), [String], false, ['PARTICIPANT', 'BOTH', 'ALL'])
    }
    else {
      params.recordTrackType = 'all'
    }
    
    params.isVoiceRequest = 'true';
    return super.executeAction(this.id , this.secondaryId +'/Record', 'DELETE', params)
  }

  pauseParticipantRecording(params = {}){
    if(params.recordTrackType){
      validParam('recordTrackType', params.recordTrackType.toUpperCase(), [String], false, ['PARTICIPANT', 'BOTH', 'ALL'])
    }
    else {
      params.recordTrackType = 'all'
    }
    
    params.isVoiceRequest = 'true';
    return super.executeAction(this.id , this.secondaryId + '/Record/Pause', 'POST', params)
  }

   resumeParticipantRecording(params = {}){
    if(params.recordTrackType){
      validParam('recordTrackType', params.recordTrackType.toUpperCase(), [String], false, ['PARTICIPANT', 'BOTH', 'ALL'])
    }
    else {
      params.recordTrackType = 'all'
    }
    
    params.isVoiceRequest = 'true';
    return super.executeAction(this.id , this.secondaryId + '/Record/Resume', 'POST', params)
  }

}

export class MultiPartyCallMember extends PlivoSecondaryResource{
  constructor(client, data= {}) {
    super(action, MultiPartyCall, idField, secondaryMemberAction, MultiPartyCallMember, secondaryIdField, client);

    if (idField in data) {
      this.id = data[idField];
    }

    if(secondaryIdField in data){
      this.secondaryId = data[secondaryIdField];
    }

    extend(this, data);
    this[clientKey] = client;
  }

  startPlayAudio(params){
    params.isVoiceRequest = 'true';
    return super.executeAction(this.id, this.secondaryId + '/Play', 'POST', params)
  }

  stopPlayAudio(){
    return super.executeAction(this.id, this.secondaryId +'/Play', 'DELETE',{'isVoiceRequest' : 'true'})
  }
}

export class MultiPartyCallInterface extends PlivoResourceInterface{
  constructor(client, data = {}) {
    super(action, MultiPartyCall, idField, client);
    extend(this, data);

    this[clientKey] = client;
  }

  makeMpcId(uuid = null, friendlyName = null){
    if(!uuid && !friendlyName){
      throw new MPCError('Specify either multi party call friendly name or uuid')
    }
    if(uuid && friendlyName){
      throw new MPCError('Cannot specify both multi party call friendly name or uuid')
    }
    let identifier = ''
    if(uuid){
      identifier = ['uuid_', uuid]
    }
    else{
      identifier = ['name_', friendlyName]
    }
    return identifier;
  }

  list(params={}) {
    if(params.subAccount){
      validSubAccount(params.subAccount);
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    if(params.status){
      validParam('status', params.status.toLowerCase(), [String], false, ['initialized', 'active', 'ended'])
    }
    if(params.terminationCauseCode){
      validParam('terminationCauseCode', params.terminationCauseCode, [Number, String], false)
    }
    if(params.end_time__gt){
      validDateFormat('end_time__gt', params.end_time__gt, false)
    }
    if(params.end_time__gte){
      validDateFormat('end_time__gte', params.end_time__gte, false)
    }
    if(params.end_time__lt){
      validDateFormat('end_time__lt', params.end_time__lt, false)
    }
    if(params.end_time__lte){
      validDateFormat('end_time__lte', params.end_time__lte, false)
    }
    if(params.creation_time__gt){
      validDateFormat('creation_time__gt', params.creation_time__gt, false)
    }
    if(params.creation_time__gte){
      validDateFormat('creation_time__gte', params.creation_time__gte, false)
    }
    if(params.creation_time__lt){
      validDateFormat('creation_time__lt', params.creation_time__lt, false)
    }
    if(params.creation_time__lte){
      validDateFormat('creation_time__lte', params.creation_time__lte, false)
    }
    if(params.limit){
      validRange('limit', params.limit, false, 1, 20)
    }
    if(params.offset){
      validRange('offset', params.offset, false, 0)
    }
    params.isVoiceRequest = 'true';
    return super.list(params);
  }

  get(params={}){
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCall(this[clientKey], {id: mpcId[0] + mpcId[1]}).get();
  }

  addParticipant(role, params = {}){
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    params.role = role
    return new MultiPartyCall(this[clientKey], {id: mpcId[0] + mpcId[1]}).addParticipant(params)
  }

  start(params = {}){
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCall(this[clientKey], {id: mpcId[0] + mpcId[1]}).start(params)
  }

  stop(params = {}){
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCall(this[clientKey], {id: mpcId[0] + mpcId[1]}).stop()
  }

  startRecording(params={}){
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCall(this[clientKey], {id: mpcId[0] + mpcId[1]}).startRecording(params)
  }

  stopRecording(params={}){
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCall(this[clientKey], {id: mpcId[0] + mpcId[1]}).stopRecording()
  }

  pauseRecording(params={}){
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCall(this[clientKey], {id: mpcId[0] + mpcId[1]}).pauseRecording()
  }

  resumeRecording(params={}){
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCall(this[clientKey], {id: mpcId[0] + mpcId[1]}).resumeRecording()
  }

  startParticipantRecording(participantId, params={}){
    validParam('participantId', participantId, [String, Number], true)
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCallParticipant(this[clientKey], {id: mpcId[0] + mpcId[1], secondaryId: participantId}).startParticipantRecording(params)
  }

  stopParticipantRecording(participantId, params={}){
    validParam('participantId', participantId, [String, Number], true)
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCallParticipant(this[clientKey], {id: mpcId[0] + mpcId[1], secondaryId: participantId}).stopParticipantRecording(params)
  }

  pauseParticipantRecording(participantId, params={}){
    validParam('participantId', participantId, [String, Number], true)
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCallParticipant(this[clientKey], {id: mpcId[0] + mpcId[1], secondaryId: participantId}).pauseParticipantRecording(params)
  }

  resumeParticipantRecording(participantId, params={}){
    validParam('participantId', participantId, [String, Number], true)
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCallParticipant(this[clientKey], {id: mpcId[0] + mpcId[1], secondaryId: participantId}).resumeParticipantRecording(params)
  }

  listParticipants(params={}){
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCall(this[clientKey], {id: mpcId[0] + mpcId[1]}).listParticipants(params)
  }

  updateParticipant(participantId, params={}){
    validParam('participantId', participantId, [String, Number], true)
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCallParticipant(this[clientKey], {id: mpcId[0] + mpcId[1], secondaryId: participantId}).updateParticipant(params)
  }

  kickParticipant(participantId, params={}){
    validParam('participantId', participantId, [String, Number], true)
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCallParticipant(this[clientKey], {id: mpcId[0] + mpcId[1], secondaryId: participantId}).kickParticipant()
  }

  getParticipant(participantId, params={}){
    validParam('participantId', participantId, [String, Number], true)
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCallParticipant(this[clientKey], {id: mpcId[0] + mpcId[1], secondaryId: participantId}).getParticipant()
  }

  startPlayAudio(participantId, url, params = {}){
    validParam('participantId', participantId, [String, Number], true)
    validUrl('url', url, true)
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    params.url = url
    return new MultiPartyCallMember(this[clientKey], {id: mpcId[0] + mpcId[1], secondaryId: participantId}).startPlayAudio(params)
  }

  stopPlayAudio(participantId, params = {}){
    validParam('participantId', participantId, [String, Number], true)
    if(params.uuid){
      validParam('uuid', params.uuid, [String], false)
    }
    if(params.friendlyName){
      validParam('friendlyName', params.friendlyName, [String], false)
    }
    let mpcId = this.makeMpcId(params.uuid, params.friendlyName)
    delete params.uuid
    delete params.friendlyName
    return new MultiPartyCallMember(this[clientKey], {id: mpcId[0] + mpcId[1], secondaryId: participantId}).stopPlayAudio(params)
  }
}
