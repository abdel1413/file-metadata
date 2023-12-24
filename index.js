var express = require("express");
var cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const port = process.env.PORT || 3000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log("file", req.file.originalname);
  console.log("file", req.file.mimetype);
  console.log("file", req.file.size);
  const { originalname, mimetype, size } = req.file;
  res.json({
    name: originalname,
    type: mimetype,
    size,
  });
});

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("App is successfully connected to db");
    app.listen(port, function () {
      console.log("Your app is listening on port " + port);
    });
  })
  .catch((e) => console.log("Opps, failed to connect ", e));
