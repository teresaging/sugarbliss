import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { PartyAndGifts } from '../sharedTypes';

import styled from '@emotion/styled';

import Layout from '../components/layout';
import { ProductHeader, fonts } from '../design-system';
import { sizing } from '../utils';
import PartyGiftsSectionTabs from '../components/PartyGiftsSectionTabs';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type PartyGiftsPageQueryProps = {
  underlineImage: FluidImage;
  allContentfulPartyAndGiftsSection: {
    nodes: PartyAndGifts[];
  };
}

type PartyGiftsPageProps = PageProps<PartyGiftsPageQueryProps>;

const renderSection = (sectionData) => {
  if (sectionData.title === 'Header') {
    return (
      <SectionContainer>
        <HeaderImagesContainer>
          {sectionData.content?.map((data) => (
            <CircleImage key={data.title} src={data.image.file.url} />
          ))}
        </HeaderImagesContainer>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionHeader>{sectionData.title}</SectionHeader>
      {sectionData.content && (
        <PartyGiftsSectionTabs tabsContent={sectionData.content}/>
      )}
    </SectionContainer>
  );
}

const PartyGiftsPage = ({data}: PartyGiftsPageProps) => {
  const contentData = data.allContentfulPartyAndGiftsSection.nodes.sort((a, b) => a.order - b.order);

  return (
    <Layout>
      <ProductHeader underlineImage={data.underlineImage} productName="Party & Gifts"/>
      <Content>
        {contentData.map(renderSection)}
      </Content>
    </Layout>
  );
};

export default PartyGiftsPage;

const Content = styled.div`
  margin: ${sizing(100)} auto ${sizing(75)} auto;
  width: 85%;
  @media all and (min-width: 992px) {
     width: 60%;
  }
`;

const SectionHeader = styled.h3`
  ${fonts.cursiveText['1000']};
  text-align: center;
`;

const CircleImage = styled.img`
  border-radius: 50%;
  height: auto;
  width: 90%;
  max-width: ${sizing(300)};
  margin-bottom: ${sizing(15)};
  @media all and (min-width: 768px) {
    margin-bottom: ${sizing(35)};
  }
`;

const HeaderImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  
  ${CircleImage} {
    margin: 0 ${sizing(20)};
  }
`;

const SectionContainer = styled.div`
  margin: ${sizing(75)} 0;
`;

// 1. header 2. cupcakes 3. Cake Pops

export const query = graphql`
  query PartyGiftsPageQuery {
    underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline_brown\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    allContentfulPartyAndGiftsSection {
      nodes {
        order
        title
        content {
          name
          image {
            file {
              url
            }
          }
          description {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
        }
      }
    }
  }
`;