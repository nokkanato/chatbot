var express = require('express')
var cors = require('cors')
var routes = require('./routes/api')
var bodyParser  = require('body-parser')
//set up express

var app = express()


app.use(routes)
app.use(bodyParser)


// listen for request
app.listen(process.env.port || 4000, function () {
  console.log('listenning');

})