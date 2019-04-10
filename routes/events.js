var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users');
const RelationshipController = require('../controllers/relationships');
const EventController = require('../controllers/events');


//OKAY NOT PERFECT
router.post('/',  EventController.event_create);

router.delete("/:eventId", EventController.event_delete);

router.patch("/:eventId", EventController.event_update);

router.get('/event/:id', EventController.event_get);

router.get('/public/:id', EventController.event_get_public);


module.exports = router;
