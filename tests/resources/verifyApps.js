import {
    assert
} from 'chai';
import sinon from 'sinon';
import {
    VerifyAppInterface,
    VerifyAppCreateResponse,
    VerifyAppGetResponse,
    VerifyAppListResponse,
    VerifyAppUpdateResponse,
    VerifyAppDeleteResponse
} from '../../lib/resources/verifyApps.js';

let client = function() {};

describe('VerifyApps', function() {

    describe('create', function() {
        it('should create a verify app successfully', function() {
            let stub = sinon.stub().resolves({
                body: {
                    apiId: 'test-api-id',
                    appUuid: 'test-app-uuid',
                    message: 'Verify app created successfully'
                }
            });

            client = stub;
            let verifyApps = new VerifyAppInterface(client);

            return verifyApps.create('My OTP App', {
                otp_length: 6,
                sms_channel: true
            }).then(function(response) {
                assert.instanceOf(response, VerifyAppCreateResponse);
                assert.equal(response.apiId, 'test-api-id');
                assert.equal(response.appUuid, 'test-app-uuid');
                assert.equal(response.message, 'Verify app created successfully');
            });
        });

        it('should return error when name is missing', function() {
            let stub = sinon.stub().resolves({
                body: {}
            });

            client = stub;
            let verifyApps = new VerifyAppInterface(client);

            let result = verifyApps.create(undefined);
            assert.instanceOf(result, Promise);
            return result.catch(function(err) {
                assert.isDefined(err);
            });
        });
    });

    describe('list', function() {
        it('should list verify apps successfully', function() {
            let stub = sinon.stub().resolves({
                body: {
                    apiId: 'test-api-id',
                    meta: {
                        limit: 20,
                        offset: 0,
                        totalCount: 1,
                        next: null,
                        previous: null
                    },
                    verifyApps: [
                        {
                            appUuid: 'test-app-uuid',
                            name: 'My OTP App'
                        }
                    ]
                }
            });

            client = stub;
            let verifyApps = new VerifyAppInterface(client);

            return verifyApps.list({ limit: 20, offset: 0 }).then(function(response) {
                assert.instanceOf(response, VerifyAppListResponse);
                assert.equal(response.apiId, 'test-api-id');
                assert.isArray(response.verifyApps);
            });
        });
    });

    describe('get', function() {
        it('should get a verify app successfully', function() {
            let stub = sinon.stub().resolves({
                body: {
                    apiId: 'test-api-id',
                    verifyApp: {
                        appUuid: 'test-app-uuid',
                        name: 'My OTP App'
                    },
                    verifyWhatsapp: null
                }
            });

            client = stub;
            let verifyApps = new VerifyAppInterface(client);

            return verifyApps.get('test-app-uuid').then(function(response) {
                assert.instanceOf(response, VerifyAppGetResponse);
                assert.equal(response.apiId, 'test-api-id');
                assert.isObject(response.verifyApp);
            });
        });

        it('should return error when appUuid is missing', function() {
            let stub = sinon.stub().resolves({
                body: {}
            });

            client = stub;
            let verifyApps = new VerifyAppInterface(client);

            let result = verifyApps.get(undefined);
            assert.instanceOf(result, Promise);
            return result.catch(function(err) {
                assert.isDefined(err);
            });
        });
    });

    describe('update', function() {
        it('should update a verify app successfully', function() {
            let stub = sinon.stub().resolves({
                body: {
                    apiId: 'test-api-id',
                    appUuid: 'test-app-uuid',
                    message: 'Verify app updated successfully'
                }
            });

            client = stub;
            let verifyApps = new VerifyAppInterface(client);

            return verifyApps.update('test-app-uuid', {
                name: 'Updated OTP App',
                otp_length: 8
            }).then(function(response) {
                assert.instanceOf(response, VerifyAppUpdateResponse);
                assert.equal(response.apiId, 'test-api-id');
                assert.equal(response.appUuid, 'test-app-uuid');
                assert.equal(response.message, 'Verify app updated successfully');
            });
        });

        it('should return error when appUuid is missing', function() {
            let stub = sinon.stub().resolves({
                body: {}
            });

            client = stub;
            let verifyApps = new VerifyAppInterface(client);

            let result = verifyApps.update(undefined, {});
            assert.instanceOf(result, Promise);
            return result.catch(function(err) {
                assert.isDefined(err);
            });
        });
    });

    describe('delete', function() {
        it('should delete a verify app successfully', function() {
            let stub = sinon.stub().resolves({
                body: {
                    apiId: 'test-api-id',
                    appUuid: 'test-app-uuid',
                    message: 'Verify app deleted successfully'
                }
            });

            client = stub;
            let verifyApps = new VerifyAppInterface(client);

            return verifyApps.delete('test-app-uuid').then(function(response) {
                assert.instanceOf(response, VerifyAppDeleteResponse);
                assert.equal(response.apiId, 'test-api-id');
                assert.equal(response.appUuid, 'test-app-uuid');
                assert.equal(response.message, 'Verify app deleted successfully');
            });
        });

        it('should return error when appUuid is missing', function() {
            let stub = sinon.stub().resolves({
                body: {}
            });

            client = stub;
            let verifyApps = new VerifyAppInterface(client);

            let result = verifyApps.delete(undefined);
            assert.instanceOf(result, Promise);
            return result.catch(function(err) {
                assert.isDefined(err);
            });
        });
    });
});