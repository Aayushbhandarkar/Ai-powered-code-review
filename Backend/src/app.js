// src/app.js
const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// ✅ CORS setup: allow both local dev and deployed frontend
const allowedOrigins = [
  process.env.FRONTEND_URL,        // deployed frontend
  "http://localhost:5173",          // Vite dev server default port
  "http://localhost:3000"           // optional if frontend runs on 3000
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ DB Error:", err));

// Routes
app.get('/', (req, res) => res.send('Hello World'));
app.use('/ai', aiRoutes);
app.use('/auth', authRoutes);

module.exports = app;
