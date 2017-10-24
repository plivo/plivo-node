var Plivo =  require('../dist/rest/client.js');
var client = new Plivo.Client();

var create = {
  username: "thisistestendpoint",
  password: "thisistestpassword",
  alias: "this is test alias"
};

var update = {
  password: "hi new password",
  alias: "hi new alias"
};

client.endpoints.create(create.username, create.password, create.alias)
  .then(function(endpoint) {
    console.log("\n============ created ===========\n", endpoint)
    return client.endpoints.update(endpoint.id, update.username, update.password, update.alias);
  })
  .then(function(endpoint) {
    console.log("\n============ updated ===========\n", endpoint)
    return client.endpoints.get(endpoint.id);
  })
  .then(function(endpoint){
    console.log("\n============ list with id ===========\n", endpoint)
    return endpoint.delete();
  })
  .then(function(result){
    console.log("\n============ deleted ===========\n", result)
    return client.endpoints.list()
  })
  .then(function(endpoints){
    console.log("\n============ list all ===========\n", endpoints)
  })
  .catch(function(response) {
    console.log("\n============ Error :: ===========\n", response);
  });
