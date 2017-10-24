var Plivo =  require('../dist/rest/client.js');
var client = new Plivo.Client();

client.subAccounts.create(new Date().getTime().toString())
  .then(function(response) {
    console.log("\n============ Sub Account Detail ===========\n", response)
    return client.subAccounts.get(response.auth_id)
  })
  .then(function(response) {
    console.log("\n============ Sub Account Detail ===========\n", response)
    return response.update(new Date().getTime().toString(), true)
  })
  .then(function(response) {
    console.log("\n============ Sub Account Detail ===========\n", response)
    return client.subAccounts.get(response.auth_id)
  })
  .then(function(response) {
    console.log("\n============ updated ===========\n", response)
    return response.delete()
  })
  .then(function(response) {
    console.log("\n============ deleted ===========\n", response)
    return client.subAccounts.list()
  })
  .then(function(response) {
    console.log("\n============ All Subaccounts  ===========\n", response)
  })
  .catch(function(response) {
    console.log("\n============ Error :: ===========\n", response, response.message);
  });
