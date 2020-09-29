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
        <Button url="" text="Order Online" size="XLARGE" />
      </OrderButtonContainer>
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${sizing(330)};
  background-repeat: no-repeat;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const Image = styled(Img)`
  width: 100%;
  height: auto;
`;

const OrderButtonContainer = styled.div`
  position: absolute;
`;

export default OrderFooter;