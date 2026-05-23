import plivo from '../lib/index.js';

const client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.whatsappTemplates.list('<waba_id>', {
    template_name: 'sample_template',
    limit: 20,
    offset: 0
}).then(function (response) {
    console.log(response);
}).catch(function (error) {
    console.error(error);
});