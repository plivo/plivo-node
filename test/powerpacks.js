import assert from 'assert';
import sinon from 'sinon';
import {
  Client
} from '../lib/rest/client-test';
import {
  PlivoGenericResponse
} from '../lib/base.js';

let client = new Client('sampleid', 'sammpletoken', 'sampleproxy');

describe('PowerpackInterface', function () {
  it('Get Details of a Powerpack', function () {
    return client.powerpacks.get('5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46')
      .then(function (powerpack) {
        assert.equal(powerpack.uuid, '5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46')
      })
  });
  it('should create powerpack via interface', function () {
    return client.powerpacks.create("node sdk test")
      .then(function (powerpack) {
        assert.equal(powerpack.name, 'node sdk test')
      })
  });

  it('list powerpacks numbers via interface', function () {
    client.powerpacks.get("5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46").then(
        function (powerpack) {
          return powerpack.list_numbers()
        })
      .then(function (result) {
        assert.notEqual(result.length, 0)
      })
  });

  it('delete powerpacks via interface', function () {
    client.powerpacks.get("5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46").then(
        function (powerpack) {
          return powerpack.delete()
        })
      .then(function (result) {
        assert.notEqual(result.response, "success")
      })
  });
  it('list powerpacks numbers via interface', function () {
    return client.powerpacks.list()
      .then(function (powerpack) {
        assert.notEqual(powerpack.length, 0)
      })
  });

  it('add numbers to powerpack via interface', function () {
    client.powerpacks.get("5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46").then(
        function (powerpack) {
          return powerpack.add_number('14845733595')
        })
      .then(function (result) {
        assert.Equal(result.number, "14845733595")
      })
  });

  it('find numbers to powerpack via interface', function () {
    client.powerpacks.get("5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46").then(
        function (powerpack) {
          return powerpack.find_number('14845733595')
        })
      .then(function (result) {
        assert.Equal(result.number, "14845733595")
      })
  });

  it('find shortcode  via interface', function () {
    client.powerpacks.get("5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46").then(
        function (powerpack) {
          return powerpack.find_shortcode('4444444')
        })
      .then(function (result) {
        assert.Equal(result.shortcode, "4444444")
      })
  });
  it('list shortcode  via interface', function () {
    client.powerpacks.get("5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46").then(
        function (powerpack) {
          return powerpack.list_shortcode('4444444')
        })
      .then(function (result) {
        assert.notEqual(result.length, 0)
      })
  });
  it('list tollfree  via interface', function () {
    client.powerpacks.get("5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46").then(
        function (powerpack) {
          return powerpack.list_tollfree()
        })
      .then(function (result) {
        assert.notEqual(result.length, 0)
      })
  });
  it('find tollfree  via interface', function () {
    client.powerpacks.get("5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46").then(
        function (powerpack) {
          return powerpack.find_tollfree('18772209942')
        })
      .then(function (result) {
        assert.Equal(result.number, "18772209942")
      })
  });
  it('add tollfree to powerpack via interface', function () {
    client.powerpacks.get("5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46").then(
        function (powerpack) {
          return powerpack.add_tollfree('18772209942')
        })
      .then(function (result) {
        assert.Equal(result.number, "18772209942")
      })
  });
  it('remove tollfree via interface', function () {
    client.powerpacks.get("5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46").then(
        function (powerpack) {
          return powerpack.remove_tollfree("18772209942", true)
        })
      .then(function (result) {
        assert.notEqual(result.response, "success")
      })
  });
  
  it('remove shortcode via interface', function () {
    client.powerpacks.get("5ec4c8c9-cd74-42b5-9e41-0d7670d6bb46").then(
        function (powerpack) {
          return powerpack.remove_shortcode("444444")
        })
      .then(function (result) {
        assert.notEqual(result.response, "success")
      })
  });

});

