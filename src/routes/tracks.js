require('dotenv/config');
import {Router} from 'express';
const router = Router(); 
import db from '../models';
const Cancion = db.cancion;

router.get('/', async(req, res) => {
    //const {id} = req.params;

    const tracks = await Cancion.findAll();

    if (!tracks) {
        return res.status(404).send({
            message: 'tracks no encontrados',
        })
    }
    
    return res.status(200).send(tracks);
});

router.get('/:id', async(req, res) => {
    
    const {id} = req.params;
    const tracks = await Cancion.findOne({
        where: {
            id,
        },
    });

    if (!tracks) {
        return res.status(404).send({
            message: 'track no encontrado',
        })
    }
    return res.send(tracks);
});

router.delete('/:id', async(req, res) => {

    const {id} = req.params;
    const tracks = await Cancion.findOne({
        where: {
            id,
        },
    });

    if (!tracks) {
        return res.status(404).send({
            message: 'track no encontrado',
        });
    }
    
    try {
        await tracks.destroy();
        console.log("se eliminó el track");
        return res.status(204).send({
            message: 'track eliminado',
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: `Error de conexión con la base de datos -> error 500.`,
        });
    } 
});

export default router;