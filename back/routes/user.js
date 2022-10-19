const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.put("/:id", auth, multer, userCtrl.modifyProfile);
router.delete("/:id", auth, userCtrl.deleteProfile);
router.get("/:id", auth, userCtrl.getProfile);

module.exports = router;
