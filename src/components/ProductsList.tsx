import React from 'react';
import styled from '@emotion/styled';
import { fonts, ProductDisplay } from '../design-system';
import { sizing } from '../utils';

type Props = {
  // tslint:disable-next-line:no-any
  products: any;
  title?: string;
};

const ProductsList = ({products, title}: Props) => {

  return (
    <Wrapper>
      <Title>{title || 'Everyday Flavors'}</Title>
      <FlavorsContainer>
        {products.map((product) => {
          return (
            <ProductDisplay
              key={product.name}
              name={product.name}
              imageUrl={product.image.file.url}
              description={product.description}
            />
          );
        })}
      </FlavorsContainer>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding: ${sizing(20)};
  margin-top: ${sizing(25)};
  @media all and (min-width: 992px) {
    padding: ${sizing(20)} ${sizing(20)};
    margin-top: ${sizing(40)};
  }
  @media all and (min-width: 1250px) {
    padding: ${sizing(20)} ${sizing(100)};
  }
`

const Title = styled.p`
  ${fonts.cursiveText['600']};
  text-align: center;
  margin-bottom: ${sizing(10)};
  @media all and (min-width: 768px) {
    ${fonts.cursiveText['1000']};
    margin-bottom: ${sizing(10)};
  }
`;

const FlavorsContainer = styled.div`
  display: grid;
  margin-top: ${sizing(20)};
  grid-template-columns: 1fr;
  grid-column-gap: ${sizing(20)};
  grid-row-gap: ${sizing(20)};
  @media all and (min-width: 768px) {
    margin-top: ${sizing(40)};
    grid-template-columns: repeat(2, minmax(${sizing(300)}, 1fr));
  }
  @media all and (min-width: 992px) {
    grid-template-columns: repeat(3, minmax(${sizing(300)}, 1fr));
  }
`;

export default ProductsList;