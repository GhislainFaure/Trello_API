require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const express = require("express");

const router = require("./app/router");
const port = process.env.PORT || 3000;

const app = express();

// la petite ligne pour réussir à ouvrir un POST

app.use(cors());
const bodyParser = multer();
app.use(bodyParser.none());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./assets"));
app.use(router);

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port} `);
});
