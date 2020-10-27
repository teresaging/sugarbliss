import React, { useContext } from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { SnipcartContext } from 'gatsby-plugin-snipcart-advanced/context';

import Layout from '../components/layout'

import styled from '@emotion/styled';
import { fonts } from '../design-system';
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
  const { state } = useContext(SnipcartContext);
  const { userStatus, cartQuantity } = state;

  console.log(state);




  const addToCart = (productId) => {
    console.log('adding to cart');
  }

  const applyDiscount = (productId) => {
    // client.checkout.addDiscount(checkoutId, discountCode);
  }

  return (
    <Layout>
      {userStatus === 'SignedOut' ? (
        <button className="snipcart-customer-signin">
          <span>Login</span>
        </button>
      ) : (
        <button className="snipcart-customer-signin">
          <span>My account</span>
        </button>
      )}
      <button>hi</button>
      <button className="snipcart-checkout">Click here to checkout</button>
      <button
        className="snipcart-add-item"
        data-item-id="silver-stacking-ring"
        data-item-price="19.99"
        data-item-url="http://localhost:8000/order"
        data-item-name="Silver Stacking Ring"
        data-item-custom1-name="Size"
        data-item-custom1-options="6|6.5|7|7.5|8|8.5|9"
      >
        Add to cart
      </button>
    </Layout>
  )
}

export default OrderPage;
