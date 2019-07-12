const express = require("express");
const router = express.Router();
var mysql = require("mysql");

conect = () =>
  mysql.createConnection({
    host: "m001.civuexhbxgux.us-east-1.rds.amazonaws.com",
    user: "Will",
    password: "CB27d277",
    database: "motel"
  });

router.get("/", (req, res) => {
  db = conect();
  db.query("SELECT idmotel, nombreMotel, latitud, longitud FROM motel;", (err, result) => {
    return res.send(result);
  });
});

module.exports = router;