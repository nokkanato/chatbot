var express = require('express')
var request = require('request')
var bodyParser = require('body-parser')

var app = express()

app.set('port' , (process.env.port || 5000))


//Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// ROUTES

app.get('/', function(req, res) {
	res.send("Hi I am a chatbot")
})

let token =  "EAAMRs91XLxkBAOisZAZBEZAoiHSRfugENP71ceXZCBLS02P7wFBP6o4ME9NYBAZBXTTfgrDIRQeHusA6y3Rs2ZBc0mryiWqlq6DnR6tu59xj5F4N8a8ZCgHidlVTfPmqQzwLHoI2KjwJiZCBaaQNzsZC1j5tV9i5ZA0JXGvQ6FM0o4iAZDZD"

//face book

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "noknoijibjib") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})


app.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});

function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;

  if (messageText) {

    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (messageText) {
      case 'generic':
        sendGenericMessage(senderID);
        break;

      default:
        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}

function sendGenericMessage(recipientId, messageText) {
  // To be expanded in later sections
  console.log('generic');
}

function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}
function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: "EAAMRs91XLxkBAOisZAZBEZAoiHSRfugENP71ceXZCBLS02P7wFBP6o4ME9NYBAZBXTTfgrDIRQeHusA6y3Rs2ZBc0mryiWqlq6DnR6tu59xj5F4N8a8ZCgHidlVTfPmqQzwLHoI2KjwJiZCBaaQNzsZC1j5tV9i5ZA0JXGvQ6FM0o4iAZDZD" },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s",
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });
}







app.listen((process.env.PORT || 5000), function() {
	console.log("running: port")
})
