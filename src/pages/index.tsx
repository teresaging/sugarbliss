import React, { useEffect, useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import styled from '@emotion/styled';
import HomepageHero from '../components/HomepageHero';
import HomepageProducts from '../components/HomepageProducts';

import { sizing, colors } from '../utils';
import { Button, fonts } from '../design-system';
import { HomePageContent } from '../sharedTypes';

import { SlideTypes } from '../components/HomepageHero';

import Layout from '../components/layout'

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type IndexQueryProps = {
  allContentfulHomepageHero: {
    edges: SlideTypes[]
  };
  allContentfulHomePage: {
    nodes: HomePageContent[]
  };
  aboutBackgroundImage: FluidImage;
  productCupcakeImage: FluidImage;
  productCakePopImage: FluidImage;
  productMacaronImage: FluidImage;
  productCakeImage: FluidImage;
  productBreakfastCupcakesImage: FluidImage;
  productFrostingShotImage: FluidImage;
  productPairingsImage: FluidImage;
  productCookiesImage: FluidImage;
  productBarsAndBrowniesImage: FluidImage;
  productCrepesImage: FluidImage;
  productOtherImage: FluidImage;
  homeOrderImage: FluidImage;
};
type IndexProps = PageProps<IndexQueryProps>

const IndexPage = ({data}: IndexProps) => {

  const productSectionData = [
    {
      name: 'Cupcakes',
      fluidImage: data.productCupcakeImage.childImageSharp.fluid,
      url: '/cupcakes',
    },
    {
      name: 'CakePops',
      fluidImage: data.productCakePopImage.childImageSharp.fluid,
      url: '/cakepops',
    },
    {
      name: 'Macarons',
      fluidImage: data.productMacaronImage.childImageSharp.fluid,
      url: '/macarons',
    },
    {
      name: 'Cakes',
      fluidImage: data.productCakeImage.childImageSharp.fluid,
      url: '/cakes',
    },
    {
      name: 'Cookies',
      fluidImage: data.productCookiesImage.childImageSharp.fluid,
      url: '/cookies',
    },
    {
      name: 'Bars & Brownies',
      fluidImage: data.productBarsAndBrowniesImage.childImageSharp.fluid,
      url: '/bars-brownies',
    },
    // {
    //   name: 'Sweet Crepes',
    //   fluidImage: data.productCrepesImage.childImageSharp.fluid,
    //   url: '/sweet-crepes',
    // },
    {
      name: 'Other Goodies',
      fluidImage: data.productOtherImage.childImageSharp.fluid,
      url: '/other-goodies',
    },
    {
      name: 'Frosting Shots',
      fluidImage: data.productFrostingShotImage.childImageSharp.fluid,
      url: '/frosting-shots',
    },
  ];

  const [width, setWidth] = useState<number>(2000);

  const handleWindowSizeChange = () => {
    setWidth(window?.innerWidth);
  }
  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile: boolean = (width <= 1000);

    return (
      <Layout>
        <HomepageHero isMobile={isMobile} slideData={data.allContentfulHomepageHero.edges} />
        <Intro backgroundImage={data.aboutBackgroundImage.childImageSharp.fluid.src}>
          <p>{data?.allContentfulHomePage?.nodes[0]?.description?.internal?.content}</p>
        </Intro>
        <HomepageProducts isMobile={isMobile} products={productSectionData} />
        <OrderOnline>
          <OrderOnlineImage fluid={data.homeOrderImage.childImageSharp.fluid}/>
          <Button url="/order" text="Order Online" size={isMobile ? 'SMALL' : 'XLARGE'} />
        </OrderOnline>
      </Layout>
    )
}
export default IndexPage;

const Intro = styled.div<{backgroundImage: string}>`
  background-color: ${colors.solids.BABY_PINK};
  background-size: 200%;
  background-position-x: center;
  background-repeat: no-repeat;
  text-align: center;
  padding: ${sizing(18)} ${sizing(10)};
  @media all and (min-width: 992px) {
    padding: ${sizing(40)} ${sizing(20)} 0 ${sizing(20)};
    height: ${sizing(400)};
    background-image: ${({backgroundImage}) => `url('${backgroundImage}')`};
  }
  @media all and (min-width: 475px) {
    background-size: 140%;
  }
  @media all and (min-width: 600px) {
    background-size: 100%;
  }
  @media all and (min-width: 992px) {
    padding: ${sizing(40)} ${sizing(250)} 0 ${sizing(250)};
    background-position-y: -130px;
  }
  @media all and (min-width: 1200px) {
    background-position-y: -180px;
  }
  @media all and (min-width: 1381px) {
    background-position-y: -250px;
    padding-top: ${sizing(70)};
  }
  @media all and (min-width: 1540px) {
    background-position-y: -340px;
  }
  @media all and (min-width: 1760px) {
    background-position-y: -440px;
  }
  p {
     ${fonts.regularText['200']};
     text-align: center;
    @media all and (min-width: 992px) {
      ${fonts.regularText['500']};
    }
  }
`;

const OrderOnline = styled.div`
  width: 100%;
  height: ${sizing(200)};
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  @media all and (min-width: 768px) {
    height: ${sizing(300)};
  }
  
  a {
    position: absolute;
  }
`;

const OrderOnlineImage = styled(Img)`
  width: 100%;
  min-height: 100%;
  height: auto;
`;

export const query = graphql`
query HomeQuery {
   allContentfulHomepageHero(sort: {fields: position}) {
    edges {
      node {
        position
        textPosition
        buttonLink
        backgroundImagePosition
        backgroundImage {
          file {
            url
          }
        }
        buttonText
        childContentfulHomepageHeroTextRichTextNode {
          json
        }
        pdf {
          file {
            url
          }
        }
      }
    }
  }
  allContentfulHomePage(limit: 1) {
    nodes {
      description {
        internal {
          content
        }
      }
    }
  }
  aboutBackgroundImage: file(absolutePath: {regex: "/\\/images\\/background-round\\.png/"}) {
    childImageSharp {
      fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  productCupcakeImage: file(absolutePath: {regex: "/\\/images\\/homepage-product-section\\/products_cupcakes_2\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  productCakePopImage: file(absolutePath: {regex: "/\\/images\\/homepage-product-section\\/products_cakepops\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  productMacaronImage: file(absolutePath: {regex: "/\\/images\\/homepage-product-section\\/products_macarons\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  productCakeImage: file(absolutePath: {regex: "/\\/images\\/homepage-product-section\\/products_cakes\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  productBreakfastCupcakesImage: file(absolutePath: {regex: "/\\/images\\/homepage-product-section\\/products_breakfastcupcakes\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  productFrostingShotImage: file(absolutePath: {regex: "/\\/images\\/homepage-product-section\\/products_frostingshot\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  productCookiesImage: file(absolutePath: {regex: "/\\/images\\/homepage-product-section\\/products_cookies\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  productBarsAndBrowniesImage: file(absolutePath: {regex: "/\\/images\\/homepage-product-section\\/products_barsandbrownies\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  productCrepesImage: file(absolutePath: {regex: "/\\/images\\/homepage-product-section\\/products_crepes\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  productOtherImage: file(absolutePath: {regex: "/\\/images\\/homepage-product-section\\/products_other\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  homeOrderImage: file(absolutePath: {regex: "/\\/images\\/home_order_background\\.jpg/"}) {
    childImageSharp {
      fluid(maxWidth: 2000) {
            ...GatsbyImageSharpFluid
      }
    }
  }
}`
