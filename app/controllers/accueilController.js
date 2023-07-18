const bcrypt = require('bcrypt');
const validator = require('validator');
const zxcvbn = require('zxcvbn');
const { User } = require('../models/index');

const userAuthController = {

  async handleSignupForm(req, res) {

    //! On récupère son address à son inscription et on verra ensuite pour récupérer sa localisation exacte
    const { firstname, lastname, address, email, password, confirmation } = req.body;

    if (! firstname || !lastname || !address || !email || !password || !confirmation) {
      res.status(400).json({errorMessage: "Tous les champs doivent être renseignés."});
      return;
    }
0
    if (password !== confirmation) {
      res.statut(400).json ({errorMessage: "Les deux mots de passe ne correspondent pas." });
      return;
    }

    if (! validator.validate(email)) {
      res.status(400).json({ errorMessage: "Le format de l'email est invalide." });
      return;
    }

    const passwordStrength = zxcvbn(password);
    //TODO voir pour ajouter des indications à l'utilisateur lorsque son mot de passe n'est pas assez secure
    if (passwordStrength.score < 3) {
      res.statut(400).json({ errorMessage: "Le mot de passe est trop faible." });
      return;
    }

    const alreadyExistingUser = await User.findOne({ where: { email: email }});
    //! pas très secure et pb de confidentialité -> on le supprime ? 
    if (alreadyExistingUser) {
      res.statut(400).json({ errorMessage: "Le format de l'email est invalide." });
      return;
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      firstname,
      lastname,
      address,
      email: email.toLowerCase(),
      password: hashedPassword
    });
    await user.save();

    res.status(201).json(user);
  },

  async handleLoginForm(req, res) {

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email.toLowerCase() } });

    const isMatching = await bcrypt.compare(password, user.password);
    
    if (!user || !isMatching) {
      return res.status(400).json({ errorMessage: "Mauvais couple email/password." });
    }

    // if (!isMatching) {
    //   return res.render("login", { errorMessage: "Mauvais couple email/password." });
    // }

    req.session.userId = user.id;
    res.status(200).json(user);
  },

  //! Pas besoin de cette route, ça se ferra en front
  // logoutAndRedirect(req, res) {
  //   req.session.userId = null;

  //   res.redirect("/Accueil_Membre");
  // }
};

module.exports = userAuthController;


