const express = require("express");
const router = express.Router();
var mysql = require("mysql");

conect = () =>
  mysql.createConnection({
    host: "m001.civuexhbxgux.us-east-1.rds.amazonaws.com",
    user: "Will",
    password: "CB27d277",
    database: "motel",
  });

router.get("/", (req, res) => {
  db = conect();
  db.query(
    "SELECT idmotel, nombreMotel, latitud, longitud FROM motel;",
    (err, result) => {
      return res.send(result);
    }
  );
  db.end();
});

router.post("/login", (req, res) => {
  const { usuario, tipoUsuario, contraseña } = req.body;
  db = conect();
  db.query(
    "SELECT * FROM usuario as u join motel as m ON u.idusuario = m.idusuario  WHERE u.usuario = ? and u.tipoUsuario = ? ",
    [usuario, tipoUsuario],
    (err, user) => {
      if (err) throw err;
      if (!user.length) {
        res.status(401).json({ ans: "Usuario invalido" });
      } else {
        if (user[0].contraseña !== contraseña) {
          res.status(401).json({ ans: "Contraseña invalida" });
        } else {
          res.status(200).json({ ans: "success", userInfo: user[0] });
        }
      }
    }
  );
  db.end();
});

/**
 * Registro queries
 * table: usuario
 * INSERT INTO usuario (usuario, contraseña, tipoUsuario) VALUES ('usuario3@hotmail.com', 'user123', 2);
 *
 * table: motel
 * INSERT INTO motel (idmotel, nombreMotel, telefono, estado, latitud, longitud)
 * VALUES ((SELECT MAX(idusuario) from usuario),'Casa Nuba', '4251232', 1,'11.23274937841482', '-74.1765546798706');
 */

router.post("/signup", (req, res) => {
  console.log(req.body);
  const {
    email,
    password,
    userType,
    motel,
    phone,
    state,
    latitude,
    longitude,
  } = req.body;
  db = conect();
  console.log("request body");
  console.log(req.body);
  const user = [email, password, userType];
  const motelData = [motel, phone, state, latitude, longitude];
  db.query(
    `SELECT * FROM usuario where usuario = '${email}'`,
    (err, results) => {
      if (err) throw err;
      if (results.length) {
        res.send({ ans: "Usuario ya esta registrado" });
      } else {
        db.query(
          "INSERT INTO usuario (usuario, contraseña, tipoUsuario) VALUES (?, ?, ?)",
          user,
          (err, user) => {
            if (err) throw err;
            db.query(
              "INSERT INTO motel (idusuario, nombreMotel, telefono, estado, latitud, longitud) VALUES ((SELECT MAX(idusuario) from usuario),?,?,?,?,?)",
              motelData,
              (err, user) => {
                if (err) throw err;
                res.status(200).send({ ans: "Motel registrado" });
              }
            );
            db.end();
          }
        );
      }
    }
  );
});
module.exports = router;
