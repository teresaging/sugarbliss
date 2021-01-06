import styled from '@emotion/styled';
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
  ${fonts.boldText['400']};
`