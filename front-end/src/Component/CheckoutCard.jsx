import React, { useEffect, useState } from 'react';
import { getData } from '../Service/request';

function CheckoutCard() {
  const [cartProducts, setCartProducts] = useState([]);
  const [seller, setSeller] = useState([]);
  function getCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    setCartProducts(cart);
  }

  async function getSellers() {
    const sell = await getData('/users');
    setSeller(sell);
    console.log(sell);
  }

  useEffect(() => {
    getCart();
    getSellers();
  }, []);

  const removeItemCart = (item) => {
    const copyCartProducts = [...cartProducts];
    const filter = copyCartProducts.filter((i) => i.id !== item.id);
    setCartProducts(filter);
    localStorage.setItem('cart', JSON.stringify(filter));
  };

  const totalProducts = () => {
    const copyCartProducts = [...cartProducts];
    const total = copyCartProducts
      .reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    return total;
  };

  const dataTestid = 'customer_checkout__element-order-table-';

  if (!cartProducts.length) return <p>Loading...</p>;

  return (
    <div>
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
          {cartProducts.map((item, index) => (
            <tr key={ item.id }>
              <td data-testid={ `${dataTestid}item-number-${index}` }>
                {index + 1 }
              </td>
              <td data-testid={ `${dataTestid}name-${index}` }>{item.name}</td>
              <td data-testid={ `${dataTestid}quantity-${index}` }>
                {item.quantity}
              </td>
              <td data-testid={ `${dataTestid}unit-price-${index}` }>
                {item.price.replace(/\./, ',')}
              </td>
              <td data-testid={ `${dataTestid}sub-total-${index}` }>
                {(item.price * item.quantity).toFixed(2).replace(/\./, ',')}
              </td>
              <button
                type="button"
                data-testid={ `${dataTestid}remove-${index}` }
                value="Remover"
                onClick={ () => removeItemCart(item) }
              >
                Remover
              </button>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 data-testid="customer_checkout__element-order-total-price">
        Total da compra: R$
        {` ${totalProducts().toFixed(2).replace(/\./, ',')} `}
      </h2>
      <h1>Detalhes e Endereço para Entrega</h1>
      <form>
        <label htmlFor="seller">
          P.Vendedora Responsável
          <select
            data-testid="customer_checkout__select-seller"
            name="seller"
            id="seller"
          >
            { seller.map((sell) => (
              <option key={ sell.id } value={ sell.id }>{sell.name}</option>
            ), [])}

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
            data-testid="customer_checkout__input-address-number"
            name="number"
            id="number"
          />
        </label>
        <button
          type="button"
          onClick={ () => {} }
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
}

export default CheckoutCard;
