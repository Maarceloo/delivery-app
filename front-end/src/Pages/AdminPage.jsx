import React from 'react';
import NavBar from '../Component/Navbar';

function AdminPage() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [register, setRegister] = useState(false);

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
            await postData('register', objRegister);
            setRegister(false);
            history.push('/customer/products');
          } catch (error) {
            setRegister(true);
            console.log('erro', error);
          }
      };

  return (
    <div>
      <NavBar />

      <form>
      <h1>Cadastrar novo usuário</h1>
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
      <label htmlFor='Tipo'>
        Tipo
        <select 
            data-testid="customer_checkout__select-seller"
            name="seller"
            id="seller"
            onChange={ ({ target }) => { saveSeller(target.value); } }
        >
            <option value={'Vendedor'}>Vendedor</option>
            <option value={'Cliente'}>Cliente</option>
            <option value={'Administrador'}>Administrador</option>
        </select>
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
    </div>
  );
}

export default AdminPage;
