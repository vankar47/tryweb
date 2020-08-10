var express = require("express");
const User = require("../models/userSchema");
var router = express.Router();
const userSess = require("../middlewares/usersession");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("welcome");
});

router.get("/main", function (req, res, next) {
  res.render("main");
});

router.get("/email", function (req, res, next) {
  res.render("email");
});

router.get("/signin", function (req, res, next) {
  res.render("signin");
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.post("/signin", userSess, async function (req, res, next) {
  let user = await User.findOne({
    emailIp: req.body.emailIp,
    pwdIp: req.body.pwdIp,
  });
  console.log(req.body);

  console.log(user);
  if (!user) {
    console.log("No User Exists");
    return res.redirect("/signin");
  }

  req.session.user = user;
  res.redirect("/main");
});

router.post("/signup", async function (req, res, next) {
  let user = await User.findOne({
    emailIp: req.body.emailIp,
  });
  if (user) console.log("user exists");
  res.redirect("/signin");

  user = new User(req.body);
  await user.save();
  res.redirect("/signin");
});

module.exports = router;
