import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData, updateData } from '../Service/request';
import '../Style/OrderDetails.css';

function OrderDetailCustomer() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState([]);
  const [token, setToken] = useState();
  const [updated, setUpdated] = useState(false);

  async function getProductsAndSeller() {
    const data = await getData(`sales/products/${id}`);
    const vendedor = await getData('users');

    const idSeller = data[0].Sales.sellerId;
    const nameSeller = vendedor.filter((item) => item.id === idSeller);

    setProducts(data);
    setSeller(nameSeller[0].name);
    console.log(data[0].Sales.status);
  }

  function getLocalStorage() {
    const user = JSON.parse(localStorage.getItem('user'));
    setToken(user.token);
  }

  const updateUser = async (userId, status) => {
    await updateData('seller/orders', userId, status, token);
    if (updated) {
      setUpdated(false);
    } else {
      setUpdated(true);
    }
  };

  useEffect(() => {
    getProductsAndSeller();
    getLocalStorage();
  }, []);

  useEffect(() => {
    getProductsAndSeller();
  }, [updated]);

  const dataTestid = 'customer_order_details__element-order-table-';
  const dataTestid2 = 'customer_order_details__element-order-details-label-';

  if (!products.length && !seller.length) return <p>Loading...</p>;

  return (
    <div className="Main-Div-Order-Details">
      <h1 className="H1-Detail"> Detalhe do pedido</h1>
      <section className="Section-Details-Order">
        <h1 data-testid={ `${dataTestid2}order-id` }>{`PEDIDO ${id}`}</h1>
        <h1 data-testid={ `${dataTestid2}seller-name` }>{`${seller}`}</h1>
        <h1 data-testid={ `${dataTestid2}order-date` }>
          {`${new Date(products[0].Sales.saleDate).toLocaleDateString('pt-br')}`}
        </h1>
        <h1
          data-testid={ `${dataTestid2}delivery-status` }
          className={ `status-${products[0].Sales.status}` }
        >
          {`${products[0].Sales.status}`}
        </h1>
        <button
          className="Generic-Btn"
          data-testid="customer_order_details__button-delivery-check"
          type="button"
          disabled={ products[0].Sales.status !== 'Em Trânsito' }
          value="Entregue"
          onClick={ ({ target }) => { updateUser(products[0].Sales.id, target.value); } }
        >
          Marcar Como Entregue
        </button>
      </section>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={ index }>
              <td data-testid={ `${dataTestid}item-number-${index}` }>
                {index + 1}
              </td>
              <td data-testid={ `${dataTestid}name-${index}` }>
                {item.products.name}
              </td>
              <td data-testid={ `${dataTestid}quantity-${index}` }>
                {item.quantity}
              </td>
              <td data-testid={ `${dataTestid}unit-price-${index}` }>
                {item.products.price}
              </td>
              <td data-testid={ `${dataTestid}sub-total-${index}` }>
                {(item.products.price * item.quantity)
                  .toFixed(2)
                  .replace(/\./, ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2
        className="Total-Price"
        data-testid="customer_order_details__element-order-total-price"
      >
        Total da compra: R$
        {` ${products[0].Sales.totalPrice.replace(/\./, ',')} `}
      </h2>

    </div>
  );
}

export default OrderDetailCustomer;
