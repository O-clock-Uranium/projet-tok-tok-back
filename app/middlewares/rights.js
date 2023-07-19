function isAuthed(req, res, next) {
  if (req.user) {
    return next();
  }
  res.status(401).json({ auth: false, error: "You are not authorized to see this!" });
};

module.exports = isAuthed;
