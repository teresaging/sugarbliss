import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import styled from '@emotion/styled';

import Layout from '../components/layout';
import { fonts, Button, OrderFooter, ProductHeader } from '../design-system';
import { sizing, colors } from '../utils';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type MacaronsQueryProps = {
  macaronsHeaderImage: FluidImage;
  underlineImage: FluidImage;
  cupcakesFooterImage: FluidImage;
};

const MacaronsPage = ({data}: MacaronsQueryProps) => {


  return (
    <Layout>
      <ProductHeader productName="Macarons" />
    </Layout>
  );

};

export const query = graphql`
query CupcakesQuery {
  allContentfulCupcake {
    nodes {
      name
      description
      image {
        file {
          url
        }
      }
      isEverydayFlavor
      isSeasonal
      monthAvailable
      isDaily
      dayAvailable
      seasonalDaysAvailable
    }
  }
  cupcakesHeaderImage: file(absolutePath: {regex: "/\\/images\\/cupcakes\\/cupcakesHeaderImage\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline\\.png/"}) {
    childImageSharp {
      fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  cupcakesFooterImage: file(absolutePath: {regex: "/\\/images\\/cupcakes\\/cupcakesFooterImage\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
      }
    }
  }
}`
