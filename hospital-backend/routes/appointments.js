const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const verifyToken = (req,res,next)=>{
  const token = req.headers["authorization"]?.split(" ")[1];
  if(!token) return res.sendStatus(401);
  try{
    req.user = jwt.verify(token,"secretkey");
    next();
  }catch(e){ res.sendStatus(401); }
};

// GET /api/appointments → all appointments (admin) or user’s appointments
router.get("/", verifyToken, async (req,res)=>{
  if(req.user.role==="admin"){
    const all = await Appointment.find().populate("user","username role");
    res.json(all);
  }else{
    const userApps = await Appointment.find({ user: req.user.id });
    res.json(userApps);
  }
});

// POST /api/appointments → create appointment (user)
router.post("/", verifyToken, async (req,res)=>{
  const { patientName, doctor, date, time } = req.body;
  const app = await Appointment.create({
    user: req.user.id, patientName, doctor, date, time
  });
  res.json(app);
});

// DELETE appointment (admin or user)
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
