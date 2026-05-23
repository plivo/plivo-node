import plivo from '../lib/rest/client.js';

const client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

// Check if a phone number is RCS-enabled
client.rcsCapability.check('+14151234567', { agentUuid: 'your-agent-uuid' })
    .then(response => {
        console.log('API ID:', response.apiId);
        console.log('Phone Number:', response.phoneNumber);
        console.log('Is RCS Capable:', response.isCapable);
        console.log('Features:', response.features);
        console.log('Message:', response.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });