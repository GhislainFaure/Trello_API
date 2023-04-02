require("dotenv").config();

const express = require("express");
const router = require("./app/router");
const port = process.env.PORT || 3000;

const app = express();

// la petite ligne pour réussir à ouvrir un POST

app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port} `);
});
