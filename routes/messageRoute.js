const express = require("express");
const { newMessage, getMessages } = require("../controller/messages");
const router = express.Router();

router.route("/").get(getMessages);
router.route("/new").post(newMessage);

module.exports = router;
