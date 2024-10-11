import React, {useState} from 'react';
import styled from 'styled-components';
import { Colours } from '../definitions';
import Link from 'next/link';
import Button from "./Button";
import apiFetch from "../functions/apiFetch";
import {useRouter} from "next/router";


const Navbar = ({className, showSignOutButton}) => {
    /*
        This state controls the sign-out button disabled state in the dialog.
        Users will not be able to abuse the sign-out button when performing the sign-out API call.
    */
    const [isSigningOut, setIsSigningOut] = useState(false);
    const router = useRouter();

    const signOut = async () => {
        setIsSigningOut(true);
        try {
            let response = await apiFetch("/user/session", {
                method: "DELETE"
            });

            if (response.status === 200) {
                // Redirect the user to the sign-in page.
                router.push("/signin");
            } else {
                console.error("Log out failed");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSigningOut(false);
        }
    }

    return (
        <Header className={className}>
            <div className="headerContents">
                <div>
                    <Link href="/" className="headerLogoWrapper">
                        <img className="headerLogo" src="/img/todox-logo-white.svg" />
                    </Link>
                </div>
                {/*We don't want to show the sign-out button on the sign-in page.*/}
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
    
    .headerContents > div {
        flex-grow: 1;
        display: inline-block;
    }
    
    .headerLogo {
        height: 4.6875rem;
        width: 8.4375rem;
    }
`;