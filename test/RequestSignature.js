var assert = require('assert');
var url = require('url');
var request = require('request');
var express = require('express');
var plivo = require('../lib/plivo');

var TOKEN = 'MjFmMmJiODVlOGRiZDIyNzdhMTdhYjMw12345678';
var endPoint = 'http://localhost:13372/sms';

var data = {
  To : '11234567896',
  From : '11234567896',
  Type : 'sms',
  MessageUUID : '4ee368ae-25ed-11e3-a36e-xxxxxxxxxxxx',
  Text : 'Hello World'
};

var validHeader = '8Qk9ZxsfFhq8EhsADKfw6NtFFY8=';

describe('Request Signature',function(){

  it('plivo should expose express middleware',function(){
    var api = plivo.RestAPI({ authId: '123456789', authToken: TOKEN});

    assert.equal(typeof api.middleware,'function')
    assert.equal(typeof api.create_signature,'function')
  })

  it('it send 401 when auth header is missing',function(done){
    createServer(function(app){
      request(endPoint, function (error, response, body) {
        app.close();
        assert.equal(error,null)
        assert.equal(response.statusCode,401)
        done();
      })
    })
  })

  it('it send 403 when auth header is invalid on POST request',function(done){
    createServer(function(app){
      request.post({
        url : endPoint,
        headers : {
          'x-plivo-signature': 'xxxxxxxxxxxxxxxxxxxxxxxxxxx='
        }
      }, function (error, response, body) {
        app.close();
        assert.equal(error,null)
        assert.equal(response.statusCode,403)
        done();
      }).form(data);
    })
  })

  it('it send 403 when auth header is invalid on GET request',function(done){
    var u = url.parse(endPoint);
    u.query = data;

    createServer(function(app){
      request({
        url : url.format(u),
        headers : {
          'x-plivo-signature': 'xxxxxxxxxxxxxxxxxxxxxxxxxxx='
        }
      }, function (error, response, body) {
        app.close();
        assert.equal(error,null)
        assert.equal(response.statusCode,403)
        
        done();
      })
    })
  })

  it('it validate proper POST request',function(done){
    createServer(function(app){
      request.post({
        url : endPoint,
        headers : {
          'x-plivo-signature': validHeader
        }
      }, function (error, response, body) {
        app.close();
        assert.equal(error,null)
        assert.equal(response.statusCode,200)
        done();
      }).form(data);
    })
  })

  it('it validate proper GET request',function(done){
    var u = url.parse(endPoint);
    u.query = data;

    createServer(function(app){
      request({
        url : url.format(u),
        headers : {
          'x-plivo-signature': validHeader
        }
      }, function (error, response, body) {
        app.close();
        assert.equal(error,null)
        assert.equal(response.statusCode,200)
        done();
      });
    })
  })

})

function createServer(callback){
  var app = express();

  var api = plivo.RestAPI({ authId: '123456789', authToken: TOKEN});

  app.use(express.bodyParser());
  app.use(api.middleware())
  app.use(app.router);

  function onSms(req,res){
    var body = 'It Worked!';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
  }

  app.get('/sms',onSms);
  app.post('/sms',onSms);

  var server = app.listen(13372,function(){
    callback(server);
  });
}