import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RegisterContext from '../Context/RegisterContext';
import { postData } from '../Service/request';
import '../Style/LoginRegister.css';

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
      const infoRegister = await postData('register', objRegister);
      setRegister(false);
      localStorage.setItem('user', JSON.stringify(infoRegister));
      history.push('/customer/products');
    } catch (error) {
      setRegister(true);
      console.log('erro', error);
    }
  };

  return (
    <div className="Body-LoginRegister">
      <form className="LoginRegister-Form">
        <h1>Cadastro</h1>
        <br />
        <section className="Input-LoginRegister">
          <h2>Nome</h2>
          <br />
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="common_register__input-name"
            placeholder="Digite seu Nome"
            onChange={ ({ target }) => setName(target.value) }
          />
        </section>

        <section className="Input-LoginRegister">
          <h2>Email</h2>
          <br />
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="common_register__input-email"
            placeholder="Digite seu Email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </section>

        <section className="Input-LoginRegister">
          <h2>Senha</h2>
          <br />
          <input
            type="password"
            name="name"
            value={ password }
            data-testid="common_register__input-password"
            placeholder="Digite sua Senha"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </section>
        <button
          className="Bttn-LoginRegister"
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
    </div>

  );
}

export default Register;
