import React, { useState } from 'react';
import styled from '@emotion/styled';
import { fonts } from '../design-system';
import { sizing, colors } from '../utils';

type Props = {
  onOptionPress: Function;
}

const OrderDeliveryPickup = ({onOptionPress}: Props) => {
  return (
    <>
      <Title>Local Delivery or Pickup</Title>
      <OptionsContainer>
        <Option onClick={() => onOptionPress('delivery')} bgColor={colors.solids.BABY_PINK}>
          <OptionText>Local Delivery</OptionText>
          <OptionText>(Monday - Sunday)</OptionText>
        </Option>
        <Option onClick={() => onOptionPress('pickup')} bgColor={colors.solids.BABY_BLUE}><OptionText>Pickup From Store</OptionText></Option>
      </OptionsContainer>
    </>
  );
}

const Title = styled.h1`
  ${fonts.cursiveText['1200']};
  text-align: center;
  margin-bottom: ${sizing(50)};
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 40vh;
  @media all and (min-width: 992px) {
     flex-direction: row;
  }
`;

const Option = styled.div<{bgColor: string}>`
  width: 350px;
  height: 200px;
  background-color: ${({bgColor}) => bgColor};
  margin: ${sizing(20)} 0;
  border-radius: ${sizing(20)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media all and (min-width: 992px) {
     margin: 0 ${sizing(20)};
  }
  &:hover, &:focus {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const OptionText = styled.p`
  ${fonts.boldText['600']};
  margin-bottom: 0;
`;

export default OrderDeliveryPickup;
