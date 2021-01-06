import React from 'react';

import OrderProduct from './OrderProduct';
import { CategoryTitle } from './Styled';

type Props = {
  productData: any[];
}

const OrderTabSection = ({productData}: Props) => {

  const renderProducts = ({products}) => {
    return (
      <>
        {products?.map((product, idx) => (
          <OrderProduct key={idx} name={product.name} price={product.price} />
        ))}
      </>
    );
  }

  return (
    <>
      {productData?.map((category, idx) => (
        <>
          <CategoryTitle key={idx}>{category.name}</CategoryTitle>
          {category.products && renderProducts({products: category.products})}
        </>
      ))
      }
    </>
  );
}

export default OrderTabSection;