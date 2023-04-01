// const http = require("http");
// // const characters = require("./utils/data.js");
// var {getCharById} = require('./controllers/getCharById')
// var {getCharDetail} = require('./controllers/getCharDetail')

// http
//   .createServer((req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*"); // permite al front acceder hacia la api. Le estamos dando permiso al front, al cliente , para que haga la peticion del back. le estamos danto el control del acceso al front con el back.  '*', es un selector universal, osea cualquiera puede acceder a nuestro servidor.
//     // Tb podrimos reemplazar '*', y poner 'https://localhost:3000/', que es donde esta nuestra aplicacion. De este modo estamos dando acceso unicamente a ese puerto para que consulte a nuestro servidor.
    
//     // if (req.url.includes("rickandmorty/character")) {
//     //   let id = req.url.split("/").at(-1); // req.url es un string que tiene la url separada por '/'. con el metodo split convertimos ese string en un array donde los elementos seran los que resulten de separar en base al '/'. Y el metodo 'at' es un metodo que me trae un elemento del array segun la posición que le pasemos por parametro, pero si le ponemos la posicion en negativo comienza por el ultimo elemento del array. Sabemos que de la URL el ultimo '/id', sera el ID del personaje.

//     //   let characterFind = characters.find((char) => char.id === Number(id)); //character es el array de objetos, que esta dentro del archivo data ubicado en la carpeta utils.
//     //   //el id obtenido en la variable id, es un string, por eso en la formula de find, lo convertimos a numero.
//     //   // con el metodo find, obtenemos el objeto dentro del array de characther, cuyo id coincide con la variable id requerida.
//     //   // diferencia entre el metodo filter y find. Filter nos devuelve un array con ese objeto que encuentra. y el Find nos devuelve el objeto, el primer objeto que coincida con esa condicion. En este caso nos conviene que devuelva el objeto directamente.
//     //   //ahora debemos dar una respuesta.convertimos la respuesta a JSON.

//     //   res.writeHead(200, { "Content-type": "application/json" }); 
//     //   res.end(JSON.stringify(characterFind)); //El método JSON.stringify() convierte un objeto o valor de JavaScript en una cadena de texto JSON, opcionalmente reemplaza valores si se indica una función de reemplazo, o si se especifican las propiedades mediante un array de reemplazo.
//     // }


//     if(req.url.includes('onsearch/')){ //accedemos al objeto req, y en su propiedad url, a traves del metodo includes, nos fijamos si en alguna parte del string que conforma la urtl, encontramos 'onSearch/'.
//       let idCharacter = req.url.split('/').pop();  // una vez que obtengo el ID de mi personaje, llamo al metodo getCharById que lo he importado arriba.
//       getCharById(res,idCharacter);// En este metodo se va a responder con lo que se haya encontrado.

//     } 

//     if(req.url.includes('detail/')){ 
//       let idCharacter = req.url.split('/').pop();  
//       getCharDetail(res,idCharacter);// En este metodo se va a responder con lo que se haya encontrado.

//     } 

//   })
//   .listen(3001, "localhost"); //nuestro server va estar escuchando en el puerto 3001.


//***************************EXPRESS***********************/

const express = require('express');  // importamos express
const server = express(); // nos guardamos todas las funcionalidades de express en una variable
const PORT = 3001;
const router = require('./routes/index');
const cors= require('cors');

// const corsOptions = {
//    origin: '*', //para q cualquier pagina lo pueda acceder
//    credentials: true,
//    optionSuccessStatus: 200,
// }
server.use(cors()); // aplicamos un middleware

//vamos ahora aplicar el middleware de json y el middleware de router. Para decirle que antes de llegar al final de lo que es nuestro codigo, o el metodo que esta mas abajo,  va a estar pasando primero por la eleccion de una ruta, 

server.use(express.json());
server.use('/',router) // ni bien se ingrese a una ruta que tenga como primer caracter la '/', se va a acceder por todas las rutas que tenemos en router.


server.listen(PORT, () => {
   console.log('Server raised in port ' + PORT);
});
