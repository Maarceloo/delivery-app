// https://github.com/brunowbbs/Frontend-III/tree/master/aula20 (req15)

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getData } from '../Service/request';
import '../Style/ProductCard.css';
import changeValue from '../Service/functions';

function ProductCard() {
  const history = useHistory();
  const [quantity, setQuantity] = useState([]);
  const [product, setProduct] = useState([]);

  async function getProducts() {
    const products = await getData('customer/products');
    setProduct(products);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const addQuantity = (produto) => {
    const copyQuantity = [...quantity];
    const item = quantity.find((i) => i.id === produto.id);
    if (!item) {
      copyQuantity.push({ ...produto, quantity: 1 });
    } else {
      item.quantity += 1;
    }
    setQuantity(copyQuantity);
    localStorage.setItem('cart', JSON.stringify(copyQuantity));
  };

  const removeQuantity = (produto) => {
    const copyQuantity = [...quantity];

    const n = copyQuantity.map((i) => {
      if (i.id === produto.id) {
        i.quantity -= 1;
      }
      return i;
    });

    const item = quantity.find((i) => i.id === produto.id);
    if (item && item.quantity > 0) {
      setQuantity(n);
      localStorage.setItem('cart', JSON.stringify(n));
    } else {
      const filter = copyQuantity.filter((i) => i.id !== produto.id);
      setQuantity(filter);
      localStorage.setItem('cart', JSON.stringify(filter));
    }
  };

  const inputValue = (produto, target) => {
    const copyQuantity = [...quantity];
    const item = quantity.find((i) => i.id === produto.id);
    if (!item) {
      copyQuantity.push({ ...produto, quantity: Number(target) });
    } else {
      item.quantity = Number(target);
    }
    setQuantity(copyQuantity);
    localStorage.setItem('cart', JSON.stringify(copyQuantity));
  };

  const sumCart = () => {
    const sum = quantity.reduce(
      (acc, curr) => {
        const item = product.find((i) => i.id === curr.id);
        return acc + (curr.quantity * item.price);
      },
      0,
    );
    const result = changeValue(sum);
    return result;
  };

  return (
    <>
      <div className="page">
        {product.map((item) => (
          <div key={ item.id } className="product">
            <h1
              data-testid={ `customer_products__element-card-title-${item.id}` }
            >
              {item.name}
            </h1>
            <h1
              data-testid={ `customer_products__element-card-price-${item.id}` }
            >
              {item.price.replace(/\./, ',')}
            </h1>
            <img
              data-testid={ `customer_products__img-card-bg-image-${item.id}` }
              src={ item.urlImage }
              alt={ item.name }
              width="100px"
            />
            <div className="product-quantity">
              <button
                className="button"
                type="button"
                onClick={ () => removeQuantity(item) }
                data-testid={ `customer_products__button-card-rm-item-${item.id}` }
              >
                -
              </button>
              <input
                type="text"
                onChange={ ({ target }) => inputValue(item, target.value) }
                value={ quantity.find((i) => i.id === item.id)?.quantity
                  ? quantity.find((i) => i.id === item.id)?.quantity : 0 }
                data-testid={ `customer_products__input-card-quantity-${item.id}` }
              />
              <button
                className="button"
                type="button"
                onClick={ () => addQuantity(item) }
                data-testid={ `customer_products__button-card-add-item-${item.id}` }
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="checkout-button"
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
        disabled={ quantity.length === 0 }
      >
        <h4
          data-testid="customer_products__checkout-bottom-value"
        >
          {sumCart()}
        </h4>
      </button>

    </>

  );
}

export default ProductCard;
