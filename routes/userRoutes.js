const express = require("express");

const authController = require("../controllers/authController");
//const protect = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/signup",authController.signUp);
router.post("/login",authController.login);
//router
//  .route("/:id")
//  .get( postController.getO nePost)
//  .patch( postController.updatePost)
 // .delete( postController.deletePost);

module.exports = router;