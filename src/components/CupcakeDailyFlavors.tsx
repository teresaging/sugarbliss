import React, { useState } from 'react';
import styled from '@emotion/styled';
import { fonts, Tabs, ProductDisplay } from '../design-system';
import { sizing } from '../utils';

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

const CupcakeDailyFlavors = ({cupcakes}: Props) => {
  const [activeTabId, setActiveTabId] = useState(TABS_DATA[0]?.id);

  const handleTabPress = (activeTabId) => {
    setActiveTabId(activeTabId);
  }

  const renderCupcakesByDay = (day) => {
    return (
      <>
        {cupcakes.filter((cupcake) => cupcake.isDaily && cupcake.dayAvailable === day).map((cupcake) => {
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

const CupcakeGridWrapper = styled.div`
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
`

export default CupcakeDailyFlavors;