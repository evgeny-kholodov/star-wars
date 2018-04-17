import {dbQuery} from '../lib/dbQuery'
import {modelPlanet} from '../models/planets'
import {modelComment as Comment} from '../models/comments'

const planetController = {
    async getPlanet(req, res) {
        try {
            let planets = await dbQuery.findOne({model: modelPlanet, query: {id: req.params.id}});
            if (!planets) {
                const items = await dbQuery.postRemoteRequest(`https://swapi.co/api/planets/${req.params.id}/`);
                items.id = req.params.id;
                planets = await dbQuery.createOne({model: modelPlanet, items: items});
            }
            res.json(planets);
        } catch (err) {
            res.status(err.code).send('The planes is not exist !');
        }
    },
    getPlanets(req, res) {
        dbQuery.find({
            'model': modelPlanet,
            'query': {}
        }).then(
            (data) =>
                res.json(data)
        )
    },
    async addComment(req, res) {
        try {
            if (req.body.score && !/^([1-5])$/.test(+req.body.score))
                res.status(400).send({msg: 'Score is not valid'});
            let planets = await dbQuery.findOne({model: modelPlanet, query: {id: req.params.id}});
            if (!planets) {
                const items = await dbQuery.postRemoteRequest(`https://swapi.co/api/planets/${req.params.id}/`);
                items.id = req.params.id;
                planets = await dbQuery.createOne({model: modelPlanet, items: items});
            }
            const data = await dbQuery.createOne({
                model: Comment, items: {
                    score: +req.body.score || 1,
                    comment: req.body.comment || '',
                    userId: '5ad4ec97c534287e751196bd'
                }
            });

            const planetData = await dbQuery.findOneAndUpdate({
                model: modelPlanet, query: {id: req.params.id}, update: {
                    $push: {comments: data._id}
                }
            });
            res.send({data});
        } catch (err) {
            res.status(404).send({msg: 'Error', err})
        }
    },
    async getComment(req, res, next) {
        try {
            const planetData = await dbQuery.findOne({
                model: modelPlanet,
                query: {id: req.params.id},
                populate: 'comments'
            });

            res.send({comments: planetData.comments});
        } catch (err) {
            res.status(404).send({msg: 'Error', err})
        }
    },
    async getPlanetsByName(req, res) {
        try {
            const name = req.body.name;

            if (name.match(/[a-zA-Z\s]+/i).toString() !== name)
                res.status(400).send({msg: 'Name is not valid'});

            let planets = await dbQuery.findOne({model: modelPlanet, query: {name: name}});

            if (!planets) {
                const items = await dbQuery.postRemoteRequest(`https://swapi.co/api/planets/?search=${name}`);
                if (!items.results.length) res.status(404).send('Planet is not exist');
                let planet = items.results[0];
                const reg = /([\d]+)/gi;
                planet.id = reg.exec(planet.url)[1];

                try {
                    planets = await dbQuery.createOne({model: modelPlanet, items: planet});
                } catch (err) {
                    res.status(err.code).send('Can\'t create the planet as local.');
                }
            }
            res.json(planets);
        } catch (err) {
            res.status(err.code).send('The planet wasn\'t find !');
        }
    }
};
module.exports.planetController = planetController;
