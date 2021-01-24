import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Select } from 'mui-rff';
import { MenuItem, Checkbox } from '@material-ui/core';
import { fonts, Button, Tabs } from '../../design-system';

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
  CustomFieldContainer,
  MakeYourOwnFlavor,
  Plus
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

  const [ makeYourOwnFieldsQuantity, setMakeYourOwnFieldsQuantity ] = useState(2);

  const id = name.replace(/\s+/g, '-').toLowerCase();

  const handleAddToCart = async (values) => {
    const product = {
      id,
      name,
      price,
      url: '/order',
      quantity: values.quantity,
      alternatePrices: dozenPrice ? {dozen: dozenPrice / 12} : {},
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
      case 'Macaron Flavors': {
        return (
          <Field name={field.name}>
            {props => (
              <CustomFieldContainer>
                <Select label="Pick a Flavor" {...props.input}>
                  {availableMacaronFlavors?.map((flavor, idx) => (
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
                  {availableCupcakeFlavors?.map((flavor, idx) => (
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

  const handleRenderDozenFlavors = () => {
    const flavorFields = [];
    for (let i = 0; i < makeYourOwnFieldsQuantity; i++) {
      flavorFields.push(
        <MakeYourOwnFlavor>
          <Field name={`Flavor-${i + 1}`}>
            {props => (
              <CustomFieldContainer>
                <Select label="Pick a Flavor" {...props.input}>
                  {availableCupcakeFlavors?.map((flavor, idx) => (
                    <MenuItem key={idx} value={flavor.name}>{flavor.name}</MenuItem>
                  ))}
                </Select>
              </CustomFieldContainer>
            )}
          </Field>
          <Field name={`Flavor-${i + 1}-quantity`} type="number" initialValue={1}>
            {props => (
              <>
                <QuantityInput marginBottom={20} {...props.input}/>
              </>
            )}
          </Field>
        </MakeYourOwnFlavor>
      );
    }

    return (
      <>
        {flavorFields}
        <Plus onClick={() => setMakeYourOwnFieldsQuantity(makeYourOwnFieldsQuantity + 1)}>+</Plus>
      </>
    );
  }

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
            {name === 'Make Your Own Dozen Cupcakes' && handleRenderDozenFlavors()}
            {name !== 'Make Your Own Dozen Cupcakes' && customFields?.map(handleRenderField)}
            {name !== 'Make Your Own Dozen Cupcakes' && (
              <Field name="quantity" type="number" initialValue={1}>
                {props => (
                  <>
                    <QuantityInputLabel>Quantity:</QuantityInputLabel>
                    <QuantityInput marginBottom={20} min={1} {...props.input}/>
                  </>
                )}
              </Field>
              )
            }
            {/*button for snipcart verification*/}
            <button
              style={{display: 'none'}}
              className="snipcart-add-item"
              data-item-url="/order"
              data-item-id={id}
              data-item-name={name}
              data-item-price={price}
              {...dozenPrice && {'dozen-item-price-dozen': dozenPrice / 12} }
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