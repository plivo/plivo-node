let plivo = require('plivo')

let client = new plivo.Client(process.env.PLIVO_AUTH_ID, process.env.PLIVO_AUTH_TOKEN);

client.verify_session.create({
  recipient: '+14156667778',
}).then(function(response) {
  console.log(response)
});

client.verify_session.get('5c533d15-1975-4f20-80be-40174142ea37').then(function(response) {
  console.log(response)
});

client.verify_session.list().then(function(response) {
  console.log(response)
});

client.verify_session.validate({id:'c549be00-0e74-4ccb-ac04-8a778312b861',otp:'123456'}).then(function(response) {
  console.log(response)
}).catch(function (error) {
  console.log(error)
});
