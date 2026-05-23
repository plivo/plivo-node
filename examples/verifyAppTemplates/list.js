import plivo from '../../lib/index.js';

let client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.verifyAppTemplates.list()
    .then(function (response) {
        console.log('API ID:', response.apiId);
        console.log('Templates:');
        response.templates.forEach(function (template) {
            console.log('  Template UUID:', template.templateUuid);
            console.log('  Friendly Name:', template.friendlyName);
            console.log('  Text:', template.text);
            console.log('  Locale:', template.locale);
            console.log('---');
        });
    })
    .catch(function (error) {
        console.error('Error:', error);
    });