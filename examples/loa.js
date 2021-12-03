var Plivo = require('../dist/rest/client.js');
var client = new Plivo.Client();

var createParams = {
  "alias": "Test loa",
  "file": "path to file"

};

var listParams = {
  alias: "Test loa",
  limit: 10,
  offset: 5
};


client.loa.create(createParams)
  .then(function (loa) {
    console.log("\n============ created ===========\n", loa)
    return client.loa.get(loa.id);
  })
  .then(function (loa) {
    console.log("\n============ get ===========\n", loa)
    return client.loa.delete(loa.id);
  })
  .then(function (result) {
    console.log("\n============ deleted ===========\n", result)
    return client.loa.list(listParams)
  })
  .then(function (loas) {
    console.log("\n============ list with params ===========\n", loas)
  })
  .catch(function (err) {
    console.log("\n============ Error :: ===========\n", err);
  });

