import React, {useState} from 'react';
import styled from 'styled-components';
import { Colours } from '../definitions';
import Link from 'next/link';
import Button from "./Button";
import apiFetch from "../functions/apiFetch";
import {useRouter} from "next/router";


const Navbar = ({className, showSignOutButton}) => {
    const [isSigningOut, setIsSigningOut] = useState(false);
    const router = useRouter();

    const signOut = async () => {
        setIsSigningOut(true);
        let response = await apiFetch("/user/session", {
            method: "DELETE"
        });
        if (response.status === 200) {
            router.push("/signin");
        }
        else {
            setIsSigningOut(false);
        }
    }

    return (
        <Header className={className}>
            <div className="headerContents">
                <Link href="/" className="headerLogoWrapper">
                    <img className="headerLogo" src="/img/todox-logo-white.svg" />
                </Link>
                { showSignOutButton && <Button text="Sign out" onClick={signOut} size="medium" variant="primary" disabled={isSigningOut} /> }
            </div>
        </Header>
    );
}

export default Navbar;

const Header = styled.header`
    background: ${Colours.NAVIGATION_BAR};
    box-sizing: border-box;
    height: 4rem;
    padding: 1rem 2.25rem;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;

    .headerContents {
        display: flex;
        align-items: center;
        height: 100%;
    }
    
    .headerLogoWrapper {
        flex-grow: 1;
        vertical-align: middle;
        display: inline-block;
    }

    Button {
        vertical-align: middle;
        float: right;
    }
    
    .headerLogo {
        height: 4.6875rem;
        width: 8.4375rem;
    }
`;