const User = require("../models/User");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
exports.register = async (req, res) => {
  const { email, password } = req.body;
  const data = speakeasy.generateSecret({ length: 20 });
  const secret = data.base32;
  try {
    console.log('secret',secret);
    const user = new User({ email, password, secret});
    await user.save();
    res.status(201).json({ message: "User registered successfully" ,secret});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  const { token, secret } = req.body;
  console.log(token,secret);
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
    res.json({ token,secret : user.secret });
  } catch (err) { 
    res.status(400).json({ error: err.message });
  }
};
