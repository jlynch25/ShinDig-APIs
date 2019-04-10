var express = require('express');
// var router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

var username_taken = false;
var email_taken = false;

exports.user_register = (req, res, next) => {

    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    // Check if account already exists
    User.findOne({ 'user_name' :  username }, function(err, user)
    {
        if (err)
            res.send(err);
        // check to see if theres already a user with that email
        if (user) {
          username_taken = true;
        }
        User.findOne({ 'email' :  email }, function(err, user)
        {
            if (err)
                res.send(err);
            // check to see if theres already a user with that email
            if (user) {
                email_taken = true;
            }
            if (username_taken && email_taken){
              res.status(401).json({
                  "status": "info",
                  "body": "username and email already taken"
              });
              email_taken = false;
              username_taken = false;
            }
            else if (email_taken){
              res.status(402).json({
                  "status": "info",
                  "body": "email already taken"
              });
              email_taken = false;
            }
            else if (username_taken){
              res.status(403).json({
                  "status": "info",
                  "body": "Username already taken"
              });
              username_taken = false;
            }
             else {
              // If there is no user with that username create the user
              var newUser = new User();

              // set the user's local credentials
              newUser.user_name = username;
              newUser.password = newUser.generateHash(password);
              newUser.email = email;
              newUser.access_token = createJwt({user_name:username});
              newUser.save(function(err, user) {
                  if (err)
                      throw err;
  	              res.cookie('Authorization', 'Bearer ' + user.access_token);
                  res.json({'success' : 'account created'});

              });
            }
        });
    });
    };


exports.user_login = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({'user_name': username}, function (err, user) {
        // if there are any errors, return the error
        if (err)
            res.send(err);
        // If user account found then check the password
        if (user) {
          // Compare passwords
            if (user.validPassword(password)) {
                // Success : Assign new access token for the session
                user.access_token = createJwt({user_name: username});
                user.save();
                res.cookie('Authorization', 'Bearer ' + user.access_token);
                res.json({'success' : 'loggedIn'});
            }
            else {
                res.status(401).send({
                    "status": "error",
                    "body": "Email or password does not match"
                });
            }
        }
        else
        {
            res.status(401).send({
                "status": "error",
                "body": "Username not found"
            });
        }
    });
};


exports.user_get = (req, res, next) => {

  //UserA  = req.params.id;
  UserA  = req.params.id;


      User.findById(UserA)
        .exec()
        .then(user => {
             if (!user) {
               return res.status(404).json({
                 message: "user not found"
               });
             }
             res.status(200).json({
               user: user,
               request: {
                 type: "GET",
                 url: "http://http://danu7.it.nuigalway.ie:8633/users/:id"
               }
             });
           })
           .catch(err => {
             res.status(500).json({
               error: err
             });
           });
};


exports.user_update = (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.user_friends_list = (req, res, next) => {

     UserA  = req.params.id;

     User.findById(UserA)
       .select('friends')
       .populate({
         path: 'friends',
         select: 'friends',
         match :{'status' : "3"} ,
         populate:( { path: 'recipient', select: 'user_name'} )
       })
       .exec()
       .then(friends => {
            if (!friends) {
              return res.status(404).json({
                message: "friends not found"
              });
            }
            res.status(200).json({
              user: friends,
              request: {
                type: "GET",
                url: "http://http://danu7.it.nuigalway.ie:8633/friendslist"
              }
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
};


exports.user_events_list = (req, res, next) => {

  UserA  = req.params.id;

         User.findById(UserA)
          .select('events')
         // .populate ({path: "friends", select: 'friends'})
           .populate({
             path: 'events',
             select: 'eventID',
             match :{'eventRelationshipStatus' : "1"} ,
            populate:( { path: 'eventID', select: 'description'} )
           })
           .exec()
           .then(events => {
                if (!events) {
                  return res.status(404).json({
                    message: "no events found"
                  });
                }
                res.status(200).json({
                  user: events,
                  request: {
                    type: "GET",
                    url: "http://http://danu7.it.nuigalway.ie:8633/eventslist"
                  }
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
};


exports.user_upload_picture = (req, res, next) => {
    UserA  = req.params.id;  //req.user

    User.findOneAndUpdate(
       {_id:UserA},
      { $set: { profile_picture: req.file.path}},
      function (err, user){
         // if there are any errors, return the error
         if (err)
             res.send(err);
         //if userOne account found
         if (user) {
               if (err)
                   throw err;
               res.json({'success' : 'Profile Picture uploaded'});
         } else
         {
             res.status(401).send({
                 "status": "error",
                 "body": "User not found"
             });
         }
    });
};




function createJwt(profile) {
    return jwt.sign(profile, 'CSIsTheWorst', {
        expiresIn: '10d'
    });
}
