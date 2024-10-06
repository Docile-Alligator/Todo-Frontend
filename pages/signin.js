import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { Colours, Typography } from '../definitions';
import { updateSignInUsername, updateSignInPassword, updateSignInError, updateSignInSuccess, clearSignInAlerts, clearSignIn } from '../actions/signIn';
import apiFetch from '../functions/apiFetch';
import Form from '../components/Form';
import InputField from '../components/InputField';
import Button from '../components/Button';
import PageLayout from '../components/PageLayout';
import Alert from '../components/Alert';


const SignIn = () => {
    const [isSigningIn, setIsSigningIn] = useState(false);
    const signInState = useSelector((state) => state.signIn);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (signInState.body.username && signInState.body.password) {
            setIsSigningIn(true);
            dispatch(clearSignInAlerts());
            let response = await apiFetch("/user/session", {
                body: signInState.body, 
                method: "POST"
            });
            if (response.status === 200) {
                dispatch(clearSignIn());
                dispatch(updateSignInSuccess({ success: "Sign in successful, redirecting..." }));
                router.push("/");
            }
            else {
                dispatch(updateSignInError({ error: response.body.error }));
                setIsSigningIn(false);
            }
        }
    };

    return (
        <PageLayout title="Sign in">
            <Container>
                <div className="content">
                    <h1>Sign In</h1>
                    <Alert message={signInState.alerts.error} onClose={() => dispatch(clearSignInAlerts())} />
                    <Alert message={signInState.alerts.success} onClose={() => dispatch(clearSignInAlerts())} variant="success" />
                    <Form onSubmit={handleSubmit}>
                        <InputField className="input" type="text" placeholder="Username" required value={signInState.body.username} onChange={e => dispatch(updateSignInUsername({username: e.target.value}))} />
                        <InputField className="input" type="password" placeholder="Password" required value={signInState.body.password} onChange={e => dispatch(updateSignInPassword({password: e.target.value}))} />
                        <Button className="loginButton" type="submit" text="Sign in" size="large" variant="primary" disabled={isSigningIn} isFullWidth />
                    </Form>
                </div>
                <Footer>
                    <p>Don't have an account? <Link className="highlightedLink" href="/signup">Sign up</Link></p>
                </Footer>
            </Container>
        </PageLayout>
    );
};

export default SignIn;

const Container = styled.div`
    width: 100%;

    h1 {
        color: ${Colours.BLACK};
        font-size: ${Typography.HEADING_SIZES.M};
        font-weight: ${Typography.WEIGHTS.LIGHT};
        line-height: 2.625rem;
        margin-bottom: 2rem;
        margin-top: 1rem;
    }

    .input {
        margin-bottom: 0.5rem;
    }

    .loginButton {
        margin-bottom: 2.0625rem;
    }

    .signUpOptions {
        margin-bottom: 2rem;

        .signUpOption {
            margin-bottom: 0.5rem;
        }
    }
`;

const Footer = styled.div`
    padding: 1.5rem 0rem;
    text-align: center;

    p {
        font-size: ${Typography.BODY_SIZES.L};
        font-weight: ${Typography.WEIGHTS.MEDIUM};

        .highlightedLink {
            color: ${Colours.ACCENT_1};
        }
    }
`;