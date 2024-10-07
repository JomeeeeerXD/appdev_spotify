const SongModel = require('../models/songModel');
const path = require('path');

const main = {
    getAllSongs: (req, res) => {
        SongModel.getAllSongs((err, songs) => {
            if (err) {
                console.error('Error fetching songs:', err); 
                res.status(500).send('Error fetching songs. Please try again later.'); 
            } else {

                res.render('index', { songs });
            }
        }); 
    },

    addSong: (req, res) => {
        const newSong = {
            title: req.body.title,  
            artist: req.body.artist,
            track_url: `/uploads/songs/${req.files.songFile[0].filename}`, 
            cover_image: `/uploads/images/${req.files.imageFile[0].filename}` ,
            lyrics: req.body.lyrics
        };

        console.log("New song being added:", newSong);

        SongModel.addSong(newSong, (err) => {
            if (err) {
                console.error('Error adding song:', err); 
                res.status(500).send('Error adding song. Please try again later.');
            } else {
                res.redirect('/');
            }
        });
    },

    getSong: (req, res) => {
        const songId = req.params.id;
        SongModel.getSongById(songId, (err, song) => {
            if (err || !song) {
                console.error('Error retrieving song:', err); 
                res.status(500).send(err || 'Song not found.'); 
            } else {
                res.render('song', { song });
            }
        });
    }
};

module.exports = main;
