const express = require('express');
const multer = require('multer');
const router = express.Router();
const main = require('../controller/Main');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'songFile') {
            cb(null, 'uploads/songs/'); 
        } else if (file.fieldname === 'imageFile') {
            cb(null, 'uploads/images/'); 
        } else {
            cb(new Error('Unknown file field')); 
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });

router.get('/', main.getAllSongs);
router.get('/song/:id', main.getSong);
router.get('/add', (req, res) => res.render('add')); 
router.post('/upload', upload.fields([{ name: 'songFile' }, { name: 'imageFile' }]), main.addSong);


module.exports = router;