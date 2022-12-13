import React from 'react';

function OrderDetail() {
  return (
    <>
      <h1> Detalhe do pedido</h1>
      <section>
        <h1>numero do pedido</h1>
        <h1> nome do vendedor</h1>
        <h1>data</h1>
        <h1>status do pedido</h1>
        <button type="button">pedido entregue</button>
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
            </tr>
          ))}
        </tbody>
      </table>
      <h2 data-testid="customer_checkout__element-order-total-price">
        Total da compra: R$
        {` ${totalProducts().replace(/\./, ',')} `}
      </h2>
    </>
  );
}

export default OrderDetail;
