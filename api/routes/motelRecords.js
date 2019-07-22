const express = require("express");
var mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
//Connect to DB
conect = () =>
  mysql.createConnection({
    host: "m001.civuexhbxgux.us-east-1.rds.amazonaws.com",
    user: "Will",
    password: "CB27d277",
    database: "motel",
  });

//Storage
const storage = multer.diskStorage({
  destination: path.join(
    path.dirname(require.main.filename),
    "/public/uploads/perfil/"
  ),
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
/**
 * @POST Upload images to public directory
 * @requires formData in request body
 */
router.post("/upload", type, (req, res) => {
  if (!req.file) {
    console.log("No se recibio");
    return res.send({ success: false });
  } else {
    console.log("Se recibio");
    return res.send({ success: true, name: req.file.filename });
  }
});

// Routes for home
router.get("/usuario", (req, res) => {
  db = conect();
  db.query(
    "SELECT * FROM motel.usuario WHERE tipoUsuario=2;",
    (err, result) => {
      return res.send(result);
    }
  );
  db.end();
});

router.post("/motel", (req, res) => {
  db = conect();
  db.query(
    `SELECT * FROM motel.motel WHERE idusuario=${req.body.idusuario};`,
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
router.post("/signup2", (req, res) => {
  console.log(req.body);
  const {
    name,
    lastname,
    email,
    password,
    userType,
    motel,
    phone,
    state,
    address,
    rooms,
    latitude,
    longitude,
  } = req.body;
  db = conect();
  console.log("request body");
  console.log(req.body);
  const user = [name, lastname, email, password, userType];
  const motelData = [motel, phone, state, rooms, address, latitude, longitude];
  db.query(
    `SELECT * FROM usuario where usuario = '${email}'`,
    (err, results) => {
      if (err) throw err;
      if (results.length) {
        res.send({ ans: "Usuario ya esta registrado" });
      } else {
        db.query(
          "INSERT INTO usuario (nombre, apellido, usuario, contraseña, tipoUsuario, nmoteles, imPerfil) VALUES (?, ?, ?, ?, ?, 1, ?)",
          user,
          (err, user) => {
            if (err) throw err;
            db.query(
              "INSERT INTO motel (idusuario, nombreMotel, telefono, estado, habitaciones, direccion, latitud, longitud) VALUES ((SELECT MAX(idusuario) from usuario),?,?,?,?,?,?,?)",
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

router.post("/signup", upload.fields([]), (req, res) => {
  console.log(req.body);
  const {
    name,
    lastname,
    phone,
    email,
    password,
    motel,
    rooms,
    latitude,
    longitude,
    address,
    img,
  } = req.body;
  const user = [name, lastname, email, password, img];
  const motelData = [motel, phone, rooms, address, latitude, longitude];
  console.log(user);
  db = conect();
  db.query(
    `SELECT * FROM usuario where usuario = '${email}'`,
    (err, results) => {
      if (err) throw err;
      if (results.length) {
        res.send({ ans: "Usuario ya esta registrado" });
      } else {
        db.query(
          "INSERT INTO usuario (tipoUsuario, nmoteles, nombre, apellido, usuario, contraseña, imPerfil) VALUES (2, 1, ?, ?, ?, ?, ?)",
          user,
          (err, user) => {
            if (err) throw err;
            db.query(
              "INSERT INTO motel (idusuario, estado, nombreMotel, telefono, habitaciones, direccion, latitud, longitud) VALUES ((SELECT MAX(idusuario) from usuario), 1, ?,?,?,?,?,?)",
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
