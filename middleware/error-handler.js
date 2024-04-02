module.exports = function errorHandler(error, req, res, next) {
  switch (error.name) {
    case "InvalidToken":
    case "JsonWebTokenError":
      res.status(401).json({ message: "Your Token Invalid. Please Login" });
      break;
    case "Forbidden":
      res.status(403).json({ msg: "Only Admin" });
      break;
    //   ======= register dan create cuisines
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: error.errors[0].message });
      break;
    //   login
    case "EmailRequired <<":
      res.status(400).json({ message: "Email is required" });
      break;
    case "passwordRequired <<":
      res.status(400).json({ message: "Password is required" });
      break;
    case "Invalid User <<":
      res.status(401).json({ message: "Email invalid" });
      break;
    case "Invalid User":
      res.status(401).json({ message: "Password invalid" });
      break;
    //   cuisines dll >>> get by id
    case "Not Found":
      res.status(404).json({ message: "Movie Not Found" });
      break;
    case "Invalid Token":
      res.status(400).json({ message: "Already Subscribed" });
      break;

    default:
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
      break;
  }
};
