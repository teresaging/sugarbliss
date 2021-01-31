import React from 'react';
import styled from '@emotion/styled';
import { FluidObject } from 'gatsby-image';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import { ProductHeader, ProductList, OrderFooter, fonts } from '../design-system';
import { sizing } from '../utils';
import { SweetCrepes } from '../sharedTypes';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type SweetCrepesQueryProps = {
  underlineImage: FluidImage;
  sweetCrepesHeaderImage: FluidImage;
  sweetCrepesFooterImage: FluidImage;
  allContentfulSweetCrepes: {
    nodes: SweetCrepes[];
  };
}

type SweetCrepesPageProps = PageProps<SweetCrepesQueryProps>;

const SweetCrepesPage = ({data}: SweetCrepesPageProps) => {

  const crepes = data.allContentfulSweetCrepes.nodes.filter((item) => item.isTopping === false);
  const toppings = data.allContentfulSweetCrepes.nodes.filter((item) => item.isTopping === true);

  return(
    <Layout>
      <ProductHeader backgroundImage={data.sweetCrepesHeaderImage} underlineImage={data.underlineImage} productName="Sweet Crepes" isFullWidth />
      <Content>
        <Section>
          <ProductList title="Flavors" flavors={crepes} />
        </Section>
        <ToppingsSection>
          {toppings.map((topping, idx) => (
            <Topping key={idx}>
              <Name>{topping.name}</Name>
              {topping.flavors.map((flavor, idx) => (
                <ToppingList key={idx}>{flavor}</ToppingList>
              ))}
            </Topping>
          ))}
        </ToppingsSection>
      </Content>
      <OrderFooter backgroundImage={data.sweetCrepesFooterImage} />
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
  margin-bottom: ${sizing(20)};
  @media all and (min-width: 768px) {
    margin-bottom: ${sizing(80)};
  }
`;

const ToppingsSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media all and (min-width: 768px) {
    margin-bottom: ${sizing(80)};
    flex-direction: row;
    align-items: flex-start;
  }
`;

const Topping = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Name = styled.p`
  ${fonts.boldText['200']};
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.boldText['400']};
  }
`;

const ToppingList = styled.p`
  ${fonts.regularText['100']};
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.regularText['300']};
  }
`;

export default SweetCrepesPage;

export const query = graphql`
  query SweetCrepesQuery {
    underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    sweetCrepesHeaderImage: file(absolutePath: {regex: "/\\/images\\/sweet-crepes\\/sweetCrepesHeader\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    sweetCrepesFooterImage: file(absolutePath: {regex: "/\\/images\\/sweet-crepes\\/sweetCrepesFooter\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    allContentfulSweetCrepes(sort: {fields: createdAt}) {
      nodes {
        name
        description
        price
        flavors
        isTopping
      }
    }
  }
`
