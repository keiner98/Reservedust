const express = require("express");
var mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();
//Connect to dataBase
conect = () =>
  mysql.createConnection({
    host: "m001.civuexhbxgux.us-east-1.rds.amazonaws.com",
    user: "Will",
    password: "CB27d277",
    database: "motel",
  });

//Storage
const storage = multer.diskStorage({
  destination: "./uploads/perfil/",
  filename: function(req, file, cb) {
    console.log(file);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: storage });
var type = upload.single("perfil");

// Store images
router.post("/upload", type, (req, res) => {
  console.log(req.file);
  if (!req.file) {
    console.log("No se recibio");
    return res.send({
      success: false,
    });
  } else {
    console.log("Se recibio");
    return res.send({
      success: true,
    });
  }
});

// Request images
router.get("/requestim", (req, res) => {
  let path = __dirname + "\\uploads\\perfil\\perfil-1563745850394.jpg";
  console.log(path);
  res.sendFile(path);
  res.json("bye");
});
