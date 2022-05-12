// Metodo para poder parsear strings a numeros.
const IntegerValueSetter = (params, field_name) => {
  const newValInt = parseInt(params.newValue);
  const valueChanged = params.data[field_name] !== newValInt;
  if (valueChanged) {
    if (isNaN(newValInt)) return false;
    params.data[field_name] = newValInt;
  }
  return valueChanged;
};

export default IntegerValueSetter;
