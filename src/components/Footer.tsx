import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Img, { FluidObject } from 'gatsby-image';
import { fonts } from '../design-system';

import { sizing, colors } from '../utils';

type Props = {
  logo: FluidObject;
  WBELogo: FluidObject;
  NMSDCLogo: FluidObject;
}

const Footer = ({logo, WBELogo, NMSDCLogo}: Props) => {

  return (
    <FooterWrapper>
      <Column textAlign="left">
        <LogoContainer>
          <Img fluid={logo} />
          <div>Join our mailing list</div>
        </LogoContainer>
      </Column>
      <Column textAlign="center">
        <Address>115 N. Wabash</Address>
        <Address>Chicago, IL 60602</Address>
        <Address>312-845-9669</Address>
        <CertifiedLogosContainer>
          <CertifiedLogo fluid={WBELogo} />
          <CertifiedLogo fluid={NMSDCLogo} />
        </CertifiedLogosContainer>
      </Column>
    </FooterWrapper>
  )
};

const FooterWrapper = styled.div`
 background-color: ${colors.solids.BROWN};
 color: ${colors.solids.WHITE};
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 padding: ${sizing(40)} ${sizing(20)};
`

const Column = styled.div<{textAlign: string}>`
  text-align: ${({textAlign}) => textAlign};
`;

const LogoContainer = styled.div`
  width: 150px;
`;

const Address = styled.p`
  ${fonts.regularText['400']};
`;

const CertifiedLogosContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CertifiedLogo = styled(Img)`
  width: 100%;
  height: ${sizing(50)};
`

export default Footer;