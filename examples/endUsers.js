var Plivo =  require('../dist/rest/client.js');
var client = new Plivo.Client();

var createParams = {
  name: "testing name",
  lastName: "testing lastname",
  endUserType: "business"
};

var updateParams = {
  endUserType: "individual"
};

client.endUsers.create(createParams)
  .then(function(endUser) {
    console.log("\n============ created ===========\n", endUser)
    return client.endUsers.update(endUser.id, updateParams);
  })
  .then(function(endUser) {
    console.log("\n============ updated ===========\n", endUser)
    return client.endUsers.get(endUser.id);
  })
  .then(function(endUser){
    console.log("\n============ list with id ===========\n", endUser)
    return endUsers.delete();
  })
  .then(function(result){
    console.log("\n============ deleted ===========\n", result)
    return client.endUsers.list()
  })
  .then(function(endUsers){
    console.log("\n============ list all ===========\n", endUsers)
  })
  .catch(function(response) {
    console.log("\n============ Error :: ===========\n", response);
  });
  
