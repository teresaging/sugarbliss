import React, { useState, useRef } from 'react';

import {
  ProductContainer,
  Name,
  Description,
  Price,
  PriceWithDozen,
  AddToCartButton,
  QuantityInput,
  QuantityInputLabel
} from './Styled';

type Props = {
  name: string;
  description?: string;
  price: number;
  dozenPrice?: number;
}

const OrderProduct = ({name, description, price, dozenPrice}: Props) => {
  const addToCartButton = useRef(null);
  const [quantity, setQuantity] = useState(1);

  // maybe use a form here?
  return (
    <ProductContainer>
      <Name>{name}</Name>
      {description && <Description>{description}</Description>}
      {dozenPrice ? (
        <PriceWithDozen>Single price: ${price} | Dozen price: ${dozenPrice} </PriceWithDozen>
      ) : (
        <Price>${price}</Price>
      )}
      <QuantityInputLabel>Quantity:</QuantityInputLabel>
      <QuantityInput
        onChange={(event) => setQuantity(event.target.valueAsNumber || 1)}
        marginBottom={20}
        placeholder="0"
        type="number"
        name="quantity"
        min={1}
        value={quantity}
      />
      <AddToCartButton
        className="snipcart-add-item"
        data-item-url="/order"
        data-item-id={name}
        data-item-name={name}
        data-item-price={price}
        data-item-quantity={quantity}
        ref={addToCartButton}
      >
        Add To Cart
      </AddToCartButton>
    </ProductContainer>
  );
}

export default OrderProduct;