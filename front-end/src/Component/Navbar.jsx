import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Style/NavBar.css';
import logoutIcon from '../images/logoutIcon.png';

function NavBar() {
  const [username, setUsername] = useState([]);
  function getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    setUsername(user);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <header className="Header">
      <nav className="NavBar">
        {
          username.role === 'seller' ? (
            <Link
              className="Interactive-Role"
              to="/seller/orders"
              data-testid="customer_products__element-navbar-link-orders"
            >
              Pedidos
            </Link>
          )
            : (
              <>
                <Link
                  className="Interactive-Role"
                  to="/customer/products"
                  data-testid="customer_products__element-navbar-link-products"
                >
                  Produtos
                </Link>
                <Link
                  className="Customer-Orders"
                  to="/customer/orders"
                  data-testid="customer_products__element-navbar-link-orders"
                >
                  Meus Pedidos
                </Link>

              </>
            )
        }

        <h1
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {username.name}
        </h1>
        <div className="LogoutPai">
          <Link
            to="/login"
            onClick={ () => localStorage.clear() }
            data-testid="customer_products__element-navbar-link-logout"
            className="Logout"
          >
            <img className="logoutIcon" src={ logoutIcon } alt="logoutIcon" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
