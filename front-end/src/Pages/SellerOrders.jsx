import React, { useState, useEffect } from 'react';
import { getData } from '../Service/request';
import NavBar from '../Component/Navbar'

function SellerOrders() {
  const [sales, setSales] = useState([]);

  const dateFormat = (invalidData) => {
    const data = new Date(invalidData)
    const dateFormated = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    return dateFormated;
  };

  // const createDate = () => {
  //   const date = new Date()
  //   console.log(date, 'date');
  //   return date
  // }

  async function getSales() {
    const saless = await getData('seller/orders');
    setSales(saless);
    console.log(sales);
    console.log(saless);
  }

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        {
          sales.map((item) => (
            <div key={item.id}>
              <p testid={ `seller_orders__element-order-id-${item.id}` }>Pedido {item.id}</p>
              <h3 testid={ `seller_orders__element-delivery-status-${item.id}` }>{item.status}</h3>
              <p testid={ `seller_orders__element-order-date-${item.id}` }>{dateFormat(item.saleDate)}</p>
              <p testid={ `seller_orders__element-card-price-${item.id}` }>{`R$ ${item.totalPrice.replace(/\./, ',') }`}</p>
              <p testid={ `seller_orders__element-card-address-${item.id}` }>{item.deliveryAddress}</p>
            </div>
          ))
        }
      </div>
    </div>

  );
}


export default SellerOrders;
