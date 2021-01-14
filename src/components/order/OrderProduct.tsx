import React, { useState, useRef } from 'react';
import { Form } from 'react-final-form';
import { TextField, DatePicker, Select } from 'mui-rff';
import { MenuItem } from '@material-ui/core'

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
  customFields?: object[];
  addItemToCart: Function;
}

const OrderProduct = ({name, description, price, dozenPrice, customFields}: Props) => {
  const addToCartButton = useRef(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async (values) => {

  }

  // ToDo: change to use form
  return (
    <Form
      onSubmit={handleAddToCart}
      render={({handleSubmit, submitting, values, hasValidationErrors}) => (
        <form onSubmit={handleSubmit}>
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
            {/*button for snipcart verification*/}
            <button
              style={{display: 'none'}}
              className="snipcart-add-item"
              data-item-url="/order"
              data-item-id={name}
              data-item-name={name}
              data-item-price={price}
            />
            <AddToCartButton
              type="submit"
              disabled={submitting || hasValidationErrors}
            >
              Add To Cart
            </AddToCartButton>
          </ProductContainer>
        </form>
      )}
    />
  );
}

export default OrderProduct;