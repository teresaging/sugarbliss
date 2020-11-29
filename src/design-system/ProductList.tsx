import React from 'react';
import { fonts } from './Fonts';
import styled from '@emotion/styled';

import 'fontsource-sacramento';

import { sizing } from '../utils';

type flavor = {
  name: string;
  description?: string;
  price?: string;
  dozenPrice?: string;
  customPrice?: string;
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
        <Price>{Boolean(dozenPrice) ? `Single: $${price} | Dozen: $${dozenPrice}` : `$${price}` }</Price>
      )}
      <FlavorsListContainer>
        {
          flavors.map((flavor, idx) => (
            <FlavorContainer key={idx}>
              <FlavorName>{flavor.name}</FlavorName>
              {Boolean(flavor.price) && Boolean(flavor.dozenPrice) ? (
                <FlavorPrice>Single: ${flavor.price} | Dozen: ${flavor.dozenPrice}</FlavorPrice> )
                : flavor.price ? (<FlavorPrice>${flavor.price}</FlavorPrice>) : null }
              {Boolean(flavor.description) && (<FlavorDescription>{flavor.description}</FlavorDescription>)}
              {Boolean(flavor.customPrice) && (<FlavorPrice>Custom price starts at: ${flavor.customPrice}</FlavorPrice>)}
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
  margin-bottom: ${sizing(30)};
`;

const Title = styled.p`
  ${fonts.cursiveText['900']};
  text-align: center;
`

const Description = styled.p`
  ${fonts.regularText['300']};
  text-align: center;
`;

const Price = styled.p`
  ${fonts.regularText['300']};
  text-align: center;
  margin-bottom: ${sizing(50)};
  font-weight: 600;
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
  min-width: ${sizing(400)};
  max-width: 50%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${sizing(30)};
`;

const FlavorName = styled.p`
  ${fonts.boldText['400']};
  text-align: center;
`;

const FlavorDescription = styled.p`
  ${fonts.regularText['300']};
  text-align: center;
`;

const FlavorPrice = styled.p`
  ${fonts.regularText['300']};
  text-align: center;
  font-weight: 600;
`

export default ProductList;