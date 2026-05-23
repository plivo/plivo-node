import plivo from '../../lib/rest/client.js';

let client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.verifyApps.get('<app_uuid>')
.then(function(response) {
    console.log(response);
})
.catch(function(error) {
    console.error(error);
});