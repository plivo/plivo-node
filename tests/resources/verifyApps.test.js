import { expect } from 'chai';
import sinon from 'sinon';
import { VerifyAppInterface, VerifyAppCreateResponse, VerifyAppGetResponse, VerifyAppListResponse, VerifyAppListTemplatesResponse, VerifyAppUpdateResponse } from '../../lib/resources/verifyApps.js';

describe('VerifyAppInterface', () => {
    let client;
    let verifyApps;

    beforeEach(() => {
        client = sinon.stub();
        verifyApps = new VerifyAppInterface(client);
    });

    describe('create', () => {
        it('should reject when name is not provided', () => {
            const result = verifyApps.create();
            expect(result).to.be.an('object');
        });

        it('should POST to Verify/App/ with name and optional params', done => {
            client.resolves({
                body: {
                    apiId: 'test-api-id',
                    appUuid: 'test-app-uuid',
                    message: 'Verify app created'
                }
            });

            verifyApps.create('My App', { brand_name: 'Brand', number_pool: 'pool-1' })
                .then(response => {
                    expect(client.calledWith('POST', 'Verify/App/', {
                        name: 'My App',
                        brand_name: 'Brand',
                        number_pool: 'pool-1'
                    })).to.be.true;
                    expect(response).to.be.instanceof(VerifyAppCreateResponse);
                    expect(response.appUuid).to.equal('test-app-uuid');
                    done();
                })
                .catch(done);
        });
    });

    describe('list', () => {
        it('should GET Verify/App/ with params', done => {
            client.resolves({
                body: {
                    apiId: 'test-api-id',
                    verifyApps: [],
                    meta: { totalCount: 0, limit: 20, offset: 0 }
                }
            });

            verifyApps.list({ limit: 20, offset: 0 })
                .then(response => {
                    expect(client.calledWith('GET', 'Verify/App/', { limit: 20, offset: 0 })).to.be.true;
                    expect(response).to.be.instanceof(VerifyAppListResponse);
                    done();
                })
                .catch(done);
        });
    });

    describe('listTemplates', () => {
        it('should GET Verify/App/templates/', done => {
            client.resolves({
                body: {
                    apiId: 'test-api-id',
                    templates: []
                }
            });

            verifyApps.listTemplates()
                .then(response => {
                    expect(client.calledWith('GET', 'Verify/App/templates/', {})).to.be.true;
                    expect(response).to.be.instanceof(VerifyAppListTemplatesResponse);
                    done();
                })
                .catch(done);
        });
    });

    describe('get', () => {
        it('should reject when appUuid is not provided', () => {
            const result = verifyApps.get();
            expect(result).to.be.an('object');
        });

        it('should GET Verify/App/{appUuid}/', done => {
            client.resolves({
                body: {
                    apiId: 'test-api-id',
                    verifyApp: { appUuid: 'test-app-uuid', name: 'My App' },
                    verifyWhatsapp: null
                }
            });

            verifyApps.get('test-app-uuid')
                .then(response => {
                    expect(client.calledWith('GET', 'Verify/App/test-app-uuid/', {})).to.be.true;
                    expect(response).to.be.instanceof(VerifyAppGetResponse);
                    done();
                })
                .catch(done);
        });
    });

    describe('update', () => {
        it('should reject when appUuid is not provided', () => {
            const result = verifyApps.update();
            expect(result).to.be.an('object');
        });

        it('should POST to Verify/App/{appUuid}/ with params', done => {
            client.resolves({
                body: {
                    apiId: 'test-api-id',
                    appUuid: 'test-app-uuid',
                    message: 'Verify app updated'
                }
            });

            verifyApps.update('test-app-uuid', { name: 'Updated App' })
                .then(response => {
                    expect(client.calledWith('POST', 'Verify/App/test-app-uuid/', { name: 'Updated App' })).to.be.true;
                    expect(response).to.be.instanceof(VerifyAppUpdateResponse);
                    expect(response.appUuid).to.equal('test-app-uuid');
                    done();
                })
                .catch(done);
        });
    });

    describe('delete', () => {
        it('should reject when appUuid is not provided', () => {
            const result = verifyApps.delete();
            expect(result).to.be.an('object');
        });

        it('should DELETE Verify/App/{appUuid}/', done => {
            client.resolves({});

            verifyApps.delete('test-app-uuid')
                .then(response => {
                    expect(client.calledWith('DELETE', 'Verify/App/test-app-uuid/', {})).to.be.true;
                    expect(response).to.be.true;
                    done();
                })
                .catch(done);
        });
    });
});