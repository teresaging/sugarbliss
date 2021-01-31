import React from 'react';
import styled from '@emotion/styled';
import Img, { FluidObject } from 'gatsby-image';
import Button from './Button';

import 'fontsource-sacramento';

import { sizing } from '../utils';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type Props = {
  backgroundImage: FluidImage;
}

const OrderFooter = ({backgroundImage}: Props) => {

  return (
    <Container>
      <Image fluid={backgroundImage.childImageSharp.fluid} />
      <OrderButtonContainer>
        <Button url="/order" text="Order Online" size="XLARGE" mobileSize="SMALL" />
      </OrderButtonContainer>
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${sizing(150)};
  background-repeat: no-repeat;
  width: 100%;
  position: relative;
  overflow: hidden;
  @media all and (min-width: 768px) {
    height: ${sizing(330)};
  }
`;

const Image = styled(Img)`
  width: 100%;
  height: 100%;
  @media all and (min-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const OrderButtonContainer = styled.div`
  position: absolute;
`;

export default OrderFooter;