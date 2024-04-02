const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { authentication } = require("../middleware/authentication");
const PaymentController = require("../controllers/PaymentController");
// const midtransClient = require("midtrans-client");
// const { User } = require("./models");
// const { comparePass, createToken, readPayLoad } = require("./helpers");

// Table User
// endpoint public

// Login>>
router.post("/login", AuthController.login);

// Register>>
// router.use(authentication);
router.post("/register", AuthController.register);

// Google Login
router.post("/google-login", AuthController.googleLogin);

// payment
// I. Initiate order
router.get("payment/midtrans/initiate", PaymentController.initiateMidtrans);
// ends payment

router.use(async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Invalid Token" };
    }
    const payload = readPayload(access_token);

    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Invalid Token" };
    }

    req.user = {
      id: user.id,
    };
    next();
  } catch (error) {
    next();
  }
});

router.get("/profile", async (req, res, next) => {
  try {
    const findUser = await User.findByPk(req.user.id);
    res.status(200).json({ id: findUser.id, premium: findUser.premium });
  } catch (error) {
    next(error);
  }
});
router.patch("/premium", async (req, res, next) => {
  try {
    await User.update(
      { premium: true },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    res
      .status(200)
      .json({ massage: `User with id ${req.user.id} now is a subscriber` });
  } catch (error) {
    next(error);
  }
});

router.post(
  ("/generate-midtrans-token",
  async (req, res, next) => {
    try {
      const findUser = await User.findByPk(req.user.id);
      if (findUser.premium) {
        throw { name: "Already Subscribed" };
      }
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTION" + Math.floor(1000000 + Math.random() + 9000000),
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: findUser.email,
        },
      };
      const midtransToken = await snap.createTransaction(parameter);
      console.log(midtransToken, "<<<<<<<<");
    } catch (error) {
      next(error);
    }
  })
);
module.exports = router;
