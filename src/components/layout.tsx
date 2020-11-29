import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';

import Header from './header';
import Footer from './Footer';

import './layout.css'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        },
        logo: file(absolutePath: {regex: "/\\/images\\/sbboutique-logo\\.png/"}) {
          childImageSharp {
            fluid(maxWidth: 160) {
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
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <Header siteTitle={data.site.siteMetadata.title} logo={data.logo.childImageSharp.fluid} />
            <Container>{children}</Container>
            <Footer logo={data.logo.childImageSharp.fluid} WBELogo={data.WBELogo.childImageSharp.fluid} NMSDCLogo={data.NMSDCLogo.childImageSharp.fluid}/>
          </>
    )}}
/>
)

export default Layout

const Container = styled.div`
  margin: 0 auto;
  max-width: 100%;
  padding: 0;
`