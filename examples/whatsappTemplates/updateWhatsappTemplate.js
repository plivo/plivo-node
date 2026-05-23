import plivo from '../../lib/plivo.js';

const client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.whatsappTemplates.update('YOUR_WABA_ID', 'YOUR_TEMPLATE_ID', {
    category: 'MARKETING',
    applicationId: 'YOUR_APPLICATION_ID'
})
.then(function(response) {
    console.log(response);
})
.catch(function(error) {
    console.error(error);
});