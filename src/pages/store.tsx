import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { FluidObject } from 'gatsby-image'
import styled from '@emotion/styled';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Layout from '../components/layout';
import { ProductHeader, fonts } from '../design-system';
import { sizing } from '../utils';
import { Store } from '../sharedTypes';

type FluidImage = { childImageSharp: {fluid: FluidObject} };

type StorePageQueryProps = {
  underlineImage: FluidImage;
  storeHeaderImage: FluidImage;
  storeMapImage: FluidImage;
  allContentfulStore: {
    nodes: Store[];
  };
}

type StorePageProps = PageProps<StorePageQueryProps>;

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p>{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => {

      return <img src={node.data.target.fields.file['en-US'].url} width={node.data.target.fields.file['en-US'].details.image.width} height={node.data.target.fields.file['en-US'].details.image.height} />
    },
  },
}

const StorePage = ({data}: StorePageProps) => {

  const hoursData = data.allContentfulStore.nodes[0].childContentfulStoreHoursRichTextNode;

  return (
    <Layout>
      <ProductHeader backgroundImage={data.storeHeaderImage} underlineImage={data.underlineImage} productName="Store" isFullWidth/>
       <Content>
         <HoursContainer>
            <Title>Hours</Title>
            <Hours>
              {hoursData && documentToReactComponents(hoursData.json, options) }
            </Hours>
         </HoursContainer>
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

const HoursContainer = styled.div`
  margin: ${sizing(100)} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.p`
  ${fonts.cursiveText['1000']};
`;

const Hours = styled.p`
  ${fonts.regularText['600']};
`;

export default StorePage;

export const query = graphql`
  query StorePageQuery {
    underlineImage: file(absolutePath: {regex: "/\\/images\\/fancy_underline\\.png/"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    storeHeaderImage: file(absolutePath: {regex: "/\\/images\\/store\\/store_header\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    storeMapImage: file(absolutePath: {regex: "/\\/images\\/store\\/spb_location_map\\.jpg/"}) {
      childImageSharp {
        fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
        }
      }
    }
    allContentfulStore(filter: {name: {eq: "Store"}}) {
      nodes {
        childContentfulStoreAddressRichTextNode {
          json
        }
        childContentfulStoreHoursRichTextNode {
          json
        }
      }
    }
  }
`;
