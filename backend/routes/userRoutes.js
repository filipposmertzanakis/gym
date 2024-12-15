const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && user.password === password) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//create new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Users (Admin function)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        const pendingUsers = users.filter(user => user.status === 'pending');
        res.status(200).json(pendingUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get User by ID (Admin function)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update User (Admin function)
// Update User by Username (Admin function)
router.put('/', async (req, res) => {
    const { username } = req.body; // Get the username from the request body
    try {
        const updatedUser = await User.findOneAndUpdate({ username }, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete User (Admin function)
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete User by Username (Admin function)
router.delete('/', async (req, res) => {
    const { username } = req.body;
    try {
        const deletedUser = await User.findOneAndDelete({ username });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Accept Registration
router.put('/accept', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOneAndUpdate({ username }, { status: 'active' }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Decline Registration
router.put('/decline', async (req, res) => {
    const { username } = req.body;
    try {
      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }
      const user = await User.findOneAndUpdate(
        { username },
        { status: 'declined' },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

// Route to fetch pending users
router.get('/api/users/pending', async (req, res) => {
    try {
      const users = await User.find();
      const pendingUsers = users.filter(user => user.status === 'pending');
      res.status(200).json(pendingUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;