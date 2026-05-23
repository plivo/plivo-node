import plivo from '../../lib/plivo.js';

const client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.verifyApps.list({
    limit: 20,
    offset: 0
})
.then(response => {
    console.log(response);
})
.catch(error => {
    console.error(error);
});