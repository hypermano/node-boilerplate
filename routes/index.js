var express = require('express');
var router = express.Router();
var urlparser = require('url');
var passport = require('passport');
var Account = require('../models/account');


/**
 * Populate Locals:
 * +authenticated user
 * +available query parameters
 */
router.all("*", function(req, res, next) {
    if (req.user) {
        res.locals.user = req.user.username;
    }

    var params = urlparser.parse(req.url, true).query;
    if (Object.keys(params).length > 0) {
        res.locals.queryParams = params;
    }

    next();
});

/**
 * Login page
 */
router.get('/login', function (req, res) {
    var params = {title: 'Please Log In', path:'/login', submitText: 'Log in'};
    res.render("login", params);
});

/**
 * Login data POST
 * 
 * Uses PASSPORT to manage actual authentication and relevant routing
 */
router.post(
    '/login', 
    passport.authenticate(
        'local', 
        { 
            successRedirect: '/',
            failureRedirect: '/login?reauth' 
        }
    )
);

/**
 * Register page
 */
router.get('/register', function(req, res) {
      res.render('login', {title: 'Please register', path:'/register', submitText: 'Register'});
});

/**
 * Register data POST
 */
router.post('/register', function(req, res) {
    // uses the ACCOUNT model for user creation
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        // immediately authenticates the new user
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

// ----------------------------------------------------------------------------------
// -------------------- AUTHENTICATION REQUIRED BEYOND THIS LINE --------------------
// ----------------------------------------------------------------------------------

/**
 * Gatekeeper
 * Routing all unauthenticated calls to login
 */
router.use('/', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    } else {
        next();
    }}
);

/**
 * Homepage
 */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/**
 * Logout page
 */
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/login');
});

module.exports = router;
