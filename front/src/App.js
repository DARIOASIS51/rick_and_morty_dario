import "./App.css";
import Cards from "./components/Cards.jsx";
import Nav from "./components/Nav.jsx";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import About from "./components/About";
import Detail from "./components/Detail";
import Error from "./components/Error";
import Form from "./components/Form";
import  Favorites  from "./components/Favorites";

function App() {
  const [characters, setCharacters] = useState([]); // este estado es tomado por cards mas abajo. es la lista de personajes.
  const [access, setAccess] = useState(false); // es un nuevo estado, que va a ser el permiso de acceso o no.
  var navigate = useNavigate();
  const username = "ejemplo@gmail.com"; // dos variables que simulan la BD (base de datos)
  const password = "1password";

  function login(userData) {
    // ésta funcion se fija si esta logueado o no.
    if (userData.password === password && userData.username === username) {
      setAccess(true);
      navigate("/home");
    }
  }

  useEffect(() => {
    !access && navigate("/");
  }, [access]);
  // ejecuta el codigo cuando una variable cambia su valor. En este caso le estamos diciendo que compruebe si 'access' cambia su valor. y en caso de ser false, nos va a redirigir a esta ruta '/'. Esa ruta es login. Es decir, si no tenemos permiso de acceder , o sea que el setaccess se setea en false, vamos a redirigirnos al login. y en caso de ser true nos vamos a quedar donde hallamos estado.

  function logout() {
    setAccess(false);
  }

  function onClose(id) {
    // como la lista de personajes esta en app, la funcion onClose , tb debe crearse aqui. Recibe el id del personaje que queremos sacar de la lista. Seteamos el array de personajes , el estado creado arriba, con lo que nos devuelve el metodo filter.
    setCharacters(characters.filter((element) => element.id !== id));
  } // esta funcion se la pasamos a cards, y desde cards la tiene que recibir el elemento CARD. lo recibe por props.
  function onSearch(character) {
    // recibe el id del character y busca en la api. el character seria el id del personaje. esta funcion onSearch se pasa al NAV, y de este ultimo a la SEARCHBAR.
    fetch(`http://localhost:3001/onsearch/${character}`) // esta es la peticion que se hace a la api. 
    //`https://rickandmortyapi.com/api/character/${character}` es la url anterior
      .then((response) => response.json())
      .then((data) => {
        if (data.name) {
          characters.find((element) => element.id === data.id) === undefined // para no agregar personajes repetidos
            ? setCharacters((characters) => [...characters, data])
            : alert("Personaje repetido, prueba otro ID."); // tomamos el estado viejo y lo q se hace es reemplazar todo el array de datos con la copia del estado viejo y la nueva data. Es decir todos los personajes que ya teniamos en el componente cards, mas este nuevo que se está agregando.
        } else {
          window.alert("No hay personajes con ese ID");
        }
      });
  }

  function random() {
    let randomId = Math.floor(Math.random() * 826); // genero un id aleatorio. Con floor me aseguro que sea un entero al redondear, y que sea menor a 826.
    onSearch(randomId); // finalmente ejecuto la funcion onserach con el id aleatorio. Esta funcion se la paso al nav. y en el nav la voy a recibir en lo que es el componente searchbar
  }
  const location = useLocation(); // las rutas tienen 3 elementos principales: 1 match 2 location 3 history. Location es un objeto que nos da informacion de donde estamos localizados.

  return (
    <div className="App" style={{ padding: "25px" }}>
      {
        location.pathname !== "/" && <Nav onSearch={onSearch} random={random} logout={logout} />

        // ponemos un condicional para que la barra del navegador no aparezca cuando localizacion sea '/'. entonces mientras la localizacion sea distinta a la barra, se renderiza la barra del navegador.
      }

      <Routes>
        <Route exact path="/" element={<Form login={login} />} />
        <Route
          exact
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />} //characters es un array de personajes. esto viene del estado creado arriba
        />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/detail/:detailId" element={<Detail />} />
        <Route path="*" element={<Error />} />
        <Route exact path="/favorites" element={<Favorites/>}/>
      </Routes>
    </div>
  );
}

export default App;
