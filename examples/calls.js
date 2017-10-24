var Plivo =  require('../dist/rest/client.js');
var client = new Plivo.Client();


client.calls.create('', '', 'http://localhost/')
  .then(function(call) {
    console.log("\n============ make call ===========\n", call)
    return client.calls.hangup(call.id)
  })
  .then(function(call){
    console.log("\n============ hangup ===========\n", call)
  })
  .catch(function(response) {
    console.log("\n============ Error :: ===========\n", response);
  });
