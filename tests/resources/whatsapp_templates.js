import {
    assert
} from 'chai';
import sinon from 'sinon';
import {
    WhatsAppTemplateInterface,
    WhatsAppTemplateCreateResponse,
    WhatsAppTemplateUpdateResponse,
    WhatsAppTemplateGetResponse,
    WhatsAppTemplateListResponse
} from '../../lib/resources/whatsapp_templates.js';

describe('WhatsAppTemplateInterface', function () {
    let client;
    let whatsappTemplates;

    beforeEach(function () {
        client = sinon.stub();
        whatsappTemplates = new WhatsAppTemplateInterface(client);
    });

    describe('create', function () {
        it('should reject if waba_id is missing', function () {
            const result = whatsappTemplates.create('');
            return result.then(
                () => { assert.fail('Expected error'); },
                (err) => { assert.ok(err); }
            );
        });

        it('should call POST with correct path and params', function () {
            client.returns(Promise.resolve({
                body: {
                    apiId: 'test-api-id',
                    templateId: 'tmpl-123',
                    templateName: 'sample_template',
                    templateStatus: 'PENDING',
                    templateCategory: 'MARKETING',
                    templateLanguage: 'en_US',
                    status: 'success',
                    message: 'Template created'
                }
            }));

            const params = {
                name: 'sample_template',
                category: 'MARKETING',
                language: 'en_US',
                components: [],
                allow_category_change: false
            };

            return whatsappTemplates.create('waba-123', params).then(function (response) {
                assert.instanceOf(response, WhatsAppTemplateCreateResponse);
                assert.equal(response.templateId, 'tmpl-123');
                assert.equal(response.templateName, 'sample_template');
                assert.isTrue(client.calledWith('POST', 'WhatsApp/Template/waba-123/', params));
            });
        });
    });

    describe('update', function () {
        it('should reject if waba_id is missing', function () {
            const result = whatsappTemplates.update('', 'tmpl-123');
            return result.then(
                () => { assert.fail('Expected error'); },
                (err) => { assert.ok(err); }
            );
        });

        it('should reject if template_id is missing', function () {
            const result = whatsappTemplates.update('waba-123', '');
            return result.then(
                () => { assert.fail('Expected error'); },
                (err) => { assert.ok(err); }
            );
        });

        it('should call POST with correct path and params', function () {
            client.returns(Promise.resolve({
                body: {
                    apiId: 'test-api-id',
                    templateId: 'tmpl-123',
                    templateName: 'sample_template',
                    templateStatus: 'PENDING',
                    templateCategory: 'UTILITY',
                    templateLanguage: 'en_US',
                    status: 'success',
                    message: 'Template updated'
                }
            }));

            const params = {
                name: 'sample_template',
                category: 'UTILITY',
                language: 'en_US',
                components: [],
                allow_category_change: true
            };

            return whatsappTemplates.update('waba-123', 'tmpl-123', params).then(function (response) {
                assert.instanceOf(response, WhatsAppTemplateUpdateResponse);
                assert.equal(response.templateId, 'tmpl-123');
                assert.isTrue(client.calledWith('POST', 'WhatsApp/Template/waba-123/tmpl-123/', params));
            });
        });
    });

    describe('get', function () {
        it('should reject if waba_id is missing', function () {
            const result = whatsappTemplates.get('', 'tmpl-123');
            return result.then(
                () => { assert.fail('Expected error'); },
                (err) => { assert.ok(err); }
            );
        });

        it('should reject if template_id is missing', function () {
            const result = whatsappTemplates.get('waba-123', '');
            return result.then(
                () => { assert.fail('Expected error'); },
                (err) => { assert.ok(err); }
            );
        });

        it('should call GET with correct path', function () {
            client.returns(Promise.resolve({
                body: {
                    apiId: 'test-api-id',
                    templateId: 'tmpl-123',
                    name: 'sample_template',
                    category: 'MARKETING',
                    language: 'en_US',
                    status: 'APPROVED',
                    components: [],
                    qualityScore: {},
                    rejectedReason: null,
                    message: 'success'
                }
            }));

            return whatsappTemplates.get('waba-123', 'tmpl-123').then(function (response) {
                assert.instanceOf(response, WhatsAppTemplateGetResponse);
                assert.equal(response.templateId, 'tmpl-123');
                assert.equal(response.name, 'sample_template');
                assert.isTrue(client.calledWith('GET', 'WhatsApp/Template/waba-123/tmpl-123/'));
            });
        });
    });

    describe('list', function () {
        it('should reject if waba_id is missing', function () {
            const result = whatsappTemplates.list('');
            return result.then(
                () => { assert.fail('Expected error'); },
                (err) => { assert.ok(err); }
            );
        });

        it('should call GET with correct path and params', function () {
            client.returns(Promise.resolve({
                body: {
                    apiId: 'test-api-id',
                    objects: [],
                    meta: { limit: 20, offset: 0, totalCount: 0 },
                    status: 'success',
                    message: 'Listed'
                }
            }));

            const params = { template_name: 'sample', limit: 20, offset: 0 };

            return whatsappTemplates.list('waba-123', params).then(function (response) {
                assert.instanceOf(response, WhatsAppTemplateListResponse);
                assert.isArray(response.objects);
                assert.isTrue(client.calledWith('GET', 'WhatsApp/Template/waba-123/', params));
            });
        });
    });

    describe('delete', function () {
        it('should reject if waba_id is missing', function () {
            const result = whatsappTemplates.delete('', 'tmpl-123', 'sample_template');
            return result.then(
                () => { assert.fail('Expected error'); },
                (err) => { assert.ok(err); }
            );
        });

        it('should reject if template_id is missing', function () {
            const result = whatsappTemplates.delete('waba-123', '', 'sample_template');
            return result.then(
                () => { assert.fail('Expected error'); },
                (err) => { assert.ok(err); }
            );
        });

        it('should reject if name is missing', function () {
            const result = whatsappTemplates.delete('waba-123', 'tmpl-123', '');
            return result.then(
                () => { assert.fail('Expected error'); },
                (err) => { assert.ok(err); }
            );
        });

        it('should call DELETE with correct path and name', function () {
            client.returns(Promise.resolve({}));

            return whatsappTemplates.delete('waba-123', 'tmpl-123', 'sample_template').then(function (response) {
                assert.isTrue(response);
                assert.isTrue(client.calledWith('DELETE', 'WhatsApp/Template/waba-123/tmpl-123/', {
                    name: 'sample_template'
                }));
            });
        });
    });
});