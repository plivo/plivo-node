let plivo = require('./');
var client = new plivo.Client('MAMDJMMTEZOWY0ZMQWM2', 'OTljNmVmOGVkNGZhNjJlOWIyMWM0ZDI0ZjQwZDdk');

// client.calls.create( "+919090909090", // from
//   "+918309866821", // to
//   "https://plivobin.non-prod.plivops.com/api/v1/Conference_test07.xml").then(function (response) {
//   console.log(response);
// }, function (err) {
//   console.error(err);
// });
//
// client.conferences.get( "FStestconference").then(function (response) {
//   console.log(response);
// }, function (err) {
//   console.error(err);
// });

// client.calls.transfer(
//   "35283f77-a738-4d91-81dc-9f565e28d74c", {"legs": "aleg", "alegUrl": "https://www.google.com"}).then(function (response) {
//   console.log(response);
// }, function (err) {
//   console.error(err);
// });

// client.calls.sendDigits(
//   "bfc3f1fd-d66b-42ab-88e4-9e82c8e2537f", // call uuid
//   123, // digits
//   {
//     'leg': 'aleg'
//   }
// ).then(function (response) {
//   console.log(response);
// }, function (err) {
//   console.error(err);
// });

// client.conferences.startRecording('FStestconference').then(function (response) {
//   console.log(response);
// }, function (err) {
//   console.error(err);
// });

// client.multiPartyCalls.stop('6172e321-284d-4159-8242-5f5e92933de5').then(function (response) {
//   console.log(response);
// }, function (err) {
//   console.error(err);
// });

// client.multiPartyCalls.kickParticipant(10, "6bed1e3a-e5da-4ffc-8ed5-84b0a3e0d75c", null).then(function (response) {
//   console.log(response);
// }, function (err) {
//   console.error(err);
// });
// client.multiPartyCalls.get(null, 'TestMPC').then(function (response) {
//   console.log(response);
// }, function (err) {
//   console.error(err);
// });

// client.multiPartyCalls.get('6f84d47c-ee82-4172-a155-c6e22f87d874').then(function (response) {
//   console.log(response);
// }, function (err) {
//   console.error(err);
// });
