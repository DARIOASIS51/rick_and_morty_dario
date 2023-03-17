// import style from './Card.module.css';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { addFavorite, deleteFavorite } from "../redux/actions";
import { connect } from "react-redux";
import React from "react";

const DivCard = styled.div`
  display: inline-block;
  background-color: darkslateblue;
  border-radius: 10px;
  color: white;
  overflow: hidden;
  margin: 25px 0px 25px 0px;
  max-width: 18.8rem;
`;

const Button = styled.button`
  background-color: pink;
  color: purple;
  border: 0px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 15px;
  margin: 15px 15px 0px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
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

export function Card(props) {
  // console.log(props)
  const [isFav, setIsFav] = React.useState(false);

  function handleFavorite() {
    if (isFav) {
      setIsFav(false);
      props.deleteFavorite(props.id);
    } else {
      setIsFav(true);
      props.addFavorite(props); // props es un objeto que tiene un ID, NAME,SPECIE,GENDER, ADDFAVORITE,DELETEFAV...
    }
  }

  React.useEffect(() => { //Este useEffect comprobará si el personaje que contiene esta Card ya está dentro de tus favoritos. En ese caso setteará el estado isFav en true. 
    props.myFavorites.length && props.myFavorites.forEach((fav) => { // accedemos al arreglo 'myfavorites',vemos si tiene algo o esta vacio. si tiene un valor aplicamos el metodo foreach. otra forma de hacerlo es:  
    //props.myfavorites?.forEach...
       if (fav.id === props.id) {
          setIsFav(true);
       }
    });
 });

  return (
    <DivCard>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isFav ? (
          <button onClick={handleFavorite}>❤️</button>
        ) : (
          <button onClick={handleFavorite}>🤍</button>
        )}
        <Button onClick={props.onClose}>X</Button>
      </div>

      <Link to={`/detail/${props.id}`}>
        <h2>{props.name}</h2>
      </Link>
      <h2 style={styleSpecie}>{props.species}</h2>
      <h2 style={styleGender}>{props.gender}</h2>
      <img src={props.image} alt="" />
    </DivCard>
  );
}
export function mapStateToProps(state) {
  return {
    myFavorites: state.myFavorites, // aqui guardo el arreglo de favoritos que esta en el estado
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    addFavorite: function (personaje) {
      dispatch(addFavorite(personaje));
    },
    deleteFavorite: function (id) {
      dispatch(deleteFavorite(id));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Card);
