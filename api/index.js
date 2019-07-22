const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const records = require("./routes/motelRecords");
const uploads = require("./routes/uploads");

const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/motel/api", records);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on ${port}`));
