import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <header>
      <nav>

        {
          username.role === 'seller' ? (
            <Link
              to="/seller/orders"
              data-testid="seller_products__element-navbar-link-orders"
            >
              Pedidos
            </Link>
          )
            : (
              <>
                <Link
                  to="/products"
                  data-testid="customer_products__element-navbar-link-products"
                >
                  Produtos
                </Link>
                <Link
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
        <Link
          to="/login"
          onClick={ () => localStorage.clear() }
          data-testid="customer_products__element-navbar-link-logout"
        >
          Logout
        </Link>
      </nav>
    </header>
  );
}

export default NavBar;
