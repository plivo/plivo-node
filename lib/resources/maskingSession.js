import * as _ from "lodash";

import {
    PlivoResource,
    PlivoResourceInterface
} from '../base';
import {
    extend,
    validate
} from '../utils/common.js';

const clientKey = Symbol();
const action = 'Masking/Session/';
const idField = 'sessionUuid';

export class CreateMaskingSessionResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.sessionUuid = params.sessionUuid;
        this.virtualNumber = params.virtualNumber;
        this.message = params.message;
        this.session = params.session;
        

    }
}
export class GetMaskingSessionResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.response = params.response;        
    }
}
export class DeleteMaskingSessionResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message;        
    }
}
export class UpdateMaskingSessionResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.message = params.message; 
        this.session = params.session;       
    }
}
export class ListMaskingSessionResponse {
    constructor(params) {
        params = params || {};
        this.apiId = params.apiId;
        this.response = params.response;   
    }
}

export class MaskingSession extends PlivoResource {
    constructor(client, data = {}) {
        super(action, MaskingSession, idField, client);

        if (idField in data) {
            this.id = data[idField];
        }

        extend(this, data);
        this[clientKey] = client;
    }
    getMaskingSession(params={}) {       
        params.isVoiceRequest = 'true';
        return super.executeAction(this.id, 'GET', params);
    }
    deleteMaskingSession(params={}) {       
        params.isVoiceRequest = 'true';
        return super.executeAction(this.id, 'DELETE', params);
    }
    updateMaskingSession(params) {       
        params.isVoiceRequest = 'true';
        return super.executeAction(this.id, 'POST', params);
    }
}
export class MaskingSessionInterface extends PlivoResourceInterface {

