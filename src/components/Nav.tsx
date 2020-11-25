import React, { useState } from 'react';
import { Link } from 'gatsby';
import { ChevronDown } from 'react-feather';
import styled from '@emotion/styled';
import { sizing } from '../utils';

const NavData = [
    {
        name: 'Home',
        url: '/',
    },
    {
        name: 'Products',
        url: '/',
        children: [
            {
                name: 'Cupcakes',
                url: '/cupcakes',
            },
            {
                name: 'Macarons',
                url: '/macarons',
            },
            {
                name: 'Cake Pops',
                url: '/cakepops',
            },
            {
                name: 'Cakes',
                url: '/',
            },
            {
                name: 'Morning Pastries',
                url: '/morning-pastries',
            },
            {
                name: 'Frosting Shots',
                url: '/frosting-shots',
            },
            {
                name: 'Pairings',
                url: '/',
            },
        ],
    },
    {
        name: 'Party & Gifts',
        url: '/',
    },
    {
        name: 'Catering',
        url: '/',
    },
    {
        name: 'Wedding',
        url: '/',
    },
    {
        name: 'Sweets Cart',
        url: '/',
    },
    {
        name: 'Events',
        url: '/',
    },
    {
        name: 'Press',
        url: '/',
    },
    {
        name: 'Store',
        url: '/',
    },
    {
        name: 'Faq',
        url: '/',
    },
    {
        name: 'About',
        url: '/',
    },
    {
        name: 'Order',
        url: '/order',
    }
]

type LinkData = {
    name: string;
    url: string;
}

type LinkDataWithChildren = {
    name: string;
    url: string;
    children: LinkData[];
}

const Header = () => {

    const [drowpdownVisibility, setDropdownVisibility] = useState(false);

    const renderLinkWithChildren = (link: LinkDataWithChildren, idx: number) => {
        return (
            <NavWithChildrenContainer onMouseEnter={() => setDropdownVisibility(true)} onMouseLeave={() => setDropdownVisibility(false)}>
                <NavLink number={idx} key={link.name} to={link.url}>
                    {link.name}
                    <DownArrow isOpened={drowpdownVisibility} size={16}/>
                </NavLink>
                <Dropdown isVisible={drowpdownVisibility}>
                    {link.children.map((child) => {
                        return <ChildNavLink key={child.name} to={child.url}>{child.name}</ChildNavLink>
                    })}
                </Dropdown>
            </NavWithChildrenContainer>
        )
    };

    return (
        <NavWrapper>
            {NavData.map((link , idx) => {
                return link.children ? renderLinkWithChildren(link, idx) : <NavLink number={idx} key={link.name} to={link.url}>{link.name}</NavLink>
            })}
        </NavWrapper>
    )
};

const NavWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

const NavLink = styled(Link)<{number: number}>`
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

const NavWithChildrenContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    top: -${sizing(1)};
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

export default Header;