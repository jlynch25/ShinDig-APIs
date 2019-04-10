var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users');
const RelationshipController = require('../controllers/relationships');
const EventController = require('../controllers/events');
const EventRelationshipController = require('../controllers/eventrelationships');


//OKAY GOOD
router.post('/', EventRelationshipController.eventrelationship_create);

router.post('/Public/go', EventRelationshipController.eventrelationship_go);

router.patch('/accept', EventRelationshipController.eventrelationship_accept);


router.patch('/reject', EventRelationshipController.eventrelationship_reject);



module.exports = router;
