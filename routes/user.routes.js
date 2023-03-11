const router = require('express').Router();
const authenticatorController = require('../controllers/authenticator.controller');
const uploadController = require('../controllers/upload.controller');
const userController = require("../controllers/user.controller")

const multer = require("multer")
const upload = multer()
const { checkUser } = require('../middleware/authenticator.middleware')


// Authenticator controller
router.post('/login', authenticatorController.signIn)
router.post('/register', authenticatorController.signUp)
router.get('/logout', checkUser, authenticatorController.logout)

// user display block
router.get("/", checkUser, userController.read)
router.get("/show/:id", checkUser, userController.show)
router.put("/update/:id", checkUser, userController.update)
router.delete("/delete/:id", checkUser, userController.delete)

// upload
router.post("/upload", upload.single('file'), uploadController.uploadProfil)

module.exports = router