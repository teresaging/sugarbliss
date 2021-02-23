import React from 'react';
import styled from '@emotion/styled';
import { FluidObject } from 'gatsby-image';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import { ProductHeader, ProductList, OrderFooter } from '../design-system';
import { Cookies } from '../sharedTypes';
import { sizing } from '../utils';

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

  return (
    <Layout>
      <ProductHeader backgroundImage={data.cookiesHeaderImage} underlineImage={data.underlineImage} productName="Cookies" />
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
  margin: ${sizing(30)} auto ${sizing(20)} auto;
  width: 85%;
  @media all and (min-width: 768px) {
    margin: ${sizing(100)} auto ${sizing(75)} auto;
  }
  @media all and (min-width: 992px) {
     width: 50%;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${sizing(20)};
  @media all and (min-width: 768px) {
    margin-bottom: ${sizing(80)}
  }
`;

export default CookiesPage;

export const query = graphql`
  query CookiesQuery {
    allContentfulCookies(sort: {fields: createdAt}) {
      nodes {
        name
        description
        type
        price
        dozenPrice
        customPrice
      }
    }
    underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline_brown\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    cookiesHeaderImage: file(absolutePath: {regex: "/\\/images\\/cookies\\/cookiesHeaderCircle\\.jpg/"}) {
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