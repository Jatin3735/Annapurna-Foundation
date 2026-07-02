const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');
const Admin = require('./models/Admin');
const Counter = require('./models/Counter');

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://annapurna-foundation.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
// Health Route
app.get('/', (req, res) => {
  res.send('Annapurna Foundation Backend is Running 🚀');
});


// Routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // Initialize Counter if not exists
  const counter = await Counter.findOne({ id: 'volunteerRegistration' });
  if (!counter) {
    await Counter.create({ id: 'volunteerRegistration', seq: 1462 });
    console.log('Counter initialized to 1462 (Next volunteer will be 1463)');
  }

  // Initialize Default Admin if not exists
  const admin = await Admin.findOne({ username: 'Admin3735' });
  if (!admin) {
    await Admin.create({ username: 'Admin3735', password: 'Jatin@3735' });
    console.log('Default Admin created: Admin.... / Jatin@....');
  }

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
