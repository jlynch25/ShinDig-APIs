const mongoose = require("mongoose");
const Relationship = require('../models/relationships');
const Event = require('../models/events');
const EventRelationship = require('../models/eventrelationships');
const User = require("../models/users");



exports.event_create = (req, res, next) => {
  location = req.body.location;
  description = req.body.description;
  time = req.body.time;
  eventStatus = req.body.eventStatus;
  UserA = req.body.creater;

              //  create the Event
              var newEvent = new Event();

              // set the relationships' local credentials
              newEvent.location = location;
              newEvent.description = description;
              newEvent.time = time;
              newEvent.eventStatus = eventStatus;
              newEvent.creater = UserA;
              newEvent.save(async function(err, user) {
                  if (err)
                      throw err;
                 res.cookie('Authorization', 'Bearer ' + user.access_token);

                  const docA = await Event.findOne(
                          { creater: UserA }//, location: location, discription: discription, time: time} //, duration: duration},
                          // ^^^^^^^^^^^^^ NOT going to work in the long run ie if a user creates 2 or more events
                          //{ upsert: true, new: true }
                      )
                      const updateUserA = await  User.findOneAndUpdate(

                          { _id: UserA },
                          { $push: { events: docA._id }}
                      )

                  res.json({'success' : 'Event created'});


              });
};

exports.event_update = (req, res, next) => {
  const id = req.params.eventId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Event.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Event updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.event_delete = (req, res, next) => {
  Event.remove({ _id: req.params.eventId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "event deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.event_get = (req, res, next) => {

  EventA  = req.params.id;

      Event.findById(EventA)
        .exec()
        .then(user => {
             if (!user) {
               return res.status(404).json({
                 message: "event not found"
               });
             }
             res.status(200).json({
               user: user,
               request: {
                 type: "GET",
                 url: "http://http://danu7.it.nuigalway.ie:8633/events/:id"
               }
             });
           })
           .catch(err => {
             res.status(500).json({
               error: err
             });
           });
};

exports.event_get_public = (req, res, next) => {

  //UserA  = req.params.id;
  UserA  = req.params.id;

  Event.find({ 'eventStatus': 1 }, function (err, docs) {
  // docs is an array
})
  //  .select("location")
    .exec()
    .then(events => {
         if (!events) {
           return res.status(404).json({
             message: "event not found"
           });
         }
         res.status(200).json({
           publicEvents: events,
           request: {
             type: "GET",
             url: "http://http://danu7.it.nuigalway.ie:8633/events/public/:id"
           }
         });
       })
       .catch(err => {
         res.status(500).json({
           error: err
         });
       });
};


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

  function createJwt(profile) {
      return jwt.sign(profile, 'CSIsTheWorst', {
          expiresIn: '10d'
      });
  }
