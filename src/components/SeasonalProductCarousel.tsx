import React from 'react';
import styled from '@emotion/styled';
import { fonts, SeasonalCarousel } from '../design-system';
import { sizing, months } from '../utils';

type Props = {
  // tslint:disable-next-line:no-any
  products: any;
};

const getCurrentMonths = () => {
  const currentDate = new Date();
  const currentMonthNumber = currentDate.getMonth() + 1;

  return {
    currentMonth: months[currentMonthNumber],
    nextMonth: months[currentMonthNumber + 1],
  };
};

const groomProductDataForCarousel = (products) => {
  const groomedData = products.map((product) => {
    return {
      name: product.name,
      imageUrl: product.image.file.url,
      datesAvailable: product.seasonalDaysAvailable,
      description: product.description,
    }
  });

  return groomedData;
};

const SeasonalProductCarousel = ({products}: Props) => {

  const currentSeasonalProducts = products.filter((product) => {
    const monthAvailable = product.monthAvailable;
    const currentMonths = getCurrentMonths();
    if (Boolean(monthAvailable.length)) {
      for (let i = 0; i < monthAvailable.length; i++) {
        if (monthAvailable[i] ===  currentMonths.currentMonth || monthAvailable[i] ===  currentMonths.nextMonth) {
          return true;
        }
      }

      return false;
    } else {
      return product.monthAvailable === currentMonths.currentMonth || product.monthAvailable === currentMonths.nextMonth;
    }
  });

  return (
    <Wrapper>
      <Title>Seasonal Flavors</Title>
      <SeasonalCarousel seasonalProducts={groomProductDataForCarousel(currentSeasonalProducts)} />
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

export default SeasonalProductCarousel;