import React from 'react';
import styled from 'styled-components';
import { Colours } from '../definitions';
import Link from 'next/link';


const Navbar = ({className}) => {
    return (
        <Header className={className}>
            <div className="headerContents">
                <Link href="/">
                    <img className="headerLogo" src="/img/todox-logo-white.svg" />
                </Link>
            </div>
        </Header>
    );
}

export default Navbar;

const Header = styled.header`
    align-items: center;
    background: ${Colours.NAVIGATION_BAR};
    box-sizing: border-box;
    display: flex;
    height: 4rem;
    padding: 1rem 2.25rem;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;

    .headerLogo {
        height: 4.6875rem;
        width: 8.4375rem;
    }
`;