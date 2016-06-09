var multiparty = require('multiparty');
var fs = require('fs');
var Video = require('../models/video');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'redhat', //change your password here.
     database: 'nodejs',
    port: 3306

});
module.exports = function(app, passport, io) {
	// LOGIN
	app.get('/', function(req, res){
		if(req.user)
			res.redirect('/dashboard');
		else
			res.render('index', {user : req.user, message: req.flash('loginMessage') });
	});

	app.get('/register', function(req, res){
		if(req.user)
			res.redirect('/dashboard');
		else
			res.render('register', {user : req.user, message: req.flash('registerMessage') });
	});

app.get('/updateData/:temperature/:humidity/:accx/:accy/:accz/:intensity/:motion',function(req, res){

	console.log("bla bla bla" +req.params.temperature);
console.log("bla bla bla" +req.params.humidity);
console.log("bla bla bla" +req.params.accx);
console.log("bla bla bla" +req.params.accy);
console.log("bla bla bla" +req.params.accy);
console.log("bla bla bla" +req.params.intensity);
console.log("bla bla bla" +req.params.motion);


var post={temperature:req.params.temperature,humidity:req.params.humidity,accx:req.params.accx,accy:req.params.accy,accz:req.params.accz,intensity:req.params.intensity,motion:req.params.motion};
	var query = connection.query('insert into sensors SET ?', post,function(err,result){
});

res.write("Values Written to database");


	
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/dashboard',
			failureRedirect : '/',
			failureFlash : true
	}));

	app.post('/register', passport.authenticate('local-register', {
			successRedirect : '/dashboard',
			failureRedirect : '/register',
			failureFlash : true
	}));

	//dashboard
	app.get('/dashboard', isLoggedIn, function(req, res) {
		var user = req.user;
		Video.find({owner: user.id}, function(err, dashboard) {
			if(err) throw err;
			res.render('dashboard', {user: user, dashboard: dashboard, message: req.flash('uploadMessage')});
		});
	});
	
function isLoggedIn(req, res, next) {
	console.log("is logged in?");
	if(req.isAuthenticated()) {
		console.log("Yes!");
		return next();
	}
	console.log("No.");
	res.redirect('/');
}

 }
