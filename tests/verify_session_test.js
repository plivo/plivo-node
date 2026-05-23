import {
    VerifySessionInterface,
    CreateVerifySessionResponse
} from '../lib/resources/verify_session.js';
import assert from 'assert';

describe('VerifySession', () => {
    describe('create', () => {
        it('should create a verify session with optional params', done => {
            const mockBody = {
                apiId: 'api-id-123',
                sessionUuid: 'session-uuid-456',
                message: 'Session initiated'
            };

            const mockClient = (method, url, params) => {
                return new Promise((resolve) => {
                    assert.equal(method, 'POST');
                    assert.equal(url, 'Verify/Session/');
                    resolve({ body: mockBody });
                });
            };

            const verifySessionInterface = new VerifySessionInterface(mockClient);

            verifySessionInterface.create({
                brand_name: 'MyBrand',
                app_hash: 'abc123hash',
                code_length: 6,
                text: 'Your OTP is <otp>',
                fraud_check: 'standard',
                dlt_entity_id: 'dlt_entity_id',
                dlt_template_id: 'dlt_template_id',
                dlt_template_category: 'dlt_template_category',
                dlt_sender_id: 'dlt_sender_id',
                dlt_text: 'Your OTP is <otp>',
                dtmf: 1
            })
                .then(response => {
                    assert.ok(response instanceof CreateVerifySessionResponse);
                    assert.equal(response.apiId, 'api-id-123');
                    assert.equal(response.sessionUuid, 'session-uuid-456');
                    assert.equal(response.message, 'Session initiated');
                    done();
                })
                .catch(done);
        });

        it('should create a verify session with no params', done => {
            const mockBody = {
                apiId: 'api-id-789',
                sessionUuid: 'session-uuid-101',
                message: 'Session initiated'
            };

            const mockClient = (method, url, params) => {
                return new Promise((resolve) => {
                    assert.equal(method, 'POST');
                    assert.equal(url, 'Verify/Session/');
                    resolve({ body: mockBody });
                });
            };

            const verifySessionInterface = new VerifySessionInterface(mockClient);

            verifySessionInterface.create()
                .then(response => {
                    assert.ok(response instanceof CreateVerifySessionResponse);
                    assert.equal(response.apiId, 'api-id-789');
                    assert.equal(response.sessionUuid, 'session-uuid-101');
                    done();
                })
                .catch(done);
        });
    });
});