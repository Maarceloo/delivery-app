// https://github.com/brunowbbs/Frontend-III/tree/master/aula20 (req15)

import React, { useState, useEffect } from 'react';
import { getData } from '../Service/request';

function ProductCard() {
  const [quantity, setQuantity] = useState([]);
  // const [buttonDisabled, setButtonDisabled] = useState(false);
  const [product, setProduct] = useState([]);

  async function getProducts() {
    const products = await getData('customer/products');
    setProduct(products);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const addQuantity = (productId) => {
    const copyQuantity = [...quantity];
    const item = quantity.find((i) => i.id === productId);
    if (!item) {
      copyQuantity.push({ id: productId, quantity: 1 });
    } else {
      item.quantity += 1;
    }
    setQuantity(copyQuantity);
    console.log(copyQuantity);
  };

  const removeQuantity = (productId) => {
    const copyQuantity = [...quantity];
    const item = quantity.find((i) => i.id === productId);
    if (item && item.quantity > 0) {
      item.quantity -= 1;
      setQuantity(copyQuantity);
      console.log(copyQuantity);
    } else {
      const filter = copyQuantity.filter((i) => i.id !== productId);
      setQuantity(filter);
      // console.log(filter);
    }
  };

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
            {item.price.replace(/\./, ',') }
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
            onClick={ () => removeQuantity(item.id) }
            // disabled={ buttonDisabled }
            data-testid={ `customer_products__button-card-rm-item-${item.id}` }
          >
            -
          </button>
          {/* )}
           */}
          <input
            type="text"
            value={ quantity.find((i) => i.id === item.id)?.quantity
              ? quantity.find((i) => i.id === item.id)?.quantity : 0 }
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
