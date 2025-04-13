const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/eventApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define Mongoose Schemas
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const eventSchema = new mongoose.Schema({
  eventName: String,
  description: String,
  date: Date,
  location: String,
  createdBy: String,
});

// Create Mongoose Models
const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);

// Routes for handling user signup
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(400).send('Error creating user');
  }
});

// Routes for handling event creation
app.post('/event', async (req, res) => {
  try {
    const { eventName, description, date, location, createdBy } = req.body;
    const newEvent = new Event({ eventName, description, date, location, createdBy });
    await newEvent.save();
    res.status(201).send('Event created');
  } catch (error) {
    res.status(400).send('Error creating event');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
