var Plivo = require('../dist/rest/client.js');
var client = new Plivo.Client();

var createParams = {
  alias:"alias",
  applicationId: "applicationId",
  loaId:"loaID",
  number:"number"
};

var listParams = {
  alias:"alias",
  applicationId: "applicationId",
  loaId:"loaID",
  number:"number",
  hostedStatus: "completed",
};


client.hostedMessagingNumber.create(createParams)
  .then(function (hmn) {
    console.log("\n============ created ===========\n", hmn)
    return client.hostedMessagingNumber.get(hmn.id);
  })
  .then(function (hmn) {
    console.log("\n============ get ===========\n", hmn)
    return client.hostedMessagingNumber.list(listParams)
  })
  .then(function (hmns) {
    console.log("\n============ list with params ===========\n", hmns)
  })
  .catch(function (err) {
    console.log("\n============ Error :: ===========\n", err);
  });

