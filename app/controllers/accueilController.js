const bcrypt = require('bcrypt');
const validator = require('validator');
const zxcvbn = require('zxcvbn');
const { User } = require('../models/index');

const userAuthController = {
  renderLoginPage(req, res) {
    res.render("login");
  },

  renderSignupPage(req, res) {
    res.render("signup");
  },

  async handleSignupForm(req, res) {

    //!On récupère son adress à son inscription ou sa localization?   et ducoup on demande à ce moment la le pseudo? Après je vois qu'il est pas encore en BDD donc je sais plus si on le met?
    const { firstname, lastname, address, email, password, confirmation } = req.body;

    if (! firstname || !lastname || !address || !email || !password || !confirmation) {
      res.render("signup", { errorMessage: "Tous les champs doivent être renseignés." });
      return;
    }

    if (password !== confirmation) {
      res.render("signup", { errorMessage: "Les deux mots de passe ne correspondent pas." });
      return;
    }

    if (! validator.validate(email)) {
      res.render("signup", { errorMessage: "Le format de l'email est invalide." });
      return;
    }

    const passwordStrength = zxcvbn(password);
    if (passwordStrength.score < 3) {
      res.render("signup", { errorMessage: "Le mot de passe est trop faible." });
      return;
    }

    const alreadyExistingUser = await User.findOne({ where: { email: email }});
    if (alreadyExistingUser) {
      res.render("signup", { errorMessage: "Cet email est déjà utilisé par un autre utilisateur." });
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


    res.redirect("login");
  },

  async handleLoginForm(req, res) {

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email.toLowerCase() } });

    if (!user) {
      return res.render("login", { errorMessage: "Mauvais couple email/password." });
    }

    const isMatching = await bcrypt.compare(password, user.password);

    if (! isMatching) {
      return res.render("login", { errorMessage: "Mauvais couple email/password." });
    }

    req.session.userId = user.id;

    //le Accueil_Membre n'est pas bon ce sont des donnés en dur en attendant une solution de Chloé
    res.redirect("/Accueil_Membre");
  },

  logoutAndRedirect(req, res) {
    req.session.userId = null;

    res.redirect("/Accueil_Membre");
  }
};

module.exports = userAuthController;


