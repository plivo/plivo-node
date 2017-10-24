import {extend, validate} from '../utils/common.js';
import {PlivoResource, PlivoResourceInterface} from '../base';

const clientKey = Symbol();
const action = 'Conference/';
const idField = 'conferenceName';

/**
 * Represents a Conference
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class Conference extends PlivoResource {
  constructor(client, data = {}) {
    super(action, Conference, idField, client);

    if (idField in data) {
      this.id = data[idField];
    }

    extend(this, data);
    this[clientKey] = client;
  }

/**
 * hangup conference
 * @method
 * @promise {Boolean} return true if call hung up
 * @fail {Error} return Error
 */
  hangup() {
    return super.delete();
  }

/**
 * hangup member from conference
 * @method
 * @param {string} memberId - id of member to be hangup
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  hangupMember(memberId) {
    let errors = validate([
      {field: 'member_id', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return super.executeAction(this.id + '/Member/' + memberId + '/', 'DELETE');
  }

/**
 * kick member from conference
 * @method
 * @param {string} memberId - id of member
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  kickMember(memberId) {
    let errors = validate([
      {field: 'member_id', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }

    return super.executeAction(this.id + '/Member/' + memberId + '/Kick/', 'POST');
  }

/**
 * mute member from conference
 * @method
 * @param {string} memberId - id of member
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  muteMember(memberId) {
    let errors = validate([
      {field: 'member_id', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return super.executeAction(this.id + '/Member/' + memberId + '/Mute/', 'POST');
  }

/**
 * unmute member from conference
 * @method
 * @param {string} memberId - id of member
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  unmuteMember(memberId) {
    let errors = validate([
      {field: 'member_id', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }

    return super.executeAction(this.id + '/Member/' + memberId + '/Mute/', 'DELETE');
  }

/**
 * deaf member from conference
 * @method
 * @param {string} memberId - id of member
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  deafMember(memberId) {
    let errors = validate([
      {field: 'member_id', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return super.executeAction(this.id + '/Member/' + memberId + '/Deaf/', 'POST');
  }

/**
 * undeaf member from conference
 * @method
 * @param {string} memberId - id of member
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  undeafMember(memberId) {
    let errors = validate([
      {field: 'member_id', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return super.executeAction(this.id + '/Member/' + memberId + '/Deaf/', 'DELETE');
  }

/**
 * play audio to member
 * @method
 * @param {string} memberId - id of member
 * @param {string} url - url for audio
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  playAudioToMember(memberId, url) {
    let errors = validate([
      {field: 'member_id', value: memberId, validators: ['isRequired']},
      {field: 'url', value: url, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    let params = {url: url};
    return super.executeAction(this.id + '/Member/' + memberId + '/Play/', 'POST', params);
  }

/**
 * stop playing audio to member
 * @method
 * @param {string} memberId - id of member
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  stopPlayingAudioToMember(memberId) {
    let errors = validate([
      {field: 'member_id', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return super.executeAction(this.id + '/Member/' + memberId + '/Play/', 'DELETE');
  }

/**
 * speak text to member
 * @method
 * @param {string} memberId - id of member
 * @param {string} text - text to be speak to member
 * @param {object} optionalParams - optionalPrams to speak text
 * @param {string} [optionalParams.voice] The voice to be used. Can be MAN or WOMAN. Defaults to WOMAN.
 * @param {string} [optionalParams.language] The language to be used. Defaults to en-US.
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  speakTextToMember(memberId, text, optionalParams) {
    let errors = validate([
      {field: 'member_id', value: memberId, validators: ['isRequired']},
      {field: 'text', value: text, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    let params = optionalParams || {};
    params.text = text;

    return super.executeAction(this.id + '/Member/' + memberId + '/Speak/', 'POST', params);
  }

/**
 * stop speaking text to member
 * @method
 * @param {string} memberId - id of member
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  stopSpeakingTextToMember(memberId) {
    let errors = validate([
      {field: 'member_id', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return super.executeAction(this.id + '/Member/' + memberId + '/Speak/', 'DELETE');
  }

  /**
   * Record conference
   * @method
   * @param {object} params - optional params to record conference
   * @param {string} [params.fileFormat] The file format of the record can be of mp3 or wav format. Defaults to mp3 format.
   * @param {string} [params.transcriptionType] The type of transcription required. The following values are allowed:
   * - auto - This is the default value. Transcription is completely automated; turnaround time is about 5 minutes.
   * - hybrid - Transcription is a combination of automated and human verification processes; turnaround time is about 10-15 minutes.
   * @param {string} [params.transcriptionUrl] The URL where the transcription is available.
   * @param {string} [params.transcriptionMethod] The method used to invoke the transcription_url. Defaults to POST.
   * @param {string} [params.callbackUrl] The URL invoked by the API when the recording ends.
   * @param {string} [params.callbackMethod] The method which is used to invoke the callback_url URL. Defaults to POST.
   * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
   * @fail {Error} return Error
   */
  record(params) {
    return this.startRecording(params);
  }

  /**
   * Record conference
   * @method
   * @param {object} params - optional params to record conference
   * @param {string} [params.fileFormat] The file format of the record can be of mp3 or wav format. Defaults to mp3 format.
   * @param {string} [params.transcriptionType] The type of transcription required. The following values are allowed:
   * - auto - This is the default value. Transcription is completely automated; turnaround time is about 5 minutes.
   * - hybrid - Transcription is a combination of automated and human verification processes; turnaround time is about 10-15 minutes.
   * @param {string} [params.transcriptionUrl] The URL where the transcription is available.
   * @param {string} [params.transcriptionMethod] The method used to invoke the transcription_url. Defaults to POST.
   * @param {string} [params.callbackUrl] The URL invoked by the API when the recording ends.
   * @param {string} [params.callbackMethod] The method which is used to invoke the callback_url URL. Defaults to POST.
   * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
   * @fail {Error} return Error
   */
  startRecording(params) {
    return super.executeAction(this.id + '/Record/', 'POST', params);
  }

