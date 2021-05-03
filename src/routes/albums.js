require('dotenv/config');
import {Router} from 'express';
const router = Router(); 
import db from '../models';
const Album = db.album;
const Cancion = db.cancion;

router.get('/', async(req, res) => {
    const albums = await Album.findAll();

    if (!albums) {
        return res.status(404).send({
            message: 'Albums no encontrados',
        })
    }
    
    return res.status(200).send(albums);
});

router.get('/:id', async(req, res) => {
    const {id} = req.params;
    const albums = await Album.findOne({
        where: {
            id,
        },
    });

    if (!albums) {
        return res.status(404).send({
            message: 'Album no encontrado',
        })
    }
    return res.send(albums);
});

router.get('/:id/tracks', async(req, res) => {
    const {id} = req.params;

    const albumExists = await Album.findOne({
        where: {
            id,
        },
    });

    if (!albumExists) {
        return res.status(404).send({
            message: `álbum no encontrado`,
        });
    };

    const tracks = await Cancion.findAll({
        where: {
            album_id: id, 
        },
    });

    if (!tracks) {
        return res.status(404).send({
            message: 'canciones no encontradas',
        })
    }
    return res.send(tracks);
});

router.post('/:id/tracks', async(req, res) => {

    const {name, duration} = req.body;

    if (!name || !duration ) {
        return res.status(400).send({
            message: `input inválido`,
        })
    }

    const {id} = req.params;//Buffer.from(`name`).toString('base64').substr(0, 22);

    const album = await Album.findOne({
        where:{
            id,
        }
    });

    if (!album) {
        return res.status(422).send({
            message: `album no existe`,
        })
    }

    const trackId = Buffer.from(`${name}:${album.id}`).toString('base64').substr(0, 22);

    let trackExist = await Cancion.findOne({
        where:{
            id: trackId,
        }
    });

    if (trackExist) {
        return res.status(409).send(trackExist);
    }

    try {
        let newTrack = await Cancion.create({
            id: trackId,
            album_id: id,
            artist_id: album.artist_id,
            name: name,
            duration: duration,
            times_played: 0,
            artist: `${process.env.URL}/artists/${album.artist_id}`,
            album: `${process.env.URL}/albums/${id}`,
            self: `${process.env.URL}/tracks/${trackId}`,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        return res.status(201).send(newTrack);

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: `Error de conexión con la base de datos -> error 500.`,
        });
    }
});

router.delete('/:id', async(req, res) => {

    const {id} = req.params;
    const albums = await Album.findOne({
        where: {
            id,
        },
    });

    if (!albums) {
        return res.status(404).send({
            message: 'album no encontrado',
        });
    }

    const tracks = await Cancion.findAll({
        where: {
            album_id: id, 
        },
    });

    tracks.map((track)=>{
        track.destroy();
    })
    
    try {
        await albums.destroy();
        console.log("se eliminó el album");
        return res.status(204).send({
            message: `album eliminado`,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: `Error de conexión con la base de datos -> error 500.`,
        });
    } 
});

router.put('/:id/tracks/play', async(req, res) => {
    const {id} = req.params;

    const albumExists = await Album.findOne({
        where: {
            id,
        },
    });

    if (!albumExists) {
        return res.status(404).send({
            message: `álbum no encontrado`,
        });
    };

    const tracks = await Cancion.findAll({
        where:{
            album_id: id,
        },
    });

    tracks.map((track) => {
        try {
            track.update({times_played: track.times_played += 1});
        } catch (error) {
            return res.status(500).send({
                message: `Error de conexión con la base de datos -> error 500.`,
            });
        }
    });

    return res.status(200).send({
        message: `canciones del álbum reproducidas`,
    })
});

export default router;