const middleware404 = (_,res) => {
  res.status(404).json({error:"Vous vous êtes perdu?"});
};

module.exports = middleware404;

