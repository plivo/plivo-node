import * as plivo from '../../lib/rest/client.js';

let client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.rcsAssistantEvents.create({
        phone_number: '+14151234567',
        event_type: 'IS_TYPING'
    })
    .then(function (response) {
        console.log('api_id:', response.apiId);
        console.log('phone_number:', response.phoneNumber);
        console.log('is_capable:', response.isCapable);
        console.log('features:', response.features);
        console.log('message:', response.message);
    })
    .catch(function (error) {
        console.error('Error:', error);
    });