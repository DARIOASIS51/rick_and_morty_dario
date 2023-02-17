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
  const { onSearch } = props;
  const [character, setCharacter] = useState(0);
  const handleSearch = (event) => {
    let { value } = event.target;
    setCharacter(value);
  };
  return (
    <div>
      <input style={styleInput} type="search" onChange = {handleSearch}/>
      <button style={styleButton} onClick={() =>props.onSearch(character)}>
        Agregar
      </button>
      <button style={styleButton} onClick={props.random}>
        Random Character

      </button>
    </div>
  );
}
