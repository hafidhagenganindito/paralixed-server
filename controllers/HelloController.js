module.exports = class HelloController {
  static getHello(req, res) {
    res.status(200).json({ message: "Hello World" });
  }
};
