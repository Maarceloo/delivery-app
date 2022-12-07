// https://github.com/brunowbbs/Frontend-III/tree/master/aula20 (req15)

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getData } from '../Service/request';

function ProductCard() {
  const history = useHistory();
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
      console.log('ifadd');
    } else {
      item.quantity += 1;
      console.log('elseadd');
    }
    setQuantity(copyQuantity);
    console.log(copyQuantity, 'aqui');
  };

  const removeQuantity = (productId) => {
    const copyQuantity = [...quantity];

    const n = copyQuantity.map((i) => {
      if (i.id === productId) {
        i.quantity -= 1;
      }
      return i;
    });

    const item = quantity.find((i) => i.id === productId);
    if (item && item.quantity > 0) {
      // item.quantity -= 1;
      setQuantity(n);
      console.log('ifremove');
    } else {
      const filter = copyQuantity.filter((i) => i.id !== productId);
      setQuantity(filter);
      console.log('elseremove');
      // console.log(filter);
    }
  };

  const inputValue = (productId, target) => {
    const copyQuantity = [...quantity];
    const item = quantity.find((i) => i.id === productId);
    if (!item) {
      copyQuantity.push({ id: productId, quantity: Number(target) });
      console.log('ifinput');
    } else {
      item.quantity = Number(target);
      console.log('elseinput');
    }
    setQuantity(copyQuantity);
    console.log(copyQuantity);
  };

  const sumCart = () => {
    const sum = quantity.reduce(
      (acc, curr) => {
        const item = product.find((i) => i.id === curr.id);
        return acc + (curr.quantity * item.price);
      },
      0,
    );
    return sum;
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
            width="100px"
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
            onChange={ ({ target }) => inputValue(item.id, target.value) }
            // value={ quantity }
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
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
        disabled={ quantity.length === 0 }
      >
        <h4
          data-testid="customer_products__checkout-bottom-value"
        >
          {`${sumCart().toFixed(2, 2).replace(/\./, ',')}`}
        </h4>
      </button>

    </>

  );
}

export default ProductCard;
