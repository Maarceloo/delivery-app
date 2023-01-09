import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../Service/request';
import NavBar from '../Component/Navbar';
import '../Style/Order.css';

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
            <div key={ item.id } className="order-box">
              <Link color="black" to={ `/${role}/orders/${item.id}` } className="link">
                <p
                  data-testid={ `${role}_orders__element-order-id-${item.id}` }
                  className="pedido"
                >
                  Pedido
                  {' '}
                  {item.id}
                </p>
                <br />
                <h3
                  data-testid={
                    `${role}_orders__element-delivery-status-${item.id}`
                  }
                  className={ `status-${item.status}` }
                >
                  {item.status}

                </h3>
                <p
                  data-testid={
                    `${role}_orders__element-order-date-${item.id}`
                  }
                >
                  {dateFormat(item.saleDate)}

                </p>
                <br />
                <p
                  data-testid={ `${role}_orders__element-card-price-${item.id}` }
                >
                  {`R$ ${item.totalPrice.replace(/\./, ',')}`}

                </p>
                {role === 'seller' ? (
                  <p
                    data-testid={ `seller_orders__element-card-address-${item.id}` }
                    className="adress"
                  >
                    {item.deliveryAddress}
                  </p>
                )
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
