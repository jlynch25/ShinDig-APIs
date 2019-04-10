var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users');
const RelationshipController = require('../controllers/relationships');


  //GOOD
  router.post('/relationship', RelationshipController.relationship_create);

  router.patch('/accept', RelationshipController.relationship_accept);

  router.patch('/reject', RelationshipController.relationship_reject);

//TODO
// router.get('/requests/:id', RelationshipController.relationship_get_requests);


  module.exports = router;
