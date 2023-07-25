const bcrypt = require("bcrypt");
const validator = require("email-validator");
//const zxcvbn = require("zxcvbn");
const { User } = require("../models/index");

const jwt = require("jsonwebtoken");

const authController = {
  async signup(req, res) {
    //? On récupère son addresse à son inscription et on verra ensuite pour récupérer sa localisation exacte
    //! Ne pas oublier le champs confirmation en front et reprendre exactement les mêmes names
    const { firstname, lastname, address, email, password, confirmation } =
      req.body;

    if (
      !firstname ||
      !lastname ||
      !address ||
      !email ||
      !password ||
      !confirmation
    ) {
      res
        .status(400)
        .json({ errorMessage: "Tous les champs doivent être renseignés !" });
      return;
    }

    if (password !== confirmation) {
      res
        .statut(400)
        .json({ errorMessage: "Les deux mots de passe ne correspondent pas !" });
      return;
    }

    if (!validator.validate(email)) {
      res
        .status(400)
        .json({ errorMessage: "Le format de l'email est invalide !" });
      return;
    }

    //* on le retire tant qu'on ne sait pas à quoi correspond le score (pas cool pour l'ux si pas d'indications), voire on fait notre propre fonction
    // const passwordStrength = zxcvbn(password);
    // if (passwordStrength.score < 1) {
    //   res
    //     .status(400)
    //     .json({ errorMessage: "Le mot de passe est trop faible." });
    //   return;
    // }

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      firstname,
      lastname,
      address,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.SECRETTOKEN, {
      expiresIn: process.env.EXPIREDATETOKEN
    });

    console.log(user);

    //TODO: ne pas renvoyer tout user, il contient le pwd et autres données sensibles !!
    res.status(201).json({message: "Compte crée", auth: true, token: token, user: user});
  },

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email.toLowerCase() } });

    const isMatching = await bcrypt.compare(password, user.password);

    if (!user || !isMatching) {
      return res
        .status(400)
        .json({ errorMessage: "Mauvais couple email/password !" });
    }

    // A chaque connexion, le user reçoit un token que l'on mettra en en-tête des requêtes http sur les routes où il faut être loggué/authentifié
    const token = jwt.sign({ userId: user.id }, process.env.SECRETTOKEN, {
      expiresIn: process.env.EXPIREDATETOKEN
    });

    res.json({ auth: true, token: token, user: user});
  },
};

module.exports = authController;
