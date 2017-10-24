var Plivo =  require('../dist/rest/client.js');
var client = new Plivo.Client();

client.pricings.get('US')
  .then(function(price) {
    console.log("\n============ get ===========\n", price)
  })
  .catch(function(response) {
    console.log("\n============ Error :: ===========\n", response);
  });
