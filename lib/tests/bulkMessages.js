import {
    assert
} from 'chai';
import sinon from 'sinon';
import {
    BulkMessageInterface,
    BulkMessageResponse
} from '../resources/bulkMessages.js';

let client = function(method, action, params) {
    return new Promise((resolve, reject) => {
        resolve({
            response: {
                status: 202
            },
            body: {
                apiId: 'api-id-test',
                messageUuid: ['uuid-1', 'uuid-2'],
                message: 'messages queued'
            }
        });
    });
};

describe('BulkMessages', function() {
    describe('create', function() {
        it('should create a bulk message successfully', function() {
            let bulkMessageInterface = new BulkMessageInterface(client);
            return bulkMessageInterface
                .create(
                    '14155551234',
                    ['14155559001', '14155559002'],
                    'Hello World'
                )
                .then(response => {
                    assert.instanceOf(response, BulkMessageResponse);
                    assert.equal(response.apiId, 'api-id-test');
                    assert.deepEqual(response.messageUuid, ['uuid-1', 'uuid-2']);
                    assert.equal(response.message, 'messages queued');
                });
        });

        it('should create a bulk message with optional params', function() {
            let bulkMessageInterface = new BulkMessageInterface(client);
            return bulkMessageInterface
                .create(
                    '14155551234',
                    ['14155559001', '14155559002'],
                    'Hello World',
                    {
                        type: 'sms',
                        url: 'https://example.com/callback',
                        method: 'POST',
                        log: false,
                        powerpack_uuid: 'test-powerpack-uuid'
                    }
                )
                .then(response => {
                    assert.instanceOf(response, BulkMessageResponse);
                    assert.equal(response.apiId, 'api-id-test');
                });
        });

        it('should reject when src is missing', function() {
            let bulkMessageInterface = new BulkMessageInterface(client);
            let result = bulkMessageInterface.create(
                null,
                ['14155559001'],
                'Hello World'
            );
            return result.then(
                () => {
                    assert.fail('Expected promise to be rejected');
                },
                err => {
                    assert.ok(err);
                }
            );
        });

        it('should reject when dst is missing', function() {
            let bulkMessageInterface = new BulkMessageInterface(client);
            let result = bulkMessageInterface.create(
                '14155551234',
                null,
                'Hello World'
            );
            return result.then(
                () => {
                    assert.fail('Expected promise to be rejected');
                },
                err => {
                    assert.ok(err);
                }
            );
        });

        it('should reject when text is missing', function() {
            let bulkMessageInterface = new BulkMessageInterface(client);
            let result = bulkMessageInterface.create(
                '14155551234',
                ['14155559001'],
                null
            );
            return result.then(
                () => {
                    assert.fail('Expected promise to be rejected');
                },
                err => {
                    assert.ok(err);
                }
            );
        });
    });

    describe('send', function() {
        it('should be an alias for create', function() {
            let bulkMessageInterface = new BulkMessageInterface(client);
            return bulkMessageInterface
                .send(
                    '14155551234',
                    ['14155559001', '14155559002'],
                    'Hello World'
                )
                .then(response => {
                    assert.instanceOf(response, BulkMessageResponse);
                    assert.equal(response.apiId, 'api-id-test');
                });
        });
    });

    describe('BulkMessageResponse', function() {
        it('should set invalidNumber when present', function() {
            let response = new BulkMessageResponse({
                apiId: 'api-id-test',
                messageUuid: ['uuid-1'],
                message: 'messages queued',
                invalidNumber: ['14155550000']
            });
            assert.deepEqual(response.invalidNumber, ['14155550000']);
        });

        it('should not set invalidNumber when absent', function() {
            let response = new BulkMessageResponse({
                apiId: 'api-id-test',
                messageUuid: ['uuid-1'],
                message: 'messages queued'
            });
            assert.isUndefined(response.invalidNumber);
        });
    });
});