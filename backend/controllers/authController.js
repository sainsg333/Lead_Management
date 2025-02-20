const User = require("../models/User");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const qr = require("qr-image");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  console.log("[DEBUG] Register endpoint hit with email:", email);

  try {
    console.log("[DEBUG] Creating new user instance.");
    const user = new User({ email, password });
    await user.save();
    console.log("[DEBUG] User registered successfully:", email);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("[ERROR] User registration failed:", err.message);
    res.status(400).json({ error: err.message });
  }
};

exports.generateSecret = async (req, res) => {
  console.log("[DEBUG] GenerateSecret endpoint hit.");

  try {
    const secret = speakeasy.generateSecret({ length: 20 });
    console.log("[DEBUG] Secret generated:", secret.base32);
    const qrCode = qr.imageSync(secret.otpauth_url, { type: "png" });
    console.log("[DEBUG] QR code generated successfully.");

    res.json({ secret: secret.base32, qrCode });
  } catch (err) {
    console.error("[ERROR] Failed to generate secret:", err.message);
    res.status(500).json({ error: "Failed to generate secret" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { token, secret } = req.body;
  console.log("[DEBUG] VerifyOTP endpoint hit with token:", token);

  try {
    const verified = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
    });
    console.log("[DEBUG] OTP verification result:", verified);

    if (verified) {
      res.json({ success: true });
    } else {
      console.warn("[WARN] Invalid OTP.");
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (err) {
    console.error("[ERROR] OTP verification failed:", err.message);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("[DEBUG] Login endpoint hit with email:", email);

  try {
    console.log("[DEBUG] Finding user in database.");
    const user = await User.findOne({ email });
    if (!user) {
      console.warn("[WARN] User not found:", email);
      throw new Error("Invalid email or password");
    }

    console.log("[DEBUG] Comparing password.");
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.warn("[WARN] Password mismatch for user:", email);
      throw new Error("Invalid email or password");
    }

    console.log("[DEBUG] Generating JWT token.");
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("[DEBUG] Token generated successfully.");

    res.json({ token });
  } catch (err) {
    console.error("[ERROR] Login failed:", err.message);
    res.status(400).json({ error: err.message });
  }
};
