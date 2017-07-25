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
  console.log("-----------------------------------------");
  console.log(data);
  res.sendStatus(200)
})

function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var isEcho = message.is_echo;
  var messageId = message.mid;
  var appId = message.app_id;
  var metadata = message.metadata;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;
  var quickReply = message.quick_reply;

  if (isEcho){
    console.log(echo);
  }
  if (messageText) {
    sendTextMessage(senderID, messageText)

  }
}

function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText,
      metadata: "DEVELOPER_DEFINED_METADATA"
    }
  };

  callSendAPI(messageData);
}
PAGE_ACCESS_TOKEN = token

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      if (messageId) {
        console.log("Successfully sent message with id %s to recipient %s",
          messageId, recipientId);
      } else {
      console.log("Successfully called Send API for recipient %s",
        recipientId);
      }
    } else {
      console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
    }
  });
}







// app.post('/webhook/', function(req, res) {
// 	let messaging_events = req.body.entry[0].messaging
//   console.log(messaging_events);
// 	for (let i = 0; i < messaging_events.length; i++) {
// 		let event = messaging_events[i]
// 		let sender = event.sender.id
// 		if (event.message && event.message.text) {
// 			let text = event.message.text
// 			sendText(sender, "Text echo: " + text.substring(0, 100))
// 		}
// 	}
// 	res.sendStatus(200)
// })

function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}


app.listen((process.env.PORT || 5000), function() {
	console.log("running: port")
})
