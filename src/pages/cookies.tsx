import React from 'react';
import styled from '@emotion/styled';
import { FluidObject } from 'gatsby-image';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import { ProductHeader, ProductList, OrderFooter, fonts } from '../design-system';
import { Cookies } from '../sharedTypes';
import { colors, sizing } from '../utils';

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

const renderSection = ({title = '', flavors}) => {
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
      <PricesContainer>
        <Price>$3.25 Each | $36 per Dozen</Price>
      </PricesContainer>
      <Content>
        <Row>
          {Boolean(everydayFlavors) && renderSection({title: 'Everyday Flavors', flavors: everydayFlavors})}
          {Boolean(rotatingFlavors) && renderSection({title: 'Rotating Flavors', flavors: rotatingFlavors})}
        </Row>
        {Boolean(seasonalFlavors) && renderSection({flavors: seasonalFlavors})}
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
     width: 65%;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  @media all and (min-width: 991px) {
    flex-direction: row;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${sizing(20)};
  @media all and (min-width: 768px) {
    margin-bottom: ${sizing(80)}
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
  ${fonts.mediumText['200']};
  color: ${colors.solids.BROWN};
  margin-bottom: 0;
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.mediumText['500']};
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