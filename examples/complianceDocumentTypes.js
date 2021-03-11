var Plivo =  require('../dist/rest/client.js');
var client = new Plivo.Client();

var listParams = {
  documentName: "Test",
  proofRequired: "passport"
};

client.complianceDocumentTypes.get("some-fake-id")
  .then(function(complianceDocumentType) {
    console.log("\n============ Fetch by ID ===========\n", complianceDocumentType)
    return client.complianceDocumentTypes.list(listParams);
  })
  .then(function(complianceDocumentTypes) {
    console.log("\n============ list all ===========\n", complianceDocumentTypes)
  })
  .catch(function(response) {
    console.log("\n============ Error :: ===========\n", response);
  });

  