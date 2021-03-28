import React, { useRef } from 'react';
import { useResize } from '../../hooks';

import OrderProduct from './OrderProduct';
import { CategoryTitle, ProductsWrapper, CategoryWrapper, CategoriesContainer, CategoryTitleWrapper, DotsContainer, Dot } from './Styled';
import { OrderCategory, OrderProduct as OrderProductType, Cupcake, Macaron, CakePop, Cookies } from '../../sharedTypes';

import { colors } from '../../utils';

export const DOTS_SIZE = 200;

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

  const dotsContainer = useRef(null);
  const { width } = useResize(dotsContainer)

  const renderDots = () => {
    const dotsWidth = width || dotsContainer?.current?.offsetWidth;
    const amountOfDotsToRender = (dotsWidth ? dotsWidth / DOTS_SIZE : 1) || 1;
    const dots = [];
    for (let i = 0; i < amountOfDotsToRender - 1; i++) {
      dots.push(
        <>
          <Dot key={`${i}-1`} color={colors.solids.BROWN} />
          <Dot key={`${i}-2`} color={colors.solids.MAIN_MED_BLUE} />
          <Dot key={`${i}-3`} color={colors.solids.MAIN_MED_PINK} />
          <Dot key={`${i}-4`} color={colors.solids.MAIN_LIGHT_PINK} />
          <Dot key={`${i}-5`} color={colors.solids.DARK_BLUE}/>
        </>
      );
    }

    return (
      <>
        {dots}
      </>
    )
  }

  const renderCategory = ({products, type}) => {
    return (
      <ProductsWrapper>
        {products?.map((product, idx) => (
          <OrderProduct
            type={type}
            key={idx}
            name={product.name}
            description={product.description}
            price={product.price}
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
      {productData?.map((data, idx) => {
        const isEven = idx % 2 === 0;
        console.log('isEven');

        return (
          <CategoryWrapper key={idx}>
            {data.products ? (
              <>
                <CategoryTitleWrapper>
                  <CategoryTitle>{data.name}</CategoryTitle>
                  <DotsContainer ref={dotsContainer}>
                    {renderDots()}
                  </DotsContainer>
                </CategoryTitleWrapper>
                {renderCategory({products: data.products, type: isEven ? 'light' : 'dark'})}
              </>
            )
            : (
              <ProductsWrapper>
                <OrderProduct
                  type={isEven ? 'light' : 'dark'}
                  name={data.name}
                  price={data.price}
                  description={data.description}
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
      )})
      }
      <button
        style={{display: 'none'}}
        className="snipcart-add-item"
        data-item-id="testing-1"
        data-item-price="0.00"
        data-item-url="/order"
        data-item-name="Testing 1">
        Add To Order
      </button>
    </CategoriesContainer>
  );
}

export default OrderTabSection;