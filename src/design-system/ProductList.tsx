import React from 'react';
import { fonts } from './Fonts';
import styled from '@emotion/styled';

import 'fontsource-sacramento';

import { sizing, displayPrice } from '../utils';

type flavor = {
  name: string;
  description?: string;
  price?: number;
  dozenPrice?: number;
  customPrice?: number;
}

type Props = {
  title?: string;
  description?: string;
  price?: number;
  dozenPrice?: number;
  flavors: flavor[];
}

const ProductList = ({title, description, price, dozenPrice, flavors}: Props) => {

  return (
    <ProductListContainer>
      {Boolean(title) && (
        <Top>
          <Title>{title}</Title>
          {Boolean(description) && <Description>{description}</Description>}
        </Top>
      )}
      {Boolean(price) && (
        <Price>{Boolean(dozenPrice) ? `Single: ${displayPrice(price)} | Dozen: ${displayPrice(dozenPrice)}` : `${displayPrice(price)}` }</Price>
      )}
      <FlavorsListContainer>
        {
          flavors.map((flavor, idx) => (
            <FlavorContainer key={idx}>
              <FlavorName>{flavor.name}</FlavorName>
              {Boolean(flavor.price) && Boolean(flavor.dozenPrice) ? (
                <FlavorPrice>Single: {displayPrice(flavor.price)} | Dozen: {displayPrice(flavor.dozenPrice)}</FlavorPrice> )
                : flavor.price ? (<FlavorPrice>{displayPrice(flavor.price)}</FlavorPrice>) : null }
              {Boolean(flavor.description) && (<FlavorDescription>{flavor.description}</FlavorDescription>)}
              {Boolean(flavor.customPrice) && (<FlavorPrice>Custom price starts at: {displayPrice(flavor.customPrice)}</FlavorPrice>)}
            </FlavorContainer>
          ))
        }
      </FlavorsListContainer>
    </ProductListContainer>
  )
};

const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Top = styled.div`
  margin-bottom: ${sizing(10)};
  @media all and (min-width: 768px) {
    margin-bottom: ${sizing(30)};
  }
`;

const Title = styled.p`
  ${fonts.cursiveText['600']};
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.cursiveText['900']};
  }
`

const Description = styled.p`
  ${fonts.regularText['100']};
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.regularText['300']};
  }
`;

const Price = styled.p`
  ${fonts.regularText['100']};
  text-align: center;
  margin-bottom: ${sizing(50)};
  font-weight: 600;
  @media all and (min-width: 768px) {
    ${fonts.regularText['300']};
  }
`

const FlavorsListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

const FlavorContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${sizing(10)};
  @media all and (min-width: 768px) {
    min-width: ${sizing(400)};
    max-width: 50%;
    width: 50%;
    margin-bottom: ${sizing(30)};
  }
`;

const FlavorName = styled.p`
  ${fonts.boldText['300']};
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.boldText['600']};
  }
`;

const FlavorDescription = styled.p`
  ${fonts.regularText['100']};
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.boldText['300']};
  }
`;

const FlavorPrice = styled.p`
  ${fonts.regularText['200']};
  text-align: center;
  font-weight: 600;
  @media all and (min-width: 768px) {
    ${fonts.regularText['300']};
  }
`

export default ProductList;