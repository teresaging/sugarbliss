import styled from '@emotion/styled';

import { fonts } from '../../design-system';
import { colors, sizing } from '../../utils';

export const Title = styled.h1<{marginBottom: number}>`
  ${fonts.cursiveText['600']};
  text-align: center;
  margin-bottom: ${sizing(20)};
  @media all and (min-width: 768px) {
    ${fonts.cursiveText['1200']};
    margin-bottom: ${({marginBottom}) => marginBottom ? `${sizing(marginBottom)}` : 0};
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media all and (min-width: 992px) {
    height: 40vh;
    flex-direction: row;
  }
`;

export const Option = styled.div<{bgColor: string, borderColor: string, textColor: string}>`
  width: 100%;
  background-color: ${({bgColor}) => bgColor};
  margin: ${sizing(5)} 0;
  border-radius: ${sizing(20)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${({textColor}) => textColor ? textColor : colors.solids.DARK_BLUE};
  border: ${({borderColor}) => `solid ${sizing(8)} ${borderColor}`};
  transition: 0.3s opacity;
  padding-top: ${sizing(20)};
  padding-bottom: ${sizing(20)};
  @media all and (min-width: 768px) {
    width: ${sizing(350)};
    height: ${sizing(200)};
    margin: ${sizing(20)} 0;
    padding-top: 0;
    padding-bottom: 0;
  }
    @media all and (min-width: 992px) {
     margin: 0 ${sizing(20)};
  }
  &:hover, &:focus {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export const OptionText = styled.p`
  ${fonts.boldText['300']};
  margin-bottom: 0;
  @media all and (min-width: 768px) {
    ${fonts.boldText['600']};
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: ${sizing(20)};
  @media all and (min-width: 768px) {
    margin-top: 0;
  }
`;

export const SubTitle = styled.p`
  ${fonts.mediumText['100']};
  margin-bottom: ${sizing(5)};
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.mediumText['500']};
    margin-bottom: ${sizing(15)};
  }
`;

export const Disclaimer = styled.p`
  ${fonts.regularText['200']};
  margin-bottom: ${sizing(20)};
  
`

export const FormContainer = styled.div<{bgColor: string}>`
  max-width: 1000px;
  width: 100%;
  background-color: ${({bgColor}) => bgColor};
  border-radius: ${sizing(10)};
  padding: ${sizing(10)};
  @media all and (min-width: 768px) {
    padding: ${sizing(40)};
    border-radius: ${sizing(20)};
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: ${sizing(10)};
  margin-bottom: ${sizing(20)};
  @media all and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: ${sizing(40)};
  }
`;

export const SingleRow = styled.div`
  margin-bottom: ${sizing(20)};
`;

export const SubmitButton = styled.button`
  ${fonts.boldText['200']};
  border-radius: ${sizing(40)};
  color: ${colors.solids.WHITE};
  background-color: ${colors.solids.BROWN};
  cursor: pointer;
  display: block;
  border-color: transparent;
  padding: ${sizing(5)} ${sizing(10)};
  margin: ${sizing(20)} auto 0 auto;
  &:disabled {
    opacity: 0.4;
  }
  @media all and (min-width: 768px) {
    ${fonts.boldText['500']};
    padding: ${sizing(10)} ${sizing(18)};
    margin: ${sizing(50)} auto 0 auto;
  }
`;

export const DeliveryPrice = styled.p`
  ${fonts.boldText['200']};
  display: block;
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.boldText['400']};
  }
`;

export const CannotDeliverText = styled.p`
  ${fonts.boldText['200']};
  display: block;
  text-align: center;
  color: ${colors.solids.ERROR};
  @media all and (min-width: 768px) {
    ${fonts.boldText['400']};
  }
`;

export const CategoryTitle = styled.h5`
  ${fonts.boldText['500']};
  color: ${colors.solids.DARK_BLUE};
  margin-bottom: 0;
  flex: 0;
  white-space: normal;
  @media all and (min-width: 768px) {
    ${fonts.boldText['800']};
    white-space: nowrap;
  }
`;

export const AddToCartButton = styled.button`
  ${fonts.boldText['200']};
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
  @media all and (min-width: 768px) {
    ${fonts.boldText['300']};
  }
