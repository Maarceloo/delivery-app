import React, { useState, useEffect } from 'react';
import { getData } from '../Service/request';

function ProductCard() {
  const [quantity, setQuantity] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [product, setProduct] = useState([]);

  async function getProducts() {
    const products = await getData('customer/products');
    return setProduct(products);
  }

  useEffect(() => {
    getProducts();
  });

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };
  const removeQuantity = () => {
    setQuantity(quantity - 1);
  };

  return (
    <>
      { product.map((item) => (
        <div key={ item.id }>
          <h2
            data-testid="customer_products__element-card-title"
          >
            {item.name}
          </h2>
          <h1
            data-testid="customer_products__element-card-price"
          >
            {item.price}
          </h1>
          <img
            data-testid="customer_products__img-card-bg-image"
            src={ item.url_image }
            alt={ item.name }
          />
          {quantity <= 0
            ? setButtonDisabled === true
            : (
              <button
                className="button"
                type="button"
                onClick={ removeQuantity }
                disabled={ buttonDisabled }
                data-testid="customer_products__button-card-rm-item"
              >
                -
              </button>
            )}
          <p data-testid="customer_products__input-card-quantity">{ quantity }</p>
          <button
            className="button"
            type="button"
            onClick={ addQuantity }
            data-testid="customer_products__button-card-add-item"
          >
            +
          </button>
        </div>
      )) }
    </>

  );
}

export default ProductCard;
