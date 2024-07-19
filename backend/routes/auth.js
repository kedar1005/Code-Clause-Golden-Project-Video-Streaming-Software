// const express = require('express');
const fs = require('fs');
const path = require('path');
// const router = express.Router();

const usersFilePath = path.join(__dirname, '../data/users.json');


const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('Auth route is working!');
});

module.exports = router;


// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFilePath));
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.status(200).json({ message: 'Login successful', username: user.username });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
router.get('/test', (req, res) => {
    console.log('Auth route hit');
    res.send('Auth route is working!');
});

