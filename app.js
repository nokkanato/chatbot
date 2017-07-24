var express = require('express')
var cors = require('cors')
var routes = require('./routes/api')
var bodyParser  = require('body-parser')
//set up express

var app = express()


app.use(routes)
app.use(bodyParser)

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

// app.set('port', (process.env.PORT || 5000));
//
// // listen for request
// app.listen(process.env.port || 5000, function () {
//   console.log('listenning');
// })
