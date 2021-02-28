import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import styled from '@emotion/styled';

import Layout from '../components/layout';
import SeasonalProductCarousel from '../components/SeasonalProductCarousel';
import ProductsList from '../components/ProductsList';

import { fonts, OrderFooter, ProductHeader } from '../design-system';
import { CircleImageContainer } from '../design-system/ProductHeader';
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
      <ProductHeaderContainer>
        <ProductHeader productName="Cake Pops" backgroundImage={data.cakePopsHeaderImage} underlineImage={data.underlineImage} />
      </ProductHeaderContainer>
      <PricesContainer>
        <Price>$3 Each | $34 per Dozen</Price>
      </PricesContainer>
      <SeasonalProductCarousel products={seasonalFlavors} />
      <ProductsList title="Classic Collection Flavors" products={classicCollectionFlavors} />
      <ProductsList title="Rotating Flavors" products={everyDayFlavors} />
      <OrderFooter backgroundImage={data.cakePopsFooterImage} />
    </Layout>
  )
};

export default CakePopsPage;

const ProductHeaderContainer = styled.div`
  ${CircleImageContainer} {
    @media all and (min-width: 768px) {
      margin-top: ${sizing(35)};
      width: ${sizing(550)};
      height: auto;
    }
  }
`;

const PricesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.solids.BABY_BLUE};
  padding: ${sizing(20)} 0;
  margin: ${sizing(20)} 0;
  @media all and (min-width: 768px) {
    padding: ${sizing(40)} 0;
    margin: ${sizing(50)} 0;
  }
`;

const Price = styled.p`
  ${fonts.mediumText['100']};
  color: ${colors.solids.BROWN};
  margin-bottom: 0;
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.mediumText['500']};
  }
`;

export const query = graphql`
query CakePopsQuery {
  allContentfulCakePops(sort: {fields: createdAt}) {
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
  cakePopsHeaderImage: file(absolutePath: {regex: "/\\/images\\/cakePops\\/cakePopsHeaderImageNew\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline_brown\\.png/"}) {
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
