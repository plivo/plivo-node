var Plivo =  require('../dist/rest/client.js');
var client = new Plivo.Client();

client.callFeedback.create('call_uuid', 4, ["ISSUE"], "User Feedback").then(function(call_feedback) {
  console.log("\n============ send feedback ===========\n", call_feedback)
})
.catch(function(response) {
  console.log("\n============ Error :: ===========\n", response);
});