const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/MovieController");

// const { authorizationAdminOnly } = require("../middleware/authorization");

// const multer = require("multer");
const { authentication } = require("../middleware/authentication");

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// Table Utama
//cuisine endpoints
// router.use(authentication); // semua endpoint akan otomatis di authentication, dari pada manual satupersatu ditaro di endpoint masing2. Jd semua endpoint itu harus login dulu
router.get("/", MovieController.getMovies);

router.get("/:id", MovieController.getMovieById);
// Add POST Like
router.post("/", MovieController.postMoviesLike);

// Delete Data
router.delete("/:id", MovieController.deleteMoviesLike); // authorization ini sifatnya lokal

// Update Data
router.put("/:id", MovieController.updateMovies);
// Add New Movie
router.post("/", MovieController.postNewMovies);

module.exports = router;
