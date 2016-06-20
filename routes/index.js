module.exports = function(passport){
var express = require('express');
var config = require('../config/main');

var User = require('../models/user');
var Message = require('../models/message');
var jwt  = require('jsonwebtoken'); 

var router = express.Router();

/* GET home page. */

router.get('/*', function(req, res, next) {
  res.render('index');
});

router.get('/chat', passport.authenticate('jwt', { session: false }),  function(req, res, next) {
  res.render('index');
});

router.post('/register', function(req, res) {
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user, config.secret, {
            expiresIn: 10080 // in seconds
          });
          res.json({ success: true, token: 'jwt ' + token, username: user.email});
        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});

// Protect dashboard route with JWT
router.get('/message', passport.authenticate('jwt', { session: false }), function(req, res) {

Message.find({'room':req.body.room}).exec(function(err, messages) {
         if (err) throw err;
         res.json(messages);
     });
});

router.post('/setup', function(req, res) {
  //Array of chat data. Each object properties must match the schema object properties
  var chatData = [{
    createdDate: new Date(),
    content: 'Hi',
    userName: 'Chris',
    room: 'php'
  }, {
    createdDate: new Date(),
    content: 'Hello',
    userName: 'Obinna',
    room: 'laravel'
  }, {
    createdDate: new Date(),
    content: 'Ait',
    userName: 'Bill',
    room: 'angular'
  }, {
    createdDate: new Date(),
    content: 'Amazing room',
    userName: 'Patience',
    room: 'socet.io'
  }];

  //Loop through each of the chat data and insert into the database
  for (var c = 0; c < chatData.length; c++) {
    //Create an instance of the chat model
    var newChat = new Chat(chatData[c]);
    //Call save to insert the chat
    newChat.save(function(err, savedChat) {
      console.log(savedChat);
    });
  }
  //Send a resoponse so the serve would not get stuck
  res.send('created');
});

return router; 
};
