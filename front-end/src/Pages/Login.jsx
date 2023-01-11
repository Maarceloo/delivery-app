import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/LoginContext';
import { postData } from '../Service/request';
import '../Style/LoginRegister.css';

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
      const infoLogin = await postData('login', objLogin);
      setLogin(false);
      localStorage.setItem('user', JSON.stringify(infoLogin));
      if (infoLogin.role === 'seller') {
        history.push('/seller/orders');
      }
      if (infoLogin.role === 'customer') {
        history.push('/customer/products');
      }
      if (infoLogin.role === 'administrator') {
        history.push('/admin/manage');
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      setLogin(true);
    }
  };

  const getInfoFromLocal = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.role === 'administrator') {
        history.push('/admin/manage');
      }
      if (user.role === 'seller') {
        history.push('/seller/orders');
      }
      if (user.role === 'customer') {
        history.push('/customer/products');
      }
    }
  };

  useEffect(() => {
    getInfoFromLocal();
  }, []);

  const clickRegister = () => {
    history.push('/register');
  };

  return (
    <div className="Body-LoginRegister">
      <form className="LoginRegister-Form">
        <h1>Login</h1>
        <section className="Input-LoginRegister">
          <h1>Email</h1>
          <br />
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="common_login__input-email"
            placeholder="Digite seu Email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </section>
        <section className="Input-LoginRegister">
          <h1>Senha</h1>
          <br />
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="common_login__input-password"
            placeholder="Digite sua Senha"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </section>
        <button
          className="Bttn-LoginRegister"
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
          className="Bttn-Register"
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
    </div>
  );
}

export default Login;
