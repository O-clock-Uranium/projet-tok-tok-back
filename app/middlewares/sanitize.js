const sanitize = require('sanitize-html');

module.exports = (req, _, next) => {
  if(req.body){
    console.log(req.body);
    Object.entries(req.body).forEach(([prop, value]) => {
      console.log(value);
      req.body[prop] = sanitize(value);
    });
  }
  next();
};
