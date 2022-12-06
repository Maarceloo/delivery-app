import React, { useState, useEffect } from 'react';
import { getData } from '../Service/request';

function ProductCard() {
  const [quantity, setQuantity] = useState([]);
  // const [buttonDisabled, setButtonDisabled] = useState(false);
  const [product, setProduct] = useState([]);

  async function getProducts() {
    const products = await getData('customer/products');
    return setProduct(products);
  }

  useEffect(() => {
    getProducts();
    product.map((item) => (
      setQuantity((prev) => [...prev, { id: item.id, quantity: 0 }])));
  });

  const addQuantity = (productId) => {
    console.log(quantity);
    console.log(productId);
    if (quantit) {
      setQuantity(quantity.productId + 1);
    } else {
      setQuantity(quantity.productId + 1);
    }
  };
  const removeQuantity = () => (quantity > 0
    ? setQuantity(quantity - 1) : setQuantity(0));

  return (
    <>
      { product.map((item) => (
        <div key={ item.id }>
          <h2
            data-testid={ `customer_products__element-card-title-${item.id}` }
          >
            {item.name}
          </h2>
          <h1
            data-testid={ `customer_products__element-card-price-${item.id}` }
          >
            {item.price}
          </h1>
          <img
            data-testid={ `customer_products__img-card-bg-image-${item.id}` }
            src={ item.url_image }
            alt={ item.name }
          />
          {/* {quantity <= 0
            ? setButtonDisabled === true
            : ( */}
          <button
            className="button"
            type="button"
            onClick={ removeQuantity }
            // disabled={ buttonDisabled }
            data-testid={ `customer_products__button-card-rm-item-${item.id}` }
          >
            -
          </button>
          {/* )}
           */}
          <input
            type="text"
            value={ quantity }
            data-testid={ `customer_products__input-card-quantity-${item.id}` }
          />
          <button
            className="button"
            type="button"
            onClick={ () => addQuantity(item.id) }
            data-testid={ `customer_products__button-card-add-item-${item.id}` }
          >
            +
          </button>
        </div>
      )) }
    </>

  );
}

export default ProductCard;
