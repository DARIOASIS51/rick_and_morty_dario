import Card from "./Card";
// import styles from './Cards.module.css';
import styled from "styled-components";

const DivCards = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
export default function Cards(props) {
  const { characters } = props; // desestructuramos el props, porque en props puede venir otra info
  // console.log(characters);
  let i=0;
  return (
    <DivCards>
      {characters.length === 0 ? (
        <p style={{ color: "violet", marginTop: "150px", fontSize: "24px" }}>
          Busca un personaje!
        </p>
      ) : (
        characters.map((char) => (
          <Card
            id={char.id}
            key={i++}
            name={char.name}
            species={char.species}
            gender={char.gender}
            image={char.image}
            onClose={() => props.onClose(char.id)}
          />
        ))
      )}
    </DivCards>
  );
}
