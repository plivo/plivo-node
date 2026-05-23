import plivo from '../../lib/rest/client.js';

let client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.verifyApps.create('My OTP App', {
    otp_length: 6,
    otp_expiry: 5,
    otp_attempts: 3,
    brand_name: 'Acme Corp',
    sms_channel: true,
    voice_channel: false,
    wa_channel: false,
    is_default: false,
    message_redaction: false,
    enable_fraudshield: true,
    fs_protection_level: 'medium'
})
.then(function(response) {
    console.log(response);
})
.catch(function(error) {
    console.error(error);
});