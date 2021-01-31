import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

import { fonts } from '../design-system';
import { sizing } from '../utils';
import { ChevronDown } from 'react-feather';

interface LinkData {
  name: string;
  url: string;
}

interface LinkDataWithChildren extends LinkData {
  children?: LinkData[];
}

type Props = {
  link: LinkDataWithChildren;
  idx?: number;
  isMobile?: boolean;
}

const NavLink = ({link, idx, isMobile}: Props) => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  if (isMobile) {
    if (link.children) {
      return (
        <>
          <MobileCategoryContainer onClick={() => setDropdownVisibility(!dropdownVisibility)}>
            <MobileLinkText>{link.name}</MobileLinkText>
            <DownArrow isOpened={dropdownVisibility} size={24}/>
          </MobileCategoryContainer>
          <MobileChildrenContainer>
            {dropdownVisibility && link.children.map((child, idx) => (
              <MobileChildLink key={idx} to={child.url}>
                {child.name}
              </MobileChildLink>
            ))}
          </MobileChildrenContainer>
        </>
      )
    }

    return (
      <MobileLinkContainer to={link.url}>
        {link.name}
      </MobileLinkContainer>
    )
  }

  if (Boolean(link.children)) {
    return (
      <LinkWithChildren onMouseEnter={() => setDropdownVisibility(true)} onMouseLeave={() => setDropdownVisibility(false)}>
        <DropdownContainer number={idx} key={link.name}>
          {link.name}
          <DownArrow isOpened={dropdownVisibility} size={16}/>
        </DropdownContainer>
        <Dropdown isVisible={dropdownVisibility}>
          {link.children.map((child) => {
            return <ChildNavLink key={child.name} to={child.url}>{child.name}</ChildNavLink>
          })}
        </Dropdown>
      </LinkWithChildren>
    )
  }

  return (
    <LinkContainer number={idx} key={link.name} to={link.url}>
      {link.name}
    </LinkContainer>
  )
};

const LinkWithChildren = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    top: -${sizing(1)};
`;

const DropdownContainer = styled.div<{number: number}>`
    text-transform: uppercase;
    text-decoration: none;
    position: relative;
    margin-right: ${sizing(15)};
    margin-left: ${sizing(15)};
    font-size: ${sizing(16)};
    padding-bottom: 3px;
    border-bottom: solid 2px transparent;
    cursor: default;
    
    &:after {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        background-size: 100%;
        background-repeat: no-repeat;
        right: -18px;
        top: 19%;
        border-radius: 10px;
        background-color: ${({number}) => number % 2 === 0 ? 'var(--main-light-blue)' : 'var(--main-med-blue)'};
    }
    
    &:hover {
        border-bottom: solid 2px var(--main-text-color);
    }
`;

const LinkContainer = styled(Link)<{number: number}>`
    text-transform: uppercase;
    text-decoration: none;
    position: relative;
    margin-right: ${sizing(15)};
    margin-left: ${sizing(15)};
    font-size: ${sizing(16)};
    padding-bottom: 3px;
    border-bottom: solid 2px transparent;
    
    &:after {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        background-size: 100%;
        background-repeat: no-repeat;
        right: -18px;
        top: 19%;
        border-radius: 10px;
        background-color: ${({number}) => number % 2 === 0 ? 'var(--main-light-blue)' : 'var(--main-med-blue)'};
    }
    
    &:hover {
        border-bottom: solid 2px var(--main-text-color);
    }
`;

const DownArrow = styled(ChevronDown)<{isOpened: boolean}>`
    position: relative;
    top: ${sizing(2)};
    margin-left: ${sizing(2)};
    transform: ${({isOpened}) => isOpened ? 'rotate(180deg)' : 'rotate(0deg)'}
`;

const Dropdown = styled.div<{isVisible: boolean}>`
    position: absolute;
    display: ${({isVisible}) => isVisible ? 'flex' : 'none'};
    top: ${sizing(25)};
    background-color: white;
    padding: ${sizing(5)} 0;
    flex-direction: column;
    z-index: 99;
`;

const ChildNavLink = styled(Link)`
    text-decoration: none;
    margin-bottom: ${sizing(5)};
    padding: ${sizing(4)} ${sizing(10)};
    &:hover, &:focus {
        color: white;
        background-color: var(--main-text-color);
        transition: 0.3s;
    }
`;

const MobileLinkContainer = styled(Link)`
  ${fonts.boldText['400']};
  margin: ${sizing(5)} 0;
`;

const MobileChildLink = styled(Link)`
  ${fonts.boldText['200']};
  margin: ${sizing(5)} 0;
`;

const MobileCategoryContainer = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${sizing(5)} 0;
`;

const MobileLinkText = styled.p`
  ${fonts.boldText['400']};
  margin-bottom: 0;
`;

const MobileChildrenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default NavLink;