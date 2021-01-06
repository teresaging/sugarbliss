import React from 'react';

type Props = {
  name: string;
  price: number;
}

const OrderProduct = ({name, price}: Props) => {
  return (
    <div>
      <p>{name}</p>
      <p>${price}</p>
    </div>
  );
}

export default OrderProduct;