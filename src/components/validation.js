export default function validateInput(inputs) {
  let errors = {};
  if (
    !inputs.username ||
    !/\S+@\S+\.\S+/.test(inputs.username) ||
    inputs.username.length >= 35
  )
    // si el campo esta vacio, o no es un email, o el tamaño es mayor a 35 caracteres, se genera un error con un mensaje
    errors.username =
      "Campo obligatorio a rellenar con un email de menos de 35 caracteres";

  if (
    !inputs.password ||
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/.test(inputs.password)
  )
    errors.password =
      "La contraseña debe tener entre 6 y 10 caracteres, y al menos un numero";

  return errors;
}
