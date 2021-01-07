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
  // ToDo: add quantity input

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

const FlavorsContainer = styled.div`
  display: grid;
  margin-top: ${sizing(100)};
  grid-template-columns: repeat(1, minmax(${sizing(300)}, 1fr));
  grid-column-gap: ${sizing(20)};
  grid-row-gap: ${sizing(20)};
  @media all and (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(${sizing(300)}, 1fr));
  }
  @media all and (min-width: 992px) {
    grid-template-columns: repeat(3, minmax(${sizing(300)}, 1fr));
  }
`;

export default ProductsList;