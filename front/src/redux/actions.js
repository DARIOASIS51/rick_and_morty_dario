// import axios from "axios";
// import { response } from "express";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const FILTER = "FILTER";
export const ORDER = "ORDER";
export const GET_FAVS = "GET_FAVS";

// export function addFavorite(personaje) {
//   return {
//     type: ADD_FAVORITE,
//     payload: personaje,
//   };
// }

// export function deleteFavorite(id) {
//   return {
//     type: DELETE_FAVORITE,
//     payload: id,
//   };
// }

//*****************************con PROMESAS*********************** */

// export function addFavorite(personaje) {
//   // hacemos el return de una funcion asincrona, que recibe dispatch, y dentro de esa funcion haremos la peticion de datos dentro de un try catch
//   return async function (dispatch) {
//     try {
//       // como el fetch debe ser esperado añadimos el 'await'
//       await fetch("http://localhost:3001/fav", {
//         method: "POST",
//         body: JSON.stringify(personaje), //este metodo es para convertir los objetos java script a json.
//         headers: {
//           // 1-tipo de contenido 2 -codificacion
//           "Content-type": "application/json; charset=UTF-8",
//         },
//       })
//         .then((response) => response.json()) //en fetch debemos convertir la respuesta codificada a formato json, para finalmente devolver y trabajar con la data
//         .then((data) =>
//           dispatch({
//             type: ADD_FAVORITE,
//             payload: data, // data es el persnaje que habiamos enviado para guardar, lo vamos a pasar a la lista que teniamos en el estado global, para añadirlo luego con el reducer a nuestra lista de favoritos.
//           })
//         );
//     } catch (error) {
//       // en el caso de que falle
//       console.log(error);
//     }
//   };
// }

//*************************** CON ASYNC/AWAIT******************* */

export function addFavorite(personaje) {
  return async function (dispatch) {
    try {
      const data = await fetch("http://localhost:3001/fav", {
        method: "POST",
        body: JSON.stringify(personaje),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json());

      if (data) dispatch({ type: ADD_FAVORITE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
}

//***********************con PROMESA**************************** */

// export function deleteFavorite(id) {
//   axios.delete(`http://localhost:3001/fav/${id}`)
//   return {
//     type: DELETE_FAVORITE,
//     payload: id,
//   };
// }

//************************CON ASYNC/AWAIT************************* */

export function deleteFavorite(id) {
  return async function (dispatch) {
    try {
      const data = await fetch(`http://localhost:3001/fav/${id}`, {
        method: "DELETE",
      }).then((response) => response.json())
      
        if (data.success) dispatch({ type: DELETE_FAVORITE, payload: id });
      
    } catch (error) {
      console.log(error);
    }
  };
}

export function getFavorites() {
  return async function (dispatch) {
    try {
      const data = await fetch("http://localhost:3001/fav/")
      .then((response) =>response.json());
      if (data) dispatch({ type: GET_FAVS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterCards(status) {
  return {
    type: FILTER,
    payload: status,
  };
}

export function orderCards(id) {
  return {
    type: ORDER,
    payload: id,
  };
}
