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
  isFullWidth?: boolean;
  leftContent?:  React.ReactNode;
  rightContent?: React.ReactNode;
}

const ProductHeader = ({backgroundImage, underlineImage, productName, isFullWidth = false, leftContent, rightContent }: Props) => {

  if (isFullWidth) {
    return (
      <FullWidthContainer>
        <BackgroundImage fluid={backgroundImage.childImageSharp.fluid} />
        <TextContainer>
          <FullWidthText>{productName}</FullWidthText>
          <Underline fluid={underlineImage.childImageSharp.fluid}/>
        </TextContainer>
      </FullWidthContainer>
    )
  }

  if (leftContent && rightContent && !isFullWidth) {
    return (
      <Container>
        <Text>{productName}</Text>
        <Underline fluid={underlineImage.childImageSharp.fluid}/>
        <ContentContainer>
          <LeftContentContainer>
            {leftContent}
          </LeftContentContainer>
          <CircleImageContainer>
            <CircleImage fluid={backgroundImage.childImageSharp.fluid} alt={productName}/>
          </CircleImageContainer>
          <RightContentContainer>
            {rightContent}
          </RightContentContainer>
        </ContentContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Text>{productName}</Text>
      <Underline fluid={underlineImage.childImageSharp.fluid}/>
      <CircleImageContainer>
        <CircleImage fluid={backgroundImage.childImageSharp.fluid} alt={productName}/>
      </CircleImageContainer>
    </Container>
  );
};

const FullWidthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  background-repeat: no-repeat;
  width: 100%;
  position: relative;
  overflow: hidden;
  @media all and (min-width: 768px) {
    height: ${sizing(330)};
  }
`;

const BackgroundImage = styled(Img)`
  width: 100%;
  height: auto;
`;

const TextContainer = styled.div`
  position: absolute;
`;

const FullWidthText = styled.p`
  ${fonts.cursiveText['700']};
  text-align: center;
  color: ${colors.solids.WHITE};
  margin-bottom: 0;
  @media all and (min-width: 768px) {
    ${fonts.cursiveText['5000']};
    margin-bottom: ${sizing(14)};
  }
`;

const Underline = styled(Img)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: ${sizing(100)};
  @media all and (min-width: 768px) {
    width: ${sizing(300)};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${sizing(35)};
`;

export const CircleImageContainer = styled.div`
  margin-top: ${sizing(20)};
  width: 70%;
  height: auto;
  border-radius: 50%;
  overflow: hidden;
  @media all and (min-width: 768px) {
    margin-top: ${sizing(35)};
    width: ${sizing(350)};
    height: ${sizing(350)};
  }
`;

export const CircleImage = styled(Img)`
  width: 100%;
  height: auto;
`;

const Text = styled.p`
  ${fonts.cursiveText['800']};
  text-align: center;
  color: ${colors.solids.BROWN};
  margin-bottom: 0;
  @media all and (min-width: 768px) {
    ${fonts.cursiveText['2000']};
    margin-bottom: ${sizing(14)};
  }
`;

const ContentContainer = styled.div`
  margin-top: ${sizing(20)};
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  grid-column-gap: ${sizing(20)};
  grid-row-gap: ${sizing(20)};
  align-items: center;
  @media all and (min-width: 992px) {
    grid-template-columns: 1fr ${sizing(350)} 1fr;
    margin-top: ${sizing(35)};
  }
  ${CircleImageContainer} {
    dispay: block;
    margin: auto;
    @media all and (min-width: 992px) {
      margin: ${sizing(35)} 0 0 0;
    }
  }
  
`;

const LeftContentContainer = styled.div`
  @media all and (max-width: 992px) {
    grid-row: 2;
  }
`;
const RightContentContainer = styled.div`
  @media all and (max-width: 992px) {
    grid-row: 3;
  }
`;

export default ProductHeader;