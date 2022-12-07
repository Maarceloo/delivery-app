import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/LoginContext';
import { postLogin } from '../Service/request';

function Login() {
  const [login, setLogin] = useState(false);
  const history = useHistory();
  const { email, setEmail, password, setPassword } = useContext(Context);
  const objLogin = { email, password };

  const disabledLoginBttn = () => {
    const minPassword = 6;
    const emailRegex = /\S+@\S+\.\S+/;

    if (!(emailRegex.test(email) && password.length >= minPassword)) {
      return true;
    }
  };

  const handleClick = async () => {
    try {
      const infoLogin = await postLogin('login', objLogin);
      setLogin(false);
      console.log(infoLogin);
      localStorage.setItem('user', JSON.stringify(infoLogin));

      history.push('/customer/products');
    } catch (error) {
      setLogin(true);
      console.log('erro', error);
    }
  };

  const clickRegister = () => {
    history.push('/register');
  };

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          value={ email }
          data-testid="common_login__input-email"
          placeholder="Digite seu Email"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          type="password"
          name="password"
          value={ password }
          data-testid="common_login__input-password"
          placeholder="Digite sua Senha"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        id="button"
        type="button"
        value="Login"
        data-testid="common_login__button-login"
        disabled={ disabledLoginBttn() }
        onClick={ handleClick }
      >
        Login
      </button>
      <button
        type="button"
        value="Ainda não tenho conta"
        data-testid="common_login__button-register"
        onClick={ clickRegister }
      >
        Ainda não tenho conta
      </button>
      { login
       && <p data-testid="common_login__element-invalid-email">Usuário Inexistente! </p>}

    </form>
  );
}

export default Login;
