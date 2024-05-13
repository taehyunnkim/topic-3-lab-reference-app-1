const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
  
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const newUser = new User({ username, password });
      await newUser.save();
      res.redirect('/');
    } catch (error) {
      res.status(500).send('Error registering new user');
    }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      res.send('Login successful');
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error logging in user' });
  }
});

app.listen(3000, "0.0.0.0", () => console.log('Server running on http://localhost:3000'));
