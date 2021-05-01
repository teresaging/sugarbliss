import React from 'react';
import styled from '@emotion/styled';
import { FluidObject } from 'gatsby-image';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import { ProductHeader, ProductList, OrderFooter } from '../design-system';
import { sizing } from '../utils';
import { OtherGoodies } from '../sharedTypes';
import { CircleImage } from '../design-system/ProductHeader';

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

const renderSection = ({title = '', flavors, price = 0, description = null}) => {
  return (
    <Section>
      <ProductList price={price} title={title} flavors={flavors} description={description} />
    </Section>
  )
}

const OtherGoodiesPage = ({data}: OtherGoodiesPageProps) => {

  const biscottiFlavors = data.allContentfulOtherGoodies.nodes.filter((item) => item.type === 'biscotti');
  const granolaBarsFlavors = data.allContentfulOtherGoodies.nodes.filter((item) => item.type === 'granola bar');
  const otherFlavors = data.allContentfulOtherGoodies.nodes.filter((item) => item.type === 'other');

  return (
    <Layout>
      <HeaderContainer>
        <ProductHeader backgroundImage={data.otherGoodiesHeaderImage} underlineImage={data.underlineImage} productName="Other Goodies" />
      </HeaderContainer>
      <Content>
        {Boolean(biscottiFlavors) && renderSection({title: 'Biscottis', flavors: biscottiFlavors, price: 4.75, description: '(flavors rotate)'})}
        {Boolean(granolaBarsFlavors) && renderSection({flavors: granolaBarsFlavors})}
        {Boolean(otherFlavors) && renderSection({flavors: otherFlavors})}
      </Content>
      <OrderFooter backgroundImage={data.otherGoodiesFooterImage} />
    </Layout>
  );
};

const HeaderContainer = styled.div`
  ${CircleImage} {
    width: 100%;
    height: 100%;
  }
`;

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
    otherGoodiesHeaderImage: file(absolutePath: {regex: "/\\/images\\/homepage-product-section\\/products_other\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 800) {
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