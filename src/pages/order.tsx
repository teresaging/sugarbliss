import React, { useContext, useRef, useState, useEffect } from 'react';
import { graphql, PageProps } from 'gatsby';
import { SnipcartContext } from 'gatsby-plugin-snipcart-advanced/context';

import Layout from '../components/layout';
import OrderDeliveryPickup from '../components/order/OrderDeliveryPickup';
import OrderDeliveryForm from '../components/order/OrderDeliveryForm';
import OrderPickupForm from '../components/order/OrderPickupForm';
import Cart from '../components/order/Cart';

import styled from '@emotion/styled';
import { fonts, Button, Tabs } from '../design-system';
import { sizing, colors } from '../utils';

const TABS_DATA = [
  {
    id: 'specialPackages',
    name: 'Special Packages',
  },
  {
    id: 'cupcakes',
    name: 'Cupcakes',
  },
  {
    id: 'cakePops',
    name: 'Cake Pops',
  },
  {
    id: 'macarons',
    name: 'Macarons',
  },
  {
    id: 'catering',
    name: 'Catering',
  },
  {
    id: 'apparel',
    name: 'Apparel',
  },
];

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
  const [ activeTabId, setActiveTabId ] = useState(TABS_DATA[0]?.id);

  const testingRef = useRef(null);

  // useEffect(() => {
  //   // cleanse cart
  //   removeAllItemsFromCart();
  // }, [0]);

  useEffect(() => {
    // cleanse cart
    console.log(cartItems);
  });

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

  const goBackAStep = () => {
    const previousStep = step - 1;
    setStep(previousStep);
  }

  const goToNextStep = () => {
    const nextStep = step + 1;
    setStep(nextStep);
  }

  const handleTabPress = (activeTabId) => {
    setActiveTabId(activeTabId);
  }

  return (
    <Layout>
      <Container>
      {step === 1 && (
        <OrderDeliveryPickup onOptionPress={handleOptionPress} />
      )}
      {step !== 1 && (
        <TopSection>
          <Button size="MEDIUM" text="Back" onClick={goBackAStep}/>
          {step === 3 && (
            <Cart cartQuantity={cartQuantity}  />
            )}
        </TopSection>
      )}
      {step === 2 && (
        <>
          {orderType === 'delivery' ? (
            <OrderDeliveryForm
              setDayOfWeek={setDayOfWeek}
              addItemToCart={addItemToCart}
              handleNextStep={goToNextStep}
            />
            ) :
            (
              <OrderPickupForm
                setDayOfWeek={setDayOfWeek}
                addItemToCart={addItemToCart}
                handleNextStep={goToNextStep}
              />
            )
          }
        </>
      )}
      {step === 3 && (
       <>
         <Tabs activeTabId={activeTabId} tabsInfo={TABS_DATA} onPress={handleTabPress} />
       </>
      )}
        {/*{userStatus === 'SignedOut' ? (*/}
        {/*  <button className="snipcart-customer-signin">*/}
        {/*    <span>Login</span>*/}
        {/*  </button>*/}
        {/*) : (*/}
        {/*  <button className="snipcart-customer-signin">*/}
        {/*    <span>My account</span>*/}
        {/*  </button>*/}
        {/*)}*/}
        {/*<button*/}
        {/*  hidden*/}
        {/*  ref={testingRef}*/}
        {/*  className="snipcart-add-item"*/}
        {/*  data-item-id="silver-stacking-ring"*/}
        {/*  data-item-price="19.99"*/}
        {/*  data-item-url="/order"*/}
        {/*  data-item-name="Silver Stacking Ring"*/}
        {/*  data-item-custom1-name="Size"*/}
        {/*  data-item-custom1-options="6|6.5|7|7.5|8|8.5|9"*/}
        {/*  data-item-custom1-value="7"*/}
        {/*>*/}
        {/*  Add to cart*/}
        {/*</button>*/}
      {/*<div><button onClick={removeAllItemsFromCart}>remove all items from cart</button></div>*/}
      <button onClick={handleOnClick}>test!!!</button>
        <button
          style={{display: 'none'}}
          className="snipcart-add-item"
          data-item-id="pickup"
          data-item-price="0.00"
          data-item-url="/order"
          data-item-name="Pickup">
          Add Pickup To Order
        </button>
        <button
          style={{display: 'none'}}
          className="snipcart-add-item"
          data-item-id="delivery"
          data-item-price="19.00"
          data-item-price-2="25.00"
          data-item-price-3="30.00"
          data-item-price-4="22.00"
          data-item-price-5="35.00"
          data-item-price-6="42.00"
          data-item-price-7="52.00"
          data-item-price-8="47.00"
          data-item-price-9="37.00"
          data-item-price-10="77.00"
          data-item-price-11="63.00"
          data-item-price-12="65.00"
          data-item-price-13="70.00"
          data-item-price-14="66.00"
          data-item-price-15="64.00"
          data-item-price-16="57.00"
          data-item-price-17="54.00"
          data-item-price-18="53.00"
          data-item-price-19="61.00"
          data-item-price-20="58.00"
          data-item-price-21="59.00"
          data-item-price-22="52.00"
          data-item-price-23="82.00"
          data-item-price-24="68.00"
          data-item-price-25="56.00"
          data-item-price-26="78.00"
          data-item-price-27="51.00"
          data-item-price-28="77.00"
          data-item-price-29="49.00"
          data-item-price-30="81.00"
          data-item-price-31="79.00"
          data-item-price-32="69.00"
          data-item-price-33="60.00"
          data-item-price-34="43.00"
          data-item-price-35="80.00"
          data-item-price-36="62.00"
          data-item-price-37="45.00"
          data-item-price-38="41.00"
          data-item-price-39="46.00"
          data-item-price-40="39.00"
          data-item-price-41="55.00"
          data-item-price-42="50.00"
          data-item-price-43="50.00"
          data-item-url="/order"
          data-item-name="Local Delivery">
          Add Delivery To Order
        </button>
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

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default OrderPage;
