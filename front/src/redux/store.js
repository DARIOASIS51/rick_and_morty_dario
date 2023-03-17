import { createStore, applyMiddleware} from 'redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;


// const composed= compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),applyMiddleware(thunk))
// //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  Esta extension nos permite leer la extension y hacer la ejecucion para utilizar de forma visual el navegador, 
// //applyMiddleware(thunk)  : es el que nos permite aplicar el middleware dentro del flujo redux
// const store = createStore(rootReducer, composed);

// export default store;
// // CON ESTO YA DEBERIA MOSTRARNOS EN EL NAVEGADOR LA PARTE DE REDUX_DEVTOOLS para ver como se esta comportando el ESTADO, para ver como se estan comportando las acciones... 