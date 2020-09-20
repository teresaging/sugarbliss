import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Img, { FluidObject } from 'gatsby-image';

import Nav from './Nav';

type Props = {
  siteTitle: string;
  logo: FluidObject;
}

const Header = ({ siteTitle, logo }: Props) => (
  <HeaderWrapper>
      <LogoContainer>
          <StyledLink to="/">
            <Img alt={siteTitle} fluid={logo} />
          </StyledLink>
      </LogoContainer>
      <NavContainer>
          <Nav />
      </NavContainer>
  </HeaderWrapper>
)

export default Header;

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 168px 1fr;
  padding: 15px;
  width: 100%;
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