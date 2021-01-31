import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image';

import Layout from '../components/layout'
import CupcakeDailyFlavors from '../components/CupcakeDailyFlavors';
import SeasonalProductCarousel from '../components/SeasonalProductCarousel';
import ProductsList from '../components/ProductsList';
import styled from '@emotion/styled';
import { fonts, Button, OrderFooter, ProductHeader } from '../design-system';
import { sizing, colors } from '../utils';
import { Cupcake } from '../sharedTypes';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type CupcakeQueryProps = {
  cupcakesHeaderImage: FluidImage;
  underlineImage: FluidImage;
  cupcakesFooterImage: FluidImage;
  allContentfulCupcake: {
    nodes: Cupcake[];
  };
};

type CupcakeProps = PageProps<CupcakeQueryProps>;

const CupcakesPage = ({data}: CupcakeProps) => {

  const seasonalCupcakes = data.allContentfulCupcake.nodes.filter((cupcake) => cupcake.isSeasonal);
  const dailyCupcakes = data.allContentfulCupcake.nodes.filter((cupcake) => cupcake.isDaily);
  const everyDayCupcakes = data.allContentfulCupcake.nodes.filter((cupcake) => cupcake.isEverydayFlavor);

  return (
    <Layout>
      <ProductHeader productName="Cupcakes" backgroundImage={data.cupcakesHeaderImage} underlineImage={data.underlineImage} isFullWidth />
      <Intro>
        <div>
          <IntroTitle>Regular Cupcakes:</IntroTitle>
          <IntroText>Single: $3.95 | Dozen: $45</IntroText>
          <IntroText>Gluten Free, Single: $4.25 | Dozen: $48</IntroText>
          <IntroText>Vegan, Single: $4.50 | Dozen: $50</IntroText>
        </div>
        <div>
          <IntroTitle>Mini Cupcakes: </IntroTitle>
          <IntroText>Single: $2 | Dozen: $22</IntroText>
          <IntroText>Gluten Free, Dozen: $25</IntroText>
          <IntroText>Vegan, Dozen: $28</IntroText>
        </div>
      </Intro>
      {/*<DailyMenuSection>*/}
      {/*  <Button url="" text="View Daily Menu" size="XLARGE"/>*/}
      {/*</DailyMenuSection>*/}
      <SeasonalProductCarousel products={seasonalCupcakes} />
      <ProductsList products={everyDayCupcakes} />
      <CupcakeDailyFlavors cupcakes={dailyCupcakes}/>
      <OrderFooter backgroundImage={data.cupcakesFooterImage} />
    </Layout>
  )
}

const Intro = styled.div`
  text-align: center;
  color: ${colors.solids.BROWN};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${sizing(10)} ${sizing(10)};
  @media all and (min-width: 768px) {
    &> div{
      margin: 0 ${sizing(50)};
    }
    flex-direction: row;
    padding: ${sizing(75)} ${sizing(50)} ${sizing(75)} ${sizing(50)};
  }
`;

const IntroTitle = styled.p`
  ${fonts.boldText['200']};
  @media all and (min-width: 768px) {
    ${fonts.boldText['400']};
  }
`;

const IntroText = styled.p`
  ${fonts.regularText['100']};
  @media all and (min-width: 768px) {
    ${fonts.boldText['400']};
  }
`;

const DailyMenuSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.solids.BABY_BLUE};
  padding: ${sizing(20)} 0;
  margin: ${sizing(10)} 0;
  @media all and (min-width: 768px) {
    padding: ${sizing(40)} 0;
    margin: ${sizing(50)} 0;
  }
`;

export default CupcakesPage;

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
      isDaily
      weekDaysAvailable
      seasonalDatesAvailable {
        name
        startDate
        endDate
      }
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