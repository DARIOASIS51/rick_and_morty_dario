var favs = require("../utils/favs"); // importo la base de datos

const addFav = (req, res) => {
  //nos traemos la informacion que recibimos por body del request, que sera un personaje completo.
  // es decir toda la informacion nos va a venir dentro del request, y dependiendo del metodo que se haya utilizado, puede venir por query, por body, o por params
  let char = req.body;
  // en el if me fijo si recibi algo 'char'. y hago un push, y en caso que se este agregando el personaje al arrays de favs, me va a estar devolviendo la nueva logintud del array. Si no se puede agregar, me va a devolver '-1', con lo cual si devuelve menos1 , el if va a fallar, y va a pasar a lo que pongamos en el else.
  if (char && favs.push(char))
    res
      .status(200)
      .json(
        char
      ); // porque devuelvo los datos del personaje? cuando por ejemplo estemos haciendo un registro de usuario, hacen el registro, lo guardan en la base de datos, y devuelven la informacion para automaticamente loguearlo, y q el usuario no tenga que loguearse manualmente. en este caso nos sirve para que una vez que nos devuelva el personaje como tal, nosotros lo insertemos en la lista de favoritos, y no tener que hacer nuevamente otro fetch u otra peticion axios, para pedir de nuevo la lista. De esta forma no vamos a modificar nada en los reducer.
  else res.status(500).json({ error: "Error Add Favs" }); // en caso de que no se pueda pushear el nuevo personaje
};
const getFavs = (req, res) => {
  if (favs)
    res.status(200).json(favs) // si tenemos algo guardado en la base de datos , devolvelo
  else res.status(500).json({ error: "Error Get Favs" }); // en caso de que no haya nada
};

const deleteFav = (req, res) => {
  let { id } = req.params;
  if (id >= 0) {
    favs = favs.filter((e) => e.id !== id); // filtramos el array de favs excluyendo al personaje del id
    res.status(200).json({ success: true }); // devolvemos una respuesta exitosa
  } else {
    res.status(500).json({ error: "Error Delete Fav" });
  }
};

module.exports = { addFav, getFavs, deleteFav };
