import React from 'react';
import styled from '@emotion/styled';
import { fonts, ProductDisplay } from '../design-system';
import { sizing } from '../utils';
import { Macaron} from '../sharedTypes';

type Props = {
  macarons: Macaron[];
};

const MacaronEveryDayFlavors = ({macarons}: Props) => {

  return (
    <Wrapper>
      <Title>Everyday Flavors</Title>
      <FlavorsContainer>
        {macarons.map((macaron) => {
          return (
            <ProductDisplay
              key={macaron.name}
              name={macaron.name}
              imageUrl={macaron.image.file.url}
              description={macaron.description}
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

export default MacaronEveryDayFlavors;