import plivo from '../../lib/plivo.js';

const client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.whatsappTemplates.create('YOUR_WABA_ID', {
    elementName: 'sample_template',
    languageCode: 'en_US',
    category: 'UTILITY',
    applicationId: 'YOUR_APPLICATION_ID'
})
.then(function(response) {
    console.log(response);
})
.catch(function(error) {
    console.error(error);
});