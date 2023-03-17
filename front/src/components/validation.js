export default function validateInputs(inputs) {
  // default, nos permite dar otro nombre a la funcion si quisieramos
  let errors = {};
  if (
    !inputs.username ||
    !/\S+@\S+\.\S+/.test(inputs.username) ||
    inputs.username.length >= 35
  )
    errors.username =
      "Campo obligatorio a rellenar con un email de menos de 35 caracteres";
  // si el campo esta vacio, o no es un email, o el tamaño es mayor a 35 caracteres, se genera un error con un mensaje
  if (
    !inputs.password ||
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/.test(inputs.password)
  )
    errors.password =
      "La contraseña debe tener entre 6 y 10 caracteres, y al menos un número";

  return errors;
}
