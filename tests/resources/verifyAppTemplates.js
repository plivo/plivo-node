import assert from 'assert';
import sinon from 'sinon';
import { VerifyAppTemplateInterface, VerifyAppTemplatesListResponse, VerifyTemplate } from '../../lib/resources/verifyAppTemplates.js';

describe('VerifyAppTemplates', function () {
    describe('list', function () {
        it('should return a VerifyAppTemplatesListResponse on success', function () {
            let mockResponse = {
                body: {
                    apiId: 'test-api-id',
                    templates: [
                        {
                            templateUuid: 'tmpl-uuid-1',
                            text: 'Your OTP is {{otp}}',
                            friendlyName: 'Default OTP Template',
                            locale: 'en'
                        },
                        {
                            templateUuid: 'tmpl-uuid-2',
                            text: 'Ihr Code ist {{otp}}',
                            friendlyName: 'German OTP Template',
                            locale: 'de'
                        }
                    ]
                }
            };

            let client = sinon.stub().resolves(mockResponse);
            let iface = new VerifyAppTemplateInterface(client);

            return iface.list().then(response => {
                assert(client.calledOnce);
                assert.equal(client.args[0][0], 'GET');
                assert.equal(client.args[0][1], 'Verify/App/templates/');
                assert(response instanceof VerifyAppTemplatesListResponse);
                assert.equal(response.apiId, 'test-api-id');
                assert.equal(response.templates.length, 2);
                assert(response.templates[0] instanceof VerifyTemplate);
                assert.equal(response.templates[0].templateUuid, 'tmpl-uuid-1');
                assert.equal(response.templates[0].text, 'Your OTP is {{otp}}');
                assert.equal(response.templates[0].friendlyName, 'Default OTP Template');
                assert.equal(response.templates[0].locale, 'en');
                assert.equal(response.templates[1].templateUuid, 'tmpl-uuid-2');
                assert.equal(response.templates[1].locale, 'de');
            });
        });

        it('should handle empty templates array', function () {
            let mockResponse = {
                body: {
                    apiId: 'test-api-id-empty',
                    templates: []
                }
            };

            let client = sinon.stub().resolves(mockResponse);
            let iface = new VerifyAppTemplateInterface(client);

            return iface.list().then(response => {
                assert(response instanceof VerifyAppTemplatesListResponse);
                assert.equal(response.apiId, 'test-api-id-empty');
                assert.equal(response.templates.length, 0);
            });
        });

        it('should reject on client error', function () {
            let client = sinon.stub().rejects(new Error('Network error'));
            let iface = new VerifyAppTemplateInterface(client);

            return iface.list().then(() => {
                assert.fail('Expected rejection');
            }).catch(error => {
                assert.equal(error.message, 'Network error');
            });
        });

        it('should pass optional params to client', function () {
            let mockResponse = {
                body: {
                    apiId: 'test-api-id',
                    templates: []
                }
            };

            let client = sinon.stub().resolves(mockResponse);
            let iface = new VerifyAppTemplateInterface(client);
            let params = { locale: 'en' };

            return iface.list(params).then(() => {
                assert.deepEqual(client.args[0][2], { locale: 'en' });
            });
        });
    });
});