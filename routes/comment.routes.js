const router = require('express').Router();
const commentController = require("../controllers/comment.controller")
const { checkUser } = require('../middleware/authenticator.middleware')

// follow display block
router.get("/", checkUser, commentController.read)
router.post("/new", checkUser, commentController.new)
router.get("/show/:id", checkUser, commentController.show)
router.put("/update/:id", checkUser, commentController.update)
router.delete("/delete/:id", checkUser, commentController.delete)


module.exports = router