var express = require('express');
var router = express.Router();
var Tip = require('../models/tip')

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/list', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(["A", "B", "C", "D"]));
});

router.all('/newtip', function (req, res) {
	if (req.body && req.body.details) {
		Tip.add({details: req.body.details});
		res.send('done');
	} else {
		res.send('failed');
	}
});

router.get('/alltips', function (req, res) {
	res.setHeader('Content-Type', 'application/json');

	Tip.all(function(err, tips) {
        res.send(tips);
    });
});

module.exports = router;
