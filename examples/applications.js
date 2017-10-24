var Plivo =  require('../dist/rest/client.js');
var client = new Plivo.Client();

client.applications.create("http://google.com/", "MyNewApplication" + Math.random(1000))
  .then(function(application) {
    console.log("\n============ created ===========\n", application)
    return client.applications.update(application.id, {
      answer_url: 'http://google1.com/'
    });
  })
  .then(function(application) {
    console.log("\n============ updated ===========\n", application)
    return client.applications.get(application.id);
  })
  .then(function(application){
    console.log("\n============ list with id ===========\n", application)
    return application.delete();
  })
  .then(function(result){
    console.log("\n============ deleted ===========\n", result)
    return client.applications.list()
  })
  .then(function(applications){
    console.log("\n============ list all ===========\n", applications)
  })
  .catch(function(response) {
    console.log("\n============ Error :: ===========\n", response);
  });
