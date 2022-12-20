const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Race, Temperament } = require('../db');
const { Op } = require('sequelize');

const { getAllDogs } = require('../controllers/getAllDogs.js');


const router = Router();



router.get('/dogs', async (req, res, next) => {
    try {
        const { name } = req.query;
        let allDogs = await getAllDogs(); //llmamos a la funcion que nos traiga todos los dogs
        if (name) { // si hay un nombre que nos pasa por query hacemos esto
            let dogName = await allDogs.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()));//ese nombre que te llega de todos los dogs pasalo a miniscula y vemos si esta lo que pasamos por query (name)
            dogName.length ? //econtraste algo aca? 
                res.status(200).send(dogName) :
                res.send([{
                    name: 'Dog breed or name does not exist', //raza de perro o nombre inexistente
                    id: '',
                    temperaments: 'use our dog maker', //usa nuestro creador de perros.
                    image: 'https://w0.peakpx.com/wallpaper/706/34/HD-wallpaper-husky-dog-is-lying-down-on-snow-in-sunrays-background-dog.jpg'
                }]);
        } else {
            res.status(200).send(allDogs)
        }
    } catch (err) {
        next(err);
    }
});

router.get('/temperament', async (req, res) => {

    let infoApi = await axios('https://api.thedogapi.com/v1/breeds');
    let tempsRepeated = infoApi.data.map(el => el.temperament).toString();//esto nos va a devolver muchos arreglos
    tempsRepeated = await tempsRepeated.split(',');
    const tempsConEspacio = await tempsRepeated.map(el => {
        if (el[0] == ' ') {
            return el.split('');
        }
        return el;   
    });
    const tempsSinEspacio = await tempsConEspacio.map(el => {
        if (Array.isArray(el)) {
            el.shift();
            return el.join('');
        }
        return el;
    })

    await tempsSinEspacio.map(el => {
        if (el != '') {
            Temperament.findOrCreate({
                where: {
                    name: el
                },
            });
        }
    });

    const allTemps = await Temperament.findAll();
    res.json(allTemps);

});

router.post('/dog', async (req, res) => {
//aca nos traemos todo del body
    const {
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span,
        image,
        origen,
        temperaments,
    } = req.body;

//aca creamos en base al modelo que tenemos y creamos :P
    const raceCreated = await Race.create({
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span: life_span + ' years',
        origen,
        image,
    });
//no pasamos temperamento porque debemo crear a relacion aparte
    let temperamentDB = await Temperament.findAll({
        //dentro de ese modelo Temp. con ese findAll traeme todos los temperamentos que coinsida con lo que yo le estoy pasando por body
        where: {
            name: temperaments,
        }
    });
    raceCreated.addTemperament(temperamentDB);//a racecreated agregale el temperamento de los temperamentos que tenemos en la base de datos
    res.status(201).send(' Race created successfully ')
});


router.get('/dogs/:idRaza', async (req, res, next) => {

    const { idRaza } = req.params; //destructuramos el id
    const allRaces = await getAllDogs();//aca nos traemos todos los dogss
    if (idRaza) {
        let race = await allRaces.filter((el) => el.id == idRaza)//que filtre por el id que le mando
        race.length ? 
        res.status(200).json(race) :
     res.status(404).send(`Sorry, we dont have a race with ${idRaza} as ID `)
    }
});

// router.post("/", async (req, res) => {
//     // Destructuro los datos que me llegan por body
//     const {
//         name,
//         heightMin,
//         heightMax,
//         weightMin,
//         weightMax,
//         life_span,
//         image,
//         temperaments,
//     } = req.body;

//         // Creo el Dog
//         // const resultado = await Dog.create({
//         //     nombre, alturaMax, alturaMin, pesoMax, pesoMin, edadMax, edadMin, imagen, colorFondo
//         // })

//         Race.create({
//             name,
//         heightMin,
//         heightMax,
//         weightMin,
//         weightMax,
//         life_span: life_span + ' years',
//         image,
//         })
//         .then(async response => {
//             for(let i = 0; i < temperaments.length; i++){
//                 response.addTemperament(await Temperament.findOne({ // busco por nombre de temperamento y el que encuentre lo agrego a la tabla intermedia
//                     where: {
//                         nombre: temperaments[i]
//                     }
//                 }))
//             }
//         })
//         .catch(err => err)

//         // Agrego los temperamentos que me llegan por body a la tabla intermedia, junto con el resultado que en este caso es la persona que se acabo de agregar a la base de datos
//         // for(let i = 0; i < temperamento.length; i++){
//         //     resultado.addTemperamentos(await Temperamento.findOne({ // busco por nombre de temperamento y el que encuentre lo agrego a la tabla intermedia
//         //         where: {
//         //             nombre: temperamento[i]
//         //         }
//         //     }))
//         // }
        
      
//         res.send("ok");
//     // Si algo sale mal entrar aqui en el catch
    
// })   

module.exports = router;














module.exports = router;