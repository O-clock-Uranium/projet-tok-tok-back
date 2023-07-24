require("dotenv").config();

const cors = require("cors");
const express = require("express");
const middleware404 = require("./app/middlewares/404Middleware");
const path = require('path');
const router = require("./app/router");

const app = express();

/**
 * Autorise les requêtes provenant de n'importe quelle origine (localhost, herokuapp, etc.)
 * @see https://www.npmjs.com/package/cors#simple-usage-enable-all-cors-requests
 */
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

//* clean -> décomposer le router en sous-router
app.use(router);

app.use(middleware404);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
