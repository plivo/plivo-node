import { Client } from '../lib/index.js';

const client = new Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.verify_sessions.create({
    brand_name: 'MyBrand',
    app_hash: 'abc123hash',
    code_length: 6,
    text: 'Your OTP is <otp>',
    fraud_check: 'standard',
    dlt_entity_id: 'your_dlt_entity_id',
    dlt_template_id: 'your_dlt_template_id',
    dlt_template_category: 'your_dlt_template_category',
    dlt_sender_id: 'your_dlt_sender_id',
    dlt_text: 'Your OTP is <otp>',
    dtmf: 1
})
    .then(response => {
        console.log('Session created:', response);
    })
    .catch(error => {
        console.error('Error creating session:', error);
    });