import React, { useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import { Modal } from '@material-ui/core';

import Layout from '../components/layout'
import CupcakeDailyFlavors from '../components/CupcakeDailyFlavors';
import SeasonalProductCarousel from '../components/SeasonalProductCarousel';
import ProductsList from '../components/ProductsList';
import styled from '@emotion/styled';
import { fonts, Button, OrderFooter, ProductHeader } from '../design-system';
import { sizing, colors } from '../utils';
import { Cupcake, ProductPage } from '../sharedTypes';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type CupcakeQueryProps = {
  cupcakesHeaderImage: FluidImage;
  underlineImage: FluidImage;
  cupcakesFooterImage: FluidImage;
  allContentfulCupcake: {
    nodes: Cupcake[];
  };
  allContentfulProductPages: {
    nodes: ProductPage[];
  }
};

type CupcakeProps = PageProps<CupcakeQueryProps>;

const CupcakesPage = ({data}: CupcakeProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const seasonalCupcakes = data.allContentfulCupcake.nodes.filter((cupcake) => cupcake.isSeasonal);
  const dailyCupcakes = data.allContentfulCupcake.nodes.filter((cupcake) => cupcake.isDaily);
  const everyDayCupcakes = data.allContentfulCupcake.nodes.filter((cupcake) => cupcake.isEverydayFlavor);
  const flavorChartUrl = data.allContentfulProductPages?.nodes[0]?.flavorChart.file.url;

  const handleLeftHeaderContent = () => (
    <HeaderLeftContent>
        <IntroTitle>Regular Cupcakes:</IntroTitle>
      <div>
        <IntroText>Single: $3.95 | Dozen: $45</IntroText>
        <IntroText>Gluten Free, Single: $4.25 | Dozen: $48</IntroText>
        <IntroText>Vegan, Single: $4.50 | Dozen: $50</IntroText>
      </div>
    </HeaderLeftContent>
  );

  const handleRightHeaderContent = () => {
    return (
      <HeaderRightContent>
        <IntroTitle>Mini Cupcakes: </IntroTitle>
        <div>
          <IntroText>Single: $2 | Dozen: $22</IntroText>
          <IntroText>Gluten Free, Dozen: $25</IntroText>
          <IntroText>Vegan, Dozen: $28</IntroText>
        </div>
      </HeaderRightContent>
    );
  };

  return (
    <Layout>
      {/*<Modal*/}
      {/*  open={isModalOpen}*/}
      {/*  onClose={() => setIsModalOpen(false)}*/}
      {/*  aria-labelledby="modal-title"*/}
      {/*  aria-describedby="modal-description"*/}
      {/*>*/}
      {/*  <div>*/}
      {/*    <FlavorChartImage src={flavorChartUrl} />*/}
      {/*  </div>*/}
      {/*</Modal>*/}
      <ProductHeader
        productName="Cupcakes"
        backgroundImage={data.cupcakesHeaderImage}
        underlineImage={data.underlineImage}
        leftContent={handleLeftHeaderContent()}
        rightContent={handleRightHeaderContent()}
      />
      {/*<DailyMenuSection>*/}
      {/*  <Button onClick={() => setIsModalOpen(true)} text="View Daily Menu" size="XLARGE"/>*/}
      {/*</DailyMenuSection>*/}
      <SeasonalProductCarousel products={seasonalCupcakes} />
      <ProductsList products={everyDayCupcakes} />
      <CupcakeDailyFlavors cupcakes={dailyCupcakes}/>
      <OrderFooter backgroundImage={data.cupcakesFooterImage} />
    </Layout>
  )
}

const IntroTitle = styled.p`
  ${fonts.cursiveText['500']};
  @media all and (min-width: 768px) {
    ${fonts.cursiveText['800']};
  }
`;

const IntroText = styled.p`
  ${fonts.regularText['100']};
  @media all and (min-width: 768px) {
    ${fonts.regularText['400']};
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

const FlavorChartImage = styled.img`
  width: 100%;
  max-width: ${sizing(500)};
  height: auto;
`;

const HeaderLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media all and (min-width: 992px) {
    justify-content: center;
    align-items: flex-end;
    > div {
      margin-right: ${sizing(20)};
      justify-content: center;
      align-items: flex-end;
    }
  }
`;

const HeaderRightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media all and (min-width: 992px) {
    justify-content: center;
    align-items: flex-start;
    > div {
      margin-left: ${sizing(20)};
      justify-content: center;
      align-items: flex-start;
    }
  }
`;

export default CupcakesPage;

export const query = graphql`
query CupcakesQuery {
  allContentfulCupcake(sort: {fields: createdAt}) {
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
  allContentfulProductPages(filter: {name: {eq: "Cupcakes"}}) {
    nodes {
      name
      flavorChart {
        file {
          url
        }
      }
    }
  }
  cupcakesHeaderImage: file(absolutePath: {regex: "/\\/images\\/cupcakes\\/cupcakesHeaderCircleImage\\.jpg/"}) {
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
  cupcakesFooterImage: file(absolutePath: {regex: "/\\/images\\/cupcakes\\/cupcakesFooterImage\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
      }
    }
  }
}`