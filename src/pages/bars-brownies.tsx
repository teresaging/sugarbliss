import React from 'react';
import styled from '@emotion/styled';
import { FluidObject } from 'gatsby-image';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import { ProductHeader, ProductList, OrderFooter } from '../design-system';
import { sizing } from '../utils';
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
  const products = data.allContentfulBarsAndBrownies.nodes;

  return (
    <Layout>
      <ProductHeader productName="Bars & Brownies" backgroundImage={data.barsBrowniesHeaderImage} underlineImage={data.underlineImage} isFullWidth  />
      <Content>
        <ProductList price={4} dozenPrice={44} title="Flavors" flavors={products} />
      </Content>
      <OrderFooter backgroundImage={data.barsBrowniesFooterImage} />
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

export default BarsBrowniesPage;

export const query = graphql`
  query BarsBrowniesQuery {
    underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    barsBrowniesHeaderImage: file(absolutePath: {regex: "/\\/images\\/bars-brownies\\/barsBrowniesHeader\\.jpg/"}) {
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
      }
    }
  }
`