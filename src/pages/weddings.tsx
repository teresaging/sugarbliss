import React from 'react';
import styled from '@emotion/styled';
import { FluidObject } from 'gatsby-image';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import { ProductHeader, ProductList, OrderFooter, fonts, Button } from '../design-system';

import { sizing, colors } from '../utils';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type WeddingsQueryProps = {
  underlineImage: FluidImage;
  weddingsHeaderImage: FluidImage;
  weddingsFooterImage: FluidImage;
}

type WeddingsPageProps = PageProps<WeddingsQueryProps>;

const WeddingsPage = ({data}: WeddingsPageProps) => {

  return (
    <Layout>
      <ProductHeader productName="Weddings" backgroundImage={data.weddingsHeaderImage} underlineImage={data.underlineImage} isFullWidth />
      <PriceSection>
        <Button url="/" text="Wedding Brochure" size="LARGE" />
      </PriceSection>
      <OrderFooter backgroundImage={data.weddingsFooterImage} />
    </Layout>
  );
};

const PriceSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.solids.BABY_PINK};
  padding: ${sizing(40)} 0;
  margin: ${sizing(50)} 0;
`;

export default WeddingsPage;

export const query = graphql`
  query WeddingsPageQuery {
    underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    weddingsHeaderImage: file(absolutePath: {regex: "/\\/images\\/weddings\\/weddings_header\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    weddingsFooterImage: file(absolutePath: {regex: "/\\/images\\/weddings\\/weddings_footer\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
  }
`