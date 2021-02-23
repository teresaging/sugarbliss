import React from 'react';
import styled from '@emotion/styled';
import Img, { FluidObject } from 'gatsby-image';
import moment from 'moment';
import { Facebook, Instagram, Twitter } from 'react-feather';

import { fonts } from '../design-system';
import { sizing, colors } from '../utils';

type Props = {
  logo: FluidObject;
  WBELogo: FluidObject;
  NMSDCLogo: FluidObject;
}

const Footer = ({logo, WBELogo, NMSDCLogo}: Props) => {

  const currentYear = moment().year();

  return (
    <FooterWrapper>
      <Column textAlign="left">
        {/*<LogoContainer>*/}
        {/*  <Img fluid={logo} />*/}
        {/*  <div>Join our mailing list</div>*/}
        {/*</LogoContainer>*/}
      </Column>
      <Column textAlign="center">
        <Address>122 S Wabash</Address>
        <Address>Chicago, IL 60603</Address>
        <Address>312-845-9669</Address>
        <CertifiedLogosContainer>
          <WBELogoImg fluid={WBELogo} />
          <NMSDCLogoImg fluid={NMSDCLogo} />
        </CertifiedLogosContainer>
        <SocialMediaIconsWrapper>
          <a href="https://www.facebook.com/sugarblisscake/" target="_blank"><Facebook fill="white" strokeWidth={0} size={25} /></a>
          <a href="https://www.instagram.com/sugarblisscakes/" target="_blank"><Instagram  size={25} /></a>
          <a href="https://twitter.com/sugarblisscakes" target="_blank"><Twitter fill="white" strokeWidth={0}  size={25} /></a>
        </SocialMediaIconsWrapper>
        <Copyright>Copyright © {currentYear} Sugar Bliss LLC. All Rights Reserved.</Copyright>
      </Column>
    </FooterWrapper>
  )
};

const FooterWrapper = styled.div`
 background-color: ${colors.solids.BROWN};
 color: ${colors.solids.WHITE};
 display: grid;
 grid-template-columns: 1fr;
 padding: ${sizing(40)} ${sizing(20)} 0 ${sizing(20)};
  @media all and (min-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const Column = styled.div<{textAlign: string}>`
  text-align: ${({textAlign}) => textAlign};
`;

const LogoContainer = styled.div`
  width: 150px;
`;

const Address = styled.p`
  ${fonts.regularText['200']};
  margin-bottom: ${sizing(5)};
  @media all and (min-width: 768px) {
    margin-bottom: ${sizing(15)};
    ${fonts.regularText['400']};
  }
`;

const CertifiedLogosContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${sizing(20)};
`;

const WBELogoImg = styled(Img)`
  width:  ${sizing(50)};
  height: ${sizing(25)};
  margin: 0 ${sizing(15)};
  @media all and (min-width: 768px) {
    width:  ${sizing(100)};
    height: ${sizing(50)};
  }
`;

const NMSDCLogoImg = styled(Img)`
  width:  ${sizing(41.5)};
  height: ${sizing(25)};
  margin: 0 ${sizing(15)};
  @media all and (min-width: 768px) {
    width:  ${sizing(83)};
    height: ${sizing(50)};
  }
`;

const Copyright = styled.p`
  ${fonts.regularText['100']};
  margin-top: ${sizing(20)};
  margin-bottom: ${sizing(10)};
`;

const SocialMediaIconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${sizing(40)};
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin: 0 ${sizing(8)};
    transition: 0.2s opacity;
    &:hover {
      opacity: 0.6;
    }
  }
`;

export default Footer;