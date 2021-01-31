import React from 'react';
import { graphql, PageProps } from 'gatsby';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';

import Layout from '../components/layout';
import { fonts } from '../design-system';
import { sizing } from '../utils';
import { About } from '../sharedTypes';

type AboutPageQueryProps = {
  allContentfulAbout: {
    nodes: About[];
  }
}

type AboutPageProps = PageProps<AboutPageQueryProps>;

const AboutPage = ({data}: AboutPageProps) => {

  const pageData = data.allContentfulAbout.nodes[0];

  return (
    <Layout>
      <Content>
        <TopContainer>
          <ImageContainer>
            <Image alt="Teresa Ging" src={pageData.teresaImage.file.url} />
          </ImageContainer>
          <Name>Teresa Ging</Name>
        </TopContainer>
        <BioContainer>
          <Bio>
            <ReactMarkdown>
              {pageData.about.childMarkdownRemark.rawMarkdownBody}
            </ReactMarkdown>
          </Bio>
        </BioContainer>
      </Content>
    </Layout>
  );
}

const Content = styled.div`
  margin: ${sizing(25)} auto ${sizing(75)} auto;
  width: 85%;
  @media all and (min-width: 992px) {
     width: 60%;
  }
`;

const ImageContainer = styled.div`
  margin: ${sizing(10)} 0 ${sizing(20)} 0;
  width: 60%;
  height: auto;
  border-radius: 50%;
  overflow: hidden;
  @media all and (min-width: 768px) {
    margin: ${sizing(35)} 0 ${sizing(50)} 0;
  }
    @media all and (min-width: 992px) {
     width: 100%;
     max-width: ${sizing(500)};
    max-height: ${sizing(500)};
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 0;
`;

const Name = styled.p`
  ${fonts.cursiveText['800']};
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.cursiveText['1200']};
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BioContainer = styled.div`
  margin-top: ${sizing(20)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media all and (min-width: 768px) {
    margin-top: ${sizing(50)};
  }
`;

const Bio = styled.p`
  ${fonts.regularText['200']};
  text-align: center;
  @media all and (min-width: 768px) {
    ${fonts.regularText['500']};
    tex-talign: left;
  }
`;

export default AboutPage;

export const query = graphql`
  query AboutPageQuery {
    allContentfulAbout(filter: {name: {eq: "About Page"}}) {
      nodes {
        teresaImage {
          file {
            url
          }
        }
        about {
          childMarkdownRemark {
            rawMarkdownBody
          }
        }
      }
    }
  }
`;