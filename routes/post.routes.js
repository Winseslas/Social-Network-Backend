const router = require('express').Router();
const postController = require("../controllers/post.controller")
const { checkUser } = require('../middleware/authenticator.middleware')


// follow display block
router.get("/", checkUser, postController.read)
router.post("/new", checkUser, postController.new)
router.get("/show/:id", checkUser, postController.show)
router.put("/update/:id", checkUser, postController.update)
router.delete("/delete/:id", checkUser, postController.delete)


module.exports = router