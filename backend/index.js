const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const aboutAPI = require("./api/about");
const educationAPI = require("./api/education");
const experienceAPI = require("./api/experience");
const messageAPI = require("./api/messages");
const authenticationAPI = require("./api/authuntication");

//home
router.get("/about", aboutAPI.index.bind(aboutAPI));
router.post("/about", aboutAPI.store.bind(aboutAPI));

//resume
router.post("/education", educationAPI.store.bind(educationAPI));
router.get("/education", educationAPI.index.bind(educationAPI));

router.get("/experience", experienceAPI.index.bind(experienceAPI));
router.post("/experience", experienceAPI.store.bind(experienceAPI));
router.put("/experience/:id", experienceAPI.update.bind(experienceAPI));
router.delete("/experience/:id", experienceAPI.destroy.bind(experienceAPI));

//get message and send message from contact route
router.post(
  "/contact",
  body("name", "please add a username").notEmpty(),
  body("email", "please add your email").notEmpty().isEmail(),
  body("subject", "please add a subject").notEmpty(),
  body("message", "please add a message").notEmpty(),
  messageAPI.store.bind(messageAPI)
);
router.get("/message", messageAPI.index.bind(messageAPI));
router.delete("/message/:id", messageAPI.destroy.bind(messageAPI));

//login
// router.post('/login', loginAPI.login.bind(loginAPI));
router.post(
  "/register",
  body("username", "please add a username").notEmpty(),
  body("password", "please add a password").notEmpty(),
  authenticationAPI.register.bind(authenticationAPI)
);
router.post(
  "/login",
  body("username", "please add a username").notEmpty(),
  body("password", "please add a password").notEmpty(),
  authenticationAPI.login.bind(authenticationAPI)
);
router.post("/logout", authenticationAPI.logout.bind(authenticationAPI));

module.exports = router;
