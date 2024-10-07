const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const routes = require('./routes/route');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

app.get('/song/:id', (req, res) => {
    const songId = req.params.id; 
    SongModel.getSongById(songId, (error, song) => {
        if (error) {
            return res.status(500).send('Error retrieving song');
        }
        res.render('song', { song });   
    });
});

app.listen(1234, () => {
    console.log('Server running on http://localhost:1234');
});
