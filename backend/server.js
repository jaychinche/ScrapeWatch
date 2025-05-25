const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const newsRoutes = require('./routes/newsRoutes');
const authRoutes = require('./routes/userAuthRoute');


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration for frontend on localhost:5174
app.use(cors({
  origin: 'http://localhost:5179',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// Express session setup
const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';
app.use(
  session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

//   try {
//     const { email, password } = req.body;



//     if (!email || !password) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: 'User with this email already exists.' });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = new User({ email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully.', user: { id: newUser._id, email: newUser.email } });
//   } catch (error) {
//     console.error('Register Error:', error);
//     res.status(500).json({ message: 'Server error.' });
//   }
// });
// Routes
app.use('/users', authRoutes);
app.use('/api', newsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// MongoDB Connection
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/newsdb';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

