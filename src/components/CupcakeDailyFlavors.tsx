import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Img, {FluidImage} from "gatsby-image"
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Button, fonts } from '../design-system';
import { sizing } from '../utils';

import { colors } from '../utils';

enum Months {
  JAN = 'January',
  FEB = 'February',
  MAR = 'March',
  APR = 'April',
  MAY = 'May',
  JUN = 'June',
  JUL = 'July',
  AUG = 'August',
  SEP = 'September',
  OCT = 'October',
  NOV = 'November',
  DEC = 'December',
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
  monthAvailable: typeof Months;
  isDaily: boolean;
  dayAvailable: string;
};

type Props = {
  cupcakes: Cupcake[];
};

const CupcakeDailyFlavors = ({cupcakes}: Props) => {

  return (
    <CupcakeDailyFlavorsWrapper>
      
    </CupcakeDailyFlavorsWrapper>
  )
};

const CupcakeDailyFlavorsWrapper = styled.div`
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

export default CupcakeDailyFlavors;