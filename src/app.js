import 'dotenv/config';
import path from 'path';
import routes from './routes';
const express = require('express');
const Sequelize = require('sequelize');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));

//rutas generales
app.use('/artists', routes.artists);
app.use('/albums', routes.albums);
app.use('/tracks', routes.tracks);

app.use((req, res) => {
    res.status(404).send('404: Page not found');
}); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

/*
try {
    Sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

//Rutas
app.get('/', (req, res) => {
    res.send('Welcome to integration workshop API-homework2')
})
/*
//GETs
app.get('/artists', (req, res) => {
    res.send('return all artists')
    
})
app.get('/albums', (req, res) => {
    res.send('return all albums')
})
app.get('/tracks', (req, res) => {
    res.send('return all tracks')
})
app.get('/artists/:artist_id', (req, res) => {
    res.send('return artist id :artist_id')
})
app.get('/artists/:artist_id/albums', (req, res) => {
    res.send('return all albums from artis id')
})
app.get('/artists/:artist_id/tracks', (req, res) => {
    res.send('return all tracks from artis id')
})
app.get('/albums/:album_id', (req, res) => {
    res.send('return album id')
})
app.get('/albums/:album_id/tracks', (req, res) => {
    res.send('return all tracks from album id')
})
app.get('/tacks/:track_id', (req, res) => {
    res.send('return track id')
})

//POSTs
app.post('/artists', (req, res) => {
    res.send('create a new artirs')
})
app.post('/artists/:artist_id/albums', (req, res) => {
    res.send('create a new almbum of artist id')
})
app.post('/albums/:album_id/tracks', (req, res) => {
    res.send('create a new track of the album id')
})

//PUTs
app.put('/artists/:artist_id/albums/play', (req, res) => {
    res.send('play all tracks from all albums from an artist')
})
app.put('/albums/:album_id/tracks/play', (req, res) => {
    res.send('play all tracks from album id')
})
app.put('/tracks/:track_id/play', (req, res) => {
    res.send('play track id')
})

//DELETEs
app.delete('/artists/:artist_id', (req, res) => {
    res.send(`eliminate the artist id :artist_id`)
})
app.delete('/albums/:album_id', (req, res) => {
    res.send('eliminate the album id')
})
app.delete('/tracks/:track_id', (req, res) => {
    res.send('eliminate the track id')
})
*/
