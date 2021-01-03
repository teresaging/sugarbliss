import React from 'react';
import styled from '@emotion/styled';
import { ShoppingBag } from 'react-feather';

import { fonts } from '../../design-system';
import { sizing, colors } from '../../utils';

type Props = {
  cartQuantity: number;
}

const Cart = ({ cartQuantity = 0 }: Props) => {
  return (
    <Container className="snipcart-checkout">
      <ShoppingBag size={36}/>
      <QuantityContainer>
        <Number>{cartQuantity}</Number>
      </QuantityContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  cursor: pointer;
`;

const QuantityContainer = styled.div`
  background-color: ${colors.solids.BROWN};
  border-radius: 100px;
  height: ${sizing(30)};
  width: ${sizing(30)};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${sizing(-10)};
  right: ${sizing(-10)};
`;

const Number = styled.p`
  ${fonts.mediumText['200']};
  color: ${colors.solids.WHITE};
  margin: 0;
`;

export default Cart;
