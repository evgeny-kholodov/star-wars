import mongoose from 'mongoose';

const PlanetSchema = mongoose.Schema({
    "id": Number,
    "name": String,
    "rotation_period": String,
    "orbital_period": String,
    "diameter": String,
    "climate": String,
    "gravity": String,
    "terrain": String,
    "surface_water": String,
    "population": String,
    "residents": [],
    "films": [],
    "created": String,
    "edited": String,
    "url": String,
    "comments": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Planet = mongoose.model('Planet', PlanetSchema);

module.exports.modelPlanet = Planet;

