const router = require('express').Router();
const likeController = require("../controllers/like.controller")
const { checkUser } = require('../middleware/authenticator.middleware')


// follow display block
router.patch('/like/:id', checkUser, likeController.like)
router.patch('/unlike/:id', checkUser, likeController.unlike)

module.exports = router