/**
 * stop recording conference
 * @method
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  stopRecording() {
    return super.executeAction(this.id + '/Record/', 'DELETE');
  }
}

/**
 * Represents a Conference Interface
 * @constructor
 * @param {function} client - make api call
 * @param {object} [data] - data of call
 */
export class ConferenceInterface extends PlivoResourceInterface {

  constructor(client, data = {}) {
    super(action, Conference, idField, client);
    extend(this, data);

    this[clientKey] = client;
  }

/**
 * get conference by id
 * @method
 * @param {string} id - id of conference
 * @promise {@link Conference} return {@link Conference} object if success
 * @fail {Error} return Error
 */
  get(id) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return super.get(id);
  }

/**
 * get all conferences. returns name of all conferences
 * @method
 * @promise {@link [Conference]} returns list of {@link Conference} objects if success
 * @fail {Error} return Error
 */
  list() {
    let client = this[clientKey];

    return new Promise((resolve, reject) => {
      client('GET', action)
        .then(response => {
          let conferences = [];
          response.body.conferences.forEach(conference => {
            conferences.push(new Conference(client, {
              name: conference
            }));
          });
          resolve(conferences);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

/**
 * hangup conference
 * @method
 * @param {string} conferenceName - name of conference
 * @promise {@link Conference} return {@link Conference} object if success
 * @fail {Error} return Error
 */
  hangup(conferenceName) {
    let errors = validate([
      {field: 'conference_name', value: conferenceName, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Conference(this[clientKey], {
      id: conferenceName
    }).delete();
  }

/**
 * hangup all
 * @method
 * @promise {@link PlivoGenericResponse} returns object of PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  hangupAll() {
    return new Conference(this[clientKey])
      .executeAction('', 'DELETE');
  }

/**
 * hangup member from conference
 * @method
 * @param {string} id - id of conference
 * @param {string} memberId - id of member to be hangup
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  hangupMember(id, memberId) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']},
      {field: 'memberId', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Conference(this[clientKey], {
      id: id
    }).hangupMember(memberId);
  }

/**
 * kick member from conference
 * @method
 * @param {string} id - id of conference
 * @param {string} memberId - id of member
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  kickMember(id, memberId) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']},
      {field: 'memberId', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Conference(this[clientKey], {
      id: id
    }).kickMember(memberId);
  }

/**
 * mute member
 * @method
 * @param {string} id - id of conference
 * @param {string} memberId - id of member
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  muteMember(id, memberId) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']},
      {field: 'memberId', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Conference(this[clientKey], {
      id: id
    }).muteMember(memberId);
  }

/**
 * unmute member
 * @method
 * @param {string} id - id of conference
 * @param {string} memberId - id of member
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  unmuteMember(id, memberId) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']},
      {field: 'memberId', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Conference(this[clientKey], {
      id: id
    }).unmuteMember(memberId);
  }

/**
 * deaf member
 * @method
 * @param {string} id - id of conference
 * @param {string} memberId - id of member
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  deafMember(id, memberId) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']},
      {field: 'memberId', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Conference(this[clientKey], {
      id: id
    }).deafMember(memberId);
  }

/**
 * undeaf member
 * @method
 * @param {string} id - id of conference
 * @param {string} memberId - id of member
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  undeafMember(id, memberId) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']},
      {field: 'memberId', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Conference(this[clientKey], {
      id: id
    }).undeafMember(memberId);
  }
/**
 * play audio to member
 * @method
 * @param {string} id - id of conference
 * @param {string} memberId - id of member
 * @param {string} url - urls for audio
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */

  playAudioToMember(id, memberId, url) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']},
      {field: 'memberId', value: memberId, validators: ['isRequired']},
      {field: 'url', value: url, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Conference(this[clientKey], {
      id: id
    }).playAudioToMember(memberId, url);
  }

/**
 * stop playing audio to member
 * @method
 * @param {string} id - id of conference
 * @param {string} memberId - id of member
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  stopPlayingAudioToMember(id, memberId) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']},
      {field: 'memberId', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Conference(this[clientKey], {
      id: id
    }).stopPlayingAudioToMember(memberId);
  }

/**
 * speak text to member
 * @method
 * @param {string} id - id of conference
 * @param {string} memberId - id of member
 * @param {string} text - text to speak
 * @param {object} optionalParams - optional params
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  speakTextToMember(id, memberId, text, optionalParams) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']},
      {field: 'memberId', value: memberId, validators: ['isRequired']},
      {field: 'text', value: text, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Conference(this[clientKey], {
      id: id
    }).speakTextToMember(memberId, text, optionalParams);
  }

/**
 * stop speaking text to member
 * @method
 * @param {string} id - id of conference
 * @param {string} memberId - id of member
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  stopSpeakingTextToMember(id, memberId) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']},
      {field: 'memberId', value: memberId, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Conference(this[clientKey], {
      id: id
    }).stopSpeakingTextToMember(memberId);
  }

/**
 * record conference
 * @method
 * @param {string} id - id of conference
 * @param {object} params - optional params to record conference
 * @param {string} [params.fileFormat] The file format of the record can be of mp3 or wav format. Defaults to mp3 format.
 * @param {string} [params.transcriptionType] The type of transcription required. The following values are allowed:
 * - auto - This is the default value. Transcription is completely automated; turnaround time is about 5 minutes.
 * - hybrid - Transcription is a combination of automated and human verification processes; turnaround time is about 10-15 minutes.
 * @param {string} [params.transcriptionUrl] The URL where the transcription is available.
 * @param {string} [params.transcriptionMethod] The method used to invoke the transcription_url. Defaults to POST.
 * @param {string} [params.callbackUrl] The URL invoked by the API when the recording ends.
 * @param {string} [params.callbackMethod] The method which is used to invoke the callback_url URL. Defaults to POST.
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  record(id, params) {
    return this.startRecording(id, params);
  }

/**
 * record conference
 * @method
 * @param {string} id - id of conference
 * @param {object} params - optional params to record conference
 * @param {string} [params.fileFormat] The file format of the record can be of mp3 or wav format. Defaults to mp3 format.
 * @param {string} [params.transcriptionType] The type of transcription required. The following values are allowed:
 * - auto - This is the default value. Transcription is completely automated; turnaround time is about 5 minutes.
 * - hybrid - Transcription is a combination of automated and human verification processes; turnaround time is about 10-15 minutes.
 * @param {string} [params.transcriptionUrl] The URL where the transcription is available.
 * @param {string} [params.transcriptionMethod] The method used to invoke the transcription_url. Defaults to POST.
 * @param {string} [params.callbackUrl] The URL invoked by the API when the recording ends.
 * @param {string} [params.callbackMethod] The method which is used to invoke the callback_url URL. Defaults to POST.
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  startRecording(id, params) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }

    return new Conference(this[clientKey], {
      id: id
    }).startRecording(params);
  }

/**
 * stop recording
 * @method
 * @param {string} id - id of conference
 * @promise {PlivoGenericResponse} return PlivoGenericResponse if success
 * @fail {Error} return Error
 */
  stopRecording(id) {
    let errors = validate([
      {field: 'id', value: id, validators: ['isRequired']}
    ]);

    if (errors) {
      return errors;
    }
    return new Conference(this[clientKey], {
      id: id
    }).stopRecording();
  }
}
