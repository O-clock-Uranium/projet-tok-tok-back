const sanitize = require("sanitize-html");

/**
 * Sanitize the request body
 * @param  {...string} key - The keys to sanitize
 */

module.exports =
  (...key) =>
    (req, _, next) => {
      console.log('coucou');
      key.forEach((k) => {
        req.body[k] = sanitize(req.body[k]);
      });
      next();
    };
