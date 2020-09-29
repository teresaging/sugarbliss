import React from 'react';
import styled from '@emotion/styled';
import { fonts, ProductDisplay } from '../design-system';
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
  seasonalDaysAvailable: string;
};

type Props = {
  cupcakes: Cupcake[];
};

const CupcakeEveryDayFlavors = ({cupcakes}: Props) => {

  return (
    <Wrapper>
      <Title>Everyday Flavors</Title>
      <FlavorsContainer>
        {cupcakes.map((cupcake) => {
          return (
            <ProductDisplay
              key={cupcake.name}
              name={cupcake.name}
              imageUrl={cupcake.image.file.url}
              description={cupcake.description}
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

export default CupcakeEveryDayFlavors;