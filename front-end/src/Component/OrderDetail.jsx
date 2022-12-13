import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../Service/request';

function OrderDetail() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState([]);

  async function getProductsAndSeller() {
    const data = await getData(`sales/products/${id}`);
    const vendedor = await getData('users');

    const idSeller = data[0].Sales.sellerId;
    const nameSeller = vendedor.filter((item) => item.id === idSeller);

    setProducts(data);
    setSeller(nameSeller[0].name);
  }

  useEffect(() => {
    getProductsAndSeller();
  }, []);

  const dataTestid = 'customer_order_details__element-order-table-';
  const dataTestid2 = 'customer_order_details__element-order-details-label-';

  if (!products.length && !seller.length) return <p>Loading...</p>;

  return (
    <>
      <h1> Detalhe do pedido</h1>
      <section>
        <h1 data-testid={ `${dataTestid2}order-id` }>{`PEDIDO ${id}`}</h1>
        <h1 data-testid={ `${dataTestid2}seller-name` }>{`${seller}`}</h1>
        <h1 data-testid={ `${dataTestid2}order-date` }>
          {`${new Date(products[0].Sales.saleDate).toLocaleDateString('pt-br')}`}
        </h1>
        <h1 data-testid={ `${dataTestid2}delivery-status` }>
          {`${products[0].Sales.status}`}
        </h1>
        <button
          data-testid="customer_order_details__button-delivery-check"
          type="button"
          disabled={ `${products[0].Sales.status !== 'entregue'}` }
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
      <h2 data-testid="customer_order_details__element-order-total-price">
        Total da compra: R$
        {` ${products[0].Sales.totalPrice.replace(/\./, ',')} `}
      </h2>
    </>
  );
}

export default OrderDetail;
