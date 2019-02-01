const express = require("express");

const eventController = require("../controllers/events");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, eventController.createEvent);

router.get("", checkAuth, eventController.getEvents);

router.get("/:id", checkAuth, eventController.getEventById);

router.delete("", checkAuth, eventController.deleteEvent);

module.exports = router;
