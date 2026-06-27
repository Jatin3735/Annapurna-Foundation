const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Volunteer = require('../models/Volunteer');
const Authority = require('../models/Authority');
const Counter = require('../models/Counter');
const { protect } = require('../middleware/authMiddleware');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

// Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Volunteer Routes
router.post('/volunteers', async (req, res) => {
  try {
    const volunteer = await Volunteer.create(req.body);
    res.status(201).json(volunteer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/volunteers', protect, async (req, res) => {
  const volunteers = await Volunteer.find({}).sort({ createdAt: -1 });
  res.json(volunteers);
});

router.patch('/volunteers/:id/approve', protect, async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    if (volunteer.status === 'Approved') {
      return res.status(400).json({ message: 'Volunteer is already approved' });
    }

    const counter = await Counter.findOneAndUpdate(
      { id: 'volunteerRegistration' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    
    // If it's freshly created, counter.seq will be 1. We want to start at 1463.
    // However, it's better to initialize it properly before using. 
    // We handle the initialization in server.js.
    
    const regNum = `AF/2026/${counter.seq}`;
    const certNum = `CERT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    volunteer.status = 'Approved';
    volunteer.registrationNumber = regNum;
    volunteer.certificateNumber = certNum;
    volunteer.certificateIssueDate = new Date();
    
    const updatedVolunteer = await volunteer.save();
    res.json(updatedVolunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/volunteers/:id/reject', protect, async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, { status: 'Rejected' }, { new: true });
    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/volunteers/:id', protect, async (req, res) => {
  try {
    await Volunteer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Volunteer removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/volunteers/verify/:registrationNumber', async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({ registrationNumber: req.params.registrationNumber, status: 'Approved' });
    if (volunteer) {
      res.json(volunteer);
    } else {
      res.status(404).json({ message: 'Volunteer Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Authority Routes
router.get('/authorities', async (req, res) => {
  const authorities = await Authority.find({});
  res.json(authorities);
});

router.post('/authorities', protect, async (req, res) => {
  try {
    const authority = await Authority.create(req.body);
    res.status(201).json(authority);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/authorities/:id', protect, async (req, res) => {
  try {
    const authority = await Authority.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(authority);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/authorities/:id', protect, async (req, res) => {
  try {
    await Authority.findByIdAndDelete(req.params.id);
    res.json({ message: 'Authority removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
