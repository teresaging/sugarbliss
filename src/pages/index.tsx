import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import styled from '@emotion/styled';
import HomepageHero from '../components/HomepageHero';
import HomepageProducts from '../components/HomepageProducts';

import { sizing, colors } from '../utils';
import { Button, fonts } from '../design-system';

import { SlideTypes } from '../components/HomepageHero';

import Layout from '../components/layout'

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type IndexQueryProps = {
  allContentfulHomepageHero: {
    edges: SlideTypes[]
  };
  aboutBackgroundImage: FluidImage;
  productCupcakeImage: FluidImage;
  productCakePopImage: FluidImage;
  productMacaronImage: FluidImage;
  productCakeImage: FluidImage;
  productBreakfastCupcakesImage: FluidImage;
  productFrostingShotImage: FluidImage;
  productPairingsImage: FluidImage;
  homeOrderImage: FluidImage;
};
type IndexProps = PageProps<IndexQueryProps>

const IndexPage = ({data}: IndexProps) => {

  const productSectionData = [
    {
      name: 'Cupcakes',
      fluidImage: data.productCupcakeImage.childImageSharp.fluid,
      url: '/',
    },
    {
      name: 'CakePops',
      fluidImage: data.productCakePopImage.childImageSharp.fluid,
      url: '/cake-pops',
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
      name: 'Morning Pastries',
      fluidImage: data.productBreakfastCupcakesImage.childImageSharp.fluid,
      url: '/morning-pastries',
    },
    {
      name: 'Frosting Shots',
      fluidImage: data.productFrostingShotImage.childImageSharp.fluid,
      url: '/frosting-shots',
    },
    {
     name: 'Pairings',
      fluidImage: data.productPairingsImage.childImageSharp.fluid,
      url: '/',
    }
  ];

    return (
      <Layout>
        <HomepageHero slideData={data.allContentfulHomepageHero.edges} />
        <Intro backgroundImage={data.aboutBackgroundImage.childImageSharp.fluid.src}>
          <p>Sugar Bliss Cake Boutique bakes all cupcakes, cake pops, French macarons from scratch using only the highest quality, natural ingredients, such as European Cocoa, Nielsen Massey pure Madagascar Bourbon vanilla, and real fruits. Come visit our retail location in the Downtown Loop or call us to cater or deliver for your next business meeting, office party, birthday, wedding, or special event.</p>
        </Intro>
        <HomepageProducts products={productSectionData} />
        <OrderOnline>
          <OrderOnlineImage fluid={data.homeOrderImage.childImageSharp.fluid}/>
          <Button url="/" text="Order Online" size="XLARGE"/>
        </OrderOnline>
      </Layout>
    )
}
export default IndexPage;

const Intro = styled.div<{backgroundImage: string}>`
  background-color: ${colors.solids.BABY_PINK};
  background-image: ${({backgroundImage}) => `url('${backgroundImage}')`};
  background-size: 200%;
  background-position-x: center;
  background-repeat: no-repeat;
  height: ${sizing(400)};
  text-align: center;
  padding: ${sizing(40)} ${sizing(20)} 0 ${sizing(20)};
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
     ${fonts.regularText['500']};
     text-align: center;
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
  aboutBackgroundImage: file(absolutePath: {regex: "/\\/images\\/background-round\\.png/"}) {
    childImageSharp {
      fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid
      }
    }
  }
  productCupcakeImage: file(absolutePath: {regex: "/\\/images\\/homepage-product-section\\/products_cupcakes\\.jpg/"}) {
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
  productPairingsImage: file(absolutePath: {regex: "/\\/images\\/homepage-product-section\\/products_pairings\\.jpg/"}) {
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