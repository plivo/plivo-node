var Plivo =  require('../dist/rest/client.js');
var client = new Plivo.Client();

var createParams = {
  alias: "testing",
  documentTypeId: "testing",
  complianceDocumentId: "test",
  metaInformation: "test meta",
  file: "test path to file"
};

var updateDocument = {
  alias: "alias update"
};

client.complianceDocuments.create(createParams)
  .then(function(complianceDocument) {
    console.log("\n============ created ===========\n", complianceDocument)
    return client.complianceDocuments.update(complianceDocument.id, updateDocument);
  })
  .then(function(complianceDocument){
    return complianceDocuments.delete();
  })
  .then(function(result){
    console.log("\n============ deleted ===========\n", result)
    return client.complianceDocuments.list()
  })
  .then(function(complianceDocuments){
    console.log("\n============ list all ===========\n", complianceDocuments)
  })
  .catch(function(response) {
    console.log("\n============ Error :: ===========\n", response);
  });
  
