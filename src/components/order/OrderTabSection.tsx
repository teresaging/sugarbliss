import React from 'react';

import OrderProduct from './OrderProduct';
import { CategoryTitle, ProductsWrapper, CategoryWrapper, CategoriesContainer } from './Styled';
import { OrderCategory, OrderProduct as OrderProductType } from '../../sharedTypes';

type ProductDataType = OrderCategory & OrderProductType;

type Props = {
  productData: ProductDataType[];
  isHidden: boolean;
  addItemToCart: Function;
}

const OrderTabSection = ({productData, isHidden, addItemToCart}: Props) => {

  const renderCategory = ({products}) => {
    return (
      <ProductsWrapper>
        {products?.map((product, idx) => (
          <OrderProduct
            key={idx}
            name={product.name}
            description={product.description}
            price={product.price}
            dozenPrice={product.dozenPrice}
            customFields={product.customFields}
            addItemToCart={addItemToCart}
          />
        ))}
      </ProductsWrapper>
    );
  }

  return (
    <CategoriesContainer style={{display: isHidden ? 'none' : 'block'}}>
      {productData?.map((data, idx) => (
        <CategoryWrapper key={idx}>
          {data.products ? (
            <>
              <CategoryTitle>{data.name}</CategoryTitle>
              {renderCategory({products: data.products})}
            </>
          )
          : (
            <OrderProduct
              name={data.name}
              price={data.price}
              description={data.description}
              dozenPrice={data.dozenPrice}
              customFields={data.customFields}
              addItemToCart={addItemToCart}
            />
            )
          }
        </CategoryWrapper>
      ))
      }
    </CategoriesContainer>
  );
}

export default OrderTabSection;