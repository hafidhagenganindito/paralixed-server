if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // package tambahan
}
const errorHandler = require("./middleware/error-handler");
const express = require("express");
const HelloController = require("./controllers/HelloController");
const cors = require("cors");
// const midtransClient = require("midtrans-client");
// const { User } = require("./models");
// const { comparePass, createToken, readPayLoad } = require("./helpers");

const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get("/", HelloController.getHello);
app.use(router);

console.log(process.env);
// app.listen(PORT, () => {
//   console.log(`Server can be access in http://localhost:${PORT}`);
// });

app.use(errorHandler);

module.exports = app;
