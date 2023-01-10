import React, { useEffect, useState } from 'react';
import { deleteData, getData, postData } from '../Service/request';
import '../Style/AdminPage.css';

function AdminPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [token, setToken] = useState('');
  const [register, setRegister] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [hasDelete, setHasDelete] = useState(false);
  const objRegister = { name, email, password, role };

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
      await postData('register/admin', objRegister, token);
      setRegister(false);
      if (hasDelete) {
        setHasDelete(false);
      } else {
        setHasDelete(true);
      }
    } catch (error) {
      setRegister(true);
      console.log('erro', error);
    }
  };

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    setToken(user.token);
  };

  const getUsers = async () => {
    const users = await getData('users/admin');
    setAllUsers(users);
  };

  const deleteUser = async (id) => {
    console.log(typeof id);
    const test = id.toString();
    console.log(typeof test);

    try {
      await deleteData('users/admin', test);
      if (hasDelete) {
        setHasDelete(false);
      } else {
        setHasDelete(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getToken();
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [hasDelete]);

  return (
    <div className="Admin-Page">
      <h1 className="NewUser">Cadastrar novo Usuário</h1>
      <form className="Admin-Board">
        <label htmlFor="Nome">
          Nome
          <br />
          <input
            className="Generic-Input"
            type="text"
            name="name"
            data-testid="admin_manage__input-name"
            placeholder="Digite seu Nome"
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
        <label htmlFor="Email">
          Email
          <br />
          <input
            className="Generic-Input"
            type="email"
            name="email"
            data-testid="admin_manage__input-email"
            placeholder="Digite seu Email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="Password">
          Senha
          <br />
          <input
            className="Generic-Input"
            type="password"
            name="name"
            data-testid="admin_manage__input-password"
            placeholder="Digite sua Senha"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <label htmlFor="Tipo">
          Tipo
          <br />
          <select
            className="Generic-Input"
            data-testid="admin_manage__select-role"
            name="seller"
            id="seller"
            onChange={ ({ target }) => { setRole(target.value); } }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <br />
        <button
          className="Generic-Btn"
          type="button"
          data-testid="admin_manage__button-register"
          disabled={ disabledRegisterBttn() }
          onClick={ handleClickRegister }
        >
          Cadastrar
        </button>
        {register
    && <p data-testid="admin_manage__element-invalid-register">Usuário existente!</p> }
      </form>
      <br />
      <br />
      <h1 className="H1-Admin">Lista de Usuários</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers && allUsers.map((item, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `admin_manage__element-user-table-item-number-${item.id}`
                  }
                >
                  {index + 1}

                </td>
                <td
                  data-testid={
                    `admin_manage__element-user-table-name-${item.id}`
                  }
                >
                  {item.name}

                </td>
                <td
                  data-testid={
                    `admin_manage__element-user-table-email-${item.id}`
                  }
                >
                  {item.email}

                </td>
                <td
                  data-testid={
                    `admin_manage__element-user-table-role-${item.id}`
                  }
                >
                  {item.role}

                </td>
                <button
                  className="Btn-Remove"
                  data-testid={ `admin_manage__element-user-table-remove-${item.id}` }
                  type="button"
                  onClick={ () => deleteUser(item.id) }
                >
                  Excluir
                </button>
              </tr>

            ))
          }
        </tbody>
      </table>
      <tr />
    </div>
  );
}

export default AdminPage;
