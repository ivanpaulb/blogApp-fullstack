const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    
    if(!username || !email || !password) {
      return res.status(400).send({ error: 'Email, username and password are all required.' });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    if (existingUser) {
      if (existingUser.email === email && existingUser.username === username) {
        return res.status(400).send({ error: 'Email and username are already in use.' });
      } else if (existingUser.email === email) {
        return res.status(400).send({ error: 'Email is already in use.' });
      } else if (existingUser.username === username) {
        return res.status(400).send({ error: 'Username is already in use.' });
      } else {
        return res.status(500).send({ error: 'Internal server error' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
      username, 
      email, 
      password: hashedPassword,
      isAdmin: typeof isAdmin === 'boolean' ? isAdmin : false
    });
    await user.save();

    res.status(201).send({ message: 'Registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if( !email || !password) {
      return res.status(400).send({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username, 
        isAdmin: user.isAdmin,
        iat: Math.floor(Date.now() / 1000), 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.send({ access: token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};
