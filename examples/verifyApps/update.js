import plivo from '../../lib/rest/client.js';

let client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.verifyApps.update('<app_uuid>', {
    name: 'Updated OTP App',
    brand_name: 'Acme Corp',
    otp_length: 6,
    otp_expiry: 10,
    enable_fraudshield: true,
    fs_protection_level: 'high'
})
.then(function(response) {
    console.log(response);
})
.catch(function(error) {
    console.error(error);
});