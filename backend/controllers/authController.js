const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const speakeasy = require("speakeasy");
const qr = require("qr-image");
exports.generateSecret = async (req, res) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  res.json({ secret: secret.base32, qrCode: qr.imageSync(secret.otpauth_url, { type: "png" }) });
};
exports.verifyOTP = async (req, res) => {
  const { token, secret } = req.body;
  const verified = speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
  });
  if (verified) {
    res.json({ success: true });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};