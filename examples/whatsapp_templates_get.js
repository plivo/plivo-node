import plivo from '../lib/index.js';

const client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.whatsappTemplates.get('<waba_id>', '<template_id>')
    .then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.error(error);
    });