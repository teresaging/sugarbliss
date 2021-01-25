import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import styled from '@emotion/styled';

import Layout from '../components/layout';
import SeasonalProductCarousel from '../components/SeasonalProductCarousel';
import ProductsList from '../components/ProductsList';

import { fonts, OrderFooter, ProductHeader } from '../design-system';
import { sizing, colors } from '../utils';
import { Macaron } from '../sharedTypes';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type MacaronsQueryProps = {
  macaronsHeaderImage: FluidImage;
  underlineImage: FluidImage;
  macaronsFooterImage: FluidImage;
  allContentfulMacaron: {
    nodes: Macaron[];
  };
};

type MacaronsProps = PageProps<MacaronsQueryProps>;

const MacaronsPage = ({data}: MacaronsProps) => {

  const seasonalMacarons = data.allContentfulMacaron.nodes.filter((macaron) => macaron.isSeasonalFlavor);
  const everyDayFlavors = data.allContentfulMacaron.nodes.filter((macaron) => macaron.isSeasonalFlavor === false);

  return (
    <Layout>
      <ProductHeader productName="Macarons" backgroundImage={data.macaronsHeaderImage} underlineImage={data.underlineImage} isFullWidth />
      <PricesContainer>
        <Price>$2.50 Each | Box of 6: $15 | Box of 12: $28</Price>
      </PricesContainer>
      <SeasonalProductCarousel products={seasonalMacarons} />
      <ProductsList products={everyDayFlavors} />
      <OrderFooter backgroundImage={data.macaronsFooterImage} />
    </Layout>
  )
};

export default MacaronsPage;

const PricesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.solids.BABY_BLUE};
  padding: ${sizing(40)} 0;
  margin: ${sizing(50)} 0;
`;

const Price = styled.p`
  ${fonts.mediumText['500']};
  color: ${colors.solids.BROWN};
  margin-bottom: 0;
  text-align: center;
`;

export const query = graphql`
query MacaronsQuery {
  allContentfulMacaron {
    nodes {
      name
      description
      image {
        file {
          url
        }
      }
      isSeasonalFlavor
      seasonalDatesAvailable {
        name
        startDate
        endDate
      }
    }
  }
  macaronsHeaderImage: file(absolutePath: {regex: "/\\/images\\/macarons\\/macaronsHeaderImage\\.jpg/"}) {
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
  macaronsFooterImage: file(absolutePath: {regex: "/\\/images\\/macarons\\/macaronsFooterImage\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
      }
    }
  }
}`
