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
    max-width: ${sizing(400)};
    margin-bottom: ${sizing(35)};
`
const Name = styled.p`
    ${fonts.cursiveText['800']};
    text-align: center;
    margin-bototm: ${sizing(20)};
`
const Description = styled.p`
    ${fonts.regularText['300']};
    text-align: center;
`

export default ProductDisplay;