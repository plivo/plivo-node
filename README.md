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

## WhatsApp Messaging
Plivo's WhatsApp API allows you to send different types of messages over WhatsApp, including templated messages, free form messages and interactive messages. Below are some examples on how to use the Plivo Go SDK to send these types of messages.

### Templated Messages
Templated messages allow you to send pre-approved messages to customers. These messages can include placeholders for dynamic content.

Example:
```javascript
var plivo = require('plivo');

var client = new plivo.Client('<auth_id>', '<auth_token>');

const template = {
    name: 'sample_purchase_feedback',
    language: 'en_US',
    components: [
        {
            type: 'header',
            parameters: [
                {
                    type: 'media',
                    media: 'https://plivo.com/s3/img1.jpg'
                }
            ]
        },
        {
            type: 'body',
            parameters: [
                {
                    type: 'text',
                    text: 'Water Purifier'
                }
            ]
        }
    ]
};

client.messages.create({
    src: '+14156667778',
    dst: '+14156667777',
    type: 'whatsapp',
    template: template
})
.then(function(response) {
    console.log(response);
});

```

### Free Form Messages
Free form messages allow you to send custom messages to your customers. These messages can be sent during an active conversation between the business and the customer.

Example:
```javascript
let plivo = require('plivo');

let client = new plivo.Client('<auth_id>', '<auth_token>');

client.messages.create({
    src: '+14156667778',
    dst: '+14156667777',
    text: 'Hello, how are you doing today?',
    type: 'whatsapp'
})
.then(function(response) {
    console.log(response);
});
```

### Interactive Messages
Interactive messages allow you to engage with customers in a more interactive way, such as sending quick replies, lists, or call-to-action buttons.

#### Quick Reply Buttons
Quick reply buttons allow customers to quickly respond to your message with predefined options.

Example:
```javascript
let plivo = require('plivo');

let client = new plivo.Client('<auth_id>', '<auth_token>');

const interactive = {
    type: 'button',
    header: {
        type: 'media',
        media: 'https://media.geeksforgeeks.org/wp-content/uploads/20190712220639/ybearoutput-300x225.png'
    },
    body: {
        text: 'Make your selection'
    },
    action: {
        buttons: [
            {
                title: 'Click here',
                id: 'bt1j1k2j'
            },
            {
                title: 'Know More',
                id: 'bt1j1k2jkjk'
            },
            {
                title: 'Request Callback',
                id: 'bt1j1kfd2jkjk'
            }
        ]
    }
};

client.messages.create({
    src: '+14156667778',
    dst: '+14156667777',
    type: 'whatsapp',
    interactive: interactive
})
.then(function(response) {
    console.log(response);
});
```

#### Interactive Lists
Interactive lists allow you to present customers with a list of options.

Example:
```javascript
let plivo = require('plivo');

let client = new plivo.Client('<auth_id>', '<auth_token>');

const interactive = {
    type: 'list',
    header: {
        type: 'text',
        text: 'Welcome to Plivo'
    },
    body: {
        text: 'You can review the list of rewards we offer'
    },
    footer: {
        text: 'Yours Truly'
    },
    action: {
        buttons: [
            {
                title: 'Click here'
            }
        ],
        sections: [
            {
                title: 'SECTION_1_TITLE',
                rows: [
                    {
                        id: 'SECTION_1_ROW_1_ID',
                        title: 'SECTION_1_ROW_1_TITLE',
                        description: 'SECTION_1_ROW_1_DESCRIPTION'
                    },
                    {
                        id: 'SECTION_1_ROW_2_ID',
                        title: 'SECTION_1_ROW_2_TITLE',
                        description: 'SECTION_1_ROW_2_DESCRIPTION'
                    }
                ]
            },
            {
                title: 'SECTION_2_TITLE',
                rows: [
                    {
                        id: 'SECTION_2_ROW_1_ID',
                        title: 'SECTION_2_ROW_1_TITLE',
                        description: 'SECTION_2_ROW_1_DESCRIPTION'
                    },
                    {
                        id: 'SECTION_2_ROW_2_ID',
                        title: 'SECTION_2_ROW_2_TITLE',
                        description: 'SECTION_2_ROW_2_DESCRIPTION'
                    }
                ]
            }
        ]
    }
};

client.messages.create({
    src: '+14156667778',
    dst: '+14156667777',
    type: 'whatsapp',
    interactive: interactive
})
.then(function(response) {
    console.log(response);
});
```

#### Interactive CTA URLs
CTA URL messages allow you to send links and call-to-action buttons.

Example:
```javascript
let plivo = require('plivo');

let client = new plivo.Client('<auth_id>', '<auth_token>');

const interactive = {
    type: 'cta_url',
    header: {
        type: 'media',
        media: 'https://xyz.com/img.jpg'
    },
    body: {
        text: 'Know More'
    },
    footer: {
        text: 'Plivo'
    },
    action: {
        buttons: [
            {
                title: 'Click here',
                cta_url: 'https://plivo.com'
            }
        ]
    }
};

client.messages.create({
    src: '+14156667778',
    dst: '+14156667777',
    type: 'whatsapp',
    interactive: interactive
})
.then(function(response) {
    console.log(response);
});
```

### More examples
More examples are available [here](https://github.com/plivo/plivo-examples-node). Also refer to the [guides for configuring the Express server to run various scenarios](https://www.plivo.com/docs/sms/quickstart/node-expressjs/) & use it to test out your integration in under 5 minutes.

## Reporting issues
Report any feedback or problems with this version by [opening an issue on Github](https://github.com/plivo/plivo-node/issues).

## Local Development
> Note: Requires latest versions of Docker & Docker-Compose. If you're on MacOS, ensure Docker Desktop is running.
1. Export the following environment variables in your host machine:
```bash
export PLIVO_AUTH_ID=<your_auth_id>
export PLIVO_AUTH_TOKEN=<your_auth_token>
export PLIVO_API_DEV_HOST=<plivoapi_dev_endpoint>
export PLIVO_API_PROD_HOST=<plivoapi_public_endpoint>
```
2. Run `make build`. This will create a docker container in which the sdk will be setup and dependencies will be installed.
> The entrypoint of the docker container will be the `setup_sdk.sh` script. The script will handle all the necessary changes required for local development. It will also package the sdk and reinstall it as a dependecy for the test program.
3. The above command will print the docker container id (and instructions to connect to it) to stdout.
4. The testing code can be added to `<sdk_dir_path>/node-sdk-test/test.js` in host  
 (or `/usr/src/app/node-sdk-test/test.js` in container)
5. The sdk directory will be mounted as a volume in the container. So any changes in the sdk code will also be reflected inside the container. However, when any change is made, the dependencies for the test program need to be re-installed. To do that:
    * Either restart the docker container
    * Or Run the `setup_sdk.sh` script
6. To run test code, run `make run CONTAINER=<cont_id>` in host.
7. To run unit tests, run `make test CONTAINER=<cont_id>` in host.
> `<cont_id>` is the docker container id created in 2.
(The docker container should be running)

> Test code and unit tests can also be run within the container using
`make run` and `make test` respectively. (`CONTAINER` argument should be omitted when running from the container)