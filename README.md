# plivo-node
The Node.js SDK makes it simpler to integrate communications into your Node.js applications using the Plivo REST API. Using the SDK, you will be able to make voice calls, send SMS and generate Plivo XML to control your call flows.

## Installation
Install the SDK using [npm](https://www.npmjs.com/package/plivo)

    $ npm install plivo

If you have the `0.4.1` version (a.k.a legacy) already installed, you may have to first uninstall it before installing the new version.

## Getting started

### Authentication
To make the API requests, you need to create a `Client` and provide it with authentication credentials (which can be found at [https://manage.plivo.com/dashboard/](https://manage.plivo.com/dashboard/)).

We recommend that you store your credentials in the `PLIVO_AUTH_ID` and the `PLIVO_AUTH_TOKEN` environment variables, so as to avoid the possibility of accidentally committing them to source control. If you do this, you can initialise the client with no arguments and it will automatically fetch them from the environment variables:

```javascript
let plivo = require('plivo');
let client = new plivo.Client();
```
Alternatively, you can specifiy the authentication credentials while initializing the `Client`.

```javascript
let plivo = require('plivo');
let client = new plivo.Client('your_auth_id', 'your_auth_token');
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

client.messages.create(
  'your_source_number',
  'your_destination_number',
  'Hello, world!'
).then(function(message_created) {
  console.log(message_created)
});

```

### Make a call

```javascript
let plivo = require('plivo');
let client = new plivo.Client();

client.calls.create(
  'your_source_number',
  'your_destination_number',
  'http://answer.url'
).then(function(call_created) {
  console.log(call_created)
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

### More examples
Refer to the [Plivo API Reference](https://api-reference.plivo.com/latest/node/introduction/overview) for more examples. Also refer to the [guide to setting up dev environment](https://developers.plivo.com/getting-started/setting-up-dev-environment/) on [Plivo Developers Portal](https://developers.plivo.com) to setup an Express server & use it to test out your integration in under 5 minutes.

## Reporting issues
Report any feedback or problems with this version by [opening an issue on Github](https://github.com/plivo/plivo-node/issues).
