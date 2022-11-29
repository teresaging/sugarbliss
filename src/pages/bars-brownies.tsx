import React from 'react';
import styled from '@emotion/styled';
import { FluidObject } from 'gatsby-image';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import { ProductHeader, ProductList, OrderFooter, fonts } from '../design-system';
import { colors, sizing } from '../utils';
import { BarsBrownies } from '../sharedTypes';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type BarsBrowniesQueryProps = {
  underlineImage: FluidImage;
  barsBrowniesHeaderImage: FluidImage;
  barsBrowniesFooterImage: FluidImage;
  allContentfulBarsAndBrownies: {
    nodes: BarsBrownies[];
  };
}

type BarsBrowniesPageProps = PageProps<BarsBrowniesQueryProps>;

const BarsBrowniesPage = ({data}: BarsBrowniesPageProps) => {
  const everydayFlavors = data.allContentfulBarsAndBrownies.nodes.filter((flavor) => flavor.type === 'everyday');
  const rotatingFlavors = data.allContentfulBarsAndBrownies.nodes.filter((flavor) => flavor.type === 'rotating');


  const renderSection = ({title = '', flavors}) => {
    return (
      <Section>
        <ProductList title={title} flavors={flavors} />
      </Section>
    )
  }


  return (
    <Layout>
      <ProductHeader productName="Bars & Brownies" backgroundImage={data.barsBrowniesHeaderImage} underlineImage={data.underlineImage}  />
      <PricesContainer>
        <Price>$4.75 Each | $52 per Dozen</Price>
      </PricesContainer>
      <Content>
        <Row>
          {Boolean(everydayFlavors) && renderSection({title: 'Everyday Flavors', flavors: everydayFlavors})}
          {Boolean(rotatingFlavors) && renderSection({title: 'Rotating Flavors', flavors: rotatingFlavors})}
        </Row>
      </Content>
      <OrderFooter backgroundImage={data.barsBrowniesFooterImage} />
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

export default BarsBrowniesPage;

export const query = graphql`
  query BarsBrowniesQuery {
    underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline_brown\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    barsBrowniesHeaderImage: file(absolutePath: {regex: "/\\/images\\/bars-brownies\\/barsBrowniesHeaderCircle\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    barsBrowniesFooterImage: file(absolutePath: {regex: "/\\/images\\/bars-brownies\\/barsBrowniesFooter\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    allContentfulBarsAndBrownies(sort: {fields: createdAt}) {
      nodes {
        name
        description
        type
      }
    }
  }
`
