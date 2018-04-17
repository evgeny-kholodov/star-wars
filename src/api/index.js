import {version} from '../../package.json';
import {Router} from 'express';
import {getPlanet} from '../models/planets';
import {planetController} from '../controllers/planet.controller'

export default ({config, db}) => {

    let api = Router();

    // perhaps expose some API metadata at the root
    api.get('/', (req, res) => {
        res.json({version});
    });

    api.get('/planets', planetController.getPlanets);

    api.post('/planets', planetController.getPlanetsByName);

    api.get('/planets/:id', planetController.getPlanet);

    api.post('/planets/:id/comment', planetController.addComment);

    api.get('/planets/:id/comment', planetController.getComment);

    return api;
}
