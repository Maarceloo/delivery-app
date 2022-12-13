import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../Service/request';

function OrderDetail() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const data = await getData(`sales/products/${id}`);
    setProducts(data);
  }

  const totalProducts = () => {
    const copyCartProducts = [...products];
    const total = copyCartProducts
      .reduce((acc, curr) => acc + curr.quantity * curr.products.price, 0);
    return total.toFixed(2);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const dataTestid = 'customer_order_details__element-order-table-';
  const dataTestid2 = 'customer_order_details__element-order-details-label-';

  return (
    <>
      <h1> Detalhe do pedido</h1>
      <section>
        <h1 data-testid={ `${dataTestid2}order-id` }>numero do pedido</h1>
        <h1 data-testid={ `${dataTestid2}seller-name` }> nome do vendedor</h1>
        <h1 data-testid={ `${dataTestid2}order-date` }>data</h1>
        <h1 data-testid={ `${dataTestid2}delivery-status` }>status do pedido</h1>
        <button
          data-testid="customer_order_details__button-delivery-check"
          type="button"
        >
          pedido entregue
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
          {products
            && products.map((item, index) => (
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
                  {(item.products.price * item.quantity).toFixed(2).replace(/\./, ',')}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <h2 data-testid="customer_order_details__element-order-total-price">
        Total da compra: R$
        {` ${totalProducts().replace(/\./, ',')} `}
      </h2>
    </>
  );
}

export default OrderDetail;
