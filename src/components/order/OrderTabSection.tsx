import React from 'react';

import OrderProduct from './OrderProduct';
import { CategoryTitle, ProductsWrapper, CategoryWrapper, CategoriesContainer } from './Styled';
import { OrderCategory, OrderProduct as OrderProductType, Cupcake, Macaron, CakePop, Cookies } from '../../sharedTypes';

type ProductDataType = OrderCategory & OrderProductType;

type Props = {
  productData: ProductDataType[];
  isHidden: boolean;
  addItemToCart: Function;
  availableCupcakeFlavors: Cupcake[];
  availableMacaronFlavors: Macaron[];
  availableCakePopFlavors: CakePop[];
  availableCookiesFlavors: Cookies[];
  availableMuffinsFlavors: string[];
  availableSconesFlavors: string[];
}

const OrderTabSection = ({
   productData,
   isHidden,
   addItemToCart,
   availableCupcakeFlavors = [],
   availableMacaronFlavors = [],
   availableCakePopFlavors = [],
   availableCookiesFlavors = [],
   availableMuffinsFlavors = [],
   availableSconesFlavors = []
}: Props) => {

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
            availableCupcakeFlavors={availableCupcakeFlavors}
            availableMacaronFlavors={availableMacaronFlavors}
            availableCakePopFlavors={availableCakePopFlavors}
            availableCookiesFlavors={availableCookiesFlavors}
            availableMuffinsFlavors={availableMuffinsFlavors}
            availableSconesFlavors={availableSconesFlavors}
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
            <ProductsWrapper>
              <OrderProduct
                name={data.name}
                price={data.price}
                description={data.description}
                dozenPrice={data.dozenPrice}
                customFields={data.customFields}
                addItemToCart={addItemToCart}
                availableCupcakeFlavors={availableCupcakeFlavors}
                availableMacaronFlavors={availableMacaronFlavors}
                availableCakePopFlavors={availableCakePopFlavors}
                availableCookiesFlavors={availableCookiesFlavors}
                availableMuffinsFlavors={availableMuffinsFlavors}
                availableSconesFlavors={availableSconesFlavors}
              />
            </ProductsWrapper>
            )
          }
        </CategoryWrapper>
      ))
      }
    </CategoriesContainer>
  );
}

export default OrderTabSection;