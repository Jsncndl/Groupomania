const express = require("express")
const router = express.Router()

const commentCtrl = require('../controllers/comment')
const auth = require("../middleware/auth")

router.post("/", auth, commentCtrl.newComment)
// router.get("/", auth, commentCtrl.getComments)
// router.put("/:id", auth, commentCtrl.modifyComment)
// router.delete("/:id", auth, commentCtrl.deleteComment)

module.exports = router;