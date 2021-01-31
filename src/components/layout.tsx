import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { X } from 'react-feather';

import { sizing, colors } from '../utils';

import Header from './header';
import Footer from './Footer';

import { NavData } from './Nav';

import './layout.css'
import { NavLink } from '../design-system';

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {

  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);

  const handleToggleMobileNav = () => {
    setIsMobileNavOpened(!isMobileNavOpened);
  }

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          },
          logo: file(absolutePath: {regex: "/\\/images\\/SugarBliss_Logo_2020\\.png/"}) {
            childImageSharp {
              fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid
              }
            }
          },
          WBELogo: file(absolutePath: {regex: "/\\/images\\/Certified-WBE\\.png/"}) {
            childImageSharp {
              fluid(maxWidth: 225) {
                    ...GatsbyImageSharpFluid
              }
            }
          },
          NMSDCLogo: file(absolutePath: {regex: "/\\/images\\/NMSDC-logo\\.png/"}) {
            childImageSharp {
              fluid(maxWidth: 225) {
                    ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={(data) => {

        return (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                {name: 'description', content: 'Sample'},
                {name: 'keywords', content: 'sample, something'},
              ]}
            >
              <html lang="en"/>
            </Helmet>
            {isMobileNavOpened && (
              <MobileMenu>
                <div>
                  <CloseButton
                    onClick={() => setIsMobileNavOpened(false)}
                    size={40}/>
                  <MobileLinksContainer>
                    {NavData.map((link, idx) => (
                        <NavLink
                          key={idx}
                          link={link}
                          idx={idx}
                          isMobile
                        />
                    ))}
                  </MobileLinksContainer>
                </div>
              </MobileMenu>
            )}
            <Header
              handleToggleMobileNav={handleToggleMobileNav}
              siteTitle={data.site.siteMetadata.title}
              logo={data.logo.childImageSharp.fluid}
            />
            <Container>{children}</Container>
            <Footer
              logo={data.logo.childImageSharp.fluid}
              WBELogo={data.WBELogo.childImageSharp.fluid}
              NMSDCLogo={data.NMSDCLogo.childImageSharp.fluid}
            />
          </>
        )
      }}
    />
  )
}

export default Layout

const Container = styled.div`
  margin: 0 auto;
  max-width: 100%;
  padding: 0;
`;

const MobileMenu = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.solids.WHITE};
  z-index: 99;
  overflow: scroll;
  
  > div {
    position: relative;
  }
`;

const CloseButton = styled(X)`
  position: absolute;
  top: ${sizing(5)};
  right: ${sizing(5)};
`;

const MobileLinksContainer = styled.div`
  padding-top: ${sizing(45)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;