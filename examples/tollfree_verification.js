var Plivo =  require('../dist/rest/client.js');
var client = new Plivo.Client();

client.tollfreeVerification.create({
  extra_data: "", "message_sample": "", 
  number: "99999999999",
  optin_image_url: "https://some_url", 
  optin_type: "MOBILE_QR_CODE",
  profile_uuid: "abcxxxxx-xxxx"
})
  .then(function(response) {
    console.log("\n============ create ===========\n", response)
    return response.get(response.uuid);
  })
  .then(function(response) {
    console.log("\n============ get ===========\n", response)
    return response.delete();
  })
  .then(function(response) {
    console.log("\n============ delete ===========\n", response)
    return response.list({"limit":2, "status":"APPROVED"});
  })
  .then(function(response) {
    console.log("\n============ list ===========\n", response)
    return response.update(response[0].uuid,{"extra_data":"New_Extra_Data"});
  })
  .then(function(response) {
    console.log("\n============ update ===========\n", response)
  })
  .catch(function(response) {
    console.log("\n============ Error :: ===========\n", response, response.message);
  });