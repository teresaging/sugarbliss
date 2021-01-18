import React, { useState, useRef } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, DatePicker, Select } from 'mui-rff';
import { MenuItem, Checkbox } from '@material-ui/core';

import { Cupcake, Macaron, OrderCustomFields } from '../../sharedTypes';

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
  customFields?: OrderCustomFields[];
  addItemToCart: Function;
  availableCupcakeFlavors: Cupcake[];
  availableMacaronFlavors: Macaron[];
}

const OrderProduct = ({name, description, price, dozenPrice, customFields, addItemToCart, availableCupcakeFlavors, availableMacaronFlavors}: Props) => {

  const seasonalCupcakes = availableCupcakeFlavors.filter((cupcake) => cupcake.isSeasonal);
  const dailyCupcakes = availableCupcakeFlavors.filter((cupcake) => !cupcake.isSeasonal);
  const seasonalMacarons = availableMacaronFlavors.filter((macaron) => macaron.isSeasonalFlavor);
  const dailyMacarons = availableMacaronFlavors.filter((macaron) => !macaron.isSeasonalFlavor);

  const handleAddToCart = async (values) => {
    const id = name.replace(/\s+/g, '-').toLowerCase();
    const product = {
      id,
      name,
      price: price,
      url: 'order',
      quantity: values.quantity,
    }
    if (customFields) {
     const snipCartCustomFields = customFields.map((customField) => {
       if (values[customField.name]) {
         return {
           name: customField.name,
           type: 'readonly',
           value: values[customField.name],
         }
       }

       return null;
      }).filter((field) => field !== null);

     return addItemToCart({
       ...product,
       customFields: snipCartCustomFields,
     })
    }

    return addItemToCart(product);
  }

  const handleRenderField = (field) => {
    switch (field.type) {
      case 'Seasonal Macaron Flavors': {
        return (
          <Field name={field.name}>
            {props => (
              <CustomFieldContainer>
                <Select label="Pick a Flavor" {...props.input}>
                  {seasonalMacarons.map((flavor, idx) => (
                    <MenuItem key={idx} value={flavor.name}>{flavor.name}</MenuItem>
                  ))}
                </Select>
              </CustomFieldContainer>
            )}
          </Field>
        )
        break;
      }
      case 'Macaron Flavors': {
        return (
          <Field name={field.name}>
            {props => (
              <CustomFieldContainer>
                <Select label="Pick a Flavor" {...props.input}>
                  {dailyMacarons.map((flavor, idx) => (
                    <MenuItem key={idx} value={flavor.name}>{flavor.name}</MenuItem>
                  ))}
                </Select>
              </CustomFieldContainer>
            )}
          </Field>
        )
        break;
      }
      case 'Seasonal Cupcake Flavors': {
        return (
          <Field name={field.name}>
            {props => (
              <CustomFieldContainer>
                <Select label="Pick a Flavor" {...props.input}>
                  {seasonalCupcakes.map((flavor, idx) => (
                    <MenuItem key={idx} value={flavor.name}>{flavor.name}</MenuItem>
                  ))}
                </Select>
              </CustomFieldContainer>
            )}
          </Field>
        )
        break;
      }
      case 'Cupcake Flavors': {
        return (
          <Field name={field.name}>
            {props => (
              <CustomFieldContainer>
                <Select label="Pick a Flavor" {...props.input}>
                  {dailyCupcakes.map((flavor, idx) => (
                    <MenuItem key={idx} value={flavor.name}>{flavor.name}</MenuItem>
                  ))}
                </Select>
              </CustomFieldContainer>
            )}
          </Field>
        )
        break;
      }
      case 'Select Input': {
        return (
          <Field name={field.name}>
            {props => (
              <CustomFieldContainer>
                <Select label={field.name} {...props.input}>
                  {field.choices.map((choice, idx) => (
                    <MenuItem key={idx} value={choice}>{choice}</MenuItem>
                  ))}
                </Select>
              </CustomFieldContainer>
            )}
          </Field>
        )
        break;
      }
      case 'Checkbox': {
        return (
          <Field name={field.name}>
            {props => (
              <CustomFieldContainer>
                <CustomFieldLabel>{field.name}:</CustomFieldLabel>
                <Checkbox {...props.input} />
              </CustomFieldContainer>
            )}
          </Field>
        )
        break;
      }
      default: {
        return (
          <Field name={field.name}>
            {props => (
              <CustomFieldContainer>
                <CustomFieldLabel>{field.name}:</CustomFieldLabel>
                <CustomFieldInput type="text" {...props.input} />
              </CustomFieldContainer>
            )}
          </Field>
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