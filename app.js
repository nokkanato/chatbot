
var express = require('express')
var cors = require('cors')
var routes = require('./routes/api')
var bodyParser  = require('body-parser')
//set up express

var app = express()


app.use(routes)
app.use(bodyParser)

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === "noknoijibjib") {
        res.send(req.query['hub.challenge'])
    }
    res.send('No sir')
})

let token = "EAAHTBOfZCqEUBAJzZCeO1j4HnQ4ze2dwvFJaNddn3iHyG3aPeL6ICnP0MarqvfGZCrIETzZCU0AVi3fgFa2NINVq5wEDTm1qKgm7d5nZChRZCsVpR0gUnYjr0KNPtG1XvQ4GOYRGg0Vt0TfIKY3iZBp6AJLM4hvRlLXPdOyaKVZA9gZDZD"
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
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





//For avoidong Heroku $PORT error
// app.get('/', function(request, response) {
//     var result = 'App is running'
//     response.send(result);
// }).listen(app.get('port'), function() {
//     console.log('App is running, server is listening on port ', app.get('port'));
// });
