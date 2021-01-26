import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import styled from '@emotion/styled';

import Layout from '../components/layout';
import SeasonalProductCarousel from '../components/SeasonalProductCarousel';
import ProductsList from '../components/ProductsList';

import { fonts, OrderFooter, ProductHeader } from '../design-system';
import { sizing, colors } from '../utils';
import { CakePop } from '../sharedTypes';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type CakePopsQueryProps = {
  cakePopsHeaderImage: FluidImage;
  underlineImage: FluidImage;
  cakePopsFooterImage: FluidImage;
  allContentfulCakePops: {
    nodes: CakePop[];
  };
};

type CakePopsProps = PageProps<CakePopsQueryProps>;

const CakePopsPage = ({data}: CakePopsProps) => {

  const seasonalFlavors = data.allContentfulCakePops.nodes.filter((cakePop) => cakePop.isSeasonal);
  const classicCollectionFlavors = data.allContentfulCakePops.nodes.filter((cakePop) => cakePop.isClassicCollection);
  const everyDayFlavors = data.allContentfulCakePops.nodes.filter((cakePop) => !cakePop.isSeasonal && !cakePop.isClassicCollection);

  return (
    <Layout>
      <ProductHeader productName="Cake Pops" backgroundImage={data.cakePopsHeaderImage} underlineImage={data.underlineImage} isFullWidth />
      <PricesContainer>
        <Price>$3 Each | $34 Dozen</Price>
      </PricesContainer>
      <SeasonalProductCarousel products={seasonalFlavors} />
      <ProductsList title="Classic Collection Flavors" products={classicCollectionFlavors} />
      <ProductsList title="Assorted Rotating Flavors" products={everyDayFlavors} />
      <OrderFooter backgroundImage={data.cakePopsFooterImage} />
    </Layout>
  )
};

export default CakePopsPage;

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
query CakePopsQuery {
  allContentfulCakePops {
    nodes {
      name
      description
      image {
        file {
          url
        }
      }
      isClassicCollection
      isSeasonal
      seasonalDatesAvailable {
        name
        startDate
        endDate
      }
    }
  }
  cakePopsHeaderImage: file(absolutePath: {regex: "/\\/images\\/cakePops\\/cakePopsHeaderImage\\.jpg/"}) {
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
  cakePopsFooterImage: file(absolutePath: {regex: "/\\/images\\/cakePops\\/cakePopsFooterImage\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
      }
    }
  }
}`
