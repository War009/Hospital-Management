const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// POST /api/auth/login
router.post("/login", async (req,res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, "secretkey");
  res.json({ token, role: user.role });
});

module.exports = router;