    constructor(client, data = {}) {
        super(action, MaskingSession, idField, client);
        extend(this, data);

        this[clientKey] = client;
    }
     /**
     * Create a masking session
     * @method
     * @param {string} firstParty - The phone number or SIP endpoint of the first party.
     * @param {string} secondParty - The phone number or SIP endpoint of the second party.
     * @param {object} params - optional params to make a call
     * @param {number} [params.sessionExpiry]- The duration in seconds for which the masking session will be active.
     * @param {number} [params.callTimeLimit] - The maximum duration in seconds for each call in the masking session.
     * @param {boolean} [params.record] - Indicates whether the calls in the masking session should be recorded.
     * @param {string} [params.recordFileFormat] - The file format for the recorded calls.
     * @param {string} [params.recordingCallbackUrl] - The URL to which the recording callback will be sent.
     * @param {boolean} [params.initiateCallToFirstParty] - Indicates whether the call to the first party should be initiated automatically.
     * @param {string} [params.callbackUrl] - The URL to which the callback for the masking session will be sent.
     * @param {string} [params.callbackMethod] - The HTTP method for the callback request.
     * @param {number} [params.ringTimeout] - The duration in seconds for which the call will ring before being canceled.
     * @param {string} [params.firstPartyPlayUrl] - The URL to play audio to the first party when the call is established.
     * @param {string} [params.secondPartyPlayUrl] - The URL to play audio to the second party when the call is established.
     * @param {string} [params.recordingCallbackMethod] - The HTTP method for the recording callback request.
     * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */
     createMaskingSession(firstParty, secondParty, params = {}) {
        let errors = validate([{
                field: 'first_party',
                value: firstParty,
                validators: ['isRequired']
            },
            {
                field: 'second_party',
                value: secondParty,
                validators: ['isRequired']
            }
        ]);        
        params.firstParty = firstParty;
        params.secondParty = secondParty
        params.isVoiceRequest = 'true';

        let client = this[clientKey];
        return new Promise((resolve, reject) => {
            client('POST', 'Masking/Session/', params)
                .then(response => {
                    resolve(new CreateMaskingSessionResponse(response.body, idField));
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

	/**
	 * Update a masking session
	 * @method
	 * @param {string} sessionUuid - unique idenfier of a session
	 * @param {object} params - optional params to update a session
	 * @param {number} [params.sessionExpiry] - The duration in seconds for which the masking session will be active.
	 * @param {number} [params.callTimeLimit] - The maximum duration in seconds for each call in the masking session.
	 * @param {boolean} [params.record] - Indicates whether the calls in the masking session should be recorded.
	 * @param {string} [params.recordFileFormat] - The file format for the recorded calls.
	 * @param {string} [params.recordingCallbackUrl] - The URL to which the recording callback will be sent.
	 * @param {string} [params.callbackUrl] - The URL to which the callback for the masking session will be sent.
	 * @param {string} [params.callbackMethod] - The HTTP method for the callback request.
	 * @param {number} [params.ringTimeout] - The duration in seconds for which the call will ring before being canceled.
	 * @param {string} [params.firstPartyPlayUrl] - The URL to play audio to the first party when the call is established.
	 * @param {string} [params.secondPartyPlayUrl] - The URL to play audio to the second party when the call is established.
	 * @param {string} [params.recordingCallbackMethod] - The HTTP method for the recording callback request.
	 * @returns {Promise<PlivoGenericResponse>} - Resolves to a PlivoGenericResponse object
	 * @throws {Error} - Throws an error if the update masking session request fails
	 */
    updateMaskingSession(sessionUuid, params = {}) {
        let errors = validate([{
                field: 'session_uuid',
                value: sessionUuid,
                validators: ['isRequired']
            }
        ]);        
        params.sessionUuid = sessionUuid;
        params.isVoiceRequest = 'true';

        if (errors) {
            return errors;
        }
        return new MaskingSession(this[clientKey], {
                id: sessionUuid,
            }).updateMaskingSession(params);
    }
 	/**
	 * List masking sessions with optional filters
	 * @method
	 * @param {object} filterParams - Optional filter parameters to list masking sessions
	 * @param {string} [filterParams.firstParty] - The phone number or SIP endpoint of the first party.
	 * @param {string} [filterParams.secondParty] - The phone number or SIP endpoint of the second party.
	 * @param {string} [filterParams.virtualNumber] - The virtual number associated with the masking session.
	 * @param {string} [filterParams.status] - The status of the masking session.
	 * @param {string} [filterParams.createdTimeEquals] - The specific created time to filter sessions.
	 * @param {string} [filterParams.createdTimeLessThan] - Filter sessions created before this time.
	 * @param {string} [filterParams.createdTimeGreaterThan] - Filter sessions created after this time.
	 * @param {string} [filterParams.createdTimeLessOrEqual] - Filter sessions created before or at this time.
	 * @param {string} [filterParams.createdTimeGreaterOrEqual] - Filter sessions created after or at this time.
	 * @param {string} [filterParams.expiryTimeEquals] - The specific expiry time to filter sessions.
	 * @param {string} [filterParams.expiryTimeLessThan] - Filter sessions expiring before this time.
	 * @param {string} [filterParams.expiryTimeGreaterThan] - Filter sessions expiring after this time.
	 * @param {string} [filterParams.expiryTimeLessOrEqual] - Filter sessions expiring before or at this time.
	 * @param {string} [filterParams.expiryTimeGreaterOrEqual] - Filter sessions expiring after or at this time.
	 * @param {number} [filterParams.durationEquals] - The duration in seconds to filter sessions.
	 * @param {number} [filterParams.durationLessThan] - Filter sessions with duration less than this value.
	 * @param {number} [filterParams.durationGreaterThan] - Filter sessions with duration greater than this value.
	 * @param {number} [filterParams.durationLessOrEqual] - Filter sessions with duration less than or equal to this value.
	 * @param {number} [filterParams.durationGreaterOrEqual] - Filter sessions with duration greater than or equal to this value.
	 * @param {number} [filterParams.limit] - The maximum number of sessions to retrieve.
	 * @param {number} [filterParams.offset] - The offset for paginated results.
	 * @returns {Promise<PlivoGenericResponse>} - Resolves to a PlivoGenericResponse object
	 * @throws {Error} - Throws an error if the list masking sessions request fails
	 */
    listMaskingSession(params) {
        let client = this[clientKey];
        if (params === undefined) {
            params = {}
        }
        params.isVoiceRequest = 'true';
        return new Promise(function (resolve, reject) {
            client('GET', 'Masking/Session/', params).then(function (response) {
                resolve(new ListMaskingSessionResponse(response.body, idField));
            }).catch(function (error) {
                reject(error);
            });
        });
    }
	/**
     * Get a masking session
     * @method
	 * @param {string} sessionUuid - unique idenfier of a session
	 * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */    
    getMaskingSession(sessionUuid){
        let errors = validate([{
            field: 'sessionUuid',
            value: sessionUuid,
            validators: ['isRequired']
        }
        ]);
        if (errors) {
            return errors;
        }
        return new MaskingSession(this[clientKey], {
                id: sessionUuid,
            }).getMaskingSession();
    }
    /**
     * Delete a masking session
     * @method
	 * @param {string} sessionUuid - unique idenfier of a session
	 * @promise {object} returns PlivoGenericResponse Object
     * @fail {Error} returns Error
     */    
    deleteMaskingSession(sessionUuid){
        let errors = validate([{
            field: 'sessionUuid',
            value: sessionUuid,
            validators: ['isRequired']
        }
        ]);
        if (errors) {
            return errors;
        }
        return new MaskingSession(this[clientKey], {
                id: sessionUuid,
            }).deleteMaskingSession();
    }
}