require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./app/router");
const middleware404 = require("./app/middlewares/middleware404");

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

//* clean -> décomposer le router en sous-router
app.use(router);

app.use(middleware404);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
