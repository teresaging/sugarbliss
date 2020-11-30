import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

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
  idx: number;
}

const NavLink = ({link, idx}: Props) => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  if (Boolean(link.children)) {
    return (
      <LinkWithChildren onMouseEnter={() => setDropdownVisibility(true)} onMouseLeave={() => setDropdownVisibility(false)}>
        <LinkContainer number={idx} key={link.name} to={link.url}>
          {link.name}
          <DownArrow isOpened={dropdownVisibility} size={16}/>
        </LinkContainer>
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

export default NavLink;