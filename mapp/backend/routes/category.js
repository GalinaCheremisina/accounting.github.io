const express = require("express");

const categoryController = require("../controllers/category");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, categoryController.createCategory);

router.put("/:id", checkAuth, categoryController.updateCategory);

router.get("", checkAuth, categoryController.getCategories);

router.get("/:id", checkAuth, categoryController.getCategiryById);

router.delete("/:id", checkAuth, categoryController.deleteCategory);

module.exports = router;
