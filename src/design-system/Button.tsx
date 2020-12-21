import React from 'react';
import { Link } from 'gatsby';
import { fonts } from './Fonts';
import styled from '@emotion/styled';

import 'fontsource-sacramento';

import { colors, sizing } from '../utils';

enum Sizes {
  TINY = 'TINY',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  XLARGE = 'XLARGE',
}

type Props = {
  backgroundColor?: string;
  textColor?: string;
  isFullWidth?: boolean;
  size?: keyof typeof Sizes;
  url?: string;
  text: string;
  onClick?: Function;
}

export const getFont = (size: keyof typeof Sizes) => {
  switch (size) {
    case Sizes.TINY: {
      return fonts.cursiveText['100'];
    }
    case Sizes.SMALL: {
      return fonts.cursiveText['300'];
    }
    case Sizes.MEDIUM: {
      return fonts.mediumText['400'];
    }
    case Sizes.LARGE: {
      return fonts.cursiveText['600'];
    }
    case Sizes.XLARGE: {
      return fonts.cursiveText['700'];
    }
    default: {
      return fonts.cursiveText['400'];
    }
  }
};

export const getSize = (size: keyof typeof Sizes) => {
  switch (size) {
    case Sizes.TINY: {
      return `
        padding: ${sizing(2)} ${sizing(4)};
      `;
    }
    case Sizes.SMALL: {
      return `
        padding: ${sizing(5)} ${sizing(12)};
      `;
    }
    case Sizes.MEDIUM: {
      return `
        padding: ${sizing(10)} ${sizing(18)};
      `;
    }
    case Sizes.LARGE: {
      return `
        padding: ${sizing(16)} ${sizing(18)};
      `;
    }
    case Sizes.XLARGE: {
      return `
        padding: ${sizing(18)} ${sizing(20)};
      `;
    }
    default: {
      return `
        padding: ${sizing(10)} ${sizing(18)};
      `;
    }
  }
};

const Button = ({url, size = Sizes.MEDIUM, isFullWidth = false, text, backgroundColor = colors.solids.BROWN, textColor = colors.solids.WHITE, onClick = null}: Props) => {

  const handleOnClick = () => {
    onClick();
  }

  return (
    <>
      {url && (
        <StyledLink to={url} size={size} isFullWidth={isFullWidth} backgroundColor={backgroundColor} textColor={textColor} >
          {text}
        </StyledLink>
      )}
      {onClick && (
        <StyledButton onClick={handleOnClick} size={size} isFullWidth={isFullWidth} backgroundColor={backgroundColor} textColor={textColor} >
          {text}
        </StyledButton>
      )}
    </>
  )
};

const StyledLink = styled(Link)<{size: keyof typeof Sizes, isFullWidth: boolean, backgroundColor: string, textColor: string}>`
    border-radius: ${sizing(40)};
    color: ${({textColor}) => textColor};
    cursor: pointer;
    background-color: ${({backgroundColor}) => backgroundColor};
    display: inline-block;
    appearance: none;
    position: relative;
    outline: none;
    text-decoration: none;
    width: ${({isFullWidth}) => isFullWidth ? '100%' : 'auto'};
    ${({ size }) => getFont(size)};
    ${({ size }) => getSize(size)}; 
    
    &:hover, &:focus {
      color: ${({textColor}) => textColor};
      background-color: ${({backgroundColor}) => backgroundColor};
    }
`

const StyledButton = styled.a<{size: keyof typeof Sizes, isFullWidth: boolean, backgroundColor: string, textColor: string}>`
    border-radius: ${sizing(40)};
    color: ${({textColor}) => textColor};
    cursor: pointer;
    background-color: ${({backgroundColor}) => backgroundColor};
    display: inline-block;
    appearance: none;
    position: relative;
    outline: none;
    text-decoration: none;
    width: ${({isFullWidth}) => isFullWidth ? '100%' : 'auto'};
    ${({ size }) => getFont(size)};
    ${({ size }) => getSize(size)}; 
    
    &:hover, &:focus {
      color: ${({textColor}) => textColor};
      background-color: ${({backgroundColor}) => backgroundColor};
    }
`

export default Button;