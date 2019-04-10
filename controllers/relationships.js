const mongoose = require("mongoose");
const User = require("../models/users");
const Relationship = require('../models/relationships');
const Event = require('../models/events');
const EventRelationship = require('../models/eventrelationships');



exports.relationship_create = (req, res, next) => {
  UserA = req.body.userOne;
  UserB = req.body.userTwo;
  // Check if account already exists
  Relationship.findOne({ 'requester' :  UserA, 'recipient' :  UserB}, function(err, relationship)
  {
      if (err)
          res.send(err);
      // check to see if theres already a user with that email
      if (relationship) {
          res.status(401).json({
              "status": "info",
              "body": "relationship already created"
          });
      } else {

              // If there is no user with that username create the user
              var newRelationship = new Relationship();

              // set the relationships' local credentials
              newRelationship.requester = UserA;
              newRelationship.recipient = UserB;
          //    newRelationship.status = status;
              newRelationship.save(async function(err, user) {
                  if (err)
                      throw err;
                  res.cookie('Authorization', 'Bearer ' + user.access_token);

                  const docA = await Relationship.findOneAndUpdate(
                          { requester: UserA, recipient: UserB },
                          { $set: { status: 1 }},
                          { upsert: true, new: true }
                      )
                      const docB = await Relationship.findOneAndUpdate(
                          { requester: UserB, recipient: UserA },
                          { $set: { status: 2 }},
                          { upsert: true, new: true }
                      )
                      const updateUserA = await  User.findOneAndUpdate(
                          { _id: UserA },
                          { $push: { friends: docA._id }}
                      )
                      const updateUserB = await User.findOneAndUpdate(
                          { _id: UserB },
                          { $push: { friends: docB._id }}
                      )

                  res.json({'success' : 'Relationship created'});

              });
            }
        });
};

exports.relationship_accept =  (req, res, next) => {
  UserA = req.body.userOne;  //req.user
  UserB = req.body.userTwo;

  Relationship.findOneAndUpdate(
        { requester: UserA, recipient: UserB },
        { $set: { status: 3 }},
         function (err, relationship){
                // if there are any errors, return the error
                if (err)
                    res.send(err);
                //if userOne account found
                // if (relationship) {
                //       if (err)
                //           throw err;
                //       res.json({'success' : 'Relationship updated'});
                // } else
                // {
                //     res.status(401).send({
                //         "status": "error",
                //         "body": "Relationship not found"
                //     });
                // }

       Relationship.findOneAndUpdate(
             { requester: UserB, recipient: UserA },
             { $set: { status: 3 }},
              function (err, relationship){
                     // if there are any errors, return the error
                     if (err)
                         res.send(err);
                     //if userOne account found
                     if (relationship) {
                           if (err)
                               throw err;
                           res.json({'success' : 'Relationship updated'});
                     } else
                     {
                         res.status(401).send({
                             "status": "error",
                             "body": "Relationship not found"
                         });
                     }
          });
     });
   };

exports.relationship_reject = async (req, res, next) => {
  UserA = req.body.userOne;
  UserB = req.body.userTwo;

 const docA = await Relationship.findOneAndRemove(
     { requester: UserA, recipient: UserB }
   )
 const docB = await Relationship.findOneAndRemove(
     { requester: UserB, recipient: UserA }
   )

 const updateUserA = await User.findOneAndUpdate(
       { _id: UserA },
       { $pull: { friends: docA._id }},
         async function (err, relationship){
                // if there are any errors, return the error
                if (err)
                    res.send(err);

       const updateUserB = await User.findOneAndUpdate(
             { _id: UserB },
             { $pull: { friends: docB._id }},
              function (err, relationship){
                     // if there are any errors, return the error
                     if (err)
                         res.send(err);
                     //if userOne account found
                     if (relationship) {
                           if (err)
                               throw err;
                           res.json({'success' : 'Relationship deleted'});
                     } else
                     {
                         res.status(401).send({
                             "status": "error",
                             "body": "not found"
                         });
                     }
          });
       });
   };


// exports.relationship_get_requests = async (req, res, next) => {
//
//     UserA  = req.params.id;
//
//     Relationship.find({ recipient : UserA, }, function(err, relationship){
//       if (err)
//           res.send(err);
//       // check to see if theres already a user with that email
//       if (relationship) {
//           res.status(401).json({
//               "status": "info",
//               "body": "relationship already created"
//           });
//       }
//     }
//   }
// }



function createJwt(profile) {
    return jwt.sign(profile, 'CSIsTheWorst', {
        expiresIn: '10d'
    });
}
