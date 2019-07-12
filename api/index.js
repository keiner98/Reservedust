const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
const bodyParser = require("body-parser");
const records = require("./routes/motelRecords");

const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use("/motel/api", records);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on ${port}`));