import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../Service/request';
import NavBar from '../Component/Navbar';

function SellerOrders() {
  const [sales, setSales] = useState([]);

  const dateFormat = (invalidData) => {
    const data = new Date(invalidData);
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
            <div key={ item.id }>
              <Link to="/seller/orders/details">
                <p data-testid={ `seller_orders__element-order-id-${item.id}` }>
                  Pedido
                  {' '}
                  {item.id}
                </p>
                <h3
                  data-testid={
                    `seller_orders__element-delivery-status-${item.id}`
                  }
                >
                  {item.status}

                </h3>
                <p
                  data-testid={
                    `seller_orders__element-order-date-${item.id}`
                  }
                >
                  {dateFormat(item.saleDate)}

                </p>
                <p
                  data-testid={ `seller_orders__element-card-price-${item.id}` }
                >
                  {`R$ ${item.totalPrice.replace(/\./, ',')}`}

                </p>
                <p
                  data-testid={ `seller_orders__element-card-address-${item.id}` }
                >
                  {item.deliveryAddress}
                </p>
              </Link>
            </div>
          ))
        }
      </div>
    </div>

  );
}

export default SellerOrders;
