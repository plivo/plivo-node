# Change Log

## [4.46.0](https://github.com/plivo/plivo-node/tree/v4.46.0) (2023-05-04)
**Adding new attribute - 'renewalDate' in Get Number and List Numbers APIs**
- Add New Param `renewalDate` to the response of the [list all numbers API], [list single number API]
- Add 3 new filters to AccountPhoneNumber - list all my numbers API:`renewal_date`, `renewal_date__gt`, `renewal_date__gte`,`renewal_date__lt` and `renewal_date__lte` (https://www.plivo.com/docs/numbers/api/account-phone-number#list-all-my-numbers)

## [4.45.0](https://github.com/plivo/plivo-node/tree/v4.45.0) (2023-04-25)
**Adding new attribute - 'isDomestic' in Get Message and List Message APIs**
- Add `replacedSender` to the response for the [list all messages API](https://www.plivo.com/docs/sms/api/message/list-all-messages/) and the [get message details API](https://www.plivo.com/docs/sms/api/message#retrieve-a-message)
- Add `apiId` to the response for the list all messages API

## [v4.44.0](https://github.com/plivo/plivo-node/tree/v4.44.0) (2023-04-11)
**Feature - Added New Param 'source_ip' in GetCall and ListCalls**
- Add `source_ip` to the response for the [retrieve a call details API](https://www.plivo.com/docs/voice/api/call#retrieve-a-call) and the [retreive all call details API](https://www.plivo.com/docs/voice/api/call#retrieve-all-calls)

## [4.43.0](https://github.com/plivo/plivo-node/tree/v4.43.0) (2023-03-14)
**Adding new status code - Hosted Messaging order**
- Added new status code for create hosted messaging order.

## [4.42.0](https://github.com/plivo/plivo-node/tree/v4.42.0) (2023-03-07)
**Bug fix - 'text' parameter should be optional for MMS**
- Make `text` as an optional parameter for [sending MMS](https://www.plivo.com/docs/sms/api/message#send-a-message).
- Fix code breaking due to undefined error.response while accessing response `status` property.

## [4.41.0](https://github.com/plivo/plivo-node/tree/v4.41.0) (2023-03-03)
**Adding new attribute - 'isDomestic' in Get Message and List Message APIs**
- Add `isDomestic` to the response for the [list all messages API](https://www.plivo.com/docs/sms/api/message/list-all-messages/) and the [get message details API](https://www.plivo.com/docs/sms/api/message#retrieve-a-message)

## [4.40.0](https://github.com/plivo/plivo-node/tree/v4.40.0) (2023-02-23)
**Feature - Enhance MDR filtering capabilities **
- Added new fields on MDR object response


## [v4.39.0](https://github.com/plivo/plivo-node/tree/v4.39.0) (2022-01-25)
**Feature - Added New Param(requesterIP) in Get Message and List Mssage APIs**
- Add `requesterIP` to the response for the [list all messages API](https://www.plivo.com/docs/sms/api/message/list-all-messages/) and the [get message details API](https://www.plivo.com/docs/sms/api/message#retrieve-a-message)

## [v4.38.0](https://github.com/plivo/plivo-node/tree/v4.38.0) (2023-01-18)
**Feature - Added New Param(Message Expiry) in Send Message API**
-  Added new param(Message Expiry) in Send Message API

## [v4.37.0](https://github.com/plivo/plivo-node/tree/v4.37.0) (2022-12-16)
**Update Campaign Request**
-  Update Campaign Request endpoint added

## [v4.36.0](https://github.com/plivo/plivo-node/tree/v4.36.0) (2022-12-06)
**Delete Brand and Campaign Request**
-  Delete Brand and Campaign Request endpoint added

## [v4.37.0](https://github.com/plivo/plivo-node/tree/v4.37.0) (2022-12-16)
**Update Campaign Request**
-  Update Campaign Request endpoint added

## [v4.36.0](https://github.com/plivo/plivo-node/tree/v4.36.0) (2022-12-06)
**Delete Brand and Campaign Request**
-  Delete Brand and Campaign Request endpoint added

## [v4.35.0](https://github.com/plivo/plivo-node/tree/v4.35.0) (2022-11-04)
**Brand Usecase Request**
-  Brand Usecase Request endpoint added

## [v4.34.3](https://github.com/plivo/plivo-go/tree/v4.34.3) (2022-11-07)
**Bug fix - List all Endpoint**
-  Removed duplicate responses

## [v4.34.2](https://github.com/plivo/plivo-go/tree/v4.34.2) (2022-10-17)
**List Endpoint query param support**
-  Adding limit and offset to fetch list of endpoints.

## [v4.34.1](https://github.com/plivo/plivo-go/tree/v4.34.1) (2022-09-28)
**10DLC campaign creation**
-  Adding more attributes to campaign creation request.

## [v4.34.0](https://github.com/plivo/plivo-go/tree/v4.34.0) (2022-08-07)
**Feature - Token Creation**
- `JWT Token Creation API` added API to create a new JWT token.

## [v4.33.0](https://github.com/plivo/plivo-go/tree/v4.33.0) (2022-07-11)
**Feature - STIR Attestation**
- Add stir attestation param as part of Get CDR and Get live call APIs Response

## [v4.32.1](https://github.com/plivo/plivo-node/tree/v4.32.1) (2022-06-09)
**Bug fix - Typescript**
- Make a call [API](https://www.plivo.com/docs/voice/api/call/#make-a-call) response to support the parameter `requestUuid` of data types `Array<string>` and `string`.

## [v4.32.0](https://github.com/plivo/plivo-node/tree/v4.32.0) (2022-05-05)
**Features - List all recordings**
- `fromNumber` and `toNumber` added in filtering params [List all recordings](https://www.plivo.com/docs/voice/api/recording#list-all-recordings)
- `record_min_member_count` param added to [Add a participant to a multiparty call using API](https://www.plivo.com/docs/voice/api/multiparty-call/participants#add-a-participant)

## [v4.31.0](https://github.com/plivo/plivo-node/tree/v4.31.0) (2022-04-27)
**Feature - 10DLC API callback**
- Added callback support for campaign, brand, link number request.

## [v4.30.0](https://github.com/plivo/plivo-node/tree/v4.30.0) (2022-04-14)
**Features - Profile Api**
- Profile api added for 10dlc support

## [v4.29.1](https://github.com/plivo/plivo-node/tree/v4.29.1) (2022-03-25)
**Bug Fix - DialElement**
- `confirmTimeout` parameter added to [The Dial element](https://www.plivo.com/docs/voice/xml/dial/)

## [v4.29.0](https://github.com/plivo/plivo-node/tree/v4.29.0) (2022-03-25)
**Features - DialElement**
- `confirmTimeout` parameter added to [The Dial element](https://www.plivo.com/docs/voice/xml/dial/)

## [v4.28.0](https://github.com/plivo/plivo-node/tree/v4.28.0) (2022-02-23)
**Features - Numbers: Hosted Messaging API**
- Add support for Hosted Messaging APIs.

## [v4.27.0](https://github.com/plivo/plivo-node/tree/v4.27.0) (2022-02-02)
**Features - MPCStartCallRecording**
- Parameter change from statusCallback to recordingCallback

## [v4.26.1](https://github.com/plivo/plivo-node/tree/v4.26.1) (2022-01-21)
**Bug Fix**
- Making AppId non mandatory for Buy number and update number APIs(https://github.com/plivo/plivo-node/pull/234)

## [v4.26.0](https://github.com/plivo/plivo-node/tree/v4.26.0) (2021-12-14)
**Features - Voice**
- Routing SDK traffic through Akamai endpoints for all the [Voice APIs](https://www.plivo.com/docs/voice/api/overview/)

## [v4.25.1](https://github.com/plivo/plivo-node/tree/v4.25.1) (2021-12-08)
**Bug Fix**
- Handling `undefined response` error from axios.
- Timeout has been eliminated for messaging requests.

## [v4.25.0](https://github.com/plivo/plivo-node/tree/v4.25.0) (2021-12-02)
**Features - Messaging: 10DLC API**
- 10DLC API's for brand and campaign support

## [v4.24.0](https://github.com/plivo/plivo-node/tree/v4.24.0) (2021-11-30)
**Features - Voice: Multiparty calls**
- The [Add Multiparty Call API](https://www.plivo.com/docs/voice/api/multiparty-call/participants#add-a-participant) allows for greater functionality by accepting options like `start recording audio`, `stop recording audio`, and their HTTP methods.
- [Multiparty Calls](https://www.plivo.com/docs/voice/api/multiparty-call/) now has new APIs to `stop` and `play` audio.

## [v4.23.1](https://github.com/plivo/plivo-node/tree/v4.23.1) (2021-10-13)
**Bug Fix**
  - LiveCallInterface.
  - [Buy Number API](https://www.plivo.com/docs/numbers/api/phone-number#buy-a-phone-number) to support app_id

## [v4.23.0](https://github.com/plivo/plivo-node/tree/v4.23.0) (2021-10-11)
**Features - Messaging**
- This version includes advancements to the Messaging Interface that deals with the [Send SMS/MMS](https://www.plivo.com/docs/sms/api/message#send-a-message) interface, Creating a standard structure for `request/input` arguments to make implementation easier and incorporating support for the older interface.

 Example for [send SMS](https://github.com/plivo/plivo-node#send-a-message)

## [v4.22.4](https://github.com/plivo/plivo-node/tree/v4.22.4) (2021-09-27)
**Bug Fix**
  - Handle invalid destination number API response for send [SMS API](https://www.plivo.com/docs/sms/api/message/send-a-message/).

## [v4.22.3](https://github.com/plivo/plivo-node/tree/v4.22.3) (2021-09-22)
**Bug Fix**
  - Fix Typings for `Make call` & `Send SMS` API response.

## [v4.22.2](https://github.com/plivo/plivo-node/tree/v4.22.2) (2021-09-16)
- Typescript import fix.

## [v4.22.1](https://github.com/plivo/plivo-node/tree/v4.22.1) (2021-09-08)
- Fix on voice `GET` request and exception handle.

## [v4.22.0](https://github.com/plivo/plivo-node/tree/v4.22.0) (2021-08-17)
- Fix [add numbers to a powerpack](https://www.plivo.com/docs/sms/api/numberpool/#add-a-number) API by reverting retrievable object responses support for [Retrieve a Power pack API](https://www.plivo.com/docs/sms/api/powerpack#retrieve-a-powerpack).

## [v4.21.0](https://github.com/plivo/plivo-node/tree/v4.21.0) (2021-08-05)
- Fixed a Typescript warning about base interpretation.
- Add retrievable object responses support for [Retrieve a Power pack API](https://www.plivo.com/docs/sms/api/powerpack#retrieve-a-powerpack).

## [v4.20.1](https://github.com/plivo/plivo-node/tree/v4.20.1) (2021-07-27)
- Updates to [add a member a multi-party call API](https://www.plivo.com/docs/voice/api/multiparty-call/participants#add-a-participant).
  - Remove validation range for `delay` and `ringtimeout` parameters.
  - Add appropriate error message for multiple `ringtimeout` and `delaydial` values.
- Updated default HTTP client request timeout to 5 seconds.

## [v4.20.0](https://github.com/plivo/plivo-node/tree/v4.20.0) (2021-07-13)
- Power pack ID has been included to the response for the [list all messages API](https://www.plivo.com/docs/sms/api/message/list-all-messages/) and the [get message details API](https://www.plivo.com/docs/sms/api/message#retrieve-a-message).
- Support for filtering messages by Power pack ID has been added to the [list all messages API](https://www.plivo.com/docs/sms/api/message#list-all-messages).

## [v4.19.2](https://github.com/plivo/plivo-node/tree/v4.19.2) (2021-07-08)
- MPC SDK fixes to pass params in a user-friendly manner.

## [v4.19.1](https://github.com/plivo/plivo-node/tree/v4.19.1) (2021-07-05)
- **WARNING**: Removed the total_count parameter in meta data for list MDR response

## [4.19.0](https://github.com/plivo/plivo-node/releases/tag/v4.19.0)(2021-07-02)
-  Added CallerName param in AddParticpant
-  Added support for Parallel behaviour of RingTimeout and Delaydial.
-  Added support for Recording at Member Level

## [4.18.1](https://github.com/plivo/plivo-node/releases/tag/v4.18.1)(2021-06-25)
-  Fixed the mms media upload functionality

## [4.18.0](https://github.com/plivo/plivo-node/releases/tag/v4.18.0)(2021-06-15)
-  Added stir verification param as part of Get CDR and live call APIs

## [4.17.1](https://github.com/plivo/plivo-node/releases/tag/v4.17.1)(2021-05-06)
-  Added Fix for Adaptive Powerpack Create & Update functions

## [4.17.0](https://github.com/plivo/plivo-node/releases/tag/v4.17.0)(2021-05-04)
-  Update library: Axios
-  Add Exception Support
-  Updated README

## [4.16.0](https://github.com/plivo/plivo-node/releases/tag/v4.16.0)(2021-04-19)
-  Added SDK support for Voice MultiPartyCall APIs and XML

## [4.15.0](https://github.com/plivo/plivo-node/releases/tag/v4.15.0)(2021-04-19)
-  Add support for Regulatory Compliance APIs.
-  Add "npanxx" and "local_calling_area" support for Search Phone Number.

## [4.14.3](https://github.com/plivo/plivo-node/releases/tag/v4.14.3)(2021-03-26)
-  Fix bug on stopRecording and all voice API flows post Typescript changes.

## [4.14.2](https://github.com/plivo/plivo-node/releases/tag/v4.14.2)(2021-02-17)
-  Fix duplicate call issue for make call API.

## [4.14.1](https://github.com/plivo/plivo-node/releases/tag/v4.14.1)(2021-02-09)
-  Fix Buy Number API & env variables support for TypeScript.

## [4.14.0](https://github.com/plivo/plivo-node/releases/tag/v4.14.0)(2021-01-29)
-  Add axios as HTTP client library.

## [4.13.0](https://github.com/plivo/plivo-node/releases/tag/v4.13.0)(2021-01-19)
-  Add TypeScript support.

## [4.12.0](https://github.com/plivo/plivo-node/releases/tag/v4.12.0)(2020-11-17)
-  Add number_priority support for Powerpack API.

## [4.11.0](https://github.com/plivo/plivo-node/releases/tag/v4.11.0)(2020-10-30)
-  Change lookup API endpoint and response.

## [4.10.0](https://github.com/plivo/plivo-node/releases/tag/v4.10.0)(2020-09-21)
-  Add Lookup API support.

## [4.9.0](https://github.com/plivo/plivo-node/releases/tag/v4.8.0)(2020-08-25)
-  Add Powerpack for MMS

## [4.8.0](https://github.com/plivo/plivo-node/releases/tag/v4.8.0)(2020-07-23)
-  Add retries to multiple regions for voice requests.

## [4.7.0](https://github.com/plivo/plivo-node/releases/tag/v4.7.0)(2020-05-28)
-  Add JWT helper functions.

## [4.6.0](https://github.com/plivo/plivo-node/releases/tag/v4.6.0)(2020-04-29)
-  Add V3 signature helper functions.

## [4.5.2](https://github.com/plivo/plivo-node/releases/tag/v4.5.2)(2020-04-28)
-  Fix List Conferences API response.

## [4.5.1](https://github.com/plivo/plivo-node/releases/tag/v4.5.1)(2020-04-13)
-  Fix Cannot read property 'hasOwnProperty' of undefined error.

## [4.5.0](https://github.com/plivo/plivo-node/releases/tag/v4.5.0)(2020-03-31)
-  Add application cascade delete support.

## [4.4.0](https://github.com/plivo/plivo-node/releases/tag/v4.4.0)(2020-03-30)
-  Add Tollfree support for Powerpack

## [4.3.0](https://github.com/plivo/plivo-node/releases/tag/v4.3.0)(2020-03-27)
- Add post call quality feedback API support.

## [4.2.0](https://github.com/plivo/plivo-node/releases/tag/v4.2.0)(2020-02-25)
- Add Media support.

## [4.1.9](https://github.com/plivo/plivo-node/releases/tag/v4.1.9)(2020-02-12)
-  Fix end_time_gte param in Retrieve a call API.

## [4.1.8](https://github.com/plivo/plivo-node/releases/tag/v4.1.8)(2019-12-20)

- Add Powerpack support.

## [4.1.7](https://github.com/plivo/plivo-node/releases/tag/v4.1.7)(2019-12-04)

- Add MMS support.

## [4.1.6](https://github.com/plivo/plivo-node/releases/tag/v4.1.6)(2019-11-14)

- Fix list APIs to return meta in response.

## [4.1.5](https://github.com/plivo/plivo-node/releases/tag/v4.1.5)(2019-11-13)

- Add GetInput XML support

## [4.1.4](https://github.com/plivo/plivo-node/releases/tag/v4.1.4)(2019-11-06)

- Add SSML support

## [4.1.3](https://github.com/plivo/plivo-node/releases/tag/v4.1.3)(2019-07-30)

- Add proxy-support for Signature Validation
- Add HTTP status codes in responses

## [4.1.2](https://github.com/plivo/plivo-node/releases/tag/v4.1.2)(2019-03-19)

- Add support: Handling circular reference stringify logic

## [4.1.1](https://github.com/plivo/plivo-node/releases/tag/v4.1.1)(2019-03-11)

- Add PHLO support
- Add Multiparty call triggers

## [4.0.6](https://github.com/plivo/plivo-node/releases/tag/v4.0.6)(2019-02-04)

- Bugfix: ListAllMessages API: Fixed filter-by message_time parameter.

## [4.0.5](https://github.com/plivo/plivo-node/releases/tag/v4.0.5)(2018-11-21)

- Add sub-account cascade delete support.

## [4.0.4](https://github.com/plivo/plivo-node/releases/tag/v4.0.4)(2018-10-29)

- Add live calls filtering by from, to numbers and call_direction.

## [4.0.3](https://github.com/plivo/plivo-node/releases/tag/v4.0.3)(2018-09-18)

- Queued status added for filtering calls in queued status.
- Added log_incoming_messages parameter to application create and update.

## [4.0.2](https://github.com/plivo/plivo-node/releases/tag/v4.0.2)(2018-08-14)

- Add Powerpack option for sending messages.

## [4.0.1](https://github.com/plivo/plivo-node/releases/tag/v4.0.1)(2018-06-28)

- Fix create subaccount method to enable subaccount while creation

## [4.0.0](https://github.com/plivo/plivo-node/releases/tag/v4.0.0)(2018-01-18)

- Add timeout support while making the API requests
- Add meta property to list responses

## [4.0.0-beta.1](https://github.com/plivo/plivo-node/releases/tag/v4.0.0-beta.1)(2017-10-24)

- The new SDK works with Node.js >= 4. It has been tested against the versions 4, 5, 6, 7 and 8.
- The API interfaces are consistent and guessable
- Handles pagination automatically when listing all objects of a resource
- The new SDK has excellent IDE support

## [0.4.1](https://github.com/plivo/plivo-node/releases/tag/v0.4.1)(2017-02-28)

- Bugfix: validate signature middleware

## [0.4.0](https://github.com/plivo/plivo-node/releases/tag/v0.4.0)(2016-09-09)

- Added an entry to the .gitignore for WebStorm IDE's, this prevents un-needed files from being checked in.
- Updated Request to version 2.71.0
- Some logic for how JSON serialazation has changed, I have updated the request method to reflect that changed
- Updated xmlBuilder to 8.0.0
- Slight update to syntax for creating a new xml doc : xmlBuilder.begin().ele(this.element);
- Had to update Utility.areEqual to reflect a change in how xmlBuild stores values of child elements
- Updated nock to version 8.0.0,
- Updated Mocha to 2.4.5
- Fix Travis tests (node v6 and v4)

## Other changes

- 2015-01-14 Adds support for PhoneNumber API
- 2013-09-25 Added relayDTMF to <Conference> and async to <DTMF>
- 2013-07-23 addRecord Response mandatory parameter 'body' dropped
- 2013-02-23 pricing API added
