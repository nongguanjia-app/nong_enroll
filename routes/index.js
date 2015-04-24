var express = require('express');
var service = require('../services/service.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('app/index.html');
});

/* Check User Exist*/
router.get('/api/checkUserExist', function(req, res) {
  service.checkUserExist(req, res);
});

/* Enroll */
router.post('/api/enroll', function(req, res) {
  service.enroll(req, res);
});

router.get('/api/get_excel', function(req, res) {
  service.get_excel(req, res);
});

router.get('/api/get_user', function(req, res) {
  service.get_user(req, res);
});

router.get('/api/sms_handler', function(req, res) {
  service.sms_handler(req, res);
});

module.exports = router;