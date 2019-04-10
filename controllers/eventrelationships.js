const mongoose = require("mongoose");
const Relationship = require('../models/relationships');
const Event = require('../models/events');
const EventRelationship = require('../models/eventrelationships');
const User = require("../models/users");



exports.eventrelationship_create = (req, res, next)  => {
  eventID = req.body.event;
  UserA = req.body.userOne;
  UserB = req.body.userTwo;
  //status = req.body.status;

 //  const doc1 = await Event.findOne(
 //          { eventID: eventID},
 //          'creater',
 //           function (err, event) {}
 //         )
 // const doc2 = await Event.findOne(
 //         { eventID: eventID},
 //
 //          function (err, event) {}
 //        ).populate({path: 'invitees', select: 'requester'})


  // if(doc1 != UserB || doc2 != UserB)
  //     {

        //  create the EventRelationship
        var newEventRelationship = new EventRelationship();

        // set the relationships' local credentials
        newEventRelationship.eventID = eventID;
        newEventRelationship.requester = UserA;
        newEventRelationship.recipient = UserB;
        //newEventRelationship.eventRelationshipStatus = 0;
        //    newRelationship.status = status;
        newEventRelationship.save(async function(err, user) {
            if (err)
                throw err;
            res.cookie('Authorization', 'Bearer ' + user.access_token);

              //NB
              //the requester should be already going
              //NB

            // const docA = await Event.findOneAndUpdate(
            //         { eventID: eventID} //,
            //         // { $set: { eventRelationshipStatus: 1 }},
            //         // { upsert: true, new: true }
            //     )

            const docB = await EventRelationship.findOneAndUpdate(
                { eventID : eventID, requester: UserA, recipient: UserB } ,
                { $set: { eventRelationshipStatus: 0 }},
                { upsert: true, new: true }
            )

              // const updateEventA = await  Event.findOneAndUpdate(
              //     { _id: eventID },
              //     { $push: {invitees: docA._id }}
              // )

              const updateEventB = await  Event.findOneAndUpdate(
                  { _id: eventID },
                  { $push: {invitees: docB._id }}
              )

              // const updateUserA = await  User.findOneAndUpdate(
              //     { _id: UserA },
              //     { $push: { events: docA._id }}
              // )

            const updateUserB = await User.findOneAndUpdate(
                { _id: UserB },
                { $push: { events: docB._id }}
            )

              res.json({'success' : 'Event Relationship created'});

        });
      // }
      // else{
      //   res.json({'error' : 'User already an invitee'});
      // }
};


//PUBLIC EVENTS ONLY
exports.eventrelationship_go = (req, res, next) => {
  eventID = req.body.event;
  UserA = req.body.userOne;
  var newEventRelationship = new EventRelationship();

  // set the relationships' local credentials
  newEventRelationship.eventID = eventID;
  newEventRelationship.recipient = UserA;
  //newEventRelationship.eventRelationshipStatus = 0;
  //    newRelationship.status = status;
  newEventRelationship.save(async function(err, user) {
      if (err)
          throw err;
      res.cookie('Authorization', 'Bearer ' + user.access_token);

  const docA = await EventRelationship.findOneAndUpdate(
      { eventID : eventID, recipient: UserA } ,
      { $set: { eventRelationshipStatus: 1 }},
      { upsert: true, new: true }
  )

  const updateEvent = await  Event.findOneAndUpdate(
      { _id: eventID },
      { $push: {invitees: docA._id }}
  )

  const updateUser = await User.findOneAndUpdate(
      { _id: UserA },
      { $push: { events: eventID }}
  )

  res.json({'success' : 'Event Relationship created: UserA going'});

});
};
//PUBLIC EVENTS ONLY


exports.eventrelationship_accept = (req, res, next) => {
  eventID = req.body.event;
  UserA = req.body.userOne;
  UserB = req.body.userTwo;

          EventRelationship.findOneAndUpdate(
              { eventID  : eventID, requester: UserA, recipient: UserB },
              { $set: {   eventRelationshipStatus : 1 }},
               function (err, relationship){
                  // if there are any errors, return error
                  if (err)
                      res.send(err);
                  //if userOne account found
                  if (relationship) {
                        if (err)
                            throw err;
                        res.json({'success' : 'Event Relationship updated'});
                  } else
                  {
                      res.status(401).send({
                          "status": "error",
                          "body": "Event Relationship not found"
                      });
                  }
             });
};


exports.eventrelationship_reject = async (req, res, next) => {
    eventID = req.body.event;
    UserA = req.body.userOne;
    UserB = req.body.userTwo;

    const docA = await EventRelationship.findOneAndRemove(
       { eventID  : eventID, requester: UserA, recipient: UserB }
     )
    // const docB = await Event.findOneAndRemove(
    //     { recipient: UserA, requester: UserB }
    //   )

    const updateEvent = await Event.findOneAndUpdate(
         { _id: eventID },
         { $pull: { invitees: docA._id }},
         async  function (err, user){
            // if there are any errors, return the error
            if (err)
                res.send(err);
            //if userOne account found
            if (user) {
                if (err)
                    throw err;

                const updateUser = await User.findOneAndUpdate(
                    { _id: UserB },
                    { $pull: { events: eventID }},
                     function (err, relationship){
                          // if there are any errors, return the error
                          if (err)
                              res.send(err);
                          //if userOne account found
                          if (relationship) {
                                if (err)
                                    throw err;
                                res.json({'success' : 'Event Relationship updated'});
                          } else
                          {
                              res.status(401).send({
                                  "status": "error",
                                  "body": "User ID not found"
                              });
                          }
                   });

            } else
            {
              res.status(401).send({
                  "status": "error",
                  "body": "User ID not found"
              });

            }
       });

};



function createJwt(profile) {
    return jwt.sign(profile, 'CSIsTheWorst', {
        expiresIn: '10d'
    });
}
