import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

// proporcionamos el STORE a todos los componentes que tendra  la aplicacion

ReactDOM.render(
  <Provider store={store}> 
  {/* // con esto todos los componentes de la app tendran acceso al store */}
  <BrowserRouter>
    <App />
  </BrowserRouter>,

  </Provider>,
  document.getElementById("root")
);
