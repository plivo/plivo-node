var Plivo =  require('../dist/rest/client.js');
var client = new Plivo.Client();

var createParams = {
  countryIso2: "US",
  numberType: "local",
  endUserType: "individual"
};

var listParams = {
    countryIso2: "US",
    numberType: "local",
    endUserType: "individual",
    limit: 10,
    offset: 5
};

var updateParams = {
    documentIds: [ "test-1", "test-2"],
};

client.complianceApplications.create(createParams)
  .then(function(complianceApplication) {
    console.log("\n============ created ===========\n", complianceApplication)
    return client.complianceApplications.update(complianceApplication.id, updateParams);
  })
  .then(function(complianceApplication) {
    console.log("\n============ updated ===========\n", complianceApplication)
    return client.complianceApplications.get(complianceApplication.id);
  })
  .then(function(complianceApplication){
    console.log("\n============ list with id ===========\n", complianceApplication)
    return complianceApplications.delete(complianceApplication.id);
  })
  .then(function(result){
    console.log("\n============ deleted ===========\n", result)
    return client.complianceApplications.list(listParams)
  })
  .then(function(complianceApplications){
    console.log("\n============ list all ===========\n", complianceApplications)
  })
  .catch(function(response) {
    console.log("\n============ Error :: ===========\n", response);
  });
  
