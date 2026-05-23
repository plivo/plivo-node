import assert from 'assert';
import sinon from 'sinon';
import { RCSCapabilityInterface, RCSCapabilityCheckResponse } from '../lib/resources/rcsCapability.js';

describe('RCSCapability', function () {
    let client;

    beforeEach(function () {
        client = sinon.stub();
    });

    describe('RCSCapabilityCheckResponse', function () {
        it('should construct response correctly', function () {
            const params = {
                apiId: 'test-api-id',
                phoneNumber: '+14151234567',
                isCapable: true,
                features: ['RICHCARD_STANDALONE'],
                message: 'Success',
                error: null
            };
            const response = new RCSCapabilityCheckResponse(params);
            assert.strictEqual(response.apiId, 'test-api-id');
            assert.strictEqual(response.phoneNumber, '+14151234567');
            assert.strictEqual(response.isCapable, true);
            assert.deepStrictEqual(response.features, ['RICHCARD_STANDALONE']);
            assert.strictEqual(response.message, 'Success');
            assert.strictEqual(response.error, null);
        });

        it('should handle empty params', function () {
            const response = new RCSCapabilityCheckResponse();
            assert.strictEqual(response.apiId, undefined);
            assert.strictEqual(response.phoneNumber, undefined);
            assert.strictEqual(response.isCapable, undefined);
            assert.strictEqual(response.features, undefined);
            assert.strictEqual(response.message, undefined);
            assert.strictEqual(response.error, undefined);
        });
    });

    describe('RCSCapabilityInterface#check', function () {
        it('should reject if phone_number is not provided', function () {
            const rcsCapability = new RCSCapabilityInterface(client);
            const result = rcsCapability.check(undefined);
            return result.then(
                () => { throw new Error('Expected rejection'); },
                err => {
                    assert.ok(err instanceof Error);
                }
            );
        });

        it('should make GET request with phone_number param', function () {
            const mockBody = {
                apiId: 'test-api-id',
                phoneNumber: '+14151234567',
                isCapable: true,
                features: ['RICHCARD_STANDALONE'],
                message: 'Success',
                error: null
            };
            client.resolves({ body: mockBody });

            const rcsCapability = new RCSCapabilityInterface(client);
            return rcsCapability.check('+14151234567').then(response => {
                assert.strictEqual(response.apiId, 'test-api-id');
                assert.strictEqual(response.phoneNumber, '+14151234567');
                assert.strictEqual(response.isCapable, true);
                sinon.assert.calledWith(client, 'GET', 'RCS/Capability/', {
                    phone_number: '+14151234567'
                });
            });
        });

        it('should include agent_uuid param when agentUuid is provided', function () {
            const mockBody = {
                apiId: 'test-api-id',
                phoneNumber: '+14151234567',
                isCapable: false,
                features: [],
                message: 'Not capable',
                error: null
            };
            client.resolves({ body: mockBody });

            const rcsCapability = new RCSCapabilityInterface(client);
            return rcsCapability.check('+14151234567', { agentUuid: 'agent-uuid-123' }).then(response => {
                assert.strictEqual(response.isCapable, false);
                sinon.assert.calledWith(client, 'GET', 'RCS/Capability/', {
                    phone_number: '+14151234567',
                    agent_uuid: 'agent-uuid-123'
                });
            });
        });

        it('should reject on API error', function () {
            const error = new Error('API Error');
            client.rejects(error);

            const rcsCapability = new RCSCapabilityInterface(client);
            return rcsCapability.check('+14151234567').then(
                () => { throw new Error('Expected rejection'); },
                err => {
                    assert.strictEqual(err.message, 'API Error');
                }
            );
        });
    });
});