import { useState } from "react";

const styleInput = {
  marginRight: "15px",
  padding: "10px",
  borderRadius: "5px",
};

const styleButton = {
  backgroundColor: "pink",
  color: "purple",
  border: "0px",
  borderRadius: "5px",
  fontWeight: "bold",
  fontSize: "15px",
  padding: "10px",
  margin: "25px 10px 25px 10px",
};

export default function SearchBar(props) {
  // const { onSearch } = props;
  const [character, setCharacter] = useState(0); // se crea un estado para capturar el id.

  const handleSearch = (event) => { // recibo un evento, cuando se escibe en el imput del searchbar
    let { value } = event.target;// capturo el valor de ese evento
    setCharacter(value); // seteo o actualizo el estado que tengo arriba
  }; // esta funcion se lo agrego al atributo onchange del input.

  return (
    <div>
      <input style={styleInput} type="search" onChange = {handleSearch}/>
      {/* la propiedad onSearch que se le agrega al button ya viene definida desde app, que se lo pasa al nav, y el nav se lo pasa al searchBar. Es una funcion para buscar en la api en base al ID que se le pase */}
      <button style={styleButton} onClick={() =>props.onSearch(character)}>
        Agregar
      </button>
      <button style={styleButton} onClick={props.random}>
        Random Character

      </button>
    </div>
  );
}
