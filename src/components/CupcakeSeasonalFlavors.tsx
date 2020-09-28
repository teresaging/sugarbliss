import React, { useState } from 'react';
import styled from '@emotion/styled';
import { fonts } from '../design-system';
import { sizing } from '../utils';

type Cupcake = {
  name: string;
  description: string;
  image: {
    file: {
      url: string;
    }
  }
  isEveryDayFlavor: boolean;
  isSeasonal: boolean;
  monthAvailable: string; // ToDo: make this a shared type and add a months enum, typeOf: months
  isDaily: boolean;
  dayAvailable: string;
};

type Props = {
  cupcakes: Cupcake[];
};

const CupcakeSeasonalFlavors = ({cupcakes}: Props) => {
  return (
    <Wrapper>
      <Title>Seasonal Flavors</Title>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding: ${sizing(20)};
  margin-top: ${sizing(50)};
  @media all and (min-width: 992px) {
    padding: ${sizing(20)} ${sizing(20)};
  }
  @media all and (min-width: 1250px) {
    padding: ${sizing(20)} ${sizing(100)};
  }
`

const Title = styled.p`
  ${fonts.cursiveText['1000']};
  text-align: center;
  margin-bottom: ${sizing(50)};
`;

export default CupcakeSeasonalFlavors;