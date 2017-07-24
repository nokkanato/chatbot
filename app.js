
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
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})


//For avoidong Heroku $PORT error
// app.get('/', function(request, response) {
//     var result = 'App is running'
//     response.send(result);
// }).listen(app.get('port'), function() {
//     console.log('App is running, server is listening on port ', app.get('port'));
// });
