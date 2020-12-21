import React, { useState } from 'react';
import styled from '@emotion/styled';
import { sizing } from '../utils';
import { fonts } from '../design-system';

const OrderDeliveryForm = () => {
  return (
    <>
      <Title>Delivery</Title>
    </>
  );
}

const Title = styled.h1`
  ${fonts.cursiveText['1200']};
  text-align: center;
  margin-bottom: ${sizing(50)};
`;

export default OrderDeliveryForm;