import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image'
import styled from '@emotion/styled';

import Layout from '../components/layout';
import { ProductHeader } from '../design-system';
import { sizing } from '../utils';
import { FAQ } from '../sharedTypes';
import FAQItem from '../components/FAQItem';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type FAQPageQueryProps = {
  underlineImage: FluidImage;
  allContentfulFaqPage: {
    nodes: {
      content: FAQ[]
    };
  };
}

type FAQPageProps = PageProps<FAQPageQueryProps>;

const FAQPage = ({data}: FAQPageProps) => {
  const faqData = data.allContentfulFaqPage.nodes[0].content;

  return (
    <Layout>
      <ProductHeader underlineImage={data.underlineImage} productName="FAQ" />
      <Content>
        {faqData && faqData.map((data, idx) => <FAQItem key={idx} question={data.question} answer={data.answer.answer} />)}
      </Content>
    </Layout>
  );

}

const Content = styled.div`
  margin: ${sizing(100)} auto ${sizing(75)} auto;
  width: 85%;
  @media all and (min-width: 992px) {
     width: 60%;
  }
`;

export default FAQPage;

export const query = graphql`
  query FAQPageQuery {
    underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline_brown\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    allContentfulFaqPage {
      nodes {
        content {
          question
          answer {
            answer
          }
        }
      }
    }
  }
`;