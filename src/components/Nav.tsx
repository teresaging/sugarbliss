import React from 'react';
import styled from '@emotion/styled';
import { NavLink } from '../design-system';

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
                url: '/cakes',
            },
            {
                name: 'Cookies',
                url: '/cookies',
            },
            {
                name: 'Bars & Brownies',
                url: '/bars-brownies',
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
            {
                name: 'Sweet Crepes',
                url: '/sweet-crepes',
            },
            {
                name: 'Other Goodies',
                url: '/other-goodies',
            },
        ],
    },
    {
        name: 'Services',
        url: '/',
        children: [
            {
                name: 'Party & Gifts',
                url: '/',
            },
            {
                name: 'Catering',
                url: '/catering',
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
        ],
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

const Header = () => {
    return (
      <NavWrapper>
          {NavData.map((link, idx) => {
              return <NavLink key={idx} link={link} idx={idx}/>
          })}
      </NavWrapper>
    )
};

const NavWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

export default Header;