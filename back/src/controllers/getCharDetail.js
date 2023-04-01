var axios = require("axios");
//HEMOS COPIADO PRACTICAMENTE CASI EL MISMO CODIGO QUE GETCHARBYID

// const getCharDetail = (res, ID) => {
//   // res es un objeto que podemos acceder desde la funcion que usamos para crear el servidor en 'server.js'  , 'createServer'. Es el objeto que maneja la respueta que vamos a dar cuando se ingrese a determinada ruta. El ID , es el id que vamos a consultar.
//   axios
//     .get(`https://rickandmortyapi.com/api/character/${ID}`) // es una peticion asincronica, no sabemos que va a pasar

//     .then(({ data }) => {
//       const char = {
//         id: data.id,
//         image: data.image,
//         name: data.name,
//         gender: data.gender,
//         species: data.species,
//         status: data.status,
//         origin: data.origin,
//       };  // vamos a capturar la dataa, es decir que una vez que tengamos la respuesta, vamos  a tomar unicamente el objeto data, y dentro de ese objeto , las propiedades que le indiquemos. Axios va a devover un objeto muy grande. Por eso capturamos la data de forma desestructurada con las propiedades que buscamos. Del objeto grande que devuelve axios, unicamente tomar el objeto DATA. Por eso desestructuramos. El then recibe un cb.

//       // debemos enviar la informacion al front, que nos esta requiriendo.
//     // metodo res.writehead para escribir lo que son los encabezados. status 200 'consulta exitosa', y enviaremos en formato json.
//     // metodo res.end para enviar la información obtenida.

//       res.writeHead(200,{'Content-Type':'application/json'})
//       .end(JSON.stringify(char));//convierte un objeto o valor de JavaScript en una cadena de texto JSON.
//     })   // como hemos enviado una respuesta exitosa, y estamos enviando el objeto, sabemos tb que una promesa puede fallar. Por ejemplo si en la consulta enviamos un ID mas grande o si se cae la API, puede fallar el cumplimiento de la promesa. Por lo que tendremos que usar el metodo CATCH.

//     //Las promesas tienen el CATCH para capturar el error y hacer algo.
//     .catch((err)=>{
//         res.writeHead(500,{'Content-Type': 'text/plain'})    // status 500, es error en el servidor.
//         .end(err.message);//err tiene una propiedad que se llama message. tomamos unicamente esta propiedad, para evitar que se nos imprima toda la otra informacion que tiene el objeto err.

//     })
// };

//*******************************EXPRESS*************************************** */

const { filterData, URL } = require("./getCharById");


//*********************con PROMESAS************************** */

// const getCharDetail = (req, res) => {
//   const params = req.params;

//   axios
//     .get(`${URL}${params.id}`)
//     .then(({ data }) => {
//       const char = filterData(data);
//       res
//         .status(200)
//         .json({ ...char, status: data.status, origin: data.origin });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: err });
//     });
// };

//**************************** ASYNC/AWAIT******************** */

const getCharDetail = async (req, res) => {
  const params = req.params;

  try {
    const {data} = await axios.get(`${URL}${params.id}`);
    const char = filterData(data);
      res
        .status(200)
        .json({ ...char, status: data.status, origin: data.origin });    
  } catch (error) {
    res.status(500).json({ message: error });    
  } 
};


module.exports = { getCharDetail }; // exportamos mediante un objeto que contenga unicamente a la variable 'getCharById'
// el module.exports te permite exportar dentro de un objeto,un monton de cosas, tanto variables o funciones u otros. y poder por ejemplo en server  importarlo en forma desestructurada con los mismos nombres.
// en cambio si utilizamos un export default, lo vamos a poder importar con cualquier nombre, pero como una variable como tal, y no como un objeto compuesto de varias partes.
