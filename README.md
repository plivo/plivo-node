# plivo-node [![Build Status](https://secure.travis-ci.org/plivo/plivo-node.png?branch=master)](http://travis-ci.org/plivo/plivo-node)



Node.js helper library for the Plivo API. This helper implements the following features:
* Wrappers for Plivo REST API
* XML generation for synchronously controlling incoming calls and messages.

We have developed some examples to show you how to use our node.js helper and to help you get started quickly. These examples are available at http://github.com/plivo/plivo-examples-node.

Further information on the Plivo Developer API and related concpets is available at https://www.plivo.com/docs/. Helper libraries for other languages are available at https://www.plivo.com/docs/helpers/.

## Installation
Installing using npm (node package manager):

`npm install git://github.com/plivo/plivo-node.git`

If you don't have npm installed or don't want to use it:

```
cd ~/.node_libraries # or the directory where node modules are stored in your OS.
git clone git://github.com/plivo/plivo-node.git plivo
```

**NOTE:** If you are not using `npm` for installation, then make sure that the dependencies used are installed as well.

## Dependencies

Required Dependencies:

* [xmlbuilder](https://github.com/oozcitak/xmlbuilder-js)
* [request](https://github.com/mikeal/request)

Dev Dependencies (for running tests):

* [nock](https://github.com/flatiron/nock)
* [mocha](http://visionmedia.github.com/mocha/)

## Usage

`plivo` node.js helper can be used to make REST API calls and can also be used to control incoming calls and messages.

### REST API

`RestAPI` takes one argument i.e. an object that contains two keys - `authId` and `authToken`, like so:


```
var plivo = require('plivo');

var api = plivo.RestAPI({
  authId: '<your AUTH ID>',
  authToken: '<your AUTH TOKEN>',
});
```

The `RestAPI` object exposes all the Plivo APIs and associated methods. Every method exposed by `RestAPI` object accepts two parameters:
* `params`: an object containing a map of API params and their values.
* `callback`: a callback that gets called after receiving response. Callbacks get two parameters:
  * `status`: HTTP Response Status Code. Example: `200`, `201`
  * `response`: a Javascript object because all our APIs send responses in JSON.

So for example, to make a call, you may do something like this:

```
/**
 * api.make_call accepts params and callback
 */
 
// Keys and values to be used for params are the same as documented for our REST API.
// So for using RestAPI.make_call, valid params can be checked
// at https://www.plivo.com/docs/api/call/#outbound.
var params = {
  from: '<your number>',
  to: '<recipient's number>',
  answer_url: 'http://your-server.com/answer_url',
};

api.make_call(params, function(status, response) {
  if (status >= 200 && status < 300) {
    console.log('Successfully made call request.');
    console.log('Response:', response);
  } else {
    console.log('Oops! Something went wrong.');
    console.log('Status:', status);
    console.log('Response:', response);
  }
});
```

Some `RestAPI` methods that implement Plivo REST API that do not have required parameters may ommit the use of `params` if not required. For example, to get [Call Detail Records](https://www.plivo.com/docs/api/call/#detail) using our [Call API](https://www.plivo.com/docs/api/call/), you may do something like this:
```
// when you want to get all the CDRs without using any params
api.get_cdrs(function(status, response) {
  ...
});

// when you do want to use params like "limit"
api.get_cdrs({ limit: 10 }, function(status, response) {
  ...
});
```


### XML Generation
XML Generation can be used to generate XML that Plivo understands to synchronously control calls and messages. You may want to use it in with a web framework like [Express](http://expressjs.com/), [Geddy](http://geddyjs.org/) or whichever you prefer.

To use this feature, use the object returned by the `plivo.Response` function. Use it like so:

```
var plivo = require('plivo');
var response = plivo.Response();

// generates XML string.
console.log(response.toXML());

/*
OUTPUTS to screen:

<Response></Response>
*/
```

`Response` exposes the following methods:
* `toXML`: generates the XML string response. This method does not require any parameter.
* `add<XML Element>`: there are many methods that follow this kind of naming pattern. Replace `<XML Element>` with any valid XML element listed on https://www.plivo.com/docs/xml/. Some of these methods accept `body` param (a string) as an argument, some accept `attributes` (an object that is a map of valid attributes of the `<XML Element>`) as an argument and some accept both. Which method accepts which paramter depends upon the element.
  * `addConference`: accepts `body` and `attributes` as arguments
  * `addNumber`: accepts `body` and `attributes` as arguments
  * `addUser`: accepts `body` as argument
  * `addDial`: accepts `attributes` as argument
  * `addGetDigits`: accepts `attributes` as argument
  * `addHangup`: accepts `attributes` as argument
  * `addMessage`: accepts `body` and `attributes` as arguments
  * `addPlay`: accepts `body` and `attributes` as arguments
  * `addPreAnswer`: accepts **no argument**.
  * `addRecord`: accepts `body` and `attributes` as arguments
  * `addRedirect`: accepts `body` and `attributes` as arguments
  * `addSpeak`: accepts `body` and `attributes` as arguments
  * `addWait`: accepts `attributes` as argument
  * `addDTMF`: accepts `body` as argument

So, you may use the above functions like so:

```
/**
 * Add a Speak Element.
 */

// add the Speak element
// Speak accepts both "body" and "attributes" as params.
// note that "loop" is a valid attribute for Speak element - https://www.plivo.com/docs/xml/speak/
response.addSpeak('Hello world!', { loop: 2 });

// add the Wait element
// Wait accepts only "attributes" as a param - https://www.plivo.com/docs/xml/wait/
response.addWait({ length: 3 });

// add the DTMF element
// DTMF accepts only "body" as a param - https://www.plivo.com/docs/xml/dtmf/
response.addDTMF('12345');

// generate the response
console.log(response.toXML());

/*
OUTPUTS to screen:

<Response><Speak loop="2">Welcome</Speak><Wait length="3"/><DTMF>12345</DTMF></Response>
*/

```

#### Nesting of Elements
Every element has a defined set of elements that can be nested in it. For example `Speak`, `Play`, `Wait` and a few others can be nested under `PreAnswer`, and `User`, `Number` cannot be nested under `Response`.

To allow nesting, all the `add<XML Element>` methods return the `<XML Element>` object to allow calling `add<XML Element>` methods on them for nesting. For example:

```
// Add Dial element.
var dial_element = response.addDial();

// Add User element and Number element to Dial element.
dial_element.addUser('sip:user1234@phone.plivo.com');
dial_element.addNumber('107456967856');

// Generate the XML string representation for the Dial element.
console.log(dial_element.toXML());

/*
OUTPUTS to screen:

<Dial><User>sip:user1234@phone.plivo.com</User><Number>107456967856</Number></Dial>
*/

// Generate the complete XML response string
console.log(response.toXML());

/*
OUTPUTS to screen:

<Response><Dial><User>sip:user1234@phone.plivo.com</User><Number>107456967856</Number></Dial></Response>
*/
```

## Tests

To run tests:

`npm test`

or

`mocha --reporter spec`

## License
*plivo-node* is licensed under the MIT License.

## References
* [Plivo API Documentation and Concepts](https://www.plivo.com/docs/)
* [Examples](http://github.com/plivo/plivo-examples-node)
