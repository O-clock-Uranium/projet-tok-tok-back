function isAuthed(req, res, next) {
  if (req.user) {
    return next();
  }
  //! voir avec la chef si /login suffit ou je dois importer le controlleur authController

  res.redirect("/login");
}

module.exports = isAuthed;
