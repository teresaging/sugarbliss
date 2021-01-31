import React from 'react';
import { fonts } from './Fonts';
import styled from '@emotion/styled';

import 'fontsource-sacramento';

import { colors, sizing } from '../utils';

type TabsInfo = {
  name: string;
  id: string;
};

type Props = {
  tabsInfo: TabsInfo[];
  activeTabId: string;
  onPress: Function;
}

const Tabs = ({tabsInfo = [], activeTabId, onPress}: Props) => {

  const handleTabSelection = (tabId) => {
    onPress(tabId);
  }

  return (
    <TabsContainer >
      {
        tabsInfo?.map((tab) => {
          return (
            <Tab key={tab.id} isActive={tab.id === activeTabId} onClick={() => handleTabSelection(tab.id)}>
              {tab.name}
            </Tab>
          )
        })
      }
    </TabsContainer>
  )
};

const TabsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`

const Tab = styled.div<{isActive: boolean}>`
    ${fonts.mediumText['200']};
    padding: ${sizing(5)} ${sizing(10)};
    border-bottom: ${({isActive}) => isActive ? 'black solid 1px' : 'transparent solid 1px'};
    color: ${({isActive}) => isActive ? colors.solids.BROWN : colors.solids.MAIN_MED_BLUE};
    cursor: pointer;
  @media all and (min-width: 768px) {
    ${fonts.mediumText['500']};
    padding: ${sizing(10)} ${sizing(20)};

  }

`

export default Tabs;