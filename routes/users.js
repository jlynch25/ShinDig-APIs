var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users');



var username ;
var email;
//var password;
var UserA;
var UserB;
var rID;
var status;

var eventID;
var location;
var discription;
var time;
var duration;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// router.dynamicHelpers({
//     user: function(req, res){
//         var roles, name;
//
//         if (req.session && req.session.auth == true) {
//             roles = ['member'];
//             name = (req.session.user) ? req.session.user.name : 'Registered member';
//             id = (req.session.user) ? req.session.user.id : 0;
//         }
//         else {
//             roles = ['guest'];
//             name = 'Guest';
//             id = null;
//         }
//
//         return {
//             name: name,
//             id: id,
//             roles: roles,
//             isGuest: roles.indexOf('guest') !== -1,
//             isAdmin: roles.indexOf('admin') !== -1
//         }
//     }
// });








//not tested
router.get('/userid', function(req, res, next) {
          var username = req.body.user_name;
          var stat = req.body.stat;

          User.findOne({'user_name': username}, function (err, user) {
              // if there are any errors, return the error
              if (err)
                  res.send(err);
                  res.json(user);
              // If user account found then get id
              if (user) {
                email = User.email;
                user_name = User.user_name;

                if(stat == 0){
                  UserA = User._id;
                }
                else{
                  UserB = User._id;
                }
              }
            });
        });


  //////////////////////////////////////////////////////////////////////////////////////////////////////////
    // this is for the friend relationshipsSchema

//***GOOD


//NOT IN USE
{
//need to test *******************************************
  //  router.get('/relationship', function(req, res, next) {
  //   var userOne = req.body.userOne;
  //   var userTwo = req.body.userTwo;
  //
  //   Relationship.findOne({'u1ID': userOne,'u2ID': userTwo}, function (err, relationship) {
  //       // if there are any errors, return the error
  //       if (err)
  //           res.send(err);
  //       // If user account found then get id
  //       if (relationship) {
  //
  //         rID =  Relationship._id;
  //         status = Relationship.status;
  //         res.json({'success' : 'Relationship found'});
  //     //    res.json({'success' : 'Relationship found'});
  //       //  userTwo = Relationship.;
  //
  //       } else
  //       {
  //           res.status(401).send({
  //               "status": "error",
  //               "body": "Relationship not found"
  //           });
  //       }
  //     });
  // });



//update relationship status
  // router.patch('/relationship', function(req, res, next){
  //     // var userOne = req.body.u1ID;
  //     // var userTwo = req.body.u2ID;
  //
  //         status = req.body.status;
  //
  //
  // Relationship.findOneAndUpdate(
  //       { requester: UserA, recipient: UserB },
  //       { $set: { status: 3 }},
  //        function (err, relationship){
  //               // if there are any errors, return the error
  //               if (err)
  //                   res.send(err);
  //               //if userOne account found
  //               if (relationship) {
  //                     if (err)
  //                         throw err;
  //                     res.json({'success' : 'Relationship updated'});
  //               } else
  //               {
  //                   res.status(401).send({
  //                       "status": "error",
  //                       "body": "Username not found"
  //                   });
  //               }
  //    });
  // });
}



//NOT IN USE
{
  // router.get('/relationship1', function(req, res, next) {
  //   var userOne = req.body.userOne;
  //   var userTwo = req.body.userTwo;
  //
  //       Relationship.
  //         findOne({ 'user1': userOne,'user2': userTwo }).
  //         populate('user2').
  //         exec(function (err, relationship) {
  //           // if there are any errors, return the error
  //           if (err) return handleError(err);
  //           // If user account found then get id
  //           if (relationship) {
  //
  //             console.log('The user is %s', relationship.user2.email);
  //             res.json({'success' : 'Relationship found'});
  //             // prints "The author is Ian Fleming"
  //         }
  //
  //         else
  //         {
  //             res.status(401).send({
  //                 "status": "error",
  //                 "body": "Relationship not found"
  //             });
  //         }
  //     });
  // });

  // router.get('/relationship', function(req, res, next) {
  //   var userOne = req.body.userOne;
  //   var userTwo = req.body.userTwo;
  //
  //       Relationship.
  //         findOne({ 'user1': userOne,'user2': userTwo }).
  //         populate('user2').
  //         exec(function (err, relationship) {
  //           // if there are any errors, return the error
  //           if (err) return handleError(err);
  //           // If user account found then get id
  //           if (relationship) {
  //
  //             console.log('The user is %s', relationship.user2.email);
  //             res.json({'success' : 'Relationship found'});
  //             // prints "The author is Ian Fleming"
  //         }
  //
  //         else
  //         {
  //             res.status(401).send({
  //                 "status": "error",
  //                 "body": "Relationship not found"
  //             });
  //         }
  //     });
  // });

}



//***NOT WORKING
//*** SUCCESSFUL FOR USERS AND NOT USERS

