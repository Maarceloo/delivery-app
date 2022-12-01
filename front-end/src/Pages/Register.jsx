import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RegisterContext from '../Context/RegisterContext';
import { postLogin } from '../Service/request';

function Register() {
  const { email,
    setEmail,
    password,
    setPassword,
    name,
    setName } = useContext(RegisterContext);
  const [register, setRegister] = useState(false);
  const objRegister = { name, email, password };
  const history = useHistory();

  const disabledRegisterBttn = () => {
    const maxName = 12;
    const minPassword = 6;
    const emailRegex = /\S+@\S+\.\S+/;

    if (!(emailRegex.test(email) && password.length >= minPassword
      && name.length >= maxName)) {
      return true;
    }
  };

  const handleClickRegister = async () => {
    try {
      await postLogin('register', objRegister);
      setRegister(false);
      history.push('/customer/products');
    } catch (error) {
      setRegister(true);
      console.log('erro', error);
    }
  };

  return (
    <form>
      <h1>Cadastro</h1>
      <label htmlFor="Nome">
        Nome
        <input
          type="text"
          name="name"
          value={ name }
          data-testid="common_register__input-name"
          placeholder="Digite seu Nome"
          onChange={ ({ target }) => setName(target.value) }
        />
      </label>
      <label htmlFor="Email">
        Email
        <input
          type="email"
          name="email"
          value={ email }
          data-testid="common_register__input-email"
          placeholder="Digite seu Email"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="Password">
        Senha
        <input
          type="password"
          name="name"
          value={ password }
          data-testid="common_register__input-password"
          placeholder="Digite sua Senha"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="common_register__button-register"
        disabled={ disabledRegisterBttn() }
        onClick={ handleClickRegister }
      >
        Cadastrar
      </button>
      {register
    && <p data-testid="common_register__element-invalid_register">Usuário existente!</p> }
    </form>
  );
}

export default Register;
