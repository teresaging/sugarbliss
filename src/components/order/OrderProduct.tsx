import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Select } from 'mui-rff';
import { MenuItem, Checkbox } from '@material-ui/core';
import { PlusCircle, MinusCircle } from 'react-feather';
import { FORM_ERROR } from 'final-form'

import { Cupcake, Macaron, OrderCustomFields, CakePop, Cookies } from '../../sharedTypes';

import {
  ProductContainer,
  Name,
  Description,
  Price,
  AddToCartButton,
  QuantityInput,
  QuantityInputLabel,
  CustomFieldLabel,
  CustomFieldContainer,
  CustomFieldTextContainer,
  CustomFieldTextArea,
  MakeYourOwnFlavor,
  PlusMinusButton,
  MakeYourOwnMinusPlusContainer,
  MakeYourOwnTopContainer,
  MakeYourOwnContainer,
  ErrorText,
} from './Styled';

type Props = {
  name: string;
  description?: string;
  price: number;
  customFields?: OrderCustomFields[];
  addItemToCart: Function;
  availableCupcakeFlavors: Cupcake[];
  availableMacaronFlavors: Macaron[];
  availableCakePopFlavors: CakePop[];
  availableCookiesFlavors: Cookies[];
  availableMuffinsFlavors: string[];
  availableSconesFlavors: string[];
}

const OrderProduct = ({
  name,
  description = '',
  price,
  customFields = [],
  addItemToCart,
  availableCupcakeFlavors,
  availableMacaronFlavors,
  availableCakePopFlavors,
  availableCookiesFlavors,
  availableMuffinsFlavors,
  availableSconesFlavors
}: Props) => {

  let isMakeYourOwnFlavorsProduct = false;
  let makeYourOwnFlavorsQuantity = 0;

  const [ makeYourOwnFieldsQuantity, setMakeYourOwnFieldsQuantity ] = useState(2);

  const id = name.replace(/\s+/g, '-').toLowerCase();

  const handleAddToCart = async (values) => {
    const makeYourOwnCustomFields = [];
    if (isMakeYourOwnFlavorsProduct) {
      let quantity = 0;
      for (let i = 0; i < makeYourOwnFieldsQuantity; i++) {
        quantity += parseInt(values[`Flavor-${i + 1}-quantity`], 10);
        makeYourOwnCustomFields.push({
          name: `Flavor ${i + 1}`,
          type: 'readonly',
          value: `${values[`Flavor-${i + 1}`]} - ${values[`Flavor-${i + 1}-quantity`]}`,
        });
      }
      if (quantity !== makeYourOwnFlavorsQuantity) {
        return { [FORM_ERROR]: `Quantity needs to equal ${makeYourOwnFlavorsQuantity}` };
      }
    }
    const product = {
      id,
      name,
      price,
      url: '/order',
      quantity: values.quantity,
    }
    if (customFields) {
     const snipCartCustomFields = customFields.filter((customField) => !customField.isMakeYourOwnFlavor).map((customField) => {
       if (values[customField.name]) {
         return {
           name: customField.name,
           type: 'readonly',
           value: values[customField.name],
         }
       }

       return null;
      }).filter((field) => field !== null);

     try {
       return addItemToCart({
         ...product,
         customFields: snipCartCustomFields.concat(makeYourOwnCustomFields),
       })
     } catch (error) {
       console.log('error adding to cart', error);
     }
    }

    try {
      return addItemToCart(product);
    } catch (error) {
      console.log('error adding to cart', error);
    }
  }

  const handleRenderField = (field) => {
    if (field.isMakeYourOwnFlavor) {
      isMakeYourOwnFlavorsProduct = true;
      makeYourOwnFlavorsQuantity = field.makeYourOwnFlavorsQuantity;

      return handleRenderMakeYourOwnFlavors(field);
    }
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
      case 'Cake Pop Flavors': {
        return (
          <Field name={field.name}>
            {props => (
              <CustomFieldContainer>
                <Select label="Pick a Flavor" {...props.input}>
                  {availableCakePopFlavors?.map((flavor, idx) => (
                    <MenuItem key={idx} value={flavor.name}>{flavor.name}</MenuItem>
                  ))}
                </Select>
              </CustomFieldContainer>
            )}
          </Field>
        )
        break;
      }
      case 'Cookies Flavors': {
        return (
          <Field name={field.name}>
            {props => (
              <CustomFieldContainer>
                <Select label="Pick a Flavor" {...props.input}>
                  {availableCookiesFlavors?.map((flavor, idx) => (
                    <MenuItem key={idx} value={flavor.name}>{flavor.name}</MenuItem>
                  ))}
                </Select>
              </CustomFieldContainer>
            )}
          </Field>
        )
        break;
      }
      case 'Muffins Flavors': {
        return (
          <Field name={field.name}>
            {props => (
              <CustomFieldContainer>
                <Select label="Pick a Flavor" {...props.input}>
                  {availableMuffinsFlavors?.map((flavor, idx) => (
                    <MenuItem key={idx} value={flavor}>{flavor}</MenuItem>
                  ))}
                </Select>
              </CustomFieldContainer>
            )}
          </Field>
        )
        break;
      }
      case 'Scones Flavors': {
        return (
          <Field name={field.name}>
            {props => (
              <CustomFieldContainer>
                <Select label="Pick a Flavor" {...props.input}>
                  {availableSconesFlavors?.map((flavor, idx) => (
                    <MenuItem key={idx} value={flavor}>{flavor}</MenuItem>
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
              <CustomFieldTextContainer>
                <CustomFieldLabel>{field.name}:</CustomFieldLabel>
                <CustomFieldTextArea type="text" {...props.input} />
              </CustomFieldTextContainer>
            )}
          </Field>
        );
      }
    }
  }

  const handleRenderMakeYourOwnFlavors = (field) => {
    let flavors = [];
    if (field.type === 'Cupcake Flavors') {
      flavors = availableCupcakeFlavors;
    }
    if (field.type === 'Macaron Flavors') {
      flavors = availableMacaronFlavors;
    }
    if (field.type === 'Cake Pop Flavors') {
      flavors = availableCakePopFlavors;
    }
    if (field.type === 'Cookies Flavors') {
      flavors = availableCookiesFlavors;
    }
    if (field.type === 'Muffins Flavors') {
      flavors = availableMuffinsFlavors;
    }
    if (field.type === 'Scones Flavors') {
      flavors = availableSconesFlavors;
    }
    if (field.type === 'Select Input') {
      flavors = field.choices;
    }
    const flavorFields = [];
    if (flavors.length > 0) {
      for (let i = 0; i < makeYourOwnFieldsQuantity; i++) {
        flavorFields.push(
          <MakeYourOwnFlavor key={i}>
            <Field name={`Flavor-${i + 1}`}>
              {props => (
                <CustomFieldContainer>
                  <Select label="Pick a Flavor" {...props.input}>
                    {/*@ts-ignore*/}
                    {flavors.length > 0 && flavors.map((flavor, idx) => (
                      <MenuItem
                        key={idx}
                        value={flavor.name || flavor}>
                        {flavor.name || flavor}
                      </MenuItem>
                    ))}
                  </Select>
                </CustomFieldContainer>
              )}
            </Field>
            <Field name={`Flavor-${i + 1}-quantity`} type="number" initialValue={1}>
              {props => (
                <>
                  <QuantityInput marginBottom={15} {...props.input}/>
                </>
              )}
            </Field>
          </MakeYourOwnFlavor>
        );
      }
    }

    return (
      <MakeYourOwnContainer>
        <MakeYourOwnTopContainer>
          <p>Flavor</p>
          <p>Quantity</p>
        </MakeYourOwnTopContainer>
        {flavorFields}
        <MakeYourOwnMinusPlusContainer>
          <PlusMinusButton onClick={() => setMakeYourOwnFieldsQuantity(makeYourOwnFieldsQuantity + 1)}><PlusCircle size={20} /></PlusMinusButton>
          <PlusMinusButton onClick={() => makeYourOwnFieldsQuantity > 1 && setMakeYourOwnFieldsQuantity(makeYourOwnFieldsQuantity - 1)}><MinusCircle size={20} /></PlusMinusButton>
        </MakeYourOwnMinusPlusContainer>
      </MakeYourOwnContainer>
    );
  }

  return (
    <>
      <Form
        onSubmit={handleAddToCart}
        render={({handleSubmit, submitting, values, hasValidationErrors, submitError}) => (
          <form onSubmit={handleSubmit}>
            <ProductContainer>
              <Name>{name}</Name>
              {description && <Description>{description}</Description>}
              <Price>${price}</Price>
              {customFields?.map((field, idx) => (
                <div style={{width: '100%'}} key={idx}>
                  {handleRenderField(field)}
                </div>
              ))}
              {!isMakeYourOwnFlavorsProduct && (
                <Field name="quantity" type="number" initialValue={1}>
                  {props => (
                    <>
                      <QuantityInputLabel>Quantity:</QuantityInputLabel>
                      <QuantityInput marginBottom={20} min={1} {...props.input}/>
                    </>
                  )}
                </Field>
              )}
              {submitError && <ErrorText>{submitError}</ErrorText>}
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
      {/*button for snipcart verification*/}
      <button
        style={{display: 'none'}}
        className="snipcart-add-item"
        data-item-url="/order"
        data-item-id={id}
        data-item-name={name}
        data-item-price={price}
      >
        Add To Cart
      </button>
    </>
  );
}

export default OrderProduct;