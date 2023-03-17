import {
  ADD_FAVORITE,
  DELETE_FAVORITE,
  FILTER,
  ORDER,
  GET_FAVS,
} from "./actions";
const initialState = {
  myFavorites: [], // este estado   lo vamos a usar para aplicar filtros , ordenamientos.
  allCharacters: [], // este estado lo vamos a usar siempre para tener la lista completa de favoritos, y no perder la referencia inicial de todos los favoritos. allCharacter seria una especie de backup.
};
function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_FAVS:
      return {
        ...state,
        allCharacters: [...payload],
        myFavorites: [...payload],
      };
    case ADD_FAVORITE:
      const addFav = [...state.allCharacters, payload]; // copio todos los personajes, y le agrego lo que venga por payload
      return {
        ...state,
        // myFavorites: [...state.myFavorites, payload], //modifico la propiedad 'myfavorites' de mi estado, donde copio todos los personajes favoritos que ya existen en el array, y le agrego uno nuevo que viene por payload.
        myFavorites: [...addFav], // dentro de addfav voy a tener todos los personajes que tenia antes mas el nuevo.
        allCharacters: [...addFav], //
      };

    case DELETE_FAVORITE:
      const deleteFav = state.allCharacters.filter((fav) => fav.id !== payload); // el filtro se aplica sobre allCharacters porque queremos eliminar de la lista total de favoritos.
      // const filtered = state.myFavorites.filter((fav) => fav.id !== payload);
      return {
        ...state,
        myFavorites: [...deleteFav],
        allCharacters: [...deleteFav],
      };

    case FILTER:
      return {
        ...state,
        myFavorites: state.allCharacters.filter(
          (fav) => fav.gender === payload
        ), //por payload recibo el gender.
      };

    case ORDER:
      // let orderFav; //en esta variable guardo mi array ordenado
      // if(payload==='Ascendente'){
      //   orderFav = state.myFavorites.sort((a, b) => //voy a poder hacer un ordenamiento de todos los personajes favoritos, o de unicamente los filtrados por genero.
      //   a.id < b.id ? 1 : -1)

      // }else{
      //   orderFav = state.myFavorites.sort((a, b) =>
      //   a.id > b.id ? 1 : -1) // en este caso invertimos el signo '<', para que lo ordene en forma descendente

      // }
      // return{
      //   ...state,
      //   myFavorites:[...orderFav], //devuelvo una copia del array ordenado
      // }
      let orderFunction =
        payload === "Ascendente"
          ? (a, b) => {
              return a.id > b.id ? 1 : -1;
            }
          : (a, b) => {
              return a.id < b.id ? 1 : -1;
            };
      let orderFavorites = state.myFavorites.sort(orderFunction);
      return {
        ...state,
        myFavorites: [...orderFavorites],
      };

    case "RESET": // con este reset devuelvo todos los favoritos sin ningun filtro, en el orden que estaba guardo antes.
      return {
        ...state,
        myFavorites: state.allCharacters,
      };

    default:
      return { ...state };
  }
}
export default rootReducer;
