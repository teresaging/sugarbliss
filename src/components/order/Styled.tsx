import styled from '@emotion/styled';
import { TextField } from 'mui-rff';

import { fonts } from '../../design-system';
import { colors, sizing } from '../../utils';

export const Title = styled.h1<{marginBottom: number}>`
  ${fonts.cursiveText['1200']};
  text-align: center;
  margin-bottom: ${({marginBottom}) => marginBottom ? `${sizing(marginBottom)}` : 0};
`;

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 40vh;
  @media all and (min-width: 992px) {
     flex-direction: row;
  }
`;

export const Option = styled.div<{bgColor: string}>`
  width: 350px;
  height: 200px;
  background-color: ${({bgColor}) => bgColor};
  margin: ${sizing(20)} 0;
  border-radius: ${sizing(20)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media all and (min-width: 992px) {
     margin: 0 ${sizing(20)};
  }
  &:hover, &:focus {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export const OptionText = styled.p`
  ${fonts.boldText['600']};
  margin-bottom: 0;
`;


export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SubTitle = styled.p`
  ${fonts.mediumText['600']};
  margin-bottom: ${sizing(50)};
  text-align: center;
`;

export const FormContainer = styled.div<{bgColor: string}>`
  max-width: 1000px;
  width: 100%;
  background-color: ${({bgColor}) => bgColor};
  border-radius: ${sizing(20)};
  padding: ${sizing(40)};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${sizing(40)};
  margin-bottom: ${sizing(20)};
`;

export const SingleRow = styled.div`
  margin-bottom: ${sizing(20)};
`;

export const SubmitButton = styled.button`
  ${fonts.boldText['500']};
  border-radius: ${sizing(40)};
  color: ${colors.solids.WHITE};
  background-color: ${colors.solids.BROWN};
  cursor: pointer;
  display: block;
  border-color: transparent;
  padding: ${sizing(10)} ${sizing(18)};
  margin: ${sizing(50)} auto 0 auto;
  &:disabled {
    opacity: 0.4;
  }
`;

export const DeliveryPrice = styled.p`
  ${fonts.boldText['400']};
  display: block;
  text-align: center;
`;

export const CannotDeliverText = styled.p`
  ${fonts.boldText['400']};
  display: block;
  text-align: center;
  color: ${colors.solids.ERROR};
`;

export const CategoryTitle = styled.h5`
  ${fonts.boldText['600']};
`;

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${sizing(20)};
  border: solid 6px ${colors.solids.BABY_PINK};
  border-radius: ${sizing(20)};
`;

export const CategoriesContainer = styled.div`
`;

export const CategoryWrapper = styled.div`
  margin: ${sizing(75)} 0;
`;

export const ProductsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: ${sizing(35)};
  grid-row-gap: ${sizing(20)};
`;

export const Name = styled.h5`
  ${fonts.boldText['400']};
  text-align: center;
`;

export const Description = styled.p`
  ${fonts.regularText['200']};
  text-align: center;
`;

export const Price = styled.p`
  ${fonts.boldText['300']};
`;

export const PriceWithDozen = styled.p`
  ${fonts.regularText['300']}
`;

export const AddToCartButton = styled.button`
  ${fonts.boldText['400']};
  color: ${colors.solids.BROWN};
  background-color: ${colors.solids.BABY_PINK};
  cursor: pointer;
  border-color: transparent;
  border-radius: ${sizing(40)};
  padding: ${sizing(10)} ${sizing(18)};
  margin: 0;
  &:disabled {
    opacity: 0.4;
  }
`;

export const QuantityInput = styled.input<{marginBottom: number}>`
  width: ${sizing(40)};
  border: none;
  border-bottom: solid 1px ${colors.solids.BROWN};
  margin-bottom: ${({marginBottom}) => marginBottom ? sizing(marginBottom) : 0};
`;

export const QuantityInputLabel = styled.p`
  ${fonts.regularText['300']};
  margin: 0;
`;

export const CustomFieldInput = styled.input`
  width: 100%;
  max-width: 200px;
  border: solid 1px ${colors.solids.BROWN};
`;

export const CustomFieldLabel = styled.p`
  ${fonts.regularText['300']};
  margin: 0 ${sizing(10)} 0 0};
`;

export const CustomFieldContainer = styled.div`
  width: 100%;
  max-width: ${sizing(300)};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${sizing(15)};
`;