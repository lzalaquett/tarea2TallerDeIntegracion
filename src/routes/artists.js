import {Router} from 'express';
const artists = require('../controllers/artists.controller');
const router = Router(); 

router.get('/', artists.getArtists);
router.get('/:id', artists.getArtistsById);
router.post('/', artists.postArtists);



export default router;