function cartMid(req, res, next) {
  if (req.session.user) next();
  else return res.redirect("/signin");
}

module.exports = cartMid;
