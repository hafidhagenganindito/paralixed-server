const midtransClient = require("midtrans-client");

module.exports = class PaymentController {
  static async initiateMidtrans(req, res, next) {
    try {
      res.json({ msg: "sending token" });
    } catch (error) {
      next(error);
    }
  }
};