`;

export const ProductContainer = styled.div<{type: string}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${sizing(20)};
  border-radius: ${sizing(20)};
  ${({type}) => type === 'light' && `
    background-color: ${colors.solids.ORDER_PINK};
    color: ${colors.solids.DARK_BLUE};
    border: solid 6px ${colors.solids.DARK_BLUE};
     
    textarea {
      background-color: ${colors.solids.ORDER_PINK_LIGHT};
      color: ${colors.solids.DARK_BLUE};
      border-color: ${colors.solids.DARK_BLUE};
      border-radius: ${sizing(7)};
    }
    
    input {
      background-color: ${colors.solids.ORDER_PINK_LIGHT};
      color: ${colors.solids.DARK_BLUE};
      border-bottom: 2px solid ${colors.solids.DARK_BLUE};
    }
    
    ${CustomFieldContainer}, .MuiFormControl-root, .MuiInputBase-root {
      color: ${colors.solids.DARK_BLUE}!important;
    }
    
    .MuiInput-underline:before {
      border-bottom: 1px solid rgba(44, 58, 86, 0.54) !important;
    }
    
    .MuiInput-underline:hover:not(.Mui-disabled):before {
      border-bottom: 2px solid rgba(44, 58, 86, 0.87);
    }
    
    .MuiInput-underline:after {
      border-bottom: 2px solid ${colors.solids.DARK_BLUE};
    }
    
    .MuiFormLabel-root {
      color: rgba(44, 58, 86, 0.54) !important;
    }
     
    ${AddToCartButton} {
      background-color: ${colors.solids.DARK_BLUE};
      color: white;
    }
  `}
  
  ${({type}) => type === 'dark' && `
    color: ${colors.solids.ORDER_PINK};
    background-color: ${colors.solids.DARK_BLUE};
    border: solid 6px ${colors.solids.ORDER_PINK};
    
    textarea {
      background-color: ${colors.solids.ORDER_DARK_BLUE_LIGHT};
      color: ${colors.solids.ORDER_PINK};
      border-color: ${colors.solids.ORDER_PINK};
      border-radius: 7px;
    }
    
    input {
      background-color: ${colors.solids.ORDER_DARK_BLUE_LIGHT};
      color: ${colors.solids.ORDER_PINK};
      border-bottom: 2px solid ${colors.solids.ORDER_PINK};
    }
    
    ${CustomFieldContainer}, .MuiFormControl-root, .MuiInputBase-root {
      color: ${colors.solids.ORDER_PINK}!important;
    }
    
    .MuiInput-underline:before {
      border-bottom: 1px solid rgba(244, 215, 217, 0.54) !important;
    }
    
    .MuiInput-underline:hover:not(.Mui-disabled):before {
      border-bottom: 2px solid rgba(244, 215, 217, 0.87);
    }
    
    .MuiInput-underline:after {
      border-bottom: 2px solid ${colors.solids.DARK_BLUE};
    }
    
    .MuiFormLabel-root {
      color: rgba(244, 215, 217, 0.54) !important;
    }
    
    ${AddToCartButton} {
      background-color: ${colors.solids.ORDER_PINK};
      color: ${colors.solids.DARK_BLUE};
    }
  `}
  
`;

export const CategoriesContainer = styled.div`
`;

export const CategoryWrapper = styled.div`
  margin: ${sizing(75)} 0;
`;

export const ProductsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: ${sizing(35)};
  grid-row-gap: ${sizing(20)};
  @media all and (min-width: 768px) {
    grid-template-columns: repeat(2 , minmax(0, 1fr));
  }
  @media all and (min-width: 850px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media all and (min-width: 1042px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const Name = styled.h5`
  ${fonts.boldText['300']};
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.boldText['600']};
  }
`;

export const Description = styled.p`
  ${fonts.regularText['100']};
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.regularText['200']};
  }
`;

export const Price = styled.p`
  ${fonts.boldText['100']};
  @media all and (min-width: 768px) {
    ${fonts.boldText['300']};
  }
`;

export const PriceWithDozen = styled.p`
  ${fonts.regularText['300']}
`;

export const QuantityInput = styled.input<{marginBottom: number}>`
  width: ${sizing(40)};
  border: none;
  border-bottom: solid 1px ${colors.solids.BROWN};
  margin-bottom: ${({marginBottom}) => marginBottom ? sizing(marginBottom) : 0};
`;

export const QuantityInputLabel = styled.p`
  ${fonts.regularText['100']};
  margin: 0;
  @media all and (min-width: 768px) {
    ${fonts.regularText['300']};
  }
`;

export const CustomFieldInput = styled.input`
  width: 100%;
  max-width: 200px;
  border: solid 1px ${colors.solids.BROWN};
`;

export const CustomFieldTextArea = styled.textarea`
  width: 100%;
  border: solid 1px ${colors.solids.BROWN};
  max-width: 100%;
  min-width: 100%;
  border-radius: 7px;
`;

export const CustomFieldLabel = styled.p`
  ${fonts.regularText['100']};
  margin: 0 ${sizing(10)} 0 0};
  @media all and (min-width: 768px) {
    ${fonts.regularText['300']};
  }
`;

export const CustomFieldContainer = styled.div`
  width: 100%;
  max-width: ${sizing(230)};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto ${sizing(15)} auto;

  .MuiInputLabel-formControl {
    transform: translate(0, 33px) scale(1);
  }
  .MuiInputLabel-shrink {
    transform: translate(0, 11px) scale(0.75);
    transform-origin: top left;
  }
  
  .MuiSelect-icon {
    top: calc(62% - 9px);
  }
`;

export const CustomFieldTextContainer = styled.div`
  width: 100%;
  max-width: ${sizing(230)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto ${sizing(15)} auto;
`;

export const MakeYourOwnFlavor = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const PlusMinusButton = styled.div`
  ${fonts.boldText['200']};
  cursor: pointer;
  margin: 0 ${sizing(3)};
  @media all and (min-width: 768px) {
    ${fonts.boldText['400']};
  }
`;

export const MakeYourOwnMinusPlusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MakeYourOwnTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  p {
    ${fonts.regularText['100']};
    @media all and (min-width: 768px) {
      ${fonts.regularText['200']};
    }
    margin: 0;
  }
`;

export const MakeYourOwnContainer = styled.div`
  width: 100%;
  margin-bottom: ${sizing(20)};
`;

export const ErrorText = styled.p`
  ${fonts.boldText['100']};
  color: red;
  @media all and (min-width: 768px) {
    ${fonts.boldText['200']};
  }
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  .MuiSvgIcon-root {
    width: ${sizing(22)};
    height: ${sizing(22)};
  }
`;

export const CategoryTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${sizing(20)};
`;

export const DotsContainer = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: ${sizing(15)};
  overflow: hidden;
  flex: 2;
`;

export const Dot = styled.div<{color: string}>`
  width: ${sizing(20)};
  height: ${sizing(20)};
  background-color: ${({color}) => color};
  border-radius: ${sizing(50)};
  margin-right: ${sizing(1)};
  @media all and (min-width: 768px) {
    margin-right: ${sizing(5)};
  }
`;