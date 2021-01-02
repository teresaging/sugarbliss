import React, { useContext, useRef, useState, useEffect } from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { SnipcartContext } from 'gatsby-plugin-snipcart-advanced/context';

import Layout from '../components/layout';
import OrderDeliveryPickup from '../components/order/OrderDeliveryPickup';
import OrderDeliveryForm from '../components/order/OrderDeliveryForm';
import OrderPickupForm from '../components/order/OrderPickupForm';

import styled from '@emotion/styled';
import { fonts, Button } from '../design-system';
import { sizing, colors } from '../utils';
import { Cupcake } from '../sharedTypes';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type OrderQueryProps = {
  allShopifyProduct: {
    nodes: any;
  };
};

type OrderProps = PageProps<OrderQueryProps>;

const OrderPage = ({data}: OrderProps) => {
  const { state, addItem, removeItem } = useContext(SnipcartContext);
  const { userStatus, cartQuantity, cartItems } = state;
  const [ orderType, setOrderType ] = useState(null);
  const [ step, setStep ] = useState(1);
  const [ dayOfWeek, setDayOfWeek ] = useState(null);

  const testingRef = useRef(null);

  // useEffect(() => {
  //   // cleanse cart
  //   removeAllItemsFromCart();
  // }, [0]);

  const removeAllItemsFromCart = () => {
    // ToDo: add removeItem to snipcart plugin
    if (cartItems && cartItems.length !== 0) {
      cartItems.forEach(async (item) => {
        await removeItem(item.uniqueId);
      });
    }
  }

  const addItemToCart = (item) => {
      addItem(item);
  }

  const applyDiscount = (productId) => {
    // client.checkout.addDiscount(checkoutId, discountCode);
  }

  const handleOnClick = () => {
    if (testingRef !== null) {
      testingRef.current.click();
    }
  }

  const handleOptionPress = (value) => {
    setOrderType(value);
    const nextStep = 2; // this will always be step 2
    setStep(nextStep);
  }

  const handleAddPickupOrDeliveryToCart = (value) => {
    addItem({
      id: value === 'pickup' ? 'pickup-from-store' : 'local-delivery',
      name: value === 'pickup' ? 'Pickup From Store' : 'Local Delivery',
      price: 0,

    });
  }

  const goBackAStep = () => {
    const previousStep = step - 1;
    setStep(previousStep);
  }

  return (
    <Layout>
      <Container>
      {step === 1 && (
        <OrderDeliveryPickup onOptionPress={handleOptionPress} />
      )}
      {step === 2 && (
        <>
          <Button size="MEDIUM" text="Back" onClick={goBackAStep}/>
          {orderType === 'delivery' ? (
            <OrderDeliveryForm />
            ) :
            (
              <OrderPickupForm />
            )
          }
        </>
      )}
        {userStatus === 'SignedOut' ? (
          <button className="snipcart-customer-signin">
            <span>Login</span>
          </button>
        ) : (
          <button className="snipcart-customer-signin">
            <span>My account</span>
          </button>
        )}
        <button onClick={addItemToCart}>hi</button>
        <button className="snipcart-checkout">Click here to checkout</button>
        <button
          hidden
          ref={testingRef}
          className="snipcart-add-item"
          data-item-id="silver-stacking-ring"
          data-item-price="19.99"
          data-item-url="/order"
          data-item-name="Silver Stacking Ring"
          data-item-custom1-name="Size"
          data-item-custom1-options="6|6.5|7|7.5|8|8.5|9"
          data-item-custom1-value="7"
        >
          Add to cart
        </button>
      <div><button onClick={removeAllItemsFromCart}>remove all items from cart</button></div>

      <button
        className="snipcart-add-item"
        data-item-id="pickup-from-store"
        data-item-price="0.00"
        data-item-url="/order"
        data-item-name="Pickup from Store"
        data-item-custom1-name="Time"
        data-item-custom1-options="9am - 10am|10am - 11am"
        data-item-custom1-value="10am - 11am"
      >
        Add Pickup
      </button>
      <button onClick={handleOnClick}>test!!!</button>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  margin: ${sizing(100)} auto ${sizing(75)} auto;
  width: 85%;
  @media all and (min-width: 992px) {
     width: 60%;
  }
  
  .MuiInputBase-root {
    ${fonts.regularText['400']};
    color: ${colors.solids.BROWN}
  }
  .MuiFormLabel-root {
    ${fonts.mediumText['400']};
    line-height: ${sizing(2)};
    color: rgba(79, 44, 29, 0.54);
  }
  .MuiInput-underline:before {
    border-bottom: 1px solid rgba(79, 44, 29, 0.42);
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
  .MuiInput-underline:after {
    border-bottom: 2px solid ${colors.solids.BROWN};
  }
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 2px solid rgba(79, 44, 29, 0.87);
  }
  .MuiFormLabel-root.Mui-focused {
    color: ${colors.solids.BROWN};
  }
  .MuiList-root {
    ${fonts.regularText['500']};
  }
  .MuiMenuItem-root {
    ${fonts.regularText['500']};
  }
  .MuiFormHelperText-root {
    ${fonts.boldText['100']};
  }
`;

export default OrderPage;
