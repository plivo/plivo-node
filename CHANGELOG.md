# Change Log

## [0.4.0](Integrate patch from rob.polak@gmail.com and fix travis test)(2016-09-09)
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
