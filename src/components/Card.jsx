// import style from './Card.module.css';
import styled from "styled-components";
import { Link } from "react-router-dom";

const DivCard = styled.div`
  display: inline-block;
  background-color: darkslateblue;
  border-radius: 10px;
  color: white;
  overflow: hidden;
  margin: 25px 0px 25px 0px;
`;

const Button = styled.button`
  position: relative;
  right: -120px;
  top: 10px;
  background-color: pink;
  color: purple;
  border: 0px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 15px;
`;

//estilos en linea
const styleSpecie = {
  display: "inline-block",
  fontSize: "16px",
  color: "violet",
  marginRight: "15px",
  marginTop: "-10px",
};

const styleGender = {
  display: "inline-block",
  fontSize: "16px",
  color: "deeppink",
  marginTop: "-10px",
};

export default function Card(props) {
  // console.log(props)
  return (
    <DivCard>
      <Button onClick={props.onClose}>X</Button>
      <Link to={`/detail/${props.id}`}>
        <h2>{props.name}</h2>
      </Link>
      <h2 style={styleSpecie}>{props.species}</h2>
      <h2 style={styleGender}>{props.gender}</h2>
      <img src={props.image} alt={props.name} />
    </DivCard>
  );
}
