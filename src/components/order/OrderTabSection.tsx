import React from 'react';

import OrderProduct from './OrderProduct';
import { CategoryTitle, ProductsWrapper, CategoryWrapper, CategoriesContainer } from './Styled';

type Props = {
  productData: any[];
  isHidden: boolean;
}

const OrderTabSection = ({productData, isHidden}: Props) => {

  const renderProducts = ({products}) => {
    return (
      <ProductsWrapper>
        {products?.map((product, idx) => (
          <OrderProduct
            key={idx}
            name={product.name}
            description={product.description}
            price={product.price}
            dozenPrice={product.dozenPrice}
          />
        ))}
      </ProductsWrapper>
    );
  }

  return (
    <CategoriesContainer style={{display: isHidden ? 'none' : 'block'}}>
      {productData?.map((category, idx) => (
        <CategoryWrapper key={idx}>
          <CategoryTitle>{category.name}</CategoryTitle>
          {category.products && renderProducts({products: category.products})}
        </CategoryWrapper>
      ))
      }
    </CategoriesContainer>
  );
}

export default OrderTabSection;