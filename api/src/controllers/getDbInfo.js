const { Race, Temperament } = require('../db');

const getDbInfo = async () => {
    return await Race.findAll({ //find All. traigo los modelos de la base de datos.
        include: {
            model: Temperament,// incluimos el elemento temperament para que haga la relacion
            attributes: ['name'],
            throught: {
                attributes: [],//sobre nuestra tabla atributos
            },
        }
    })
};

module.exports = {
    getDbInfo,
}