import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const textos = { color: "violet" };
const info = { textAling: "left", fontSize: "24px" };
const image = { borderRadius: "10px", border: "2px solid darkslateblue" };
const divPrincipal = {
  color: "white",
  display: "flex",
  justifyContent: "space-around",
  width: "80%",
  margin: "auto",
  marginTop: "80px",
};
const styleButton = {
  backgroundColor: "pink",
  color: "purple",
  border: "0px",
  borderRadius: "5px",
  fontWeight: "bold",
  fontSize: "15px",
  padding: "10px",
  marginTop: "35px",
  cursor: "pointer",
};

export default function Detail() {
  const { detailId } = useParams();

  const [character, setCharacter] = useState({
    name: "",
    status: "",
    specie: "",
    gender: "",
    origin: "",
    image: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/detail/${detailId}`)
      .then((response) => response.json())
      .then((char) => {
        if (char.name) {
          setCharacter({
            name: char.name,
            status: char.status,
            specie: char.specie,
            gender: char.gender,
            origin: char.origin.name,
            image: char.image,
          });
        } else {
          window.alert("No hay personajes con ese ID");
        }
      })
      .catch((err) => {
        window.alert("No hay personajes con ese ID");
      });
    return setCharacter({});
  }, [detailId]);  // useEffect se ejecuta cada vez que detailID se modifica

  return (
    <div>
      <div style={divPrincipal}>
        <div style={info}>
          {character.name && <p><b style={textos}>Name</b>&#160;{character.name}</p>}
          {character.status &&<p><b style={textos}>Status:</b>&#160;{character.status}</p>}
          {character.specie &&<p><b style={textos}>Specie:</b>&#160;{character.specie}</p>}
          {character.gender &&<p><b style={textos}>Gender:</b>&#160;{character.gender}</p>}
          {character.origin &&<p><b style={textos}>Origin:</b>&#160;{character.origin}</p>}
        </div>
        <img style={image} src= {character.image} alt=''/>
      </div>
      <button style={styleButton} onClick={()=>navigate('/home')}>Back to Home</button>
    </div>
  );
}
