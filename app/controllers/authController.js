const bcrypt = require("bcrypt");
const validator = require("email-validator");
const zxcvbn = require("zxcvbn");
const { User } = require("../models/index");

const jwt = require('jsonwebtoken')

const authController = {
  async handleSignup(req, res) {
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
        .json({ errorMessage: "Tous les champs doivent être renseignés." });
      return;
    }
    0;
    if (password !== confirmation) {
      res
        .statut(400)
        .json({ errorMessage: "Les deux mots de passe ne correspondent pas." });
      return;
    }

    if (!validator.validate(email)) {
      res
        .status(400)
        .json({ errorMessage: "Le format de l'email est invalide." });
      return;
    }

    const passwordStrength = zxcvbn(password);
    //!TODO voir pour ajouter des indications à l'utilisateur lorsque son mot de passe n'est pas assez secure
    if (passwordStrength.score < 1) {
      res
        .status(400)
        .json({ errorMessage: "Le mot de passe est trop faible." });
      return;
    }

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

    res.status(201).json(user);
  },

  async handleLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email.toLowerCase() } });

    const isMatching = await bcrypt.compare(password, user.password);

    if (!user || !isMatching) {
      return res
        .status(400)
        .json({ errorMessage: "Mauvais couple email/password." });
    }

    // A chaque connexion, le user reçoit un token que l'on mettra en en-tête des requêtes http sur les routes où il faut être loggué/authentifié
    const token = jwt.sign({userId: user.id, firstname: user.firstname, lastname: user.lastname}, "thisIsASecretToPutInDotEnv", { expiresIn: 1000*60 * 60 })

    // //? on le stock dans la session ?
    // req.session.token = token;

    // console.log(req.session);
    // console.log(req.headers);

    // ou au lieu de le stocker dans la session, on le transmet en json au login et on le stockera dans le store côté front à ce moment ?
    res.status(200).json({auth: true, token: token, user: user});
  },
};

module.exports = authController;
