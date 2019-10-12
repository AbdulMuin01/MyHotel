var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	let data = {
		layout: 'main',
		title: 'MyHotel', 
	};
	res.render('index', data);
});

router.get('/login', function(req, res, next){
	let dat = {
		layout: 'login',
		title: 'Sign-in',
	};
	res.render('login', dat);
});
module.exports = router;
