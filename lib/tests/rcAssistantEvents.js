import {
    RcsAssistantEventInterface,
    RcsAssistantEventResponse
} from '../resources/rcAssistantEvents.js';

import assert from 'assert';

let actionKey = Symbol('api action');
let clientKey = Symbol('make api call');

describe('RcsAssistantEvents', function () {
    describe('create', function () {
        it('should send RCS assistant events and return a response', function () {
            let client = function (method, action, params) {
                return new Promise((resolve, reject) => {
                    resolve({
                        body: {
                            apiId: 'test-api-id',
                            phoneNumber: '+14151234567',
                            isCapable: true,
                            features: ['RICHCARD_STANDALONE', 'ACTION_CREATE_CALENDAR_EVENT'],
                            message: 'Event sent successfully.',
                            error: null
                        }
                    });
                });
            };

            let rcsAssistantEventInterface = new RcsAssistantEventInterface(client);

            let params = {
                phone_number: '+14151234567',
                event_type: 'IS_TYPING'
            };

            return rcsAssistantEventInterface.create(params)
                .then(response => {
                    assert.equal(response.apiId, 'test-api-id');
                    assert.equal(response.phoneNumber, '+14151234567');
                    assert.equal(response.isCapable, true);
                    assert.deepEqual(response.features, ['RICHCARD_STANDALONE', 'ACTION_CREATE_CALENDAR_EVENT']);
                    assert.equal(response.message, 'Event sent successfully.');
                });
        });

        it('should reject with an error on API failure', function () {
            let client = function (method, action, params) {
                return new Promise((resolve, reject) => {
                    reject(new Error('API Error'));
                });
            };

            let rcsAssistantEventInterface = new RcsAssistantEventInterface(client);

            return rcsAssistantEventInterface.create({})
                .then(() => {
                    assert.fail('Expected rejection but got resolution');
                })
                .catch(error => {
                    assert.equal(error.message, 'API Error');
                });
        });
    });
});