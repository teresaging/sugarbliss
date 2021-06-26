import React, { useState } from 'react';
import { PartyAndGiftsContent } from '../sharedTypes';
import { Tabs } from '../design-system';
import ReactMarkdown from 'react-markdown';
import styled from '@emotion/styled';
import { sizing } from '../utils';

type Props = {
  tabsContent: PartyAndGiftsContent[];
};

const PartyGiftsSectionTabs = ({tabsContent}: Props) => {
  const [activeTabId, setActiveTabId] = useState(tabsContent[0]?.name);
  const tabsData = tabsContent.map((tab) => {
    return {
      name: tab.name,
      id: tab.name,
    }
  });

  const handleTabPress = (activeTabId) => {
    setActiveTabId(activeTabId);
  }

  const selectedContentData = tabsContent.filter((tab) => tab.name === activeTabId)[0];

  return (
    <>
      <Tabs activeTabId={activeTabId} tabsInfo={tabsData} onPress={handleTabPress}/>
      <ContentContainer>
        {selectedContentData.image && (
          <ImageContainer>
            <CircleImage src={selectedContentData.image.file.url} />
          </ImageContainer>
        )}
        <div>
          <ReactMarkdown>
            {selectedContentData.description?.childMarkdownRemark?.rawMarkdownBody}
          </ReactMarkdown>
        </div>
      </ContentContainer>
    </>
  );
};

const ContentContainer = styled.div`
  margin: ${sizing(20)} 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  margin-right: ${sizing(10)};
  min-width: ${sizing(400)};
`;

const CircleImage = styled.img`
  border-radius: 50%;
  height: auto;
  width: 90%;
  max-width: ${sizing(300)};
  margin-bottom: ${sizing(15)};
  @media all and (min-width: 768px) {
    margin-bottom: 0;
    width: 100%;
  }
`;

export default PartyGiftsSectionTabs;