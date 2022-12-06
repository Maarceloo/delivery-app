import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <header>
      <nav>
        <Link
          to="/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <Link
          to="/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </Link>
        <h1
          data-testid="customer_products__element-navbar-user-full-name"
        >
          Nome
        </h1>
        <Link
          to="/login"
          data-testid="customer_products__element-navbar-link-logout"
        >
          Logout
        </Link>
      </nav>
    </header>
  );
}

export default NavBar;
