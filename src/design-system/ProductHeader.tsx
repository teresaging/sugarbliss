import React from 'react';
import styled from '@emotion/styled';
import Img, { FluidObject } from 'gatsby-image';

import 'fontsource-sacramento';

import { colors, sizing } from '../utils';
import { fonts } from './Fonts';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type Props = {
  backgroundImage: FluidImage;
  underlineImage: FluidImage;
  productName: string;
}

const ProductHeader = ({backgroundImage, underlineImage, productName}: Props) => {

  return (
    <Container>
      <Image fluid={backgroundImage.childImageSharp.fluid} />
      <TextContainer>
        <Text>{productName}</Text>
        <Underline fluid={underlineImage.childImageSharp.fluid}/>
      </TextContainer>
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

const TextContainer = styled.div`
  position: absolute;
`;

const Text = styled.p`
  ${fonts.cursiveText['5000']};
  text-align: center;
  color: ${colors.solids.WHITE};
`;

const Underline = styled(Img)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: ${sizing(300)};
`;

export default ProductHeader;