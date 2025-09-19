const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email: email, role: role });
    if(userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch(e) {
    console.log('Register error', e)
    res.status(500).json({ message: 'Error registering user', error: e.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email: email, role: role });

    if(user && await user.matchPassword(password)) {
      if(role && user.role !== role) {
        return res.status(403).json({ message: 'Access denied for this role' });
      }
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch(e) {
    res.status(500).json({ message: 'Error logging in', e });
  }
};

module.exports = { registerUser, loginUser };
