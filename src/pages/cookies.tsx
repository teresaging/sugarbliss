import React from 'react';
import styled from '@emotion/styled';
import { FluidObject } from 'gatsby-image';
import { graphql, PageProps } from 'gatsby';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Layout from '../components/layout';
import { fonts, ProductHeader, ProductList, OrderFooter } from '../design-system';
import { Cookies } from '../sharedTypes';
import { sizing, colors } from '../utils';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type CookiesPageQueryProps = {
  underlineImage: FluidImage;
  cookiesHeaderImage: FluidImage;
  cookiesFooterImage: FluidImage;
  allContentfulCookies: {
    nodes: Cookies[];
  };
}

type CookiesPageProps = PageProps<CookiesPageQueryProps>;

const renderSection = ({title, flavors}) => {
  return (
    <Section>
      <ProductList title={title} flavors={flavors} />
    </Section>
  )
}

const CookiesPage = ({data}: CookiesPageProps) => {

  const everydayFlavors = data.allContentfulCookies.nodes.filter((flavor) => flavor.type === 'everyday');
  const rotatingFlavors = data.allContentfulCookies.nodes.filter((flavor) => flavor.type === 'rotating');
  const seasonalFlavors = data.allContentfulCookies.nodes.filter((flavor) => flavor.type === 'seasonal');
  console.log('seasonalFlavors', seasonalFlavors);

  return (
    <Layout>
      <ProductHeader backgroundImage={data.cookiesHeaderImage} underlineImage={data.underlineImage} productName="Cookies" isFullWidth />
      <Content>
        {Boolean(everydayFlavors) && renderSection({title: 'Everyday Flavors', flavors: everydayFlavors})}
        {Boolean(rotatingFlavors) && renderSection({title: 'Rotating Flavors', flavors: rotatingFlavors})}
        {Boolean(seasonalFlavors) && renderSection({title: 'Seasonal Flavors', flavors: seasonalFlavors})}
      </Content>
      <OrderFooter backgroundImage={data.cookiesFooterImage} />
    </Layout>
  );
};

const Content = styled.div`
  margin: ${sizing(100)} auto ${sizing(75)} auto;
  width: 85%;
  @media all and (min-width: 992px) {
     width: 50%;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${sizing(80)}
`;

export default CookiesPage;

export const query = graphql`
  query CokoiesQuery {
    allContentfulCookies {
      nodes {
        name
        description
        type
        price
        dozenPrice
        customPrice
      }
    }
    underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    cookiesHeaderImage: file(absolutePath: {regex: "/\\/images\\/cookies\\/cookiesHeader\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    cookiesFooterImage: file(absolutePath: {regex: "/\\/images\\/cookies\\/cookiesFooter\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
  }
`