require('dotenv/config');

import db from '../models';
const Artista = db.artista;//     .models.Artists;

//gets
exports.getArtists = async(req, res) => {
    //const {id} = req.params;

    console.log("errorsss:", Artista);
    const artists = await Artista.findAll();

    if (!artists) {
        return res.status(404).send({
            message: 'artista no encontrado',
        })
    }
    //console.log(artists.every(artist => artist instanceof Artista)); // true
    //console.log("All artists:", JSON.stringify(users, null, 2));
    
    return res.status(200).send(artists);
};

exports.getArtistsById = async(req, res) => {
    
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
};

//post
exports.postArtists = async(req, res) => {
    const {name, age} = req.body;
    const id = Buffer.from('Hello World!').toString('base64').substr(0, 21) //window.btoa(name).substr(0, 21);

    let artistExists = await Artista.findOne({
        where:{
            id,
        }
    });

    if (artistExists) {
        return res.status(409).send({
            message: `artista ya esxiste`
        })
    }

    try {
        let newArtist = await Artista.create({
            name: name,
            age: age,
            id: id,
            albums: `${process.env.URL}/artists/${id}/albums`,
            traks: `${process.env.URL}/artists/${id}/traks`,
            self: `${process.env.URL}/artists/${id}`,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        return res.status(201).send(newArtist);

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: `Error de conexión con la base de datos -> error 500.`,
        });
    }
};