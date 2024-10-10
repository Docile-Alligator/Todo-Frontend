import React from 'react';
import styled from 'styled-components';
import { Colours } from '../definitions';
import Link from 'next/link';
import Button from "./Button";
import {useSelector} from "react-redux";


const Navbar = ({className}) => {
    const signInState = useSelector((state) => state.signIn);

    const signOut = () => {

    }

    return (
        <Header className={className}>
            <div className="headerContents">
                <Link href="/" className="headerLogoWrapper">
                    <img className="headerLogo" src="/img/todox-logo-white.svg" />
                </Link>
                <Button text="Sign out" onClick={signOut} size="medium" variant="primary" disabled={signInState.body.username !== ""} />
            </div>
        </Header>
    );
}

export default Navbar;

const Header = styled.header`
    align-items: center;
    background: ${Colours.NAVIGATION_BAR};
    box-sizing: border-box;
    //display: flex;
    height: 4rem;
    //padding: 1rem 2.25rem;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;

    .headerContents {
        display: flex;
    }
    
    .headerLogoWrapper {
        flex-grow: 1;
        vertical-align: top;
        float: right;
    }

    Button {
        vertical-align: top;
        border: 1px solid red;
        float: right;
        //display: block;
    }
    
    .headerLogo {
        height: 4.6875rem;
        width: 8.4375rem;
    }
`;