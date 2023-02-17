import "./App.css";
import Cards from "./components/Cards.jsx";
import Nav from "./components/Nav.jsx";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import About from "./components/About";
import Detail from "./components/Detail";
import Error from "./components/Error";
import Form from "./components/Form";

function App() {
  const [characters, setCharacters] = useState([]);
  function onClose(id) {
    setCharacters(characters.filter((element) => element.id !== id));
  }
  function onSearch(character) {
    fetch(`https://rickandmortyapi.com/api/character/${character}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      });
  }

  function random() {
    let randomId = Math.floor(Math.random() * 826);
    onSearch(randomId);
  }
  const location = useLocation(); // las rutas tienen 3 elementos principales: 1 match 2 location 3 history. Location es un objeto que nos da informacion de donde estamos localizados.

  const navigate = useNavigate();
  const [access, setAccess] = useState(false); // es un nuevo estado, que va a ser el permiso de acceso o no.
  const username = "dariosulca@gmail.com"; // dos variables que simulan la BD (base de datos)
  const password = "dario1234";

  function login(userData) {
    // ésta funcion se fija si esta logueado o no.
    if (userData.password === password && userData.username === username) {
      setAccess(true);
      navigate("/home");
    }
  }

  useEffect(() => {  // ejecuta el codigo cuando una variable cambia su valor. En este caso le estamos diciendo que compruebe si 'access' cambia su valor. y en caso de ser false, nos va a redirigir a esta ruta '/'. Esa ruta es login. Es decir, si no tenemos permiso de acceder , o sea que el setaccess se setea en false, vamos a redirigirnos al login. y en caso de ser true nos vamos a quedar donde hallamos estado.
    !access && navigate("/");
  }, [access]); 

  return (
    <div className="App" style={{ padding: "25px" }}>
      <div>
        {
          location.pathname !== "/" && (
            <Nav onSearch={onSearch} random={random} />
          ) // ponemos un condicional para que la barra del navegador no aparezca cuando localizacion sea '/'. entonces mientras la localizacion sea distinta a la barra, se renderiza la barra del navegador.
        }
      </div>
      <Routes>
        <Route exact path="/" element={<Form login={login} />} />
        <Route
          exact
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/detail/:detailId" element={<Detail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
