import React from 'react';
import styled from '@emotion/styled';
import Img, { FluidObject } from 'gatsby-image'
import { Button, fonts } from '../design-system';
import { sizing } from '../utils';

import { colors } from '../utils';

type Products = {
  name: string;
  fluidImage: FluidObject;
  url: string;
};

type Props = {
  products: Products[];
};

const HomepageProducts = ({products}: Props) => {

  return (
    <HomepageProductsWrapper>
      <Title>Products</Title>
      <ProductsContainer>
        {products.map((product) => {
          return (
          <Product key={product.name}>
            <Image fluid={product.fluidImage} />
            <Button url={product.url} text={product.name} size="XLARGE"/>
          </Product>)
        })}
      </ProductsContainer>
    </HomepageProductsWrapper>
  )
};

const HomepageProductsWrapper = styled.div`
  background-color: ${colors.solids.BABY_PINK};
  width: 100%;
  position: relative;
  padding: ${sizing(20)};
  @media all and (min-width: 992px) {
    padding: ${sizing(20)} ${sizing(20)};
  }
  @media all and (min-width: 1250px) {
    padding: ${sizing(20)} ${sizing(100)};
  }
`
const Title = styled.p`
 ${fonts.cursiveText['1200']};
 color: ${colors.solids.BROWN};
 text-align: center;
`

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Product = styled.div`
  width: ${sizing(250)};
  height: ${sizing(250)};
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${sizing(5)} ${sizing(10)};
  
  @media all and (min-width: 992px) {
    width: ${sizing(350)};
    height: ${sizing(350)};
    margin: ${sizing(15)} ${sizing(20)};
  }
  
  a {
    position: absolute;
  }
`;

const Image = styled(Img)`
  width: 100%;
  height: 100%;
`;

export default HomepageProducts;