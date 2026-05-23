import plivo from '../lib/index.js';

const client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.whatsappTemplates.create('<waba_id>', {
    name: 'sample_template',
    category: 'MARKETING',
    language: 'en_US',
    components: [
        {
            type: 'BODY',
            text: 'Hello, this is a sample template.'
        }
    ],
    allow_category_change: false
}).then(function (response) {
    console.log(response);
}).catch(function (error) {
    console.error(error);
});