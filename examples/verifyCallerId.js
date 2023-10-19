let plivo = require('plivo')

let client = new plivo.Client(process.env.PLIVO_AUTH_ID, process.env.PLIVO_AUTH_TOKEN);

client.verify.initiate('+919999999999').then(function(response) {
  console.log(response)
});

client.verify.verify("14b13c24-5262-448e-93e2-ad2419a3849e","999999").then(function(response) {
  console.log(response)
});

client.verify.updateVerifiedCallerId('+919999999999',{alias : "test"}).then(function(response) {
  console.log(response)
});

client.verify.getVerifiedCallerId('+919999999999').then(function(response) {
  console.log(response)
});

client.verify.listVerifiedCallerId().then(function(response) {
  console.log(response)
});

client.verify.deleteVerifiedCallerId('+919999999999').then(function(response) {
  console.log(response)
});
