import React, { useState } from 'react';
import styled from '@emotion/styled';
import { fonts, Tabs, ProductDisplay } from '../design-system';
import { sizing } from '../utils';
import { Cupcake } from '../sharedTypes';

const TABS_DATA = [
  {
    id: 'Monday',
    name: 'Monday',
  },
  {
    id: 'Tuesday',
    name: 'Tuesday',
  },
  {
    id: 'Wednesday',
    name: 'Wednesday',
  },
  {
    id: 'Thursday',
    name: 'Thursday',
  },
  {
    id: 'Friday',
    name: 'Friday',
  },
  {
    id: 'Saturday',
    name: 'Saturday',
  },
];

type Props = {
  cupcakes: Cupcake[];
};

const CupcakeDailyFlavors = ({cupcakes}: Props) => {
  const [activeTabId, setActiveTabId] = useState(TABS_DATA[0]?.id);

  const handleTabPress = (activeTabId) => {
    setActiveTabId(activeTabId);
  }

  const renderCupcakesByDay = (day) => {
    const availableCupcakes = cupcakes.filter((cupcake) => cupcake.weekDaysAvailable.includes(day));

    return (
      <>
        {availableCupcakes.map((cupcake) => {
          return (
            <ProductDisplay
              name={cupcake.name}
              description={cupcake.description}
              imageUrl={cupcake.image.file.url}
              key={cupcake.name}
            />
            )
        })}
      </>
    );
  }

  return (
    <CupcakeDailyFlavorsWrapper>
      <Title>Daily Flavors</Title>
      <Tabs activeTabId={activeTabId} tabsInfo={TABS_DATA} onPress={handleTabPress}  />
      <CupcakeGridWrapper>
        {renderCupcakesByDay(activeTabId)}
      </CupcakeGridWrapper>
    </CupcakeDailyFlavorsWrapper>
  )
};

const CupcakeDailyFlavorsWrapper = styled.div`
  width: 100%;
  position: relative;
  padding: ${sizing(10)};
  margin-top: ${sizing(50)};
  @media all and (min-width: 992px) {
    padding: ${sizing(20)} ${sizing(20)};
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
    margin-bottom: ${sizing(50)};
  }
`;

const CupcakeGridWrapper = styled.div`
  display: grid;
  margin-top: ${sizing(20)};
  grid-template-columns: 1fr;
  grid-column-gap: ${sizing(20)};
  grid-row-gap: ${sizing(20)};
  @media all and (min-width: 768px) {
    margin-top: ${sizing(100)};
    grid-template-columns: repeat(2, minmax(${sizing(300)}, 1fr));
  }
  @media all and (min-width: 992px) {
    grid-template-columns: repeat(3, minmax(${sizing(300)}, 1fr));
  }
`

export default CupcakeDailyFlavors;