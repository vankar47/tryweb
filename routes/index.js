var express = require("express");
var router = express.Router();

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

module.exports = router;
