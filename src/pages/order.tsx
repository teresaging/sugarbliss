import React, { useContext, useRef, useState, useEffect } from 'react';
import { graphql, PageProps } from 'gatsby';
import { SnipcartContext } from 'gatsby-plugin-snipcart-advanced/context';
import moment from 'moment';

import Layout from '../components/layout';
import OrderDeliveryPickup from '../components/order/OrderDeliveryPickup';
import OrderDeliveryForm from '../components/order/OrderDeliveryForm';
import OrderPickupForm from '../components/order/OrderPickupForm';
import OrderTabSection from '../components/order/OrderTabSection';
import Cart from '../components/order/Cart';

import styled from '@emotion/styled';
import { fonts, Button, Tabs } from '../design-system';
import { sizing, colors, allDeliveryPrices } from '../utils';
import { OrderForm, Cupcake, Macaron, CakePop, Cookies, MorningPastry } from '../sharedTypes';

const CURRENT_YEAR = moment().year();

type OrderQueryProps = {
  allContentfulOrderForm: {
    nodes: OrderForm[];
  };
  allContentfulCupcake: {
    nodes: Cupcake[];
  };
  allContentfulMacaron: {
    nodes: Macaron[];
  };
  allContentfulCakePops: {
    nodes: CakePop[];
  };
  allContentfulCookies: {
    nodes: Cookies[];
  };
  allContentfulMorningPastries: {
    nodes: MorningPastry[];
  };
};

type OrderProps = PageProps<OrderQueryProps>;

const OrderPage = ({data}: OrderProps) => {

  const orderFormData = data?.allContentfulOrderForm?.nodes;
  const tabsData = orderFormData.map((data) => {
    return {
      id: data.tabName,
      name: data.tabName,
    }
  });
  const cupcakeData = data?.allContentfulCupcake?.nodes;
  const macaronData = data?.allContentfulMacaron?.nodes;
  const cakePopData = data?.allContentfulCakePops?.nodes;
  const cookiesData = data?.allContentfulCookies?.nodes;
  const muffinsData = data?.allContentfulMorningPastries?.nodes.filter((pastry) => pastry.name === 'Muffins')[0];
  const sconesData = data?.allContentfulMorningPastries?.nodes.filter((pastry) => pastry.name === 'Scones')[0];

  const { state, addItem, removeItem } = useContext(SnipcartContext);
  const { userStatus, cartQuantity, cartItems } = state;
  const [ orderType, setOrderType ] = useState(null);
  const [ step, setStep ] = useState(1);
  const [ dayOfWeek, setDayOfWeek ] = useState(null);
  const [ orderDate, setOrderDate ] = useState(null);
  const [ activeTabId, setActiveTabId ] = useState(tabsData[0]?.id);
  const [ availableCupcakeFlavors, setAvailableCupcakeFlavors ] = useState([]);
  const [ availableMacaronFlavors, setAvailableMacaronFlavors ] = useState([]);
  const [ availableCakePopFlavors, setAvailableCakePopFlavors ] = useState([]);

  useEffect(() => {
    const cupcakeFlavors = cupcakeData.filter((cupcake) => {
      if (cupcake.isEverydayFlavor) {
        return true;
      }

      if (cupcake.isSeasonal && cupcake.seasonalDatesAvailable?.length > 0) {
        let isProductAvailable = false;
        for (let i = 0; i < cupcake.seasonalDatesAvailable.length; i++) {
          const startDate = moment(cupcake.seasonalDatesAvailable[i].startDate).set('year', CURRENT_YEAR);
          const endDate = moment(cupcake.seasonalDatesAvailable[i].endDate).set('year', CURRENT_YEAR);
          if (moment(orderDate) >= startDate && moment(orderDate) <= endDate) {
            isProductAvailable = true;
          }
        }

        return isProductAvailable;
      }

      if (cupcake.isDaily && cupcake.weekDaysAvailable.includes(dayOfWeek)) {
        return true;
      }

      return false;
    });

    const macaronFlavors = macaronData.filter((macaron) => {
      // ToDo: put this duplicated code inside it's own function
      if (macaron.isSeasonalFlavor && macaron.seasonalDatesAvailable?.length > 0) {
        let isProductAvailable = false;

        for (let i = 0; i < macaron.seasonalDatesAvailable.length; i++) {
          const startDate = moment(macaron.seasonalDatesAvailable[i].startDate).set('year', CURRENT_YEAR);
          const endDate = moment(macaron.seasonalDatesAvailable[i].endDate).set('year', CURRENT_YEAR);
          if (moment(orderDate) >= startDate && moment(orderDate) <= endDate) {
            isProductAvailable = true;
          }
        }

        return isProductAvailable;
      }

      return true;
    });

    const cakePopFlavors = cakePopData.filter((cakePop) => {
      if (cakePop.isSeasonal && cakePop.seasonalDatesAvailable?.length > 0) {
        let isProductAvailable = false;

        for (let i = 0; i < cakePop.seasonalDatesAvailable.length; i++) {
          const startDate = moment(cakePop.seasonalDatesAvailable[i].startDate).set('year', CURRENT_YEAR);
          const endDate = moment(cakePop.seasonalDatesAvailable[i].endDate).set('year', CURRENT_YEAR);
          if (moment(orderDate) >= startDate && moment(orderDate) <= endDate) {
            isProductAvailable = true;
          }
        }

        return isProductAvailable;
      }

      return true;
    });

    setAvailableCupcakeFlavors(cupcakeFlavors);
    setAvailableMacaronFlavors(macaronFlavors);
    setAvailableCakePopFlavors(cakePopFlavors);
  }, [dayOfWeek, orderDate]);

  const testingRef = useRef(null);
  // useEffect(() => {
  //   // cleanse cart
  //   removeAllItemsFromCart();
  // }, [0]);

  // useEffect(() => {
  //   // cleanse cart
  //   console.log(cartItems);
  // });

  const removeAllItemsFromCart = () => {
    if (cartItems && cartItems.length > 0) {
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

  const handleRenderDeliveryButtons = () => {
    return (
      <>
        {
          allDeliveryPrices.map((price, idx) => (
            <button
              key={idx}
              style={{display: 'none'}}
              className="snipcart-add-item"
              data-item-id={`delivery-${price}`}
              data-item-price={price}
              data-item-url="/order"
              data-item-name="Local Delivery">
              Add Delivery To Order
            </button>
          ))
        }
      </>
    );
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
              setOrderDate={setOrderDate}
              addItemToCart={addItemToCart}
              handleNextStep={goToNextStep}
            />
            ) :
            (
              <OrderPickupForm
                setDayOfWeek={setDayOfWeek}
                setOrderDate={setOrderDate}
                addItemToCart={addItemToCart}
                handleNextStep={goToNextStep}
              />
            )
          }
        </>
      )}
       <div style={{display: step === 3 ? 'block' : 'none'}}>
         <Tabs activeTabId={activeTabId} tabsInfo={tabsData} onPress={handleTabPress} />
         {orderFormData.map((data, idx) => (
           <OrderTabSection
             isHidden={activeTabId !== data.tabName}
             key={idx} productData={data.categories}
             addItemToCart={addItemToCart}
             availableCupcakeFlavors={availableCupcakeFlavors}
             availableMacaronFlavors={availableMacaronFlavors}
             availableCakePopFlavors={availableCakePopFlavors}
             availableCookiesFlavors={cookiesData}
             availableMuffinsFlavors={muffinsData?.flavors}
             availableSconesFlavors={sconesData?.flavors}
           />
         ))}
       </div>
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
      <div><button onClick={removeAllItemsFromCart}>remove all items from cart</button></div>
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
        {handleRenderDeliveryButtons()}
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  margin: ${sizing(100)} auto ${sizing(75)} auto;
  width: 85%;
  @media all and (min-width: 992px) {
     width: 90%;
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

export const query = graphql`
  query OrderFormQuery {
     allContentfulOrderForm(sort: {fields: createdAt}) {
      nodes {
        tabName
        categories {
          ... on ContentfulOrderCategory {
            name
            products {
              dozenPrice
              description
              name
              price
              customFields {
                name
                type
                choices
                isMakeYourOwnFlavor
                makeYourOwnFlavorsQuantity
              }
            }
          }
          ... on ContentfulOrderProduct {
            name
            price
            dozenPrice
            description
            customFields {
              name
              type
              choices
              isMakeYourOwnFlavor
              makeYourOwnFlavorsQuantity
            }
          }
        }
      }
    }
    allContentfulCupcake {
      nodes {
        name
        isEverydayFlavor
        seasonalDatesAvailable {
          name
          startDate
          endDate
        }
        isSeasonal
        isDaily
        weekDaysAvailable
        isEverydayFlavor
      }
    }
    allContentfulMacaron {
      nodes {
        name
        isSeasonalFlavor
        seasonalDatesAvailable {
          name
          startDate
          endDate
        }
      }
    }
    allContentfulCakePops {
      nodes {
        name
        isSeasonal
        seasonalDatesAvailable {
          name
          startDate
          endDate
        }
      }
    }
    allContentfulCookies(filter: {type: {eq: "everyday"}}) {
      nodes {
        name
        type
      }
    }
    allContentfulMorningPastries {
      nodes {
        name
        flavors
      }
    }
  }
`
