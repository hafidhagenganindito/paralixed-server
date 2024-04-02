const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = class AuthController {
  static async register(req, res, next) {
    try {
      const user = await User.create(req.body);

      res.status(201).json(user); // harusnya balikan data
    } catch (error) {
      // if (
      //   error.name === "SequelizeValidationError" ||
      //   error.name === "SequelizeUniqueConstraintError" // apabila email ke duplicate
      // ) {
      //   let message = error.errors[0].message;
      //   console.log(message, "ini msg error dari sequelize");

      //   res.status(400).json({
      //     message: message,
      //   });
      // } else {
      //   res.status(500).json({
      //     message: "Internal server error",
      //   });
      // }
      next();
    }
  }
  static async login(req, res, next) {
    try {
      // flow membuat login
      // cek dulu email & pass. ada ga/ dan login itu gak melalui model validasis
      // Buat validasi sendiri secara manual, krn tdk create dan update dan g lewat model
      const { email, password } = req.body;
      if (!email) throw { name: "EmailRequired <<" };
      if (!password)
        throw {
          name: "passwordRequired <<",
        };

      // ini udah masuk ke Auth. flow
      // check ke db email-nya terdaftar gak
      const user = await User.findOne({ where: { email } });
      if (!user)
        throw {
          name: "Invalid User <<",
        };
      // console.log(user); // log dulu user-nya

      // check pass. yg ada di db valid ga
      const compareUser = comparePass(password, user.password);
      if (!compareUser)
        throw {
          name: "Invalid User",
        };
      // console.log(compareUser);

      // console.log(compareUser);
      // generate token
      const access_token = signToken({ id: user.id });
      res.status(200).json({
        message: "login success",
        access_token,
      });
    } catch (error) {
      // if (error.name === "EmailRequired <<") {
      //   console.log(error);
      //   res.status(400).json({
      //     message: "Email is required",
      //   });
      // } else if (error.name === "passwordRequired <<") {
      //   console.log(error);
      //   res.status(400).json({
      //     message: "Password is required",
      //   });
      // } else if (error.name === "Invalid User <<") {
      //   res.status(401).json({
      //     message: "Email invalid",
      //   });
      // } else if (error.name === "Invalid User") {
      //   res.status(401).json({
      //     message: "Password invalid",
      //   });
      // } else {
      //   console.log(error);
      //   res.status(500).json({
      //     message: "Internal server error",
      //   });
      // }
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    console.log(req.body, "<<<<< req.body googleLogin");
    try {
      res.status(200).json({ message: "Login Success" });
    } catch (error) {
      next(error);
    }
  }
};
