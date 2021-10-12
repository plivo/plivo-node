# Plivo Node.js library

[![Version](https://img.shields.io/npm/v/plivo.svg)](https://www.npmjs.org/package/plivo)
[![codecov](https://codecov.io/gh/plivo/plivo-node/branch/master/graph/badge.svg)](https://codecov.io/gh/plivo/plivo-node)
[![UnitTests](https://github.com/plivo/plivo-node/actions/workflows/unitTests.yml/badge.svg)](https://github.com/plivo/plivo-node/actions/workflows/unitTests.yml)

The Node.js SDK simplifies the integration of communications into your Node.js applications through the Plivo REST API. You will be able to use the SDK to make voice calls, send SMS, and generate Plivo XML to manage your call flows.

## Installation
Install the SDK using [npm](https://www.npmjs.com/package/plivo)

    $ npm install plivo

If you have the `0.4.1` version (a.k.a legacy) already installed, you may have to first uninstall it before installing the new version.

For features in beta, use the beta branch:

    $ npm install plivo@beta
    
## Getting started

### Authentication
To make the API requests, you need to create a `Client` and provide it with authentication credentials (which can be found at [https://console.plivo.com/dashboard/](https://console.plivo.com/dashboard/)).

We recommend that you store your credentials in the `PLIVO_AUTH_ID` and the `PLIVO_AUTH_TOKEN` environment variables, so as to avoid the possibility of accidentally committing them to source control. If you do this, you can initialise the client with no arguments and it will automatically fetch them from the environment variables:

```javascript
let plivo = require('plivo');
let client = new plivo.Client();
```
Alternatively, you can specifiy the authentication credentials while initializing the `Client`.

```javascript
let plivo = require('plivo');
let client = new plivo.Client('<auth_id>', '<auth_token>');
```

### The basics
The SDK uses consistent interfaces to create, retrieve, update, delete and list resources. The pattern followed is as follows:

```javascript
client.resources.create(name,params); // Create
client.resources.get(id); // Get
client.resources.update(params); // Update
client.resources.delete(id); // Delete
client.resources.list({limit:5,offset:0}); // List all resources, max 20 at a time
```

Also, using `client.resources.list()` would list the first 20 resources by default (which is the first page, with `limit` as 20, and `offset` as 0). To get more, you will have to use `limit` and `offset` to get the second page of resources.

## Examples

### Send a message

```javascript
let plivo = require('plivo');
let client = new plivo.Client();

client.messages.create({
    src: '+14156667778',
    dst: '14156667777',
    text: 'Hello, this is a sample text from Plivo',
}).then(function(response) {
    console.log(response)
});
```

### Make a call

```javascript
let plivo = require('plivo');
let client = new plivo.Client();

client.calls.create(
  '+14156667778',
  '+14156667777',
  'http://answer.url'
).then(function(response) {
  console.log(response)
});
```

### Lookup a number

```javascript
let plivo = require('plivo');
let client = new plivo.Client('<auth_id>', '<auth_token>');

client.lookup.get('<number-goes-here>')
.then(function(response) {
    console.log(response);
});
```

### Generate Plivo XML

```javascript
let plivo = require('plivo');
let response = new plivo.Response();
let speak_body = "Hello, world!";

response.addSpeak(speak_body);
console.log(response.toXML());
```

This generates the following XML:

```xml
<Response>
  <Speak>Hello, world!</Speak>
</Response>
```

### Run a PHLO

```javascript
let plivo = require('plivo');
var PhloClient = plivo.PhloClient;
var phloClient = phlo = null;

phloClient = new PhloClient('<auth-id>', '<auth-token>');
phloClient.phlo('<phlo_id>').run().then(function (result) {
console.log('Phlo run result', result);
});
```

### More examples
More examples are available [here](https://github.com/plivo/plivo-examples-node). Also refer to the [guides for configuring the Express server to run various scenarios](https://www.plivo.com/docs/sms/quickstart/node-expressjs/) & use it to test out your integration in under 5 minutes.

## Reporting issues
Report any feedback or problems with this version by [opening an issue on Github](https://github.com/plivo/plivo-node/issues).
