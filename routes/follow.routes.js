const router = require('express').Router();
const followController = require("../controllers/follow.controller")
const { checkUser } = require('../middleware/authenticator.middleware')


// follow display block
router.patch('/follower/:id', checkUser, followController.follow)
router.patch('/followed/:id', checkUser, followController.unFollow)

module.exports = router