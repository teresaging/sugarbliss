import React from 'react';

import { ProductContainer, Name, Description, Price, PriceWithDozen , AddToCartButton} from './Styled';

type Props = {
  name: string;
  description?: string;
  price: number;
  dozenPrice?: number;
}

const OrderProduct = ({name, description, price, dozenPrice}: Props) => {
  return (
    <ProductContainer>
      <Name>{name}</Name>
      {description && <Description>{description}</Description>}
      {dozenPrice ? (
        <PriceWithDozen>Single price: ${price} | Dozen price: ${dozenPrice} </PriceWithDozen>
      ) : (
        <Price>${price}</Price>
      )}
      <AddToCartButton
        className="snipcart-add-item"
        data-item-url="/order"
        data-item-id={name}
        data-item-name={name}
        data-item-price={price}
      >
        Add To Cart
      </AddToCartButton>
    </ProductContainer>
  );
}

export default OrderProduct;