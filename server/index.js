import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/User.js';

const app = express();

app.use(cors());
app.use(express.json());

//? Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/registration_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//? Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //? Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    //? Create new user
    const user = new User({
      username,
      email,
      password
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});