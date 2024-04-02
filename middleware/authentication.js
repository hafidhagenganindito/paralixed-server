const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

// Auth
const authentication = async (req, res, next) => {
  try {
    // cek user bawa token atau ga?
    // console.log(req.headers, "<<<");
    const { authorization } = req.headers;
    if (!authorization) throw { name: "InvalidToken" };
    //   cek tokenya tipe bearer bukan ?
    // console.log(authorization);
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") throw { name: "InvalidToken" };
    // console.log(token);

    // tokenya ketika di verify bener atau ga?
    const decodedToken = verifyToken(token);
    // pengecekan ke user di db
    console.log(decodedToken);
    const user = await User.findByPk(decodedToken.id);
    if (!user)
      // cek user-nya ada atau ga?
      throw {
        name: "InvalidToken",
      };

    req.user = user;
    // melanjutkan ke endpoint tujuan
    next(); // utk melakukan pengecekan terhadap tokenya
  } catch (error) {
    next(error); // utk menhubungkan handling error
  }
};

module.exports = { authentication };
