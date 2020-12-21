let plivo = require('plivo');
let client = new plivo.Client('', '');

let optionalParams = {};
client.messages.create(
  "", //from
  "", // to
  "", // text
  {
    type: "", // sms or mms
    method: "", // GET or POST callback method
    url: "", // callback url
    media_urls: [".gif", ".jpg"] // to send MMS, mention the media urls
  }

).then(function (message_created) {
  console.log(message_created)
}).catch(function (error) {
  console.log(error);
});


// get MMS Media detail
client.messages.get("your message uuid").then(function (message) {
    return client.messages.listMedia(message.messageUuid)
  })
  .then(function (result) {
    console.log("\n============ list Media ===========\n", result)
  })
  .catch(function (response) {
    console.log("\n============ Error :: ===========\n", response);
  });
