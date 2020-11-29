import React from 'react';
import styled from '@emotion/styled';
import { FluidObject } from 'gatsby-image';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import { ProductHeader, ProductList, OrderFooter } from '../design-system';
import { sizing } from '../utils';
import { OtherGoodies } from '../sharedTypes';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type OtherGoodiesQueryProps = {
  underlineImage: FluidImage;
  otherGoodiesHeaderImage: FluidImage;
  otherGoodiesFooterImage: FluidImage;
  allContentfulOtherGoodies: {
    nodes: OtherGoodies[];
  };
}

type OtherGoodiesPageProps = PageProps<OtherGoodiesQueryProps>;

const renderSection = ({title, flavors}) => {
  return (
    <Section>
      <ProductList title={title} flavors={flavors} />
    </Section>
  )
}

const OtherGoodiesPage = ({data}: OtherGoodiesPageProps) => {

  const biscottiFlavors = data.allContentfulOtherGoodies.nodes.filter((item) => item.type === 'biscotti');
  const granolaBarsFlavors = data.allContentfulOtherGoodies.nodes.filter((item) => item.type === 'granola bar');
  const otherFlavors = data.allContentfulOtherGoodies.nodes.filter((item) => item.type === 'other');

  return (
    <Layout>
      <ProductHeader backgroundImage={data.otherGoodiesHeaderImage} underlineImage={data.underlineImage} productName="Other Goodies" isFullWidth />
      <Content>
        {Boolean(biscottiFlavors) && renderSection({title: 'Biscotti', flavors: biscottiFlavors})}
        {Boolean(granolaBarsFlavors) && renderSection({title: 'Granola Bars', flavors: granolaBarsFlavors})}
        {Boolean(otherFlavors) && renderSection({title: 'Other', flavors: otherFlavors})}
      </Content>
      <OrderFooter backgroundImage={data.otherGoodiesFooterImage} />
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

export default OtherGoodiesPage;

export const query = graphql`
  query OtherGoodiesQuery {
    underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    otherGoodiesHeaderImage: file(absolutePath: {regex: "/\\/images\\/other-goodies\\/otherGoodiesHeader\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    otherGoodiesFooterImage: file(absolutePath: {regex: "/\\/images\\/other-goodies\\/otherGoodiesFooter\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    allContentfulOtherGoodies(sort: {fields: createdAt}) {
      nodes {
        name
        description
        type
        price
      }
    }
  }
`