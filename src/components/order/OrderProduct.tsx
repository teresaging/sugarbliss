import React, { useState, useRef } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, DatePicker, Select } from 'mui-rff';
import { MenuItem } from '@material-ui/core';

import {
  ProductContainer,
  Name,
  Description,
  Price,
  PriceWithDozen,
  AddToCartButton,
  QuantityInput,
  QuantityInputLabel,
  CustomFieldInput,
  CustomFieldLabel,
  CustomFieldContainer
} from './Styled';

type Props = {
  name: string;
  description?: string;
  price: number;
  dozenPrice?: number;
  customFields?: object[];
  addItemToCart: Function;
}

const OrderProduct = ({name, description, price, dozenPrice, customFields, addItemToCart}: Props) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async (values) => {
    console.log(values);
    const id = name.replace(/\s+/g, '-').toLowerCase();
    const product = {
      id,
      name,
      price: price,
      url: 'order',
      quantity: values.quantity,
    }
    addItemToCart(product);
  }

  const handleRenderField = (field) => {
    switch (field.type) {
      default: {
        return (
          <CustomFieldContainer>
            <CustomFieldLabel>{field.name}:</CustomFieldLabel>
            <CustomFieldInput
              type="text"
              name={field.name}
            />
          </CustomFieldContainer>
        );
      }
    }
  }

  // ToDo: fix form
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
            {customFields?.map(handleRenderField)}
            <Field name="quantity" type="number" initialValue={1}>
              {props => (
                <>
                  <QuantityInputLabel>Quantity:</QuantityInputLabel>
                  <QuantityInput marginBottom={20} min={1} {...props.input}/>
                </>
              )}
            </Field>
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