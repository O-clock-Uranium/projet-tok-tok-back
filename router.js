const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("Homepage_Membre.ejs", {});
});

router.get("/Accueil_Membre", (req, res) => {
  res.render("Accueil_Membre.ejs", {});
});

router.get("/Annonces", (req, res) => {
  res.render("Annonces.ejs", {});
});

router.get("/Annonce", (req, res) => {
  res.render("Annonce.ejs", {});
});

router.get("/Creer_une_Annonce", (req, res) => {
  res.render("Creer_une_Annonce.ejs", {});
});

router.get("/Favoris", (req, res) => {
  res.render("Favoris.ejs", {});
});

router.get("/Messagerie", (req, res) => {
  res.render("Messagerie.ejs", {});
});

router.get("/Settings(mobile)", (req, res) => {
  res.render("Settings(mobile).ejs", {});
});

module.exports = router;
