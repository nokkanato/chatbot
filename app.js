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

let token =  "EAAHTBOfZCqEUBACuSVfUYgFEyc0D4V04BgZBF5ifuYgjYZCnTUpo8BFLX2vzo4cZAqNjhyJt7s6MQhYsCEEJp66l8Rr7zlZC83ZCUrIror8QdGcUQeKznvKam8jaGjSbxx2gIOTc8SDEwlZCmiIDdoSIlltZC0vvXhNvlUhINj5s6QZDZD"

//face book

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "noknoijibjib") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			sendText(sender, "Text echo: " + text.substring(0, 100))
		}
	}
	res.sendStatus(200)
})

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
