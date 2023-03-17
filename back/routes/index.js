const { Router } = require("express");
// en la actividad de ejercicios comunes , teníamos las rutas dentro del archivo server.js. 
// y lo hacíamos ingresando a las funciones GET/POST/PUT/DELETE.
// ahora vamos a empezar a usar un middleware que es Router, el cual nos va a permitir tb acceder todos esos métodos HTTP (GET/POST/PUT/DELETE), pero también nos va a permitir modularizar más nuestro código.  Y separar lo que es configurador de servidor, configuración de rutas, y los controllers.

// vamos a requerir todas aquellas funciones  o controllers que estabamos utilizando en las rutas

const {getCharById} = require('../controllers/getCharById');
const {getCharDetail} = require('../controllers/getCharDetail');
const {addFav, getFavs, deleteFav} = require('../controllers/favController');

// ahora guardamos nuestro middleware en una variable router, para empezar a llamarlo y setear cada una de las rutas.

const router = Router();

router.get('/onsearch/:id', getCharById);  // todo lo q viene con ':' adelante , significa que es info q viene por parametro
router.get('/detail/:id',getCharDetail);

// hasta aqui hemos creados las rutas.

router.post('/fav', addFav)
router.get('/fav', getFavs) // para obtener la lista de favoritos
router.delete('/fav/:id', deleteFav)

module.exports = router;