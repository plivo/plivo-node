import plivo from '../lib/index.js';

const client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.whatsappTemplates.update('<waba_id>', '<template_id>', {
    name: 'sample_template',
    category: 'UTILITY',
    language: 'en_US',
    components: [
        {
            type: 'BODY',
            text: 'Updated template text.'
        }
    ],
    allow_category_change: true
}).then(function (response) {
    console.log(response);
}).catch(function (error) {
    console.error(error);
});