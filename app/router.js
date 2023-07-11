const express = require("express");
const app = express();

const router = express.Router();

app.get("/", (req, res) => {
    res.render("Homepage_Membre.ejs", {});
  });
  
  app.get("/Accueil_Membre", (req, res) => {
    res.render("Accueil_Membre.ejs", {});
  });
  
  app.get("/Annonces", (req, res) => {
    res.render("Annonces.ejs", {});
  });
  
  app.get("/Annonce", (req, res) => {
    res.render("Annonce.ejs", {});
  });
  
  app.get("/Creer_une_Annonce", (req, res) => {
    res.render("Creer_une_Annonce.ejs", {});
  });
  
  app.get("/Favoris", (req, res) => {
    res.render("Favoris.ejs", {});
  });
  
  app.get("/Messagerie", (req, res) => {
    res.render("Messagerie.ejs", {});
  });
  
  app.get("/Settings(mobile)", (req, res) => {
    res.render("Settings(mobile).ejs", {});
  });

  module.exports = router;