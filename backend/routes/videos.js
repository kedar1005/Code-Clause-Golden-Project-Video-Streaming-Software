// const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
// const router = express.Router();

// C:\Code Clause Internship\kd\routes\videos.js
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('Videos route is working!');
});

module.exports = router;


const videosFilePath = path.join(__dirname, '../data/videos.json');
const uploadDir = path.join(__dirname, '../uploads');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Upload video route
router.post('/upload', upload.single('video'), (req, res) => {
    const { title } = req.body;
    const video = {
        title,
        filename: req.file.filename,
        url: `http://localhost:3000/uploads/${req.file.filename}`
    };

    const videos = JSON.parse(fs.readFileSync(videosFilePath));
    videos.push(video);
    fs.writeFileSync(videosFilePath, JSON.stringify(videos));

    res.status(201).json({ message: 'Video uploaded successfully', video });
});

// Get all videos route
router.get('/', (req, res) => {
    const videos = JSON.parse(fs.readFileSync(videosFilePath));
    res.status(200).json(videos);
});

module.exports = router;

router.get('/test', (req, res) => {
    console.log('Videos route hit');
    res.send('Videos route is working!');
});

