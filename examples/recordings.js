var Plivo =  require('../dist/rest/client.js');
var client = new Plivo.Client();

client.recordings.list()
  .then(function(recordings) {
    console.log("\n============ list ===========\n", recordings)
  })
  .catch(function(response) {
    console.log("\n============ Error :: ===========\n", response);
  });
