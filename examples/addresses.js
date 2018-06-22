var Plivo =  require('../dist/rest/client.js');
var fs = require('fs')
var client = new Plivo.Client();

client.addresses.create("en-US", "Mr", "first_name", "last_name", "address_line1", "address_line2", "New York", "Region", "Postal Code", "nation_id",
  {
    file: fs.createReadStream(__dirname + '/../jpg.jpg'),
    // callback_url: 'https://putsreq.com/tkbaN78VBDDgaYgxILzk',
  })
  .then(function(address) {
    console.log("\n============ created ===========\n", address)
    return client.addresses.list();
  })
  .then(function(addresses) {
    console.log("\n============ All Address ===========\n", addresses)
    return client.addresses.get(addresses[0].id);
  })
  .then(function(address){
    console.log("\n============ list with id ===========\n", address)
    return address.delete();
  })
  .then(function(result){
    console.log("\n============ deleted ===========\n", result)
    return client.addresses.list()
  })
  .then(function(addresss){
    console.log("\n============ list all ===========\n", addresss)
  })
  .catch(function(response) {
    console.log("\n============ Error :: ===========\n", response);
  });
