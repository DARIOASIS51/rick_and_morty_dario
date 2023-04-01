import { connect, useDispatch } from "react-redux";
import Card from "./Card";
import styled from "styled-components";
import { filterCards, orderCards, getFavorites } from "../redux/actions";
import { useRef } from "react";

const DivCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export function Favorites({ myFavorites }) {
  let filter = useRef(null);
  let order = useRef(null);

  const dispatch = useDispatch();

  function handleReset(e) {
    dispatch(getFavorites());
    filter.current.value = "";
    order.current.value = "";
  }



  return (
    <div>
      <select onChange={(e) => dispatch(orderCards(e.target.value))}>
        {" "}
        {/* despachamos la accion ORDERCARDS con el valor del evento */}
        {["Ascendente", "Descendente"].map((e, i) => (
          <option value={e} key={i}>
            {e}
          </option>
        ))}
      </select>
      {/* // este primer select es el ordenamiento */}

      <select onChange={(e) => dispatch(filterCards(e.target.value))}>
        {["Male", "Female", "unknown", "Genderless"].map((e, i) => (
          <option value={e} key={i}>
            {e}
          </option>
        ))}
      </select>
      {/* este segunto select es el mapeo de opciones de los distintos generos */}

      <button value="reset" onClick={handleReset}>
        Reset
      </button>

      <DivCards>
        {myFavorites.length === 0 ? (
          <p style={{ color: "violet", marginTop: "150px", fontSize: "24px" }}>
            ¡Agrega un favorito!
          </p>
        ) : (
          myFavorites.map((fav, i) => (
            <Card
              id={fav.id}
              name={fav.name}
              species={fav.species}
              gender={fav.gender}
              image={fav.image}
              key={i++}
            />
          ))
        )}
      </DivCards>
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    myFavorites: state.myFavorites,
  };
}

export default connect(mapStateToProps, null)(Favorites);
