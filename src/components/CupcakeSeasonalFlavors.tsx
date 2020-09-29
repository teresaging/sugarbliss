import React from 'react';
import styled from '@emotion/styled';
import { fonts, SeasonalCarousel } from '../design-system';
import { sizing } from '../utils';

// Todo: make shared
const MONTHS = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
}

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

const getCurrentMonths = () => {
  const currentDate = new Date();
  const currentMonthNumber = currentDate.getMonth() + 1;

  return {
    currentMonth: MONTHS[currentMonthNumber],
    nextMonth: MONTHS[currentMonthNumber + 1],
  };
};

const groomCupcakeDataForCarousel = (cupcakes) => {
  const groomedData = cupcakes.map((cupcake) => {
    return {
      name: cupcake.name,
      imageUrl: cupcake.image.file.url,
      datesAvailable: cupcake.seasonalDaysAvailable,
      description: cupcake.description,
    }
  });

  return groomedData;
};

const CupcakeSeasonalFlavors = ({cupcakes}: Props) => {

  const currentSeasonalCupcakes = cupcakes.filter((cupcake) => {
    const monthAvailable = cupcake.monthAvailable;
    const currentMonths = getCurrentMonths();
    if (Boolean(monthAvailable.length)) {
      for (let i = 0; i < monthAvailable.length; i++) {
        if (monthAvailable[i] ===  currentMonths.currentMonth || monthAvailable[i] ===  currentMonths.nextMonth) {
          return true;
        }
      }

      return false;
    } else {
      return cupcake.monthAvailable === currentMonths.currentMonth || cupcake.monthAvailable === currentMonths.nextMonth;
    }
  });

  return (
    <Wrapper>
      <Title>Seasonal Flavors</Title>
      <SeasonalCarousel seasonalProducts={groomCupcakeDataForCarousel(currentSeasonalCupcakes)} />
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