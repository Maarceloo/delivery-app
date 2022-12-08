import React from 'react';
import NavBar from '../Component/Navbar';

function Checkout() {
  return (
    <div>
      <NavBar />
      <h1>Checkout</h1>
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
            <button
              type="button"
              data-testid="customer_checkout__element-order-table-remove-<index>"
              value="Remover"
            >
              Remover
            </button>
          </tr>
        </tbody>
      </table>
      <h2>Total da compra: R$</h2>
      <h1>Detalhes e Endereço para Entrega</h1>
      <form>
        <label htmlFor="seller">
          P.Vendedora Responsável
          <select
            data-testid="customer_checkout__select-seller"
            name="seller"
            id="seller"
          >
            <option value="1">Vendedora 1</option>
          </select>
        </label>
        <label htmlFor="address">
          Endereço de Entrega
          <input
            type="text"
            data-testid="customer_checkout__input-address"
            name="address"
            id="address"
          />
        </label>
        <label htmlFor="number">
          Número
          <input
            type="text"
            data-testid="customer_checkout__input-addressNumber"
            name="number"
            id="number"
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
}

export default Checkout;
