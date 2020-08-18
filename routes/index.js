const mongoose = require("mongoose");
var express = require("express");
const others = require("../models/otherSchema");
const User = require("../models/userSchema");
var router = express();
const userSess = require("../middlewares/usersession");
var q = require("../middlewares/abc");
var cartMid = require("../middlewares/cartMid");
const other = require("../models/otherSchema");
const { assert } = require("@hapi/joi");
const nodemailer = require("nodemailer");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("welcome");
});

router.get("/main", function (req, res, next) {
  res.render("main");
});

router.get("/terms&conditions", function (req, res, next) {
  res.render("terms");
});

router.get("/email", function (req, res, next) {
  res.render("email");
});

router.post("/email", async function (req, res, next) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: req.body.emailIp,
      pass: req.body.pwdIp,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  try {
    let info = await transporter.sendMail({
      from: req.body.emailIp,
      to: "johnvegas72@gmail.com",
      subject: "About Bagend",
      text: req.body.msgem,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.redirect("/other");
    return;
  } catch (err) {
    errorsig = err.message;
    res.render("erroremail", { errorsig });
    return;
  }
});

router.get("/logout", function (req, res, next) {
  req.session.user = null;
  res.redirect("/other");
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
  if (user.emailIp == "admin@admin.com" && user.pwdIp == "admin1")
    return res.redirect("/otherAdmin");
  req.session.user = user;
  res.redirect("/other");
});
router.get("/add", function (req, res, next) {
  res.render("add");
});

router.post("/add", async function (req, res, next) {
  console.log(req.body);
  let others = new other(req.body);
  await others.save();
  res.redirect("/otherAdmin");
});

router.get("/delete/:id", async function (req, res, next) {
  let others = await other.findByIdAndDelete(req.params.id);

  res.redirect("/otherAdmin");
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
    res.status(400).send("User with given email already exists!");
    return;
  }

  user = new User(req.body);
  // var error = user.validateSync();
  // assert.equal(
  //   error.errors["pwdIp"].message,
  //   "password must be atleast 6 letters long!"
  // );

  // await user.save(function (error) {
  //   assert.equal(
  //     error.errors["pwdIp"].message,
  //     "Password is required and should be atleast 6 letters"
  //   );
  //   error = user.validateSync();
  //   assert.equal(
  //     error.errors["pwdIp"].message,
  //     "Password is required and should be atleast 6 letters"
  //   );
  // });

  try {
    const result = await user.save();
    console.log(result);
    res.redirect("/signin");
    return;
  } catch (err) {
    errorsig = err.message;
    res.render("errorsignup", { errorsig });
    return;
  }
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
