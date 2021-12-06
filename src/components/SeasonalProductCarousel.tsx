import React from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
import { fonts, SeasonalCarousel } from '../design-system';
import { sizing } from '../utils';

type Props = {
  products: any; // ToDo: add type here
};

const groomProductDataForCarousel = (products) => {
  const groomedData = products.map((product) => {
    const seasonalObject = product.seasonalDatesAvailable.filter((seasonalDate) => seasonalDate.active)[0];

    return {
      name: product.name,
      imageUrl: product.image.file.url,
      datesAvailable: seasonalObject?.name,
      description: product.description,
      startDate: moment(seasonalObject?.startDate),
    }
  });

  return groomedData.sort((a , b) => a.startDate - b.startDate);
};

const SeasonalProductCarousel = ({products}: Props) => {''

  const currentDate = moment();

  const currentSeasonalProducts = products.filter((product) => {

    let isCurrentProduct = false;

    if (!product.seasonalDatesAvailable) {
      return isCurrentProduct;
    }

    for (let i = 0; i < product.seasonalDatesAvailable?.length; i++) {
      const startDateMonth = moment(product.seasonalDatesAvailable[i].startDate).month();
      if (currentDate.month() === 11) { // if in december, get january too
        if (startDateMonth === currentDate.month() || startDateMonth === 0 ) {
          product.seasonalDatesAvailable[i].active = true;
          isCurrentProduct = true;
        }
      } else {
        if (startDateMonth === currentDate.month() || startDateMonth === currentDate.month() + 1 ) {
          product.seasonalDatesAvailable[i].active = true;
          isCurrentProduct = true;
        }
      }
    }

    return isCurrentProduct;
  });

  if (currentSeasonalProducts.length === 0) {
    return null;
  }

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
  margin-top: ${sizing(50)};
  @media all and (min-width: 992px) {
    padding: ${sizing(20)};
  }
  @media all and (min-width: 1250px) {
    padding: ${sizing(20)} ${sizing(100)};
  }
`

const Title = styled.p`
  ${fonts.cursiveText['600']};
  text-align: center;
  margin-bottom: ${sizing(0)};
  @media all and (min-width: 768px) {
    ${fonts.cursiveText['1000']};
    margin-bottom: 0;
  }
`;

export default SeasonalProductCarousel;