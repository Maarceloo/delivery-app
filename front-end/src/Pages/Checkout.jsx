import React from 'react';
import NavBar from '../Component/Navbar';

function Checkout() {
  return (
    <div>
      <NavBar />
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Subtotal</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              data-testid="customer_checkout__element-order-table-item-number-<index>"
            >
              id
            </td>
            <td
              data-testid="customer_checkout__element-order-table-name-<index>"
            >
              produto
            </td>
            <td
              data-testid="customer_checkout__element-order-table-quantity-<index>"
            >
              quant
            </td>
            <td
              data-testid="customer_checkout__element-order-table-unit-price-<index>"
            >
              preço
            </td>
            <td
              data-testid="customer_checkout__element-order-table-sub-total-<index>"
            >
              R$ 50,00
            </td>
          </tr>

        </tbody>
      </table>
      <h1>Checkout</h1>
    </div>
  );
}

export default Checkout;
