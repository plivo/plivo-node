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
        endpoint.get('/v1/Account/0123456789/Call/')
                .reply(200, JSON.stringify({}))
                .get('/v1/Account/0123456789/Call/?limit=5')
                .reply(200, JSON.stringify({}))
                .get('/v1/Account/0123456789/Call/xxxxxxxxxxxxxxxxx/')
                .reply(200, JSON.stringify({}))
                .get('/v1/Account/0123456789/Call/yyyyyyyyyyyyyyyyy/')
                .reply(404, JSON.stringify({}))
                .post('/v1/Account/0123456789/Call/', "{\"answer_url\":\"http://test.com\",\"to\":\"1234567890\",\"from\":\"1234567890\"}")
                .reply(201, JSON.stringify({}))
                .post('/v1/Account/0123456789/Call/', "{\"answer_url\":\"http://test.com\"}")
                .reply(401, JSON.stringify({}))
                .delete('/v1/Account/0123456789/Call/')
                .reply(204, " ");

        it('should treat params as callback when params are not provided and optional is true.', function(done) {
            rest.get_cdrs(function(status, response) {
                assert.equal(200, status);
                assert.equal('object', typeof response);

                done();
            });
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
        it('test call not found 404.', function() {
            rest.get_cdr({
                call_uuid: 'yyyyyyyyyyyyyyyyy',
            }, function(status, response) {
                assert.equal(404, status);
                assert.equal('object', typeof response);
                done();
            });;
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

        it('fail sending POST request. 401 bad request', function(done) {
            rest.make_call({
                answer_url: 'http://test.com',
            }, function(status, response) {
                assert.equal(401, status);
                assert.equal('object', typeof response);

                done();
            });
        });

        it('should successfully send DELETE requests.', function(done) {
            rest.hangup_all_calls(function(status, response) {
                assert.equal(204, status);
                assert.equal('string', typeof response);
                assert.equal(' ', response);

                done();
            });
        });

        it('should keep credentials unique per client.  Clients should not share credentials', function () {
            var restEndpoint1 = plivo.RestAPI({
                authId: '0123456789',
                authToken: '0123456789abc',
            });

            var restEndpoint2 = plivo.RestAPI({
                authId: '987654321',
                authToken: '0987654321abc',
            });
            assert.notEqual(restEndpoint1.options.authId, restEndpoint2.options.authId)
            assert.notEqual(restEndpoint1.options.authToken, restEndpoint2.options.authToken)
        });
    });

	describe('create_signature()', function() {
		var rest = plivo.RestAPI({
			authId: '0123456789',
			authToken: '0123456789abc',
		});

		it('should match signature of plain text', function(done) {
			var params = { 'ascii': ' !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~' };
			var test_signature = rest.create_signature('https://' + rest.options.host, params);
		
			assert.equal('pNTHTayG6CHS3s2c7AbsJUYIrno=', test_signature);

			done();
	
		});

		it('should match signature of utf-8 text', function(done) {
			var params = { 'utf': '\xC4\xA4\xC4\x98\xC4\xBD\xC4\xBF\xC5\x8C\xC2\xA0\xE1\xBA\x80\xCE\xB8\xC5\x94\xC4\xBD\xE1\xB8\x8A\xE2\x80\xA6\xC2\xA9\xF0\x9D\x8C\x86\xE2\x98\x83\xF0\x9F\x98\x80\xF0\x9F\x98\x81\xF0\x9F\x98\x82\xF0\x9F\x98\x83\xF0\x9F\x98\x84\xF0\x9F\x98\x85\xF0\x9F\x98\x86\xF0\x9F\x98\x87' };
			var test_signature = rest.create_signature('https://' + rest.options.host, params);
	
			assert.equal('0gQVBqlj63pjoVO6dHmGJsEajS4=', test_signature);

			done();
		
		});
	});

});
