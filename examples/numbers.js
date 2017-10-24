var Plivo =  require('../dist/rest/client.js');
var client = new Plivo.Client();

client.numbers.search('US')
  .then(function(numbers) {
    console.log("\n============ search ===========\n", numbers)
    return client.numbers.list()
  })
  .then(function(numbers){
    console.log("\n============ all ===========\n", numbers)
    return client.numbers.get(numbers[0].id)
  })
  .then(function(number){
    console.log("\n============ get ===========\n", number)
    return number.update(null, null, 'new alias')
  })
  .then(function(number){
    console.log("\n============ update ===========\n", number)
    return client.numbers.get(number.id)
  })
  .then(function(number){
    console.log("\n============ get update ===========\n", number)
  })
  .catch(function(response) {
    console.log("\n============ Error :: ===========\n", response);
  });
