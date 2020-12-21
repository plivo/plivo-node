var Plivo = require('../dist/rest/client.js');
var client = new Plivo.Client();

var params = {
  sticky_sender: true,
  local_connect: true
};
// create powerpack
client.powerpacks.create("node sdk test", params).then(function (result) {
  console.log(result)
});

// get powerpack
client.powerpacks.get("0166c910-1268-47c7-bf30-f5809ee843b9").then(
  function (result) {
    console.log(result)
  });

// list powerpack
client.powerpacks.list().then(
  function (result) {
    console.log(result)
  });
// list numbers
client.powerpacks.get("0166c910-1268-47c7-bf30-f5809ee843b9").then(
    function (powerpack) {
      return powerpack.list_numbers()
    })
  .then(function (result) {
    console.log("\n============ list numbers ===========\n", result)
  })
// find number
client.powerpacks.get("0166c910-1268-47c7-bf30-f5809ee843b9").then(
    function (powerpack) {
      return powerpack.find_number('1234')
    })
  .then(function (result) {
    console.log("\n============ list numbers ===========\n", result)
  })
