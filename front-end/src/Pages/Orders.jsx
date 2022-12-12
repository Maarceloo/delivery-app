import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../Service/request';
import NavBar from '../Component/Navbar';

function Orders() {
  const [sales, setSales] = useState([]);
  const [role, setRole] = useState([]);
  const [userId, setUserId] = useState();

  function getRole() {
    const user = JSON.parse(localStorage.getItem('user'));
    setRole(user.role);
    console.log(role, 'user');
    setUserId(user.id);
  }

  const dateFormat = (invalidData) => {
    const data = new Date(invalidData);
    const dateFormated = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    return dateFormated;
  };

  async function getSales() {
    const saless = await getData('seller/orders');
    console.log(role);
    if (role === 'seller') {
      const filteredSales = saless.filter((item) => item.sellerId === userId);
      setSales(filteredSales);
    }
    if (role === 'customer') {
      const filteredSales = saless.filter((item) => item.userId === userId);
      setSales(filteredSales);
    }
  }

  useEffect(() => {
    getRole();
  }, []);

  useEffect(() => {
    getSales();
  }, [role]);

  return (
    <div>
      <NavBar />
      <div>
        {
          sales.map((item) => (
            <div key={ item.id }>
              <Link color="black" to={ `/${role}/order/${item.id}` }>
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
                {role === 'seller' ? (() => {
                  <p
                    data-testid={ `seller_orders__element-card-address-${item.id}` }
                  >
                    {item.deliveryAddress}
                  </p>;
                })
                  : <p />}
              </Link>
            </div>
          ))
        }
      </div>
    </div>

  );
}

export default Orders;
