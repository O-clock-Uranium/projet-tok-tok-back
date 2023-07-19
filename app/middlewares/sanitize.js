const sanitize = require('sanitize-html');

module.exports = (req, _, next) => {
  if(req.body){
    Object.entries(req.body).forEach(([prop, value]) => {
      req.body[prop] = sanitize(value);
    });
  }
  next();
}