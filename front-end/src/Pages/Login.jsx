import React, { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import Context from '../Context/MyContext';

function App() {
  // const history = useHistory();
  const { email, setEmail, password, setPassword } = useContext(Context);

  const disabledLoginBttn = () => {
    const minPassword = 6;
    const emailRegex = /\S+@\S+\.\S+/;

    if (!(emailRegex.test(email) && password.length >= minPassword)) {
      return true;
    }
  };

  // const handleClick = () => {
  //   history.push('/bebidas');
  // };

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
      >
        Login
      </button>
      <button
        type="button"
        value="Ainda não tenho conta"
        data-testid="common_login__button-register"
        // onClick={ () => {} }
      >
        Ainda não tenho conta
      </button>
    </form>
  );
}

export default App;
