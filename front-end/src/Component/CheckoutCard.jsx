import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getData, postData } from '../Service/request';
import changeValue from '../Service/functions';
import '../Style/CheckoutCard.css';

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
    const result = changeValue(total);
    return result;
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
    console.log(objSale, userObj);
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
    <div className="Main-Div-Checkout">
      <h1 className="H1-Finalizar">Finalizar Pedido</h1>
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
                {changeValue(item.price)}
              </td>
              <td data-testid={ `${dataTestid}sub-total-${index}` }>
                {changeValue((item.price * item.quantity))}
              </td>
              <button
                className="Btn-Remove"
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
      <h2
        className="Total-Price"
        data-testid="customer_checkout__element-order-total-price"
      >
        Total da compra:
        {totalProducts()}
      </h2>
      <form className="Board-Checkout-Payment">
        <fieldset className="Legend-Checkout">
          <legend
            className="Legend-Checkout-H1"
            align="center"
          >
            Detalhes e Endereço para Entrega

          </legend>
          <label htmlFor="seller">
            P.Vendedora Responsável
            <br />
            <select
              className="Generic-Input"
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
          <br />
          <label htmlFor="address">
            Endereço de Entrega
            <br />
            <input
              className="Generic-Input"
              type="text"
              data-testid="customer_checkout__input-address"
              onChange={ ({ target }) => { saveAddress(target.value); } }
              name="address"
              id="address"
            />
          </label>
          <br />
          <label htmlFor="number">
            Número
            <br />
            <input
              className="Generic-Input"
              type="text"
              data-testid="customer_checkout__input-address-number"
              onChange={ ({ target }) => { saveNumber(target.value); } }
              name="number"
              id="number"
            />
          </label>
          <br />
          <button
            className="Generic-Btn"
            type="button"
            onClick={ () => { postSales(); } }
            data-testid="customer_checkout__button-submit-order"
          >
            Finalizar Pedido
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default CheckoutCard;
