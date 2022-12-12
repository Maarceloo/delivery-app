import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getData, postData } from '../Service/request';

function CheckoutCard() {
  const history = useHistory();
  const [cartProducts, setCartProducts] = useState([]);
  const [userObj, setUserObj] = useState();
  const [sellerId, setSellerId] = useState(2);
  const [address, setAddress] = useState();
  const [number, setNumber] = useState();
  const [seller, setSeller] = useState([]);
  function getLocalStorage() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const user = JSON.parse(localStorage.getItem('user'));
    setCartProducts(cart);
    setUserObj(user);
  }

  async function getSellers() {
    const sell = await getData('/users');
    setSeller(sell);
    console.log(sell);
  }

  useEffect(() => {
    getLocalStorage();
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
    return total.toFixed(2);
  };

  const saveSeller = (id) => {
    setSellerId(id);
  };

  const saveAddress = (deliveryAddress) => {
    setAddress(deliveryAddress);
  };

  const saveNumber = (deliveryNumber) => {
    setNumber(deliveryNumber);
  };

  async function postSales() {
    const objSale = {
      userId: userObj.id,
      sellerId,
      status: 'Pendente',
      totalPrice: totalProducts(),
      deliveryAddress: address,
      deliveryNumber: number,
    };
    // console.log(objSale);
    const sale = await postData('customer/orders', objSale, userObj.token);
    cartProducts.map((itens) => {
      const obj = {
        saleId: sale.id,
        productId: itens.id,
        quantity: itens.quantity,
      };
      return postData('sales/products', obj, userObj.token);
    });
    history.push(`/customer/orders/${sale.id}`);
  }

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
        {` ${totalProducts().replace(/\./, ',')} `}
      </h2>
      <h1>Detalhes e Endereço para Entrega</h1>
      <form>
        <label htmlFor="seller">
          P.Vendedora Responsável
          <select
            data-testid="customer_checkout__select-seller"
            name="seller"
            id="seller"
            onChange={ ({ target }) => { saveSeller(target.value); } }
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
            onChange={ ({ target }) => { saveAddress(target.value); } }
            name="address"
            id="address"
          />
        </label>
        <label htmlFor="number">
          Número
          <input
            type="text"
            data-testid="customer_checkout__input-address-number"
            onChange={ ({ target }) => { saveNumber(target.value); } }
            name="number"
            id="number"
          />
        </label>
        <button
          type="button"
          onClick={ () => { postSales(); } }
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
}

export default CheckoutCard;
