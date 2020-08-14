const mongoose = require("mongoose");
var express = require("express");
const others = require("../models/otherSchema");
const User = require("../models/userSchema");
var router = express();
const userSess = require("../middlewares/usersession");
var q = require("../middlewares/abc");
var cartMid = require("../middlewares/cartMid");
const other = require("../models/otherSchema");

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

router.get("/other", async function (req, res, next) {
  var other = await others.find({});
  console.log(other);
  res.render("other", { other });
});

router.get("/signin", function (req, res, next) {
  res.render("signin");
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.get("/otherAdmin", async function (req, res, next) {
  let Others = await other.find();

  res.render("otherAdmin", { Others });
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
  if (user.emailIp == "admin@admin.com" && user.pwdIp == "admin")
    return res.redirect("/otherAdmin");
  req.session.user = user;
  res.redirect("/other");
});
router.get("/add", function (req, res, next) {
  res.render("add");
});

router.post("/add", async function (req, res, next) {
  let others = new other(req.body);
  await others.save();
  res.redirect("/otherAdmin");
});

router.get("/delete/:id", async function (req, res, next) {
  let others = await other.findByIdAndDelete(req.params.id);

  res.redirect("/comicsAdmin");
});

router.get("/edit/:id", async function (req, res, next) {
  let others = await other.findById(req.params.id);
  res.render("edit", { others });
});

router.post("/edit/:id", async function (req, res, next) {
  let others = await other.findById(req.params.id);
  others.image = req.body.image;
  others.title = req.body.title;
  others.by = req.body.by;
  others.rating = req.body.rating;
  others.price = req.body.price;
  others.quantity = req.body.quantity;
  await others.save();
  res.redirect("/otherAdmin");
  return;
});

router.post("/signup", async function (req, res, next) {
  let user = await User.findOne({
    emailIp: req.body.emailIp,
  });
  if (user) {
    console.log("user exists");
    res.redirect("/signin");
    return;
  }

  user = new User(req.body);
  await user.save();
  res.redirect("/signin");
});

router.get("/cart", async function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  console.log(cart);
  res.render("cart", { cart });
});

router.get("/cart/AddtoCart/:id", cartMid, async function (req, res, next) {
  let other = await others.findById(req.params.id);
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(other);
  res.cookie("cart", cart);
  res.redirect("/other");
});

router.get("/cart/remove/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => {
      c._id == req.params.id;
    }),
    1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});

router.get("/succ", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  var i = 0;
  try {
    for (i = 0; i < 50; i++) {
      let c = await others.findOne({ _id: cart[i]._id });
      c.quantity = c.quantity - 1;
      await c.save();
    }
  } catch {}
  cart.splice(0, 50);
  res.cookie("cart", cart);
  res.render("succ");
});

module.exports = router;
