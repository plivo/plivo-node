var assert = require('assert');
var nock = require('nock');
var plivo = require('../lib/plivo');

describe('RestAPI', function() {
    it('should throw error when config is not provided.', function() {
        assert.throws(
            function() {
                var r = new plivo.RestAPI();
            }
        );
    });

    it('should throw error when config is provided but is not an object.', function() {
        assert.throws(
            function() {
                var r = new plivo.RestAPI();
            }
        );
    });

    it('should throw error when config is provided but authID and authToken are not provided.', function() {
        assert.throws(
            function() {
                var r = new plivo.RestAPI({});
            }
        );
    });

    it('should throw error when config is provided but authID is not provided.', function() {
        assert.throws(
            function() {
                var r = new plivo.RestAPI({
                    authToken: 'some token',
                });
            }
        );
    });

    it('should throw error when config is provided but authToken is not provided.', function() {
        assert.throws(
            function() {
                var r = new plivo.RestAPI({
                    authId: 'some id',
                });
            }
        );
    });

    it('should return an object when complete config is provided.', function() {
        assert.equal('object', typeof plivo.RestAPI({ authId: '0123456789', authToken: '0123456789abc' }));
    });

    describe('request()', function() {
        var rest = plivo.RestAPI({
            authId: '0123456789',
            authToken: '0123456789abc',
        });

        var endpoint = nock('https://' + rest.options.host + ':443');
        endpoint.get('/v1/Account/0123456789/Call/?')
                .reply(200, JSON.stringify({}))
                .get('/v1/Account/0123456789/Call/?limit=5')
                .reply(200, JSON.stringify({}))
                .get('/v1/Account/0123456789/Call/xxxxxxxxxxxxxxxxx/?')
                .reply(200, JSON.stringify({}))
                .post('/v1/Account/0123456789/Call/', "{\"answer_url\":\"http://test.com\",\"to\":\"1234567890\",\"from\":\"1234567890\"}")
                .reply(201, JSON.stringify({}))
                .delete('/v1/Account/0123456789/Call/')
                .reply(204, "");

        it('should treat params as callback when params are not provided and optional is true.', function(done) {
            rest.get_cdrs(function(status, response) {
                assert.equal(200, status);
                assert.equal('object', typeof response);

                done();
            });
        });

        it('should throw error when API params are not provided for POST requests.', function() {
            assert.throws(
                function () {
                    rest.make_call({}, function(status, response) { console.log(status); });
                }
            );
        });

        it('should continue when callback is not provided.', function() {
            assert.doesNotThrow(
                function () {
                    rest.get_cdr({
                        call_uuid: 'xxxxxxxxxxxxxxxxx',
                    });
                }
            );
        });

        it('should successfully send GET requests with parameters.', function(done) {
            rest.get_cdrs({
                limit: 5,
            }, function(status, response) {
                // if 200 is returned, then nock successfully found the right url
                assert.equal(200, status);
                assert.equal('object', typeof response);

                done();
            });
        });

        it('should successfully send POST requests.', function(done) {
            rest.make_call({
                answer_url: 'http://test.com',
                to: '1234567890',
                from: '1234567890',
            }, function(status, response) {
                assert.equal(201, status);
                assert.equal('object', typeof response);

                done();
            });
        });

        it('should successfully send DELETE requests.', function(done) {
            rest.hangup_all_calls(function(status, response) {
                assert.equal(204, status);
                assert.equal('string', typeof response);
                assert.equal('', response);

                done();
            });
        });
    });
});
