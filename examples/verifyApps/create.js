import plivo from '../../lib/plivo.js';

const client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.verifyApps.create('My Verify App', {
    brand_name: 'MyBrand',
    otp_type: 'numeric',
    otp_length: 6,
    otp_expiry: 300,
    otp_attempts: 3,
    max_validation_attempts: 5,
    sms_channel: true,
    voice_channel: false,
    wa_channel: false,
    is_default: false,
    message_redaction: false,
    enable_fraudshield: false,
    number_pool: 'my-number-pool'
})
.then(response => {
    console.log(response);
})
.catch(error => {
    console.error(error);
});