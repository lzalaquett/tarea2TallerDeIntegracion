require('dotenv/config');
import {Router} from 'express';
//const artists = require('../controllers/artists.controller');
const router = Router(); 
import db from '../models';
const Artista = db.artista;
const Album = db.album;
const Cancion = db.cancion;

router.get('/', async(req, res) => {
    const artists = await Artista.findAll();

    if (!artists) {
        return res.status(404).send({
            message: 'artista no encontrado',
        })
    }
    return res.status(200).send(artists);
});

router.get('/:id', async(req, res) => {
    const {id} = req.params;
    const artists = await Artista.findOne({
        where: {
            id,
        },
    });

    if (!artists) {
        return res.status(404).send({
            message: 'artista no encontrado',
        })
    }
    return res.send(artists);
});

router.get('/:id/albums', async(req, res) => {
    const {id} = req.params;

    const artistaExists = await Artista.findOne({
        where: {
            id,
        },
    });

    if (!artistaExists) {
        return res.status(404).send({
            message: `artista no encontrado`,
        });
    };

    const albums = await Album.findAll({
        where: {
            artist_id: id, 
        },
    });

    if (!albums) {
        return res.status(404).send({
            message: 'artista no encontrado',
        })
    }
    return res.send(albums);
});

router.get('/:id/tracks', async(req, res) => {
    const {id} = req.params;

    const artistaExists = await Artista.findOne({
        where: {
            id,
        },
    });

    if (!artistaExists) {
        return res.status(404).send({
            message: `artista no encontrado`,
        });
    };
    const tracks = await Cancion.findAll({
        where: {
            artist_id: id, 
        },
    });

    if (!tracks) {
        return res.status(404).send({
            message: 'canciones no encontradas',
        });
    }
    return res.send(tracks);
});

router.post('/', async(req, res) => {
    const {name, age} = req.body;

    /*if (!name || !age) {
        return res.status(400).send({
            message: `input inv??lido`
        });
    }*/
    if (typeof name !== 'string' || typeof age !== 'number') {
        return res.status(400).send({
            message: `input inv??lido`
        });
    }
    const id = Buffer.from(name).toString('base64').substr(0, 22); //window.btoa(name).substr(0, 22);

    let artistExists = await Artista.findOne({
        where:{
            id,
        }
    });

    if (artistExists) {
        return res.status(409).send(artistExists);
    }

    try {
        let newArtist = await Artista.create({
            name: name,
            age: age,
            id: id,
            albums: `${process.env.URL}/artists/${id}/albums`,
            tracks: `${process.env.URL}/artists/${id}/tracks`,
            self: `${process.env.URL}/artists/${id}`,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        return res.status(201).send(newArtist);

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: `Error de conexi??n con la base de datos -> error 500.`,
        });
    }
});

router.post('/:id/albums', async(req, res) => {

    const {name, genre} = req.body;

    if (typeof name !== 'string' || typeof genre !== 'string') {
        return res.status(400).send({
            message: `input inv??lido`
        });
    }

    const {id} = req.params;//Buffer.from(`name`).toString('base64').substr(0, 22);

    let artist = await Artista.findOne({
        where:{
            id,
        }
    });

    if (!artist) {
        return res.status(422).send({
            message: `artista no existe`,
        })
    }

    const albumId = Buffer.from(`${name}:${artist.id}`).toString('base64').substr(0, 22);

    let albumExist = await Album.findOne({
        where:{
            id: albumId,
        }
    });

    if (albumExist) {
        return res.status(409).send(albumExist);
    }

    try {
        let newAlbum = await Album.create({
            id: albumId,
            artist_id: id,
            name: name,
            genre: genre,
            artist: `${process.env.URL}/artists/${id}`,
            tracks: `${process.env.URL}/albums/${albumId}/tracks`,
            self: `${process.env.URL}/albums/${albumId}`,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        return res.status(201).send(newAlbum);

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: `Error de conexi??n con la base de datos -> error 500.`,
        });
    }
});

router.delete('/:id', async(req, res) => {
    const {id} = req.params;
    const artists = await Artista.findOne({
        where: {
            id,
        },
    });

    if (!artists) {
        return res.status(404).send({
            message: 'artista no encontrado',
        });
    }
    
    const tracks = await Cancion.findAll({
        where: {
            artist_id: id, 
        },
    });

    tracks.map((track)=>{
        track.destroy();
    })
    
    const albums = await Album.findAll({
        where: {
            artist_id: id, 
        },
    });

    albums.map((album)=>{
        album.destroy();
    })

    try {
        await artists.destroy();
        console.log("se elimin?? el artista");
        return res.status(204).send({
            message: 'artista eliminado',
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: `Error de conexi??n con la base de datos -> error 500.`,
        });
    }
});

router.put('/:id/albums/play', async(req, res) => {
    const {id} = req.params;

    const artistaExists = await Artista.findOne({
        where: {
            id,
        },
    });

    if (!artistaExists) {
        return res.status(404).send({
            message: `artista no encontrado`,
        });
    };

    const tracks = await Cancion.findAll({
        where:{
            artist_id: id,
        },
    });

    tracks.map((track) => {
        try {
            track.update({times_played: track.times_played += 1});
        } catch (error) {
            return res.status(500).send({
                message: `Error de conexi??n con la base de datos -> error 500.`,
            });
        }
    });

    return res.status(200).send({
        message: `todas las canciones del artista fueron reproducidas`,
    })
});

export default router;