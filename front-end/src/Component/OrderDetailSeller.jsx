import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData, updateData } from '../Service/request';

function OrderDetailSeller() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState([]);
  const [token, setToken] = useState();
  const [updated, setUpdated] = useState(false)

  async function getProductsAndSeller() {
    const data = await getData(`sales/products/${id}`);
    const vendedor = await getData('users');

    const idSeller = data[0].Sales.sellerId;
    const nameSeller = vendedor.filter((item) => item.id === idSeller);

    setProducts(data);
    setSeller(nameSeller[0].name);
  }

  function getLocalStorage() {
    const user = JSON.parse(localStorage.getItem('user'));
    setToken(user.token);
  }

  const updateUser = async (id, status) => {
    const body = {id, status}
     await updateData('seller/orders', body, token)
     if(updated) {
      setUpdated(false)
     } else {
      setUpdated(true)
     }
  }

  useEffect(() => {
    getProductsAndSeller();
    getLocalStorage()
  }, [updated]);

  const dataTestid = 'seller_order_details__element-order-table-';
  const dataTestid2 = 'seller_order_details__element-order-details-label-';

  if (!products.length && !seller.length) return <p>Loading...</p>;

  return (
    <>
      <h1> Detalhe do pedido</h1>
      <section>
        <h1 data-testid={ `${dataTestid2}order-id` }>{`PEDIDO ${id}`}</h1>
        <h1 data-testid={ `${dataTestid2}order-date` }>
          {`${new Date(products[0].Sales.saleDate).toLocaleDateString('pt-br')}`}
        </h1>
        <h1 data-testid={ `${dataTestid2}delivery-status` }>
          {`${products[0].Sales.status}`}
        </h1>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          disabled={ products[0].Sales.status !== 'Pendente' }
          value="Preparando"
          onClick={({target}) => {updateUser(target.value, products.Sales.id)}}
        >
          Preparar Pedido!
        </button>
        <button
          data-testid="seller_order_details__button-dispatch-check"
          type="button"
          disabled={ products[0].Sales.status !== 'Preparando' }
          value="A Caminho"
          onClick={({target}) => {updateUser(target.value, products.Sales.id)}}
        >
          Saiu para Entrega!
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
      <h2 data-testid="seller_order_details__element-order-total-price">
        Total da compra: R$
        {` ${products[0].Sales.totalPrice.replace(/\./, ',')} `}
      </h2>
    </>
  );
}

export default OrderDetailSeller;
