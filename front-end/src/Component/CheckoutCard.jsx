import React, { useEffect, useState } from 'react';
import { getData } from '../Service/request';

function CheckoutCard() {
  const [product, setProduct] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  async function getProducts() {
    const products = await getData('customer/products');
    setProduct(products);
  }

  function getCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    console.log('entrei');
    const productsCart = cart.map(
      (item) => product.find((itemCart) => itemCart.id === item.id),
    );
    setCartProducts(productsCart);
  }

  useEffect(() => {
    getCart();
  }, [product]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log(cartProducts);
  }, [cartProducts]);

  if (!cartProducts.length) return <p>Loading</p>;

  return (
    <div>
      {/* {cartProducts.map((item) => (
        <div key={ item.id }>
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
                  data-testid={ `
                  customer_checkout__element-order-table-item-number-${item.id}` }
                >
                  {item.id}
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-name-${item.id}` }
                >
                  {item.name}
                </td>
                <td
                  data-testid={ `
                customer_checkout__element-order-table-quantity-${item.id}` }
                >
                  quant
                </td>
                <td
                  data-testid={ `
                  customer_checkout__element-order-table-unit-price-${item.id}` }
                >
                  {item.price}
                </td>
                <td
                  data-testid={ `
                  customer_checkout__element-order-table-sub-total-${item.id}` }
                >
                  R$ 50,00
                </td>
                <button
                  type="button"
                  data-testid={ `
                  customer_checkout__element-order-table-remove-${item.id}` }
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
      ))} */}
    </div>
  );
}

export default CheckoutCard;
