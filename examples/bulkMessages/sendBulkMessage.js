import plivo from '../../lib/plivo.js';

let client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.bulkMessages
    .create(
        '14155551234',
        ['14155559001', '14155559002', '14155559003'],
        'Hello from Plivo bulk messaging!',
        {
            type: 'sms',
            url: 'https://example.com/delivery-callback',
            method: 'POST',
            log: false
        }
    )
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });