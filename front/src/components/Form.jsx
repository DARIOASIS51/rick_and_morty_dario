import style from "./Form.module.css";
import React from "react";
import validateInputs from "./validation.js";

export default function Form(props) {
  // creamos el estado
  const [userData, setUserData] = React.useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserData({ ...userData, [name]: value });
    setErrors(validateInputs(userData)); // vamos a guardar dentro de la actualizacion del estado errors, lo que nos devuelva la funcion validate, en base a los inputs que teniamos y que estan guardados en USERDATE. Validate nos devuelve un objeto de errores.
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // evitar que se envie la info y se recargue la pagina
    props.login(userData); // la funcion login la recibimos por props. le pasamos userData, que es nuestro estado que guarda la info del usuario
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
        />
        <p>{errors.username}</p>

        <label htmlFor="">Password:</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
        />
        <p>{errors.password}</p>

        <button>LOGIN</button>
      </form>
    </div>
  );
}
