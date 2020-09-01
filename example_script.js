let plivo = require('./');
var client = new plivo.Client('MAMDJMMTEZOWY0ZMQWM2', 'OTljNmVmOGVkNGZhNjJlOWIyMWM0ZDI0ZjQwZDdk');

// client.calls.create( "+919090909090", // from
//   "sip:koushikqa119062465586783372208@phone-qa.voice.plivodev.com", // to
//   "https://plivobin.non-prod.plivops.com/api/v1/Conference_test07.xml").then(function (response) {
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

client.multiPartyCalls.addParticipant('agent', {"friendlyName" : "TestMPC", 'from' : '+919090909090', 'to': 'sip:koushikqa119062465586783372208@phone-qa.voice.plivodev.com'}).then(function (response) {
  console.log(response);
}, function (err) {
  console.error(err);
});

// client.multiPartyCalls.list().then(function (response) {
//   console.log(response);
// }, function (err) {
//   console.error(err);
// });
