const changeValue = (value) => {
  const valor = Number(value);
  return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
};

export default changeValue;
