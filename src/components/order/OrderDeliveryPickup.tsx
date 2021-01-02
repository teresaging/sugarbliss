import React from 'react';
import { colors } from '../../utils';
import { Title, OptionsContainer, Option, OptionText } from './Styled';

type Props = {
  onOptionPress: Function;
}

const OrderDeliveryPickup = ({onOptionPress}: Props) => {
  return (
    <>
      <Title marginBottom={50}>Local Delivery or Pickup</Title>
      <OptionsContainer>
        <Option onClick={() => onOptionPress('delivery')} bgColor={colors.solids.BABY_PINK}>
          <OptionText>Local Delivery</OptionText>
          <OptionText>(Monday - Sunday)</OptionText>
        </Option>
        <Option onClick={() => onOptionPress('pickup')} bgColor={colors.solids.BABY_BLUE}><OptionText>Pickup From Store</OptionText></Option>
      </OptionsContainer>
    </>
  );
}

export default OrderDeliveryPickup;
