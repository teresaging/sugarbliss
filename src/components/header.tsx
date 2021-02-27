import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Img, { FluidObject } from 'gatsby-image';

import { sizing } from '../utils';

import Nav from './Nav';

type Props = {
  siteTitle: string;
  logo: FluidObject;
  handleToggleMobileNav: Function;
}

const Header = ({ siteTitle, logo, handleToggleMobileNav }: Props) => (
  <HeaderWrapper>
      <LogoContainer>
          <StyledLink to="/">
            <LogoImg alt={siteTitle} fluid={logo} />
          </StyledLink>
      </LogoContainer>
      <NavContainer>
          <Nav
            handleToggleMobileNav={handleToggleMobileNav}
          />
      </NavContainer>
  </HeaderWrapper>
)

export default Header;

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 168px 1fr;
  padding: ${sizing(10)} ${sizing(15)} ${sizing(2)} ${sizing(15)};
  width: 100%;
  @media all and (min-width: 1024px) {
    grid-template-columns: 250px 1fr;
  }
`

const LogoContainer = styled.div`
  position: relative;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`
const NavContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const LogoImg = styled(Img)`
  width: 100%;
  height: auto;
`;