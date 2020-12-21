import React, { useState } from 'react';
import styled from '@emotion/styled';
import { fonts } from '../design-system';
import { sizing } from '../utils';

const OrderPickupForm = () => {
  return (
    <>
      <Title>Pickup From Store</Title>
    </>
  )
}

const Title = styled.h1`
  ${fonts.cursiveText['1200']};
  text-align: center;
  margin-bottom: ${sizing(50)};
`;

export default OrderPickupForm;