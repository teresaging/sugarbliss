import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Menu } from 'react-feather';

import { NavLink } from '../design-system';

export const NavData = [
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
            // {
            //     name: 'Sweet Crepes',
            //     url: '/sweet-crepes',
            // },
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
                url: '/party-gifts',
            },
            {
                name: 'Catering',
                url: '/catering',
            },
            {
                name: 'Weddings',
                url: '/weddings',
            },
            // {
            //     name: 'Sweets Cart',
            //     url: '/',
            // },
        ],
    },
    {
        name: 'Press',
        url: '/press',
    },
    {
        name: 'Store',
        url: '/store',
    },
    {
        name: 'Faq',
        url: '/faq',
    },
    {
        name: 'About',
        url: '/about',
    },
    {
        name: 'Order',
        url: '/order',
    }
]

type Props = {
    handleToggleMobileNav: Function;
}

const Header = ({handleToggleMobileNav}: Props) => {

    const [width, setWidth] = useState<number>(2000);

    const handleWindowSizeChange = () => {
        setWidth(window?.innerWidth);
    }
    useEffect(() => {
        handleWindowSizeChange();
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const shouldRenderMobileNav: boolean = (width <= 1000);

    const toggleNav = () => {
        handleToggleMobileNav();
    }

    if (shouldRenderMobileNav) {
        return (
          <MobileNavWrapper>
              <div onClick={toggleNav}>
                  <Menu size={40} />
              </div>
          </MobileNavWrapper>
        );
    }

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

const MobileNavWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow-y: scroll;
`;

export default Header;