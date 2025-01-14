const express = require("express");
const router = express.Router();
const auth = require("./auth");
const movies = require("./movies");
const { authentication } = require("../middleware/authentication");
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
router.use(auth);
// router.use(authentication);
router.use("/movies", movies);

module.exports = router;
