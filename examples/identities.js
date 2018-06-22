var Plivo =  require('../dist/rest/client.js');
var fs = require('fs')
var client = new Plivo.Client();

client.identities.create(null, "Mr", "first_name", "last_name", "birth_place", "1984-12-12", "nationality", "id_nationality", "1999-12-12", "id_type", "id_number", "address_line1", "address_line2", "city", "Region", "Postal Code",
  {
    file: fs.createReadStream(__dirname + '/../jpg.jpg'),
    // callback_url: 'https://putsreq.com/tkbaN78VBDDgaYgxILzk',
  })
  .then(function(identities) {
    console.log("\n============ created ===========\n", identities)
    return client.identities.list();
  })
  .then(function(identities) {
    console.log("\n============ All identities ===========\n", identities)
    return client.identities.get(identities[0].id);
  })
  .then(function(identities){
    console.log("\n============ list with id ===========\n", identities)
    return identities.delete();
  })
  .then(function(result){
    console.log("\n============ deleted ===========\n", result)
    return client.identities.list()
  })
  .then(function(identities){
    console.log("\n============ list all ===========\n", identities)
  })
  .catch(function(response) {
    console.log("\n============ Error :: ===========\n", response);
  });
