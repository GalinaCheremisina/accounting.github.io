const express = require("express");

const postController = require("../controllers/bill");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, postController.createBill);

router.put("", checkAuth, postController.updateBill);

router.get("", postController.getBill);

module.exports = router;
