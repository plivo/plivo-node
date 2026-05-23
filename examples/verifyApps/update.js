import plivo from '../../lib/plivo.js';

const client = new plivo.Client('YOUR_AUTH_ID', 'YOUR_AUTH_TOKEN');

client.verifyApps.update('<app_uuid>', {
    name: 'Updated App Name',
    brand_name: 'UpdatedBrand',
    otp_length: 4,
    sms_channel: true
})
.then(response => {
    console.log(response);
})
.catch(error => {
    console.error(error);
});