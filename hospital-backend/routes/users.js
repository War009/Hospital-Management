const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Middleware for admin
const verifyAdmin = (req,res,next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if(!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token,"secretkey");
    if(decoded.role !== "admin") return res.sendStatus(403);
    req.user = decoded;
    next();
  } catch(e) {
    res.sendStatus(401);
  }
};

// GET all users (admin only)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST add new user (admin only)
router.post("/", verifyAdmin, async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const newUser = await User.create({ username, password, role });
    res.json(newUser);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;

