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
        <Option
          onClick={() => onOptionPress('pickup')}
          bgColor={colors.solids.ORDER_PINK}
          borderColor={colors.solids.DARK_BLUE}
          textColor={colors.solids.DARK_BLUE}
        >
          <OptionText>Pickup From Store</OptionText>
          <OptionText>122 S Wabash</OptionText>
          <OptionText>(Monday - Saturday)</OptionText>
        </Option>
        <Option
          onClick={() => onOptionPress('delivery')}
          bgColor={colors.solids.DARK_BLUE}
          borderColor={colors.solids.ORDER_PINK}
          textColor={colors.solids.ORDER_PINK}
        >
          <OptionText>Local Chicago &</OptionText>
          <OptionText>Suburb Delivery</OptionText>
          <OptionText>(Monday - Saturday)</OptionText>
        </Option>
      </OptionsContainer>
    </>
  );
}

export default OrderDeliveryPickup;