{ // router.get('/friendslist', function(req, res, next) {
  //   var userOne = req.body.userOne;
  //
  //        User.
  //         find({ 'user_name': userOne}).
  //         populate({
  //           path: 'friends',
  //           match: { status : 3},
  //           populate: { path: "recipient", select: 'user_name'}
  //         }).
  //         exec(function (err, friends) {
  //           // if there are any errors, return the error
  //           if (err) return handleError(err);
  //           // If user account found then get id
  //           if (friends) {
  //
  //         //    console.log('The user is %s', relationship.u2ID.user_name);
  //             res.json({'success' : 'Friends found'});
  //           	res.json(friends);
  //             // prints "The author is Ian Fleming"
  //         }
  //
  //         else
  //         {
  //             res.status(401).send({
  //                 "status": "error",
  //                 "body": "No friends found"
  //             });
  //         }
  //     });
  //
  //     // User.aggregate([
  //     //   { "$lookup": {
  //     //     "from": Friend.collection.name,
  //     //     "let": { "friends": "$friends" },
  //     //     "pipeline": [
  //     //       { "$match": {
  //     //         "recipient": userOne,
  //     //         "$expr": { "$in": [ "$_id", "$$friends" ] }
  //     //       }},
  //     //       { "$project": { "status": 1 } }
  //     //     ],
  //     //     "as": "friends"
  //     //   }},
  //     //   { "$addFields": {
  //     //     "friendsStatus": {
  //     //       "$ifNull": [ { "$min": "$friends.status" }, 0 ]
  //     //     }
  //     //   }}
  //     // ])
  //
  // });
}


// NEED TO FIX UP USERS AND FRIENDS FIRST
// ////////////////////////////////////////////////////////////////
// // EVENTS CODE
//


//***NOT WORKING
  router.get('/eventGoinglist', function(req, res, next) {
    var eventID = req.body.eventID;

         Event.
          find({ 'eventID': eventID}).
          populate({
            path: 'invitees',
            match: { eventRelationshipStatus : 1},
            populate: { path: "recipient", select: 'user_name'}
          }).
          exec(function (err, invitees) {
            // if there are any errors, return the error
            if (err) return handleError(err);
            // If user account found then get id
            if (invitees) {

          //    console.log('The user is %s', relationship.u2ID.user_name);
              res.json({'success' : 'users going found'});
          //    res.json(invitees);
              // prints "The author is Ian Fleming"
          }

          else
          {
              res.status(401).send({
                  "status": "error",
                  "body": "No users going found"
              });
          }
      });

  });

//LATTER
{

//   router.get('/event', function(req, res, next) {
//       var username = req.body.user_name;
//       var stat = req.body.stat;
//
//       User.findOne({'user_name': username}, function (err, user) {
//           // if there are any errors, return the error
//           if (err)
//               res.send(err);
//           // If user account found then get id
//           if (user) {
//             email = User.email;
//             user_name = User.user_name;
//
//           }
//         });
//     });
//
}


//*** GOOD
router.patch('/eventaccept', function(req, res, next){
  eventID = req.body.event;
  UserA = req.body.userOne;
  UserB = req.body.userTwo;

  EventRelationship.findOneAndUpdate(
        {eventID  : eventID , requester: UserA, recipient: UserB },
        { $set: { eventRelationshipStatus: 1 }},
         function (err, eventrelationship){
                // if there are any errors, return the error
                if (err)
                    res.send(err);
                //if userOne account found
                if (eventrelationship) {
                      if (err)
                          throw err;
                      res.json({'success' : 'Event Relationship updated'});
                } else
                {

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
                }
     });



   });

//***GOOD
   router.patch('/eventreject',async function(req, res, next){
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
                         res.json({'success' : 'event Relationship A updated'});
                   } else
                   {
                     res.status(401).send({
                         "status": "error",
                         "body": "User ID not found"
                     });

                   }
        });
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
                            res.json({'success' : 'Event Relationship B updated'});
                      } else
                      {
                          res.status(401).send({
                              "status": "error",
                              "body": "User ID not found"
                          });
                      }
           });

      });

{
//
//
// /////////////////////////////////////////////
// //EVENT RELATIONSHIP
//
// router.post('/eventRelationship', function(req, res, next){
//   eventID = req.body.event_id;
//   UserA = req.body.user1_id;
//   UserB = req.body.userTwo_id;
//   estatus = req.body.eventstatus;
//
//               //  create the Event
//               var newEventRelationship = new EventRelationship();
//
//               // set the relationships' local credentials
//               newEventRelationship.eventID = eventID;
//               newEventRelationship.user1ID = UserA;
//               newEventRelationship.user2ID = UserB;
//               newEventRelationship.estatus = estatus;
//               newEventRelationship.save(function(err, user) {
//                   if (err)
//                       throw err;
//                   res.cookie('Authorization', 'Bearer ' + user.access_token);
//                   res.json({'success' : 'Event Relationship created'});
//
//               });
//   });

}

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 300 * 300
  },
  fileFilter: fileFilter
});






//GOOD
router.post('/register', UserController.user_register);

router.post("/login", UserController.user_login);

router.get('/:id',  UserController.user_get);

router.delete("/:userId", UserController.user_delete);

router.get('/friendslist/:id',  UserController.user_friends_list);

router.get('/eventslist/:id',  UserController.user_events_list);

router.patch('/uploadpicture/:id',upload.single('profile_picture'),  UserController.user_upload_picture);




module.exports = router;
