const express = require('express')
const router = express.Router();


router.get('/api/get', function (req, res) {
  res.send({type: 'GET'})

})
router.get('/', function (req, res) {
  // res.json({'username': "nokkanato"})
  res.sendStatus(200)

})

router.post('/api/post', function (req, res) {
  console.log(req.body)
  res.send({type: 'POST'})

})





function prepareMessage(msg) {
  var deliver = cheackCategory(msg)
  return deliver

}




module.exports = router;
