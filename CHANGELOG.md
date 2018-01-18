# Change Log
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
