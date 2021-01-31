import React from 'react';
import { fonts } from './Fonts';
import styled from '@emotion/styled';

import 'fontsource-sacramento';

import { sizing } from '../utils';

type Props = {
  name: string;
  description: string;
  imageUrl: string;
}

const ProductDisplay = ({name, description, imageUrl}: Props) => {

  return (
    <ProductDisplayContainer>
      <Image src={imageUrl} />
      <Name>{name}</Name>
      <Description>{description}</Description>
    </ProductDisplayContainer>
  )
};

const ProductDisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Image = styled.img`
    border-radius: 50%;
    height: auto;
    width: 100%;
    max-width: ${sizing(350)};
    margin-bottom: ${sizing(35)};
`
const Name = styled.p`
    ${fonts.cursiveText['600']};
    text-align: center;
    margin-bototm: ${sizing(20)};
    @media all and (min-width: 768px) {
      ${fonts.cursiveText['800']};
    }
`
const Description = styled.p`
    ${fonts.regularText['200']};
    text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.regularText['300']};  
  }
`

export default ProductDisplay